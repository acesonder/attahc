// Enhanced Features: Spy Write, Phone Tap, Font Changer

// Spy Write State
let spyWriteEnabled = false;
let spyWriteHoldTimeout = null;

// Initialize shake detection (simplified for web - uses keyboard shortcut)
function initializeSpyWrite() {
    // Listen for shake simulation (Ctrl+Shift+S)
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.shiftKey && e.key === 'S') {
            toggleSpyWrite();
        }
    });
}

// Toggle Spy Write mode
function toggleSpyWrite() {
    spyWriteEnabled = !spyWriteEnabled;
    
    if (spyWriteEnabled) {
        showFeedback('SPY WRITE Activated', 'Shake device (Ctrl+Shift+S) or hold Enter to reveal text. Free feature!');
        applySpyWriteBlur(true);
    } else {
        showFeedback('SPY WRITE Deactivated', 'Spy Write mode is now off.');
        applySpyWriteBlur(false);
    }
    
    // Save setting
    if (currentUser) {
        const settings = JSON.parse(localStorage.getItem(`settings-${currentUser.userId}`) || '{}');
        settings.spyWriteEnabled = spyWriteEnabled;
        localStorage.setItem(`settings-${currentUser.userId}`, JSON.stringify(settings));
    }
}

// Apply blur effect to chat
function applySpyWriteBlur(enable) {
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    
    if (!chatMessages || !chatInput) return;
    
    if (enable) {
        chatMessages.style.filter = 'blur(10px)';
        chatMessages.style.transition = 'filter 0.3s';
        chatInput.style.filter = 'blur(8px)';
        chatInput.style.transition = 'filter 0.3s';
        
        // Set up hold-to-reveal on Enter key
        chatInput.addEventListener('keydown', handleSpyWriteKeyDown);
        chatInput.addEventListener('keyup', handleSpyWriteKeyUp);
        chatInput.addEventListener('input', handleSpyWriteInput);
    } else {
        chatMessages.style.filter = 'none';
        chatInput.style.filter = 'none';
        
        chatInput.removeEventListener('keydown', handleSpyWriteKeyDown);
        chatInput.removeEventListener('keyup', handleSpyWriteKeyUp);
        chatInput.removeEventListener('input', handleSpyWriteInput);
    }
}

function handleSpyWriteKeyDown(e) {
    if (e.key === 'Enter') {
        // Start revealing on hold
        chatInput.style.filter = 'blur(0px)';
        spyWriteHoldTimeout = setTimeout(() => {
            // After 1 second of holding, reveal messages too
            document.getElementById('chat-messages').style.filter = 'blur(0px)';
        }, 1000);
    }
}

function handleSpyWriteKeyUp(e) {
    if (e.key === 'Enter') {
        // Re-blur when released (if not sending)
        if (spyWriteHoldTimeout) {
            clearTimeout(spyWriteHoldTimeout);
        }
        
        // If message was sent, blur immediately
        if (e.target.value.trim() === '') {
            setTimeout(() => {
                chatInput.style.filter = 'blur(8px)';
                document.getElementById('chat-messages').style.filter = 'blur(10px)';
            }, 100);
        }
    }
}

function handleSpyWriteInput(e) {
    // Keep input blurred while typing
    if (spyWriteEnabled) {
        e.target.style.filter = 'blur(8px)';
    }
}

// Phone Tap Feature
let tappedUsers = JSON.parse(localStorage.getItem('tappedUsers') || '{}');

function simulatePhoneTap() {
    const targetUser = prompt('Enter the username of the user to tap phones with:');
    if (!targetUser) return;
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const target = users.find(u => u.userId === targetUser);
    
    if (!target) {
        showFeedback('Error', 'User not found.', false);
        return;
    }
    
    // Simulate tap
    const tapKey = `${currentUser.userId}-${targetUser}`;
    tappedUsers[tapKey] = {
        tappedAt: Date.now(),
        canReply: false
    };
    localStorage.setItem('tappedUsers', JSON.stringify(tappedUsers));
    
    showFeedback('Phone Tap Successful!', `You can now view all conversations of ${targetUser}. Pay 150 points to reply to their messages.`);
    displayTappedConversations(targetUser);
}

function displayTappedConversations(targetUser) {
    const tapKey = `${currentUser.userId}-${targetUser}`;
    const tapInfo = tappedUsers[tapKey];
    
    if (!tapInfo) {
        showFeedback('Error', 'You need to tap phones with this user first.', false);
        return;
    }
    
    // Find all conversations for the target user
    let conversationsHtml = `<h3>Conversations of ${targetUser}</h3>`;
    const allKeys = Object.keys(localStorage);
    const chatKeys = allKeys.filter(key => key.startsWith('chat-') && key.includes(targetUser));
    
    if (chatKeys.length === 0) {
        conversationsHtml += '<p>No conversations found.</p>';
    } else {
        chatKeys.forEach(key => {
            const messages = JSON.parse(localStorage.getItem(key) || '[]');
            const participants = key.replace('chat-', '').split('-');
            conversationsHtml += `
                <div class="tapped-conversation">
                    <h4>Chat with: ${participants.find(p => p !== targetUser) || 'Unknown'}</h4>
                    <div class="messages-preview">
                        ${messages.slice(-5).map(m => `
                            <p><strong>${m.sender}:</strong> ${m.text}</p>
                        `).join('')}
                    </div>
                    ${!tapInfo.canReply ? `
                        <button class="btn-3d" onclick="unlockReply('${targetUser}')">
                            Unlock Reply (150 points)
                        </button>
                    ` : `
                        <button class="btn-3d" onclick="replyToTapped('${key}')">
                            Reply to Conversation
                        </button>
                    `}
                </div>
            `;
        });
    }
    
    showFeedback('Tapped Conversations', conversationsHtml);
}

function unlockReply(targetUser) {
    if (currentUser.points < 150) {
        showFeedback('Insufficient Points', 'You need 150 points to unlock reply.', false);
        return;
    }
    
    addPoints(-150);
    
    const tapKey = `${currentUser.userId}-${targetUser}`;
    tappedUsers[tapKey].canReply = true;
    localStorage.setItem('tappedUsers', JSON.stringify(tappedUsers));
    
    showFeedback('Reply Unlocked!', 'You can now reply to conversations. Refreshing...');
    setTimeout(() => {
        closeModal('feedback-modal');
        displayTappedConversations(targetUser);
    }, 1500);
}

function replyToTapped(chatKey) {
    const message = prompt('Enter your message:');
    if (!message) return;
    
    const messages = JSON.parse(localStorage.getItem(chatKey) || '[]');
    messages.push({
        sender: currentUser.userId + ' (tapped)',
        text: message,
        timestamp: Date.now()
    });
    localStorage.setItem(chatKey, JSON.stringify(messages));
    
    showFeedback('Message Sent', 'Your message has been added to the conversation!');
}

// Font Style Changer (10 points, 10 minutes)
function applyFontStyleToUser() {
    if (currentUser.points < 10) {
        showFeedback('Insufficient Points', 'You need 10 points to change font styles.', false);
        return;
    }
    
    const targetUser = prompt('Enter the username to change font for:');
    if (!targetUser) return;
    
    // Show font selection modal
    showFontStyleSelector(targetUser);
}

function showFontStyleSelector(targetUser) {
    const modalHtml = `
        <div class="font-style-selector">
            <h3>Select Font Style for ${targetUser}</h3>
            <p>This will affect their entire chat system for 10 minutes once they come online.</p>
            <div class="font-styles-grid">
                ${Object.keys(FONT_STYLES).map(styleName => `
                    <button class="font-style-option" onclick="confirmFontStyle('${targetUser}', '${styleName}')">
                        <span style="font-family: monospace;">${styleName}</span>
                        <div class="font-preview">${transformToFontStyle('PREVIEW', styleName)}</div>
                    </button>
                `).join('')}
            </div>
        </div>
    `;
    
    showFeedback('Font Style Selector', modalHtml);
}

function confirmFontStyle(targetUser, styleName) {
    addPoints(-10);
    
    const fontEffects = JSON.parse(localStorage.getItem('fontEffects') || '{}');
    fontEffects[targetUser] = {
        style: styleName,
        appliedBy: currentUser.userId,
        appliedAt: Date.now(),
        expiresAt: Date.now() + (10 * 60 * 1000) // 10 minutes
    };
    localStorage.setItem('fontEffects', JSON.stringify(fontEffects));
    
    showFeedback('Font Style Applied!', `${targetUser}'s chat will use ${styleName} font for 10 minutes!`);
}

// Check and apply active font effects for current user
function checkFontEffects() {
    if (!currentUser) return;
    
    const fontEffects = JSON.parse(localStorage.getItem('fontEffects') || '{}');
    const effect = fontEffects[currentUser.userId];
    
    if (effect && effect.expiresAt > Date.now()) {
        applyFontEffectToChat(effect.style);
        
        // Show notification
        const remaining = Math.ceil((effect.expiresAt - Date.now()) / 60000);
        showFeedback('Font Effect Active', `Your chat is using ${effect.style} font. ${remaining} minutes remaining. Applied by ${effect.appliedBy}.`);
    } else if (effect) {
        // Remove expired effect
        delete fontEffects[currentUser.userId];
        localStorage.setItem('fontEffects', JSON.stringify(fontEffects));
    }
}

function applyFontEffectToChat(styleName) {
    // Apply to all outgoing messages
    const styleTag = document.getElementById('font-effect-style');
    if (styleTag) {
        styleTag.remove();
    }
    
    const newStyleTag = document.createElement('style');
    newStyleTag.id = 'font-effect-style';
    newStyleTag.innerHTML = `
        .message.sent {
            font-family: monospace !important;
            letter-spacing: 2px !important;
        }
    `;
    document.head.appendChild(newStyleTag);
    
    // Transform existing messages
    const messages = document.querySelectorAll('.message.sent');
    messages.forEach(msg => {
        msg.textContent = transformToFontStyle(msg.textContent, styleName);
    });
}

// Enhanced Settings System
function openEnhancedSettings() {
    const settingsModal = document.getElementById('enhanced-settings-modal');
    if (settingsModal) {
        settingsModal.classList.remove('hidden');
        loadEnhancedSettings();
    }
}

function loadEnhancedSettings() {
    const settings = JSON.parse(localStorage.getItem(`settings-${currentUser.userId}`) || '{}');
    
    // Apply saved settings
    if (settings.spyWriteEnabled) {
        document.getElementById('spy-write-toggle')?.setAttribute('checked', 'checked');
        spyWriteEnabled = true;
        applySpyWriteBlur(true);
    }
}

function saveEnhancedSettings() {
    const settings = {
        spyWriteEnabled: spyWriteEnabled,
        // Add more settings as needed
    };
    
    localStorage.setItem(`settings-${currentUser.userId}`, JSON.stringify(settings));
    showFeedback('Settings Saved', 'Your preferences have been saved!');
}

// Initialize on load
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function() {
        initializeSpyWrite();
        
        // Check for font effects periodically
        setInterval(() => {
            if (currentUser) {
                checkFontEffects();
            }
        }, 60000); // Every minute
    });
}
