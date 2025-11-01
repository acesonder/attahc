// Group Chat and Video Features
// Handles group chats (public/private), invites, and video calls

// Group Chat State
let groups = [];
let activeGroup = null;
let videoCallActive = false;
let localStream = null;
let remoteStream = null;

// Initialize groups from localStorage
function initializeGroups() {
    const savedGroups = localStorage.getItem('groups');
    if (savedGroups) {
        groups = JSON.parse(savedGroups);
    }
}

// Save groups to localStorage
function saveGroups() {
    localStorage.setItem('groups', JSON.stringify(groups));
}

// Open Group List Modal
function openGroupList() {
    closeAllModals();
    document.getElementById('group-list-modal').classList.remove('hidden');
    loadMyGroups();
    loadPublicGroups();
}

// Show Group Tab
function showGroupTab(tabName, clickedButton) {
    document.querySelectorAll('.group-tab-content').forEach(tab => {
        tab.classList.add('hidden');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.getElementById(tabName).classList.remove('hidden');
    if (clickedButton) {
        clickedButton.classList.add('active');
    }
}

// Load My Groups
function loadMyGroups() {
    const myGroupsList = document.getElementById('my-groups-list');
    const myGroups = groups.filter(g => 
        g.members.includes(currentUser.userId) || g.creator === currentUser.userId
    );
    
    if (myGroups.length === 0) {
        myGroupsList.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">No groups yet. Create one to get started!</p>';
        return;
    }
    
    myGroupsList.innerHTML = myGroups.map(group => `
        <div class="group-card">
            <h4>${escapeHtml(group.name)}</h4>
            <p>${escapeHtml(group.description || 'No description')}</p>
            <div>
                <span class="group-badge">${group.type === 'private' ? '🔒 Private' : '🌐 Public'}</span>
                ${group.videoEnabled ? '<span class="group-badge">📹 Video</span>' : ''}
                <span class="group-badge">👥 ${group.members.length} members</span>
            </div>
            <div class="group-members">
                ${group.members.slice(0, 5).map(memberId => `
                    <div class="member-avatar" title="${memberId}">${memberId.substring(0, 2)}</div>
                `).join('')}
                ${group.members.length > 5 ? `<div class="member-avatar">+${group.members.length - 5}</div>` : ''}
            </div>
            <button class="btn-3d" onclick="openGroupChat('${group.id}')">Open Chat</button>
            ${group.videoEnabled ? `<button class="btn-3d" onclick="startGroupVideoCall('${group.id}')">📹 Start Video</button>` : ''}
        </div>
    `).join('');
}

// Load Public Groups
function loadPublicGroups() {
    const publicGroupsList = document.getElementById('public-groups-list');
    const publicGroups = groups.filter(g => g.type === 'public');
    
    if (publicGroups.length === 0) {
        publicGroupsList.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">No public groups available yet.</p>';
        return;
    }
    
    publicGroupsList.innerHTML = publicGroups.map(group => {
        const isMember = group.members.includes(currentUser.userId);
        return `
            <div class="group-card">
                <h4>${escapeHtml(group.name)}</h4>
                <p>${escapeHtml(group.description || 'No description')}</p>
                <div>
                    <span class="group-badge">🌐 Public</span>
                    ${group.videoEnabled ? '<span class="group-badge">📹 Video</span>' : ''}
                    <span class="group-badge">👥 ${group.members.length} members</span>
                </div>
                <div class="group-members">
                    ${group.members.slice(0, 5).map(memberId => `
                        <div class="member-avatar" title="${memberId}">${memberId.substring(0, 2)}</div>
                    `).join('')}
                    ${group.members.length > 5 ? `<div class="member-avatar">+${group.members.length - 5}</div>` : ''}
                </div>
                ${isMember 
                    ? `<button class="btn-3d" onclick="openGroupChat('${group.id}')">Open Chat</button>`
                    : `<button class="btn-3d" onclick="joinGroup('${group.id}')">Join Group</button>`
                }
            </div>
        `;
    }).join('');
}

// Open Create Group Modal
function openCreateGroup() {
    closeAllModals();
    document.getElementById('create-group-modal').classList.remove('hidden');
    loadInviteUserList();
    setupCreateGroupForm();
}

// Load users for invite list
function loadInviteUserList() {
    const inviteList = document.getElementById('user-invite-list');
    
    // Get demo users and any other users
    const demoUsers = ['GODMOD010101', 'ADMADM010101', 'ROOMOD010101', 'ROAASS010101', 'MODMOD010101', 'STASTA010101'];
    const allUsers = [...new Set([...demoUsers, ...Object.keys(messages || {})])];
    const otherUsers = allUsers.filter(u => u !== currentUser.userId);
    
    if (otherUsers.length === 0) {
        inviteList.innerHTML = '<p style="text-align: center; color: #666; padding: 10px;">No users available to invite.</p>';
        return;
    }
    
    inviteList.innerHTML = otherUsers.map(userId => `
        <div class="invite-user-item">
            <label>
                <input type="checkbox" class="invite-checkbox" value="${userId}">
                ${escapeHtml(userId)}
            </label>
        </div>
    `).join('');
}

// Setup Create Group Form
function setupCreateGroupForm() {
    const form = document.getElementById('create-group-form');
    form.onsubmit = function(e) {
        e.preventDefault();
        createGroup();
    };
}

// Create Group
function createGroup() {
    const name = document.getElementById('group-name').value.trim();
    const description = document.getElementById('group-description').value.trim();
    const type = document.getElementById('group-type').value;
    const videoEnabled = document.getElementById('group-video-enabled').checked;
    
    if (!name) {
        showFeedback('Error', 'Please enter a group name.', false);
        return;
    }
    
    // Get invited users
    const invitedUsers = Array.from(document.querySelectorAll('.invite-checkbox:checked'))
        .map(cb => cb.value);
    
    const newGroup = {
        id: 'group-' + Date.now(),
        name: name,
        description: description,
        type: type,
        videoEnabled: videoEnabled,
        creator: currentUser.userId,
        members: [currentUser.userId, ...invitedUsers],
        messages: [],
        createdAt: new Date().toISOString()
    };
    
    groups.push(newGroup);
    saveGroups();
    
    closeModal('create-group-modal');
    showFeedback('Group Created!', `"${name}" has been created successfully!`);
    
    // Clear form
    document.getElementById('create-group-form').reset();
    
    // Refresh group list
    setTimeout(() => {
        closeModal('feedback-modal');
        openGroupList();
    }, 1500);
}

// Join Group
function joinGroup(groupId) {
    const group = groups.find(g => g.id === groupId);
    
    if (!group) {
        showFeedback('Error', 'Group not found.', false);
        return;
    }
    
    if (group.members.includes(currentUser.userId)) {
        showFeedback('Already a Member', 'You are already a member of this group.');
        return;
    }
    
    group.members.push(currentUser.userId);
    saveGroups();
    
    showFeedback('Joined!', `You have joined "${group.name}"!`);
    loadPublicGroups();
}

// Open Group Chat
function openGroupChat(groupId) {
    const group = groups.find(g => g.id === groupId);
    
    if (!group) {
        showFeedback('Error', 'Group not found.', false);
        return;
    }
    
    if (!group.members.includes(currentUser.userId)) {
        showFeedback('Access Denied', 'You are not a member of this group.', false);
        return;
    }
    
    activeGroup = group;
    closeModal('group-list-modal');
    
    // Open chat window with group
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('chat-window').classList.remove('hidden');
    document.getElementById('chat-contact-name').textContent = `${group.name} (${group.members.length} members)`;
    
    // Load group messages
    loadGroupMessages(groupId);
    
    // Update active chat
    activeChat = groupId;
}

// Load Group Messages
function loadGroupMessages(groupId) {
    const group = groups.find(g => g.id === groupId);
    if (!group) return;
    
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.innerHTML = '';
    
    if (!group.messages || group.messages.length === 0) {
        chatMessages.innerHTML = '<div style="text-align: center; color: #666; padding: 20px;">No messages yet. Start the conversation!</div>';
        return;
    }
    
    group.messages.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${msg.sender === currentUser.userId ? 'sent' : 'received'}`;
        messageDiv.innerHTML = `
            <strong>${escapeHtml(msg.sender)}:</strong> ${escapeHtml(msg.text)}
            <span class="message-time">${new Date(msg.timestamp).toLocaleTimeString()}</span>
        `;
        chatMessages.appendChild(messageDiv);
    });
    
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Send message to group (override sendMessage when in group)
const originalSendMessage = window.sendMessage;
window.sendMessage = function() {
    if (activeGroup) {
        sendGroupMessage();
    } else {
        originalSendMessage();
    }
};

// Send Group Message
function sendGroupMessage() {
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    
    if (!text || !activeGroup) return;
    
    const message = {
        sender: currentUser.userId,
        text: text,
        timestamp: new Date().toISOString()
    };
    
    activeGroup.messages.push(message);
    saveGroups();
    
    // Add points
    currentUser.points += 2;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    document.getElementById('user-points').textContent = `Points: ${currentUser.points}`;
    
    // Display message
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message sent';
    messageDiv.innerHTML = `
        <strong>You:</strong> ${escapeHtml(text)}
        <span class="message-time">${new Date().toLocaleTimeString()}</span>
    `;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    input.value = '';
}

// Override closeChat to handle group chat
const originalCloseChat = window.closeChat;
window.closeChat = function() {
    activeGroup = null;
    originalCloseChat();
};

// Video Chat Functions

// Start Video Call (one-on-one)
function startVideoCall() {
    if (!activeChat || activeGroup) {
        showFeedback('Video Call', 'Please open a one-on-one chat first.');
        return;
    }
    
    openVideoChat(activeChat);
}

// Start Group Video Call
function startGroupVideoCall(groupId) {
    const group = groups.find(g => g.id === groupId);
    
    if (!group) {
        showFeedback('Error', 'Group not found.', false);
        return;
    }
    
    if (!group.videoEnabled) {
        showFeedback('Video Disabled', 'Video chat is not enabled for this group.', false);
        return;
    }
    
    openVideoChat(groupId, true);
}

// Open Video Chat Modal
function openVideoChat(chatId, isGroup = false) {
    closeAllModals();
    const modal = document.getElementById('video-chat-modal');
    modal.classList.remove('hidden');
    
    const title = document.getElementById('video-chat-title');
    const remoteName = document.getElementById('remote-name');
    
    if (isGroup) {
        const group = groups.find(g => g.id === chatId);
        title.textContent = `Video Chat - ${group.name}`;
        remoteName.textContent = `${group.members.length - 1} participants`;
        setupGroupVideoGrid(group);
    } else {
        title.textContent = `Video Chat - ${chatId}`;
        remoteName.textContent = chatId;
    }
    
    videoCallActive = true;
    initializeVideoCall();
}

// Setup Group Video Grid
function setupGroupVideoGrid(group) {
    const videoGrid = document.getElementById('video-grid');
    
    // Add placeholder videos for each member (excluding current user)
    const otherMembers = group.members.filter(m => m !== currentUser.userId);
    
    if (otherMembers.length > 1) {
        videoGrid.innerHTML = `
            <div class="video-wrapper">
                <video id="local-video" autoplay muted></video>
                <span class="video-label">You</span>
            </div>
            ${otherMembers.map(memberId => `
                <div class="video-wrapper">
                    <video class="remote-video" autoplay></video>
                    <span class="video-label">${escapeHtml(memberId)}</span>
                </div>
            `).join('')}
        `;
        
        // Adjust grid for multiple participants
        if (otherMembers.length >= 3) {
            videoGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
        }
    }
}

// Initialize Video Call (simulated)
function initializeVideoCall() {
    // In a real implementation, this would initialize WebRTC
    // For now, we'll simulate it with a colored background
    
    const localVideo = document.getElementById('local-video');
    const remoteVideos = document.querySelectorAll('.remote-video, #remote-video');
    
    // Simulate local video feed with colored background
    localVideo.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    
    // Simulate remote video feeds
    remoteVideos.forEach((video, index) => {
        const colors = [
            'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
        ];
        video.style.background = colors[index % colors.length];
    });
    
    // Update status
    document.getElementById('video-status').textContent = 
        'Simulated Video Chat - WebRTC integration needed for real calls';
}

// Toggle Video
function toggleVideo() {
    const btn = document.getElementById('toggle-video');
    const localVideo = document.getElementById('local-video');
    
    if (btn.classList.contains('disabled')) {
        btn.classList.remove('disabled');
        btn.textContent = '📹 Video';
        localVideo.style.opacity = '1';
        showFeedback('Video Enabled', 'Your video is now on.');
    } else {
        btn.classList.add('disabled');
        btn.textContent = '📹 Video (Off)';
        localVideo.style.opacity = '0.3';
        showFeedback('Video Disabled', 'Your video is now off.');
    }
}

// Toggle Audio
function toggleAudio() {
    const btn = document.getElementById('toggle-audio');
    
    if (btn.classList.contains('disabled')) {
        btn.classList.remove('disabled');
        btn.textContent = '🎤 Audio';
        showFeedback('Audio Enabled', 'Your microphone is now on.');
    } else {
        btn.classList.add('disabled');
        btn.textContent = '🎤 Audio (Off)';
        showFeedback('Audio Disabled', 'Your microphone is now off.');
    }
}

// End Video Call
function endVideoCall() {
    if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
        localStream = null;
    }
    
    videoCallActive = false;
    closeVideoChat();
    showFeedback('Call Ended', 'The video call has ended.');
}

// Close Video Chat
function closeVideoChat() {
    document.getElementById('video-chat-modal').classList.add('hidden');
    
    // Reset video grid
    const videoGrid = document.getElementById('video-grid');
    videoGrid.innerHTML = `
        <div class="video-wrapper">
            <video id="local-video" autoplay muted></video>
            <span class="video-label">You</span>
        </div>
        <div class="video-wrapper">
            <video id="remote-video" autoplay></video>
            <span class="video-label" id="remote-name">Connecting...</span>
        </div>
    `;
    videoGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
    
    // Reset buttons
    document.getElementById('toggle-video').classList.remove('disabled');
    document.getElementById('toggle-audio').classList.remove('disabled');
    document.getElementById('toggle-video').textContent = '📹 Video';
    document.getElementById('toggle-audio').textContent = '🎤 Audio';
}

// Start Room Video Call
function startRoomVideoCall(roomId) {
    const rooms = JSON.parse(localStorage.getItem('publicRooms') || '[]');
    const room = rooms.find(r => r.id === roomId);
    
    if (!room) {
        showFeedback('Error', 'Room not found.', false);
        return;
    }
    
    if (!room.hasVideo) {
        showFeedback('Video Disabled', 'Video chat is not enabled for this room.', false);
        return;
    }
    
    if (!room.members.includes(currentUser.userId)) {
        room.members.push(currentUser.userId);
        localStorage.setItem('publicRooms', JSON.stringify(rooms));
    }
    
    closeAllModals();
    const modal = document.getElementById('video-chat-modal');
    modal.classList.remove('hidden');
    
    const title = document.getElementById('video-chat-title');
    const videoGrid = document.getElementById('video-grid');
    
    title.textContent = `Video Chat - ${room.name}`;
    
    // Create video grid for room members
    const otherMembers = room.members.filter(m => m !== currentUser.userId);
    
    videoGrid.innerHTML = `
        <div class="video-wrapper">
            <video id="local-video" autoplay muted></video>
            <span class="video-label">You</span>
        </div>
        ${otherMembers.slice(0, 5).map(memberId => `
            <div class="video-wrapper">
                <video class="remote-video" autoplay></video>
                <span class="video-label">${escapeHtml(memberId)}</span>
            </div>
        `).join('')}
    `;
    
    // Adjust grid for multiple participants
    if (otherMembers.length >= 2) {
        videoGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
    }
    
    videoCallActive = true;
    initializeVideoCall();
}

// Initialize groups on load
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function() {
        initializeGroups();
    });
}
