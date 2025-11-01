# TAHC-U - Complete Feature Guide

## Table of Contents
1. [Quick Start](#quick-start)
2. [Demo Accounts](#demo-accounts)
3. [User Roles & Permissions](#user-roles--permissions)
4. [Chat Features](#chat-features)
5. [Advanced Features](#advanced-features)
6. [Admin Panel](#admin-panel)
7. [Points System](#points-system)
8. [Public Rooms](#public-rooms)
9. [Support Options](#support-options)

---

## Quick Start

### Installation & Running
```bash
npm start
```
This will start a local web server on port 8000 and open the application in your browser.

### First Time Setup
1. Watch the OUTSINCE splash screen (4 seconds)
2. Click "Get Started" to create an account or "Login" to sign in
3. Your username will be auto-generated in format: FirstLastMMDDYY

---

## Demo Accounts

For testing purposes, 6 demo accounts with different privilege levels are pre-configured:

| Username | Role | Password | Points | Description |
|----------|------|----------|--------|-------------|
| GODMOD010101 | God Mode | demo123 | 99,999 | Full system access, all permissions |
| ADMADM010101 | Administrator | demo123 | 50,000 | User management, room management, moderation |
| ROOMOD010101 | Room Admin | demo123 | 10,000 | Room management, moderation, kick users |
| ROAASS010101 | Room Assistant | demo123 | 5,000 | Moderation, warnings |
| MODMOD010101 | Moderator | demo123 | 2,000 | Moderation, warnings |
| STASTA010101 | Standard User | demo123 | 100 | Basic chat and room access |

**To Login:**
1. Click "Login" button
2. Enter username (e.g., GODMOD010101)
3. Enter password: demo123
4. Click "Login"

---

## User Roles & Permissions

### Role Hierarchy (Level 1-6)

#### Level 6: God Mode 👑
- **All permissions**
- Full system control
- Can perform any action
- Color: Gold

#### Level 5: Administrator 🛡️
- Manage all users
- Manage all rooms
- Full moderation powers
- Ban users
- Delete messages
- Color: Red

#### Level 4: Room Administrator 🏠
- Manage assigned rooms
- Moderate users
- Kick users from rooms
- Delete rooms
- Color: Teal

#### Level 3: Room Assistant 🤝
- Assist in room moderation
- Warn users
- Moderate content
- Color: Light Green

#### Level 2: Moderator ⚖️
- Moderate content
- Warn users
- View reports
- Color: Mint Green

#### Level 1: Standard User 👤
- Chat with others
- Join public rooms
- Earn and spend points
- Customize chat experience
- Color: Gray

---

## Chat Features

### Basic Messaging
1. **Start a Chat**
   - Click on any user from:
     - Pinned Contacts
     - Close By users
     - Similar Interests
   - Or use TAHC-U matching button (5-second countdown)

2. **Send Messages**
   - Type in the input box
   - Press Enter or click "Send"
   - Earn 2 points per message sent

3. **Delete Messages**
   - Click 🗑️ button to delete last message
   - Costs 10 points

### Chat Customization (🎨 Button)
Customize your chat appearance:
- **Background Color**: Choose any color
- **Font Family**: Arial, Helvetica, Georgia, Courier, Comic Sans
- **Font Color**: Custom text color
- **Bubble Color**: Message bubble background
- **Outline Color**: Message border color
- **Shadow Color**: Message shadow effect
- **Message Sound**: Beep, Chime, Ding, or None
- **Display Username**: Custom name display

### Video & Audio Calls
- 📹 **Video Call**: Initiates video call (WebRTC integration placeholder)
- 🎤 **Audio Call**: Initiates audio call (WebRTC integration placeholder)

---

## Advanced Features

### 1. Enhanced Settings (⚙️ Settings Button)

Access comprehensive settings for your chat experience:

#### Main Chat Window Settings
- **Background Image**: Set custom background URL
- **Chat Opacity**: Adjust transparency (0-100%)
- **Message Animation**: 
  - None
  - Slide In
  - Fade In
  - Bounce

#### Individual Conversation Settings
Apply unique settings to each conversation:
- **Conversation Theme**:
  - Default
  - Dark Mode
  - Light Mode
  - Ocean (blue tones)
  - Sunset (warm colors)
  - Forest (green tones)
- **Text Size**: Small, Medium, Large, Extra Large
- **Bubble Style**: Rounded, Square, Pill

### 2. SPY WRITE Mode 🕵️ (FREE)

**Purpose**: Privacy protection when composing sensitive messages

**How to Enable**:
- Option 1: Toggle in Enhanced Settings
- Option 2: Press `Ctrl + Shift + S` (shake simulation)

**Features**:
- ✅ Blurs entire conversation (10px blur)
- ✅ Blurs text input while typing (8px blur)
- ✅ Hold Enter to preview your message
- ✅ Release Enter to re-blur
- ✅ Send message by pressing Enter (auto-blurs after sending)
- ✅ Toggle on/off with keyboard shortcut
- ✅ **FREE** - No points required!

**Usage Example**:
1. Enable SPY WRITE
2. Start typing a message (blurred)
3. Hold Enter to see what you wrote
4. Keep holding to see full conversation
5. Release Enter - everything blurs again
6. Press Enter briefly to send (stays blurred)

### 3. Phone Tap Feature 📱

**Purpose**: Access another user's conversation history

**Cost**: FREE to view, 150 points to reply

**How to Use**:
1. Open Enhanced Settings
2. Click "📱 Phone Tap"
3. Enter target username
4. View all their conversations
5. Pay 150 points to unlock reply capability
6. Send messages to their conversations

**What You Can See**:
- All conversation participants
- Last 5 messages from each conversation
- Full message history
- Option to reply (after paying points)

### 4. Font Transformer 🎨

**Purpose**: Change another user's chat font style for 10 minutes

**Cost**: 10 points per transformation

**How to Use**:
1. Open Enhanced Settings
2. Click "🎨 Font Transformer"
3. Enter target username
4. Select from 15+ Unicode font styles:
   - Fraktur (𝔉𝔯𝔞𝔨𝔱𝔲𝔯)
   - Bold Fraktur (𝕭𝖔𝖑𝖉)
   - Script (𝓢𝓬𝓻𝓲𝓹𝓽)
   - Double Struck (𝔻𝕠𝕦𝕓𝕝𝕖)
   - Fullwidth (Ｆｕｌｌｗｉｄｔｈ)
   - Small Caps (ꜱᴍᴀʟʟ ᴄᴀᴘꜱ)
   - Circled (Ⓒⓘⓡⓒⓛⓔⓓ)
   - Squared (🅂🅀🅄🄰🅁🄴)
   - Bold (𝐁𝐨𝐥𝐝)
   - Italic (𝘐𝘵𝘢𝘭𝘪𝘤)
   - Monospace (𝙼𝚘𝚗𝚘)
   - Strikethrough (S̶t̶r̶i̶k̶e̶)
   - Underlined (U̲n̲d̲e̲r̲l̲i̲n̲e̲d̲)
   - And more!

5. Confirm selection
6. Target user will see effect for 10 minutes when they log in

**Effect Details**:
- Applies to ALL of target's chats
- Lasts 10 minutes from when they come online
- Automatically expires
- Notification shown to target user

---

## Admin Panel

### Accessing Admin Panel
- Available to Moderator level (2) and above
- Click "👑 Admin" button on dashboard
- Panel content adapts to your role level

### Admin Features by Role

#### All Moderators+ (Level 2+)
- **View Statistics**:
  - Total Users count
  - Active Rooms count
  - Online Users count
- **Moderation Tools**:
  - View Reports
  - Warn Users
- **Search & Filter**

#### Room Admin+ (Level 4+)
All Level 2 features PLUS:
- **Room Management**:
  - View all rooms
  - Create public rooms
  - Delete rooms
  - Manage room members
- **Moderation Tools**:
  - Kick users from rooms

#### Administrator+ (Level 5+)
All Level 4 features PLUS:
- **User Management**:
  - View all users
  - Manage user roles
  - Ban users
  - Delete user messages
- **Full System Access**

#### God Mode (Level 6)
- **All Permissions**
- Complete system control
- Override any restrictions

### Creating Public Rooms

1. Access Admin Panel
2. Click "Create Public Room"
3. Enter room details:
   - Room name
   - Description
   - Include game? (Yes/No)
4. Room is created and visible to all users

**Game Types Available**:
- Trivia
- Hangman
- Word Games
- More coming soon!

---

## Points System

### Earning Points

| Action | Points Earned |
|--------|--------------|
| Send message | +2 |
| Add contact (both users) | +25 each |
| Send friend request | +10 |
| Complete daily login | +50 |
| Win room game | +100 |

### Spending Points

| Item | Cost | Effect |
|------|------|--------|
| **Chat Bomb** 💣 | 100 | Disable friend's chat for 30 seconds |
| **EMP** ⚡ | 250 | Disable ALL chats for 60 seconds |
| **Cryptic Message** 🔐 | 75 | Send hangman-encrypted message |
| **Premium Theme** 🎨 | 500 | Unlock exclusive chat themes |
| **Avatar Frame** 🎭 | 300 | Special profile frame |
| **Double Points** ⏰ | 1000 | Earn 2x points for 24 hours |
| **Font Transform** | 10 | Change user's font for 10 min |
| **Delete Message** | -10 | Remove your last message |
| **Phone Tap Reply** | 150 | Reply to tapped conversations |

### Points Shop Usage

1. Click "⭐ Points" button in chat
2. View available items and costs
3. Click "Buy" on desired item
4. Confirm purchase
5. Item effect activates immediately

---

## Public Rooms

### Joining Rooms

1. Click "🏠 Rooms" button on dashboard
2. Browse available public rooms
3. See room details:
   - Name and description
   - Member count
   - Game type (if applicable)
4. Click "Join Room" to enter
5. Start chatting with room members

### Room Features

- **Group Chat**: Message all room members
- **Games**: Play interactive games (if enabled)
- **Moderation**: Room admins maintain order
- **Custom Themes**: Rooms can have unique themes

### Room Games

When a room has games enabled:
- **Trivia**: Answer questions to earn points
- **Collaborative Games**: Work together with members
- **Competitions**: Compete for high scores
- **Rewards**: Win points and badges

---

## Support Options

### Getting Help

1. **In-App Feedback**
   - Use feedback modals for immediate notifications
   - Check your points balance
   - View role permissions

2. **User Roles & Permissions**
   - Role displayed on dashboard with color coding
   - Hover over role name to see permissions

3. **Feature Tutorials**
   - Each feature has built-in help text
   - Feedback modals explain features when activated

4. **Demo Accounts**
   - Use demo accounts to test all features
   - Try different permission levels
   - Experiment with points-based features

### Common Issues & Solutions

**Q: Can't see Admin button?**
A: Admin panel requires Moderator level (2+). Standard users don't have access.

**Q: SPY WRITE not working?**
A: Make sure to press Ctrl+Shift+S or enable in Enhanced Settings. Works best in active chat window.

**Q: Font effects not showing?**
A: Font effects only apply when the target user comes online. Wait for them to log in.

**Q: Not enough points?**
A: Send more messages (+2 each), add contacts (+25), or login daily (+50).

**Q: Phone Tap not finding conversations?**
A: Target user must have existing conversations. Try tapping a more active user.

### Feature Status

✅ **Fully Implemented**:
- User authentication & registration
- Password recovery
- Points system
- Chat customization
- Admin panel with roles
- Enhanced settings
- SPY WRITE mode
- Phone Tap feature
- Font transformer
- Public rooms
- Demo accounts

⚠️ **Placeholder/Simulated**:
- Video/Audio calls (WebRTC integration needed)
- Actual device shake detection (keyboard shortcut used)
- Real NFC phone tapping (simulated with username input)
- Live location tracking (simulated)

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Enter | Send message |
| Ctrl+Shift+S | Toggle SPY WRITE mode |
| Esc | Close modal (when focused) |

---

## Technical Details

### Data Storage
- All data stored in browser's localStorage
- Persists between sessions
- Clear localStorage to reset data

### Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (responsive design)

### Security Features
- HTML escape for user input
- Password validation (min 6 characters)
- Security questions for password recovery
- Role-based access control

---

## Tips & Tricks

1. **Maximize Points**
   - Send messages regularly (+2 each)
   - Add contacts strategically (+25 for both)
   - Login daily for bonus points

2. **Best Use of SPY WRITE**
   - Perfect for public/shared device usage
   - Useful in crowded spaces
   - Great for maintaining privacy

3. **Font Transformer Strategy**
   - Use on friends for fun surprises
   - Only 10 points - very affordable
   - Effects last 10 minutes

4. **Phone Tap Tips**
   - Save points by only unlocking reply when needed
   - View conversations for free first
   - Strategic for group coordination

5. **Admin Best Practices**
   - Create themed public rooms
   - Enable games for engagement
   - Moderate fairly and consistently

---

## Future Enhancements

Coming soon:
- Real-time WebRTC video/audio calls
- More font styles
- Additional room games
- Enhanced moderation tools
- Mobile app version
- Push notifications
- Cloud data synchronization

---

## Credits

**TAHC-U** - Connect with people nearby
- Developed by: OUTSINCE
- Version: 2.0
- License: MIT

---

## Quick Reference Card

### Essential Commands
- **Start Server**: `npm start`
- **Demo Login**: Username: GODMOD010101, Password: demo123
- **SPY WRITE Toggle**: Ctrl+Shift+S
- **Points Balance**: Top right corner
- **Role**: Displayed next to username

### Point Costs Quick Reference
- Message: +2
- Delete: -10
- Font Change: -10
- Phone Tap Reply: -150
- Chat Bomb: -100
- EMP: -250

### Access Levels
- Standard: Chat only
- Moderator+: Admin panel
- Room Admin+: Room management
- Administrator+: User management
- God Mode: Everything

---

For more information, visit the dashboard and explore each feature!
