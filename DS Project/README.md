# Modern Web Application

A modern, responsive, and professional web interface built with Bootstrap 5, featuring Login, Signup, and Home pages. The application is designed to be easily integrated with a C++ backend.

## 🚀 Features

- **Modern UI/UX**: Clean, minimal design with smooth animations and transitions
- **Responsive Design**: Fully mobile-friendly and works on all screen sizes
- **Bootstrap 5**: Built using Bootstrap 5 CDN for styling and components
- **Form Validation**: Client-side validation with real-time password matching
- **API Ready**: Structured for easy integration with C++ backend via POST requests
- **Google Fonts**: Uses Poppins font for a modern look
- **Bootstrap Icons**: Beautiful icons throughout the interface

## 📁 File Structure

```
/project
├── index.html         (Home Page)
├── login.html         (Login Page)
├── signup.html        (Signup Page)
├── /js
│   └── main.js        (JavaScript for form handling and API calls)
├── /assets
│   ├── logo.png       (Optional - logo file)
│   └── background.jpg (Optional - background image)
└── README.md
```

## 🎨 Pages

### Login Page (`login.html`)
- Email/Username input field
- Password input field
- "Forgot Password?" link
- "Sign Up" navigation link
- Centered card layout with gradient background
- Form validation and error handling

### Signup Page (`signup.html`)
- Full Name input field
- Email input field
- Password input field
- Confirm Password field with real-time matching validation
- "Login" navigation link
- Form validation and error handling

### Home Page (`index.html`)
- Navigation bar with brand logo
- Welcome message with user name
- Feature cards (Profile, Dashboard, Settings)
- Logout functionality
- Responsive layout

## 🔌 C++ Backend Integration

The application is ready to connect with a C++ backend. All API endpoints are configured in `js/main.js`:

### API Endpoints

```javascript
const API_ENDPOINTS = {
    login: '/api/login',
    signup: '/api/signup',
    logout: '/api/logout',
    profile: '/api/profile'
};
```

### Request Format

All requests use standard POST requests with JSON payloads:

**Login Request:**
```json
POST /api/login
Content-Type: application/json

{
    "email": "user@example.com",
    "password": "password123"
}
```

**Signup Request:**
```json
POST /api/signup
Content-Type: application/json

{
    "name": "John Doe",
    "email": "user@example.com",
    "password": "password123"
}
```

**Logout Request:**
```json
POST /api/logout
Content-Type: application/json
```

### Response Format

The frontend expects JSON responses:

**Success Response:**
```json
{
    "success": true,
    "message": "Login successful",
    "name": "John Doe",
    "email": "user@example.com"
}
```

**Error Response:**
```json
{
    "success": false,
    "message": "Invalid credentials"
}
```

### C++ Backend Implementation Notes

1. **CGI/FastCGI**: You can use CGI or FastCGI to handle HTTP requests in C++
2. **HTTP Server**: Consider using libraries like:
   - **Crow** (C++ micro web framework)
   - **cpp-httplib** (Header-only HTTP library)
   - **Beast** (Boost.Beast for HTTP/WebSocket)
   - **Pistache** (Modern C++ REST framework)

3. **Example C++ Endpoint Structure:**
   ```cpp
   // Pseudo-code example
   void handleLogin(Request req, Response res) {
       // Parse JSON from req.body
       // Validate credentials
       // Return JSON response
   }
   ```

4. **CORS**: If your C++ backend runs on a different port, you may need to configure CORS headers:
   ```cpp
   res.set_header("Access-Control-Allow-Origin", "*");
   res.set_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
   res.set_header("Access-Control-Allow-Headers", "Content-Type");
   ```

## 🛠️ Setup Instructions

1. **Clone or Download** the project files
2. **Open** `login.html` in a web browser to start
3. **For Development**: Use a local web server (recommended):
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js (with http-server)
   npx http-server
   
   # PHP
   php -S localhost:8000
   ```
4. **Access** the application at `http://localhost:8000`

## 🎯 Demo Mode

Currently, the application runs in **demo mode** when the backend is not connected. This allows you to:
- Test the UI and user experience
- Navigate between pages
- See form validation in action

When you connect your C++ backend, the demo mode will automatically be bypassed, and real API calls will be made.

## 📝 Customization

### Changing Colors
The gradient colors can be modified in the `<style>` sections of each HTML file:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Adding Assets
Place your logo and background images in the `/assets` folder and reference them in the HTML files.

### Modifying API Endpoints
Edit the `API_ENDPOINTS` object in `js/main.js` to match your backend routes.

## 🔒 Security Notes

- **Password Storage**: Never store passwords in plain text. Use hashing (bcrypt, Argon2) in your C++ backend
- **HTTPS**: Use HTTPS in production to encrypt data transmission
- **Session Management**: Implement proper session/token management in your backend
- **Input Validation**: Always validate and sanitize inputs on the backend
- **CSRF Protection**: Consider implementing CSRF tokens for production use

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📚 Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Custom styles and animations
- **Bootstrap 5.3.2**: UI framework (CDN)
- **Bootstrap Icons 1.11.1**: Icon library (CDN)
- **Google Fonts**: Poppins font family
- **JavaScript (ES6+)**: Form handling and API integration
- **Fetch API**: For HTTP requests

## 📄 License

This project is open source and available for use in your projects.

## 🤝 Contributing

Feel free to modify and adapt this code for your specific needs. The structure is designed to be easily extensible.

## 📧 Support

For questions or issues related to C++ backend integration, refer to your C++ framework's documentation or community resources.

---

**Note**: This is a frontend template ready for backend integration. Make sure to implement proper authentication, authorization, and security measures in your C++ backend before deploying to production.

