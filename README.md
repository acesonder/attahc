# TAHC-U Web Application

A comprehensive mobile-responsive web application for connecting people nearby with similar interests, featuring advanced chat capabilities, role-based administration, and unique privacy features.

## 🚀 Quick Start

```bash
npm start
```

This will start a local web server and open the application in your browser at `http://localhost:8000`.

## ✨ New Features (v2.0)

### 🕵️ SPY WRITE Mode (FREE!)
- Privacy-first chat feature
- Blurs conversations and input while typing
- Hold Enter to preview messages
- Toggle with Ctrl+Shift+S or shake device
- No points required!

### 👑 Admin Panel & Role System
6-tier role hierarchy with increasing permissions:
1. **Standard User** - Basic chat access
2. **Moderator** - Moderation tools, warnings
3. **Room Assistant** - Room moderation
4. **Room Administrator** - Manage rooms, kick users
5. **Administrator** - Full user & room management
6. **God Mode** - Complete system access

### 🎨 Font Transformer
- Transform any user's chat font style
- 15+ Unicode font styles available
- 10 points for 10-minute effect
- Styles include: Fraktur, Script, Bold, Circled, and more!

### 📱 Phone Tap Feature
- View any user's conversation history
- Free to view, 150 points to reply
- Access all conversations
- Strategic communication tool

### 🏠 Public Rooms
- Create and join public chat rooms
- Optional game integration
- Room administrator controls
- Support for themed rooms

### 🎮 Room Games
- Trivia games
- Interactive challenges
- Point rewards for winners
- More games coming soon!

## 📋 Demo Accounts

Test all features with pre-configured accounts:

| Username | Role | Password | Points |
|----------|------|----------|--------|
| GODMOD010101 | God Mode | demo123 | 99,999 |
| ADMADM010101 | Administrator | demo123 | 50,000 |
| ROOMOD010101 | Room Admin | demo123 | 10,000 |
| ROAASS010101 | Room Assistant | demo123 | 5,000 |
| MODMOD010101 | Moderator | demo123 | 2,000 |
| STASTA010101 | Standard User | demo123 | 100 |

## 🎯 Core Features

- **Splash Screen**: OUTSINCE branding with animated clouds
- **Landing Page**: Features overview and call-to-action
- **Authentication**: Login, registration, password recovery with 3D UI
- **User ID Generation**: Automatic FirstLastMMDDYY format
- **Dashboard**: Pinned contacts, nearby users, similar interests
- **TAHC-U Matching**: 5-second countdown to match users
- **Real-time Chat**: Messaging with video/audio call options
- **Enhanced Settings**: Comprehensive customization for main chat and individual conversations
- **Points System**: Earn and spend points on special features

### 💰 Points System

**Earn Points:**
- +2 per message sent
- +25 for contact adds (both users)
- +10 for sending friend requests
- -10 for deleting messages

**Spend Points:**
- 💣 Chat Bomb (100 pts) - Disable friend's chat for 30 seconds
- ⚡ EMP (250 pts) - Disable all chats for 60 seconds
- 🔐 Cryptic Message (75 pts) - Hangman-style encrypted message
- 🎨 Premium Theme (500 pts) - Exclusive chat themes
- 🎭 Avatar Frame (300 pts) - Special profile frame
- ⏰ Double Points (1000 pts) - 2x points for 24 hours
- 🎨 Font Transform (10 pts) - Change user's font for 10 minutes
- 📱 Phone Tap Reply (150 pts) - Reply to tapped conversations

### 🎨 Chat Customization

**Main Chat Settings:**
- Background color & image
- Font family and color
- Message bubble styling
- Outline and shadow effects
- Message sounds
- Chat opacity
- Message animations

**Individual Conversation Settings:**
- Unique themes (Dark, Light, Ocean, Sunset, Forest)
- Text size control
- Bubble styles (Rounded, Square, Pill)
- Per-conversation customization

## 📖 Documentation

For complete feature documentation, see [FEATURE_GUIDE.md](./FEATURE_GUIDE.md)

Includes:
- Detailed feature explanations
- Step-by-step tutorials
- Admin panel guide
- Points system reference
- Keyboard shortcuts
- Troubleshooting tips
- Best practices

## 🗂️ File Structure

```
attahc/
├── index.html          # Main HTML structure with modals
├── styles.css          # Complete styling and animations
├── app.js              # Core application logic
├── fontStyles.js       # Font transformation mappings
├── adminPanel.js       # Admin panel and role management
├── enhancedFeatures.js # SPY WRITE, Phone Tap, Font Transformer
├── package.json        # NPM configuration
├── README.md           # This file
└── FEATURE_GUIDE.md    # Complete feature documentation
```

## 🎯 Usage

1. **First Time**: Watch the OUTSINCE splash screen
2. **Landing Page**: Click "Get Started" or "Login"
3. **Registration**: Fill details - username auto-generated
4. **Dashboard**: View contacts, nearby users, similar interests
5. **TAHC-U Button**: Find a match in 5 seconds
6. **Chat**: Click any user to start messaging
7. **Settings**: Click ⚙️ for enhanced settings
8. **Admin Panel**: Click 👑 (if moderator+)
9. **Rooms**: Click 🏠 to view public rooms

## 🛠️ Technologies Used

- HTML5 with semantic markup
- CSS3 with 3D transforms and animations
- Vanilla JavaScript (ES6+)
- LocalStorage for data persistence
- No external dependencies

## 🔒 Security Features

- HTML escape for user input prevention of XSS
- Password validation (minimum 6 characters)
- Security questions for password recovery
- Role-based access control (RBAC)
- User verification for password reset

## 🌐 Browser Compatibility

Works on all modern browsers:
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (fully responsive)

## 🎮 Advanced Features

### SPY WRITE
Press `Ctrl+Shift+S` to toggle blur mode. Protects your privacy while chatting in public spaces.

### Phone Tap
Access conversation histories of other users. View for free, pay 150 points to reply.

### Font Transformer
Apply Unicode font transformations to any user's chat for 10 minutes. Over 15 styles available.

### Admin Panel
Role-based administration with 6 permission levels. Manage users, rooms, and moderation.

## 🔧 Development

### Clear All Data
To reset the application:
1. Open browser developer tools (F12)
2. Go to Application/Storage tab
3. Clear localStorage

### Adding New Features
- Font styles: Add to `fontStyles.js`
- Admin functions: Extend `adminPanel.js`
- Enhanced features: Add to `enhancedFeatures.js`
- UI components: Update `index.html` and `styles.css`

## 📸 Screenshots

(Screenshots will be added here showing various features in action)

### Main Features
- Login/Registration screens
- Dashboard with role display
- Chat interface with customization
- SPY WRITE mode demonstration
- Admin panel views
- Public rooms interface
- Font transformer selector
- Phone Tap feature

## 🆘 Support

### Common Issues

**Q: Can't access Admin Panel?**
A: Requires Moderator (Level 2+) role. Standard users don't have access.

**Q: SPY WRITE not working?**
A: Press Ctrl+Shift+S or enable in Enhanced Settings while in an active chat.

**Q: Font effects not visible?**
A: Target user must log in for effects to apply. Effects last 10 minutes.

**Q: Need more points?**
A: Send messages (+2 each), add contacts (+25), or use demo accounts with high point balances.

## 🚦 Feature Status

### ✅ Fully Implemented
- Authentication & registration
- Password recovery system
- Points earning and spending
- Complete chat customization
- Admin panel with 6 role levels
- Enhanced settings system
- SPY WRITE privacy mode
- Phone Tap feature
- Font transformer (15+ styles)
- Public rooms with games
- 6 demo accounts

### ⚠️ Placeholder/Simulated
- Video/Audio calls (WebRTC needed)
- Device shake detection (keyboard shortcut used)
- NFC phone tapping (username-based simulation)
- Real-time location (simulated)

## 🔮 Future Enhancements

- WebRTC integration for real video/audio calls
- Additional Unicode font styles
- More room game types
- Advanced moderation tools
- Mobile app (React Native)
- Push notifications
- Cloud database integration
- Real-time synchronization

## 📄 License

MIT License

## 👥 Credits

**TAHC-U** - Connect with people nearby
- Developed by: OUTSINCE  
- Version: 2.0
- Repository: acesonder/attahc

## 🔗 Quick Links

- [Complete Feature Guide](./FEATURE_GUIDE.md) - Detailed documentation
- [Demo Accounts](#-demo-accounts) - Test with pre-configured users
- [Points System](#-points-system) - Earning and spending guide
- [Admin Panel](#-admin-panel--role-system) - Role-based administration

---

**Get Started Now**: `npm start`

Experience the next generation of proximity-based social networking with advanced privacy features, comprehensive customization, and role-based community management!