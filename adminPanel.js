// Admin Panel and User Role Management

const USER_ROLES = {
    GOD_MODE: { level: 6, name: 'God Mode', permissions: ['all'] },
    ADMIN: { level: 5, name: 'Administrator', permissions: ['manage_users', 'manage_rooms', 'moderate', 'ban', 'delete_messages'] },
    ROOM_ADMIN: { level: 4, name: 'Room Administrator', permissions: ['manage_room', 'moderate', 'kick'] },
    ROOM_ASSISTANT: { level: 3, name: 'Room Assistant', permissions: ['moderate', 'warn'] },
    MODERATOR: { level: 2, name: 'Moderator', permissions: ['moderate', 'warn'] },
    STANDARD: { level: 1, name: 'Standard User', permissions: ['chat', 'join_rooms'] }
};

// Demo accounts with different roles
const DEMO_ACCOUNTS = [
    {
        userId: 'GODMOD010101',
        firstName: 'God',
        lastName: 'Mode',
        dob: '2000-01-01',
        password: 'demo123',
        role: 'GOD_MODE',
        points: 99999,
        securityQuestion: 'pet',
        securityAnswer: 'demo'
    },
    {
        userId: 'ADMADM010101',
        firstName: 'Admin',
        lastName: 'Admin',
        dob: '2000-01-01',
        password: 'demo123',
        role: 'ADMIN',
        points: 50000,
        securityQuestion: 'pet',
        securityAnswer: 'demo'
    },
    {
        userId: 'ROOMOD010101',
        firstName: 'Room',
        lastName: 'Moderator',
        dob: '2000-01-01',
        password: 'demo123',
        role: 'ROOM_ADMIN',
        points: 10000,
        securityQuestion: 'pet',
        securityAnswer: 'demo'
    },
    {
        userId: 'ROAASS010101',
        firstName: 'Room',
        lastName: 'Assistant',
        dob: '2000-01-01',
        password: 'demo123',
        role: 'ROOM_ASSISTANT',
        points: 5000,
        securityQuestion: 'pet',
        securityAnswer: 'demo'
    },
    {
        userId: 'MODMOD010101',
        firstName: 'Mod',
        lastName: 'Moderator',
        dob: '2000-01-01',
        password: 'demo123',
        role: 'MODERATOR',
        points: 2000,
        securityQuestion: 'pet',
        securityAnswer: 'demo'
    },
    {
        userId: 'STASTA010101',
        firstName: 'Standard',
        lastName: 'Standard',
        dob: '2000-01-01',
        password: 'demo123',
        role: 'STANDARD',
        points: 100,
        securityQuestion: 'pet',
        securityAnswer: 'demo'
    }
];

// Initialize demo accounts
function initializeDemoAccounts() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    DEMO_ACCOUNTS.forEach(demoUser => {
        const exists = users.find(u => u.userId === demoUser.userId);
        if (!exists) {
            users.push({
                ...demoUser,
                contacts: [],
                pinnedContacts: [],
                interests: [],
                location: { lat: 0, lng: 0 }
            });
        }
    });
    
    localStorage.setItem('users', JSON.stringify(users));
}

// Check if user has permission
function hasPermission(user, permission) {
    if (!user || !user.role) return false;
    
    const role = USER_ROLES[user.role];
    if (!role) return false;
    
    return role.permissions.includes('all') || role.permissions.includes(permission);
}

// Open admin panel
function openAdminPanel() {
    if (!currentUser) return;
    
    const roleLevel = USER_ROLES[currentUser.role]?.level || 1;
    
    if (roleLevel < 2) {
        showFeedback('Access Denied', 'You do not have permission to access the admin panel.', false);
        return;
    }
    
    const adminModal = document.getElementById('admin-panel-modal');
    if (adminModal) {
        adminModal.classList.remove('hidden');
        loadAdminPanelContent();
    }
}

// Load admin panel content based on role
function loadAdminPanelContent() {
    const roleLevel = USER_ROLES[currentUser.role]?.level || 1;
    const contentDiv = document.getElementById('admin-panel-content');
    
    if (!contentDiv) return;
    
    let html = `
        <div class="admin-header">
            <h3>Admin Panel - ${USER_ROLES[currentUser.role]?.name}</h3>
            <p>Role Level: ${roleLevel}</p>
        </div>
        <div class="admin-sections">
    `;
    
    // User management
    if (roleLevel >= 5) {
        html += `
            <div class="admin-section">
                <h4>User Management</h4>
                <button class="btn-3d" onclick="viewAllUsers()">View All Users</button>
                <button class="btn-3d" onclick="manageUserRoles()">Manage Roles</button>
                <button class="btn-3d" onclick="banUser()">Ban User</button>
            </div>
        `;
    }
    
    // Room management
    if (roleLevel >= 3) {
        html += `
            <div class="admin-section">
                <h4>Room Management</h4>
                <button class="btn-3d" onclick="viewRooms()">View Rooms</button>
                <button class="btn-3d" onclick="createPublicRoom()">Create Public Room</button>
                ${roleLevel >= 4 ? '<button class="btn-3d" onclick="deleteRoom()">Delete Room</button>' : ''}
            </div>
        `;
    }
    
    // Moderation tools
    if (roleLevel >= 2) {
        html += `
            <div class="admin-section">
                <h4>Moderation Tools</h4>
                <button class="btn-3d" onclick="viewReports()">View Reports</button>
                <button class="btn-3d" onclick="warnUser()">Warn User</button>
                ${roleLevel >= 4 ? '<button class="btn-3d" onclick="kickUser()">Kick User</button>' : ''}
            </div>
        `;
    }
    
    // Statistics (all moderators+)
    if (roleLevel >= 2) {
        html += `
            <div class="admin-section">
                <h4>Statistics</h4>
                <div class="stats-grid">
                    <div class="stat-item">
                        <span class="stat-value">${getAllUsers().length}</span>
                        <span class="stat-label">Total Users</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${getPublicRooms().length}</span>
                        <span class="stat-label">Active Rooms</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${getOnlineUsers().length}</span>
                        <span class="stat-label">Online Now</span>
                    </div>
                </div>
            </div>
        `;
    }
    
    html += '</div>';
    contentDiv.innerHTML = html;
}

// Helper functions
function getAllUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
}

function getPublicRooms() {
    return JSON.parse(localStorage.getItem('publicRooms') || '[]');
}

function getOnlineUsers() {
    // Simulated - in real app would track active sessions
    return getAllUsers().filter(() => Math.random() > 0.7);
}

function viewAllUsers() {
    const users = getAllUsers();
    let html = '<div class="user-list"><h3>All Users</h3><table><tr><th>UserID</th><th>Role</th><th>Points</th><th>Actions</th></tr>';
    
    users.forEach(user => {
        html += `<tr>
            <td>${user.userId}</td>
            <td>${USER_ROLES[user.role]?.name || 'Standard'}</td>
            <td>${user.points}</td>
            <td><button onclick="editUser('${user.userId}')">Edit</button></td>
        </tr>`;
    });
    
    html += '</table></div>';
    showFeedback('All Users', html);
}

function manageUserRoles() {
    showFeedback('Manage Roles', 'Role management interface would allow changing user roles and permissions.');
}

function banUser() {
    const userId = prompt('Enter user ID to ban:');
    if (userId) {
        showFeedback('User Banned', `User ${userId} has been banned.`);
    }
}

function viewRooms() {
    const rooms = getPublicRooms();
    if (rooms.length === 0) {
        showFeedback('Public Rooms', 'No public rooms exist yet.');
        return;
    }
    
    let html = '<div class="room-list"><h3>Public Rooms</h3>';
    rooms.forEach(room => {
        html += `<div class="room-item">
            <h4>${room.name}</h4>
            <p>${room.description}</p>
            <p>Members: ${room.members?.length || 0}</p>
            ${room.hasVideo ? '<p style="color: #007bff;">📹 Video Enabled</p>' : ''}
            ${room.hasGame ? '<p style="color: #28a745;">🎮 Game: ' + room.gameType + '</p>' : ''}
            <button onclick="joinRoom('${room.id}')">Join</button>
            ${room.hasVideo ? `<button onclick="startRoomVideoCall('${room.id}')">📹 Join Video</button>` : ''}
        </div>`;
    });
    html += '</div>';
    
    showFeedback('Public Rooms', html);
}

function createPublicRoom() {
    const name = prompt('Enter room name:');
    if (!name) return;
    
    const description = prompt('Enter room description:');
    const hasGame = confirm('Include a game in this room?');
    const hasVideo = confirm('Enable video chat in this room?');
    
    const rooms = getPublicRooms();
    const newRoom = {
        id: 'room_' + Date.now(),
        name: name,
        description: description || 'No description',
        creator: currentUser.userId,
        members: [currentUser.userId],
        hasGame: hasGame,
        gameType: hasGame ? 'trivia' : null,
        hasVideo: hasVideo,
        created: Date.now()
    };
    
    rooms.push(newRoom);
    localStorage.setItem('publicRooms', JSON.stringify(rooms));
    
    showFeedback('Room Created', `Public room "${name}" has been created successfully!${hasVideo ? ' Video chat enabled!' : ''}`);
}

function deleteRoom() {
    const roomId = prompt('Enter room ID to delete:');
    if (!roomId) return;
    
    const rooms = getPublicRooms();
    const filtered = rooms.filter(r => r.id !== roomId);
    localStorage.setItem('publicRooms', JSON.stringify(filtered));
    
    showFeedback('Room Deleted', `Room ${roomId} has been deleted.`);
}

function viewReports() {
    showFeedback('Reports', 'No reports at this time.');
}

function warnUser() {
    const userId = prompt('Enter user ID to warn:');
    if (userId) {
        showFeedback('Warning Sent', `Warning sent to user ${userId}.`);
    }
}

function kickUser() {
    const userId = prompt('Enter user ID to kick:');
    if (userId) {
        showFeedback('User Kicked', `User ${userId} has been kicked.`);
    }
}

function joinRoom(roomId) {
    const rooms = getPublicRooms();
    const room = rooms.find(r => r.id === roomId);
    
    if (!room) {
        showFeedback('Error', 'Room not found.', false);
        return;
    }
    
    if (!room.members.includes(currentUser.userId)) {
        room.members.push(currentUser.userId);
        localStorage.setItem('publicRooms', JSON.stringify(rooms));
    }
    
    closeModal('feedback-modal');
    openRoomChat(room);
}

function openRoomChat(room) {
    showFeedback('Room Chat', `Welcome to ${room.name}! ${room.hasGame ? '🎮 Game: ' + room.gameType : ''}`);
}

// Initialize on app load
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function() {
        initializeDemoAccounts();
    });
}
