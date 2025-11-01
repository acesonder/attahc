# TAHC-U Web Application

A mobile-responsive web application for connecting people nearby with similar interests.

## Features

- **Splash Screen**: OUTSINCE branding with animated grey clouds on black background
- **Landing Page**: Features overview and call-to-action
- **Authentication System**: Login, registration, and password recovery with 3D UI elements
- **User ID Generation**: Automatic generation in FirstLastMMDDYY format (e.g., MICBRO050684)
- **Dashboard**: View pinned contacts, nearby users, and similar interests
- **TAHC-U Matching**: 5-second countdown to match with nearby users with similar interests
- **Chat System**: Real-time messaging with video/audio call options
- **Points Reward System**:
  - +2 points per message sent
  - +25 points for contact adds (both users)
  - +10 points for sending friend requests
  - -10 points for deleting messages
- **Chat Customization**: Customize background, fonts, colors, bubbles, outlines, shadows, sounds, and usernames
- **Points Shop**:
  - 💣 Chat Bomb (100 points) - Disable friend's chat for 30 seconds
  - ⚡ EMP (250 points) - Disable all chats for 60 seconds
  - 🔐 Cryptic Message (75 points) - Hangman-style encrypted message
  - 🎨 Premium Theme (500 points)
  - 🎭 Avatar Frame (300 points)
  - ⏰ Double Points (1000 points) - 2x points for 24 hours

## Quick Setup

### Option 1: One-Command Setup (Recommended)

Simply run:

```bash
npm start
```

This will:
1. Install a local web server (if not already installed)
2. Start the server
3. Open the app in your default browser

### Option 2: Manual Setup

1. Open `index.html` directly in your web browser, or
2. Use any web server of your choice:

```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js http-server
npx http-server -p 8000
```

Then navigate to `http://localhost:8000` in your browser.

## File Structure

```
attahc/
├── index.html      # Main HTML structure
├── styles.css      # All styling and animations
├── app.js          # Application logic and functionality
├── package.json    # NPM configuration for one-command setup
└── README.md       # This file
```

## Usage

1. **First Time**: The app will show the OUTSINCE splash screen for a few seconds
2. **Landing Page**: Click "Get Started" to create an account or "Login" to sign in
3. **Registration**: Fill in your details - a unique user ID will be generated automatically
4. **Dashboard**: After login, you'll see:
   - Pinned contacts at the top
   - Nearby users
   - Users with similar interests
   - Custom search options
5. **TAHC-U Button**: Click to find a match in 5 seconds
6. **Chat**: Click on any user to start chatting
7. **Points**: Earn points by messaging and adding contacts
8. **Customize**: Use the customize button in chat to personalize your experience
9. **Points Shop**: Spend points on special features

## User Roles

The system supports multiple user roles (currently set to "Client" for all new users):
- Admin
- Manager
- Worker
- Client

## Browser Compatibility

Works on all modern browsers:
- Chrome (recommended)
- Firefox
- Safari
- Edge

Fully mobile-responsive for smartphones and tablets.

## Demo Credentials

For testing, you can create a new account or use the registration system which will generate credentials based on your name and birthdate.

Example:
- First Name: Michael
- Last Name: Brown
- DOB: 05/06/1984
- Generated Username: MICBRO050684

## Security Features

- Password recovery with security questions
- Secure password validation (minimum 6 characters)
- Local storage for data persistence
- User verification for password reset

## Technologies Used

- HTML5
- CSS3 (with 3D transforms and animations)
- Vanilla JavaScript (no frameworks required)
- LocalStorage for data persistence

## Development

All data is stored locally in the browser's localStorage. To clear data:

1. Open browser developer tools (F12)
2. Go to Application/Storage tab
3. Clear localStorage

## Future Enhancements

- WebRTC integration for real video/audio calls
- Real-time database integration
- Geolocation for actual nearby user detection
- Push notifications
- Extended points system features
- Social sharing capabilities

## License

MIT License

## Support

For issues or questions, please open an issue in the repository.