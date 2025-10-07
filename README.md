# StreamVault - Premium Pay-Per-View Platform

A modern, professional pay-per-view streaming platform with user authentication, payment simulation, and real-time analytics.

## Features

### User Features
- **Authentication System**: Secure login and signup functionality
- **Video Dashboard**: Browse available premium content
- **Purchase System**: Simulated payment processing for video access
- **Video Player**: YouTube-based video player with access control
- **Real-time Analytics**: Track active viewers and watch time

### Admin Features
- **Admin Dashboard**: Comprehensive overview of platform metrics
- **Payment Bypass**: Direct access to all videos via URL parameter
- **User Analytics**: Track purchases and viewing behavior
- **Revenue Tracking**: Monitor total revenue and purchases

## Getting Started

### 1. Open the Application
Simply open `index.html` in your web browser.

### 2. Create an Account
- Click "Sign up" on the login page
- Enter your name, email, and password
- Click "Create Account"

### 3. Browse Videos
- After logging in, you'll see the video dashboard
- Browse available premium content
- View prices and video details

### 4. Purchase Videos
- Click on any video card or "Purchase Access" button
- Confirm the simulated payment
- Video will be added to your purchased library

### 5. Watch Videos
- Click "Watch Now" on purchased videos
- Enjoy the content with real-time viewer tracking
- Your watch time is automatically tracked

## Admin Access

### Method 1: Admin Dashboard
Access the admin panel at `admin.html` to view:
- Total revenue and user statistics
- All videos with purchase counts
- Recent purchases and active viewers
- Direct bypass links to watch any video

### Method 2: URL Bypass
Add `&admin=true` to any video URL to bypass payment:
\`\`\`
player.html?v=VIDEO_ID&admin=true
\`\`\`

## Video Management

### Adding New Videos
Edit `js/dashboard.js` and add videos to the `videos` array:

\`\`\`javascript
{
    id: 'YOUTUBE_VIDEO_ID',
    title: 'Video Title',
    description: 'Video description',
    price: 29.99,
    duration: 'Live Stream',
    thumbnail: 'https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg'
}
\`\`\`

### Changing Video IDs
The YouTube video ID is the part after `v=` in YouTube URLs:
- URL: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
- Video ID: `dQw4w9WgXcQ`

## Data Storage

All data is stored in browser localStorage:
- **users**: User accounts and purchased videos
- **videos**: Available video catalog
- **purchases**: Purchase history and viewing status
- **currentUser**: Currently logged-in user session

## Real-Time Analytics

The platform tracks:
- **Total Purchases**: Number of users who purchased each video
- **Active Viewers**: Real-time count of users currently watching
- **Watch Time**: Individual user watch duration
- **Revenue**: Total platform revenue from all purchases

## Payment Integration

The current implementation uses simulated payments. To integrate real payments:

1. **Stripe Integration**:
   - Add Stripe.js to your HTML
   - Replace `purchaseVideo()` function with Stripe checkout
   - Add server-side payment verification

2. **PayPal Integration**:
   - Add PayPal SDK
   - Implement PayPal button in purchase flow
   - Handle payment callbacks

3. **Other Payment Processors**:
   - Follow provider's integration guide
   - Update purchase confirmation logic
   - Add webhook handlers for payment verification

## Design Features

- **Dark Theme**: Professional dark interface with cyan accents
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern Typography**: Inter font family for clean readability
- **Smooth Animations**: Hover effects and transitions
- **Card-Based Layout**: Clean, organized content presentation

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Security Notes

⚠️ **Important**: This is a client-side demo application. For production use:
- Implement server-side authentication
- Use secure password hashing (bcrypt, argon2)
- Add HTTPS/SSL encryption
- Implement proper session management
- Add CSRF protection
- Validate all user inputs
- Use secure payment processing

## Customization

### Colors
Edit CSS variables in each HTML file:
\`\`\`css
:root {
    --bg-dark: #0a0a0a;
    --accent: #06b6d4;
    /* ... other colors */
}
\`\`\`

### Branding
- Change "StreamVault" to your brand name
- Update logo styling in CSS
- Modify color scheme to match your brand

## Support

For issues or questions:
1. Check the browser console for errors
2. Verify localStorage is enabled
3. Ensure JavaScript is enabled
4. Try clearing browser cache and localStorage

## License

This is a demonstration project. Customize and use as needed for your own projects.
