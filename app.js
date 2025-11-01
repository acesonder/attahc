// Application State
let currentUser = null;
let users = [];
let messages = {};
let activeChat = null;
let chatCustomizations = {};

// Security: HTML escape function
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadFromLocalStorage();
});

function initializeApp() {
    // Show splash screen for 4 seconds, then landing page
    setTimeout(() => {
        document.getElementById('splash-screen').style.display = 'none';
        document.getElementById('landing-page').classList.remove('hidden');
    }, 4000);

    // Set up event listeners
    setupEventListeners();
}

function setupEventListeners() {
    // Login form
    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        handleLogin();
    });

    // Register form
    document.getElementById('register-form').addEventListener('submit', function(e) {
        e.preventDefault();
        handleRegistration();
    });

    // Chat input
    document.getElementById('chat-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

// Modal Management
function showLogin() {
    closeAllModals();
    document.getElementById('login-modal').classList.remove('hidden');
}

function showRegister() {
    closeAllModals();
    document.getElementById('register-modal').classList.remove('hidden');
}

function showPasswordRecovery() {
    closeAllModals();
    document.getElementById('recovery-modal').classList.remove('hidden');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
}

function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.add('hidden');
    });
}

function showFeedback(title, message, isSuccess = true) {
    document.getElementById('feedback-title').textContent = title;
    document.getElementById('feedback-message').textContent = message;
    document.getElementById('feedback-modal').classList.remove('hidden');
}

// User ID Generation (FirstLastMMDDYY format)
function generateUserId(firstName, lastName, dob) {
    const date = new Date(dob);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    
    const firstPart = firstName.substring(0, 3).toUpperCase();
    const lastPart = lastName.substring(0, 3).toUpperCase();
    
    return `${firstPart}${lastPart}${month}${day}${year}`;
}

// Registration Handler
function handleRegistration() {
    const firstName = document.getElementById('reg-firstname').value;
    const lastName = document.getElementById('reg-lastname').value;
    const dob = document.getElementById('reg-dob').value;
    const securityQuestion = document.getElementById('reg-security-question').value;
    const securityAnswer = document.getElementById('reg-security-answer').value;
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-confirm-password').value;

    // Validation
    if (!firstName || !lastName || !dob || !securityQuestion || !securityAnswer || !password) {
        showFeedback('Error', 'Please fill in all fields', false);
        return;
    }

    if (password !== confirmPassword) {
        showFeedback('Error', 'Passwords do not match', false);
        return;
    }

    if (password.length < 6) {
        showFeedback('Error', 'Password must be at least 6 characters', false);
        return;
    }

    // Generate user ID
    const userId = generateUserId(firstName, lastName, dob);

    // Check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    if (existingUsers.find(u => u.userId === userId)) {
        showFeedback('Error', 'An account with these details already exists', false);
        return;
    }

    // Create user object
    const newUser = {
        userId,
        firstName,
        lastName,
        dob,
        securityQuestion,
        securityAnswer,
        password,
        points: 0,
        role: 'Client',
        contacts: [],
        pinnedContacts: [],
        interests: [],
        location: { lat: 0, lng: 0 }
    };

    // Save user
    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    showFeedback('Success!', `Account created successfully! Your username is: ${userId}`);
    
    setTimeout(() => {
        closeModal('feedback-modal');
        showLogin();
    }, 2000);
}

// Login Handler
function handleLogin() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.userId === username && u.password === password);

    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        closeAllModals();
        showDashboard();
    } else {
        showFeedback('Error', 'Invalid username or password', false);
    }
}

// Password Recovery
function verifyUser() {
    const firstName = document.getElementById('recovery-firstname').value;
    const lastName = document.getElementById('recovery-lastname').value;
    const dob = document.getElementById('recovery-dob').value;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userId = generateUserId(firstName, lastName, dob);
    const user = users.find(u => u.userId === userId);

    if (user) {
        document.getElementById('recovery-step2').classList.remove('hidden');
        
        const questionText = {
            'pet': "What was your first pet's name?",
            'city': "What city were you born in?",
            'school': "What was your elementary school's name?",
            'color': "What is your favorite color?"
        };
        
        document.getElementById('security-question-display').textContent = 
            questionText[user.securityQuestion] || user.securityQuestion;
        document.getElementById('recovery-step2').dataset.userId = userId;
    } else {
        showFeedback('Error', 'No account found with these details', false);
    }
}

function verifyAnswer() {
    const userId = document.getElementById('recovery-step2').dataset.userId;
    const answer = document.getElementById('recovery-answer').value;
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.userId === userId);

    if (user && user.securityAnswer.toLowerCase() === answer.toLowerCase()) {
        document.getElementById('recovered-username').textContent = user.userId;
        document.getElementById('recovery-step3').classList.remove('hidden');
    } else {
        showFeedback('Error', 'Incorrect answer', false);
    }
}

function resetPassword() {
    const userId = document.getElementById('recovery-step2').dataset.userId;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-new-password').value;

    if (newPassword !== confirmPassword) {
        showFeedback('Error', 'Passwords do not match', false);
        return;
    }

    if (newPassword.length < 6) {
        showFeedback('Error', 'Password must be at least 6 characters', false);
        return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.userId === userId);
    
    if (userIndex !== -1) {
        users[userIndex].password = newPassword;
        localStorage.setItem('users', JSON.stringify(users));
        showFeedback('Success!', 'Password reset successfully!');
        
        setTimeout(() => {
            closeModal('feedback-modal');
            closeModal('recovery-modal');
            showLogin();
        }, 2000);
    }
}

// Dashboard
function showDashboard() {
    document.getElementById('landing-page').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    
    document.getElementById('username-display').textContent = currentUser.userId;
    document.getElementById('user-points').textContent = `Points: ${currentUser.points}`;
    
    loadContacts();
    createDemoUsers();
}

function createDemoUsers() {
    // Create some demo users for testing
    const demoUsers = [
        { name: 'Sarah Johnson', status: 'online', distance: '0.5 mi', interests: ['music', 'art'] },
        { name: 'Mike Chen', status: 'online', distance: '1.2 mi', interests: ['sports', 'gaming'] },
        { name: 'Emma Davis', status: 'away', distance: '2.1 mi', interests: ['tech', 'music'] },
        { name: 'Alex Brown', status: 'online', distance: '0.8 mi', interests: ['art', 'tech'] },
        { name: 'Lisa Martinez', status: 'online', distance: '1.5 mi', interests: ['gaming', 'sports'] }
    ];

    // Load nearby users
    const nearbyContainer = document.getElementById('nearby-users');
    nearbyContainer.innerHTML = '';
    
    demoUsers.forEach(user => {
        const contactDiv = document.createElement('div');
        contactDiv.className = 'contact-item';
        contactDiv.innerHTML = `
            <strong>${user.name}</strong><br>
            <small>${user.distance} • ${user.status}</small>
        `;
        contactDiv.onclick = () => openChat(user.name);
        nearbyContainer.appendChild(contactDiv);
    });

    // Load similar interests
    const similarContainer = document.getElementById('similar-interests');
    similarContainer.innerHTML = '';
    
    demoUsers.filter(u => u.status === 'online').forEach(user => {
        const contactDiv = document.createElement('div');
        contactDiv.className = 'contact-item';
        contactDiv.innerHTML = `
            <strong>${user.name}</strong><br>
            <small>${user.interests.join(', ')}</small>
        `;
        contactDiv.onclick = () => openChat(user.name);
        similarContainer.appendChild(contactDiv);
    });
}

function loadContacts() {
    const pinnedContainer = document.getElementById('pinned-contacts');
    pinnedContainer.innerHTML = '';
    
    if (currentUser.pinnedContacts && currentUser.pinnedContacts.length > 0) {
        currentUser.pinnedContacts.forEach(contact => {
            const contactDiv = document.createElement('div');
            contactDiv.className = 'contact-item';
            contactDiv.innerHTML = `<strong>${contact}</strong>`;
            contactDiv.onclick = () => openChat(contact);
            pinnedContainer.appendChild(contactDiv);
        });
    } else {
        pinnedContainer.innerHTML = '<p style="color: #999;">No pinned contacts</p>';
    }
}

// Chat System
function openChat(contactName) {
    activeChat = contactName;
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('chat-window').classList.remove('hidden');
    document.getElementById('chat-contact-name').textContent = contactName;
    
    loadChatMessages(contactName);
    applySavedCustomization();
}

function closeChat() {
    document.getElementById('chat-window').classList.add('hidden');
    document.getElementById('welcome-screen').style.display = 'flex';
    activeChat = null;
}

function loadChatMessages(contactName) {
    const chatKey = `${currentUser.userId}-${contactName}`;
    const savedMessages = JSON.parse(localStorage.getItem(`chat-${chatKey}`) || '[]');
    
    const messagesContainer = document.getElementById('chat-messages');
    messagesContainer.innerHTML = '';
    
    savedMessages.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${msg.sender === currentUser.userId ? 'sent' : 'received'}`;
        messageDiv.textContent = msg.text;
        messagesContainer.appendChild(messageDiv);
    });
    
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function sendMessage() {
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    
    if (!text || !activeChat) return;
    
    const message = {
        sender: currentUser.userId,
        text: text,
        timestamp: Date.now()
    };
    
    const chatKey = `${currentUser.userId}-${activeChat}`;
    const savedMessages = JSON.parse(localStorage.getItem(`chat-${chatKey}`) || '[]');
    savedMessages.push(message);
    localStorage.setItem(`chat-${chatKey}`, JSON.stringify(savedMessages));
    
    // Add points for sending message
    addPoints(2);
    
    // Display message
    const messagesContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message sent';
    messageDiv.textContent = text;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    input.value = '';
    
    // Simulate received message
    setTimeout(() => simulateReceivedMessage(), 1000 + Math.random() * 2000);
}

function simulateReceivedMessage() {
    if (!activeChat) return;
    
    const responses = [
        "That's interesting!",
        "Tell me more!",
        "I agree!",
        "Really? That's cool!",
        "Awesome!",
        "Nice to hear from you!",
        "😊",
        "👍"
    ];
    
    const message = {
        sender: activeChat,
        text: responses[Math.floor(Math.random() * responses.length)],
        timestamp: Date.now()
    };
    
    const chatKey = `${currentUser.userId}-${activeChat}`;
    const savedMessages = JSON.parse(localStorage.getItem(`chat-${chatKey}`) || '[]');
    savedMessages.push(message);
    localStorage.setItem(`chat-${chatKey}`, JSON.stringify(savedMessages));
    
    const messagesContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message received';
    messageDiv.textContent = message.text;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function deleteLastMessage() {
    if (!activeChat) return;
    
    const chatKey = `${currentUser.userId}-${activeChat}`;
    const savedMessages = JSON.parse(localStorage.getItem(`chat-${chatKey}`) || '[]');
    
    if (savedMessages.length > 0) {
        savedMessages.pop();
        localStorage.setItem(`chat-${chatKey}`, JSON.stringify(savedMessages));
        
        // Deduct points
        addPoints(-10);
        
        loadChatMessages(activeChat);
        showFeedback('Message Deleted', 'Message deleted. -10 points');
    }
}

// Points System
function addPoints(amount) {
    currentUser.points += amount;
    document.getElementById('user-points').textContent = `Points: ${currentUser.points}`;
    
    // Update in localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.userId === currentUser.userId);
    if (userIndex !== -1) {
        users[userIndex].points = currentUser.points;
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
}

function openPointsMenu() {
    document.getElementById('points-display').textContent = currentUser.points;
    document.getElementById('points-menu-modal').classList.remove('hidden');
}

function buyItem(itemType, cost) {
    if (currentUser.points < cost) {
        showFeedback('Insufficient Points', `You need ${cost} points to purchase this item.`, false);
        return;
    }
    
    addPoints(-cost);
    
    const itemNames = {
        'bomb': 'Chat Bomb',
        'emp': 'EMP',
        'cryptic': 'Cryptic Message',
        'theme': 'Premium Theme',
        'frame': 'Avatar Frame',
        'double': 'Double Points'
    };
    
    showFeedback('Purchase Successful!', `You purchased ${itemNames[itemType]}!`);
    
    // Apply special effects
    switch(itemType) {
        case 'bomb':
            activateChatBomb();
            break;
        case 'emp':
            activateEMP();
            break;
        case 'cryptic':
            activateCrypticMessage();
            break;
        case 'double':
            showFeedback('Double Points Active!', 'You will earn 2x points for the next 24 hours!');
            break;
    }
}

function activateChatBomb() {
    if (!activeChat) {
        showFeedback('Error', 'Please open a chat first', false);
        return;
    }
    
    const chatWindow = document.getElementById('chat-window');
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 2rem;
        z-index: 1000;
    `;
    overlay.textContent = '💣 CHAT DISABLED';
    chatWindow.style.position = 'relative';
    chatWindow.appendChild(overlay);
    
    setTimeout(() => {
        overlay.remove();
    }, 30000);
}

function activateEMP() {
    const dashboard = document.getElementById('dashboard');
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #00ff00;
        font-size: 3rem;
        z-index: 10000;
        font-family: monospace;
    `;
    overlay.textContent = '⚡ EMP ACTIVATED ⚡';
    dashboard.appendChild(overlay);
    
    setTimeout(() => {
        overlay.remove();
    }, 60000);
}

function activateCrypticMessage() {
    const phrase = prompt('Enter a message to encrypt:');
    if (!phrase) return;
    
    const hangmanOverlay = document.createElement('div');
    hangmanOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.95);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: white;
        z-index: 10000;
    `;
    
    const letters = phrase.toUpperCase().split('');
    const guessed = new Array(letters.length).fill('_');
    let attempts = 5;
    
    hangmanOverlay.innerHTML = `
        <h2>🔐 Cryptic Message Challenge</h2>
        <p style="font-size: 2rem; letter-spacing: 10px; margin: 30px;">${guessed.join(' ')}</p>
        <p>Attempts remaining: ${attempts}</p>
        <input type="text" id="guess-letter" maxlength="1" style="font-size: 1.5rem; padding: 10px; margin: 20px;">
        <button onclick="makeGuess()" style="padding: 10px 30px; font-size: 1rem;">Guess</button>
        <button onclick="closeHangman()" style="padding: 10px 30px; font-size: 1rem; margin-left: 10px;">Close</button>
    `;
    
    document.body.appendChild(hangmanOverlay);
    
    window.makeGuess = function() {
        const guess = document.getElementById('guess-letter').value.toUpperCase();
        document.getElementById('guess-letter').value = '';
        
        if (!guess) return;
        
        let found = false;
        letters.forEach((letter, index) => {
            if (letter === guess || (letter === ' ' && guess === ' ')) {
                guessed[index] = letter;
                found = true;
            }
        });
        
        if (!found) {
            attempts--;
        }
        
        hangmanOverlay.querySelector('p:nth-child(2)').textContent = guessed.join(' ');
        hangmanOverlay.querySelector('p:nth-child(3)').textContent = `Attempts remaining: ${attempts}`;
        
        if (guessed.join('') === letters.join('')) {
            setTimeout(() => {
                alert('You solved it! Message revealed: ' + phrase);
                hangmanOverlay.remove();
            }, 500);
        } else if (attempts <= 0) {
            setTimeout(() => {
                alert('Out of attempts! The message is lost forever.');
                hangmanOverlay.remove();
            }, 500);
        }
    };
    
    window.closeHangman = function() {
        hangmanOverlay.remove();
    };
}

// TAHC-U Matching System
function startTahcuMatch() {
    const btn = document.querySelector('.tahcu-match-btn');
    let countdown = 5;
    
    btn.disabled = true;
    
    const interval = setInterval(() => {
        btn.innerHTML = `<span style="font-size: 2rem;">${countdown}</span>`;
        countdown--;
        
        if (countdown < 0) {
            clearInterval(interval);
            matchUser();
            btn.innerHTML = '<span id="countdown-text">⚡ TAHC-U</span>';
            btn.disabled = false;
        }
    }, 1000);
}

function matchUser() {
    const matches = [
        'Alex Johnson',
        'Taylor Smith',
        'Jordan Lee',
        'Casey Williams',
        'Morgan Davis'
    ];
    
    const match = matches[Math.floor(Math.random() * matches.length)];
    
    showFeedback('Match Found!', `You've been matched with ${match}! Opening chat...`);
    
    setTimeout(() => {
        closeModal('feedback-modal');
        openChat(match);
    }, 2000);
}

function startTahcuInChat() {
    startTahcuMatch();
}

// Video/Audio calls
function startVideoCall() {
    showFeedback('Video Call', 'Video call feature would be activated here with WebRTC integration.');
}

function startAudioCall() {
    showFeedback('Audio Call', 'Audio call feature would be activated here with WebRTC integration.');
}

// Chat Customization
function openChatCustomization() {
    document.getElementById('customization-modal').classList.remove('hidden');
    loadSavedCustomization();
}

function loadSavedCustomization() {
    if (!activeChat) return;
    
    const key = `customization-${currentUser.userId}-${activeChat}`;
    const saved = JSON.parse(localStorage.getItem(key) || '{}');
    
    if (saved.bgColor) document.getElementById('chat-bg-color').value = saved.bgColor;
    if (saved.fontFamily) document.getElementById('chat-font').value = saved.fontFamily;
    if (saved.fontColor) document.getElementById('chat-font-color').value = saved.fontColor;
    if (saved.bubbleColor) document.getElementById('chat-bubble-color').value = saved.bubbleColor;
    if (saved.outlineColor) document.getElementById('chat-outline-color').value = saved.outlineColor;
    if (saved.shadowColor) document.getElementById('chat-shadow-color').value = saved.shadowColor;
    if (saved.sound) document.getElementById('chat-sound').value = saved.sound;
    if (saved.username) document.getElementById('chat-username').value = saved.username;
}

function applyChatCustomization() {
    if (!activeChat) return;
    
    const customization = {
        bgColor: document.getElementById('chat-bg-color').value,
        fontFamily: document.getElementById('chat-font').value,
        fontColor: document.getElementById('chat-font-color').value,
        bubbleColor: document.getElementById('chat-bubble-color').value,
        outlineColor: document.getElementById('chat-outline-color').value,
        shadowColor: document.getElementById('chat-shadow-color').value,
        sound: document.getElementById('chat-sound').value,
        username: document.getElementById('chat-username').value
    };
    
    const key = `customization-${currentUser.userId}-${activeChat}`;
    localStorage.setItem(key, JSON.stringify(customization));
    
    applySavedCustomization();
    closeModal('customization-modal');
    showFeedback('Customization Applied', 'Your chat customization has been saved!');
}

function applySavedCustomization() {
    if (!activeChat) return;
    
    const key = `customization-${currentUser.userId}-${activeChat}`;
    const saved = JSON.parse(localStorage.getItem(key) || '{}');
    
    const chatMessages = document.getElementById('chat-messages');
    
    if (saved.bgColor) chatMessages.style.backgroundColor = saved.bgColor;
    if (saved.fontFamily) chatMessages.style.fontFamily = saved.fontFamily;
    if (saved.fontColor) chatMessages.style.color = saved.fontColor;
    
    const sentMessages = chatMessages.querySelectorAll('.message.sent');
    sentMessages.forEach(msg => {
        if (saved.bubbleColor) msg.style.backgroundColor = saved.bubbleColor;
        if (saved.outlineColor) msg.style.borderColor = saved.outlineColor;
        if (saved.shadowColor) msg.style.boxShadow = `2px 2px 5px ${saved.shadowColor}`;
    });
}

// Search functionality
function searchUsers() {
    const searchTerm = document.getElementById('search-users').value.toLowerCase();
    const category = document.getElementById('filter-category').value;
    
    showFeedback('Search Results', `Searching for users matching "${searchTerm}" in ${category || 'all categories'}...`);
}

// Logout
function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    document.getElementById('dashboard').classList.add('hidden');
    document.getElementById('landing-page').classList.remove('hidden');
}

// Load from localStorage
function loadFromLocalStorage() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        setTimeout(() => {
            document.getElementById('splash-screen').style.display = 'none';
            showDashboard();
        }, 4000);
    }
}
