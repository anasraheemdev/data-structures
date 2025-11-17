/**
 * Main JavaScript File
 * Handles form submissions, validation, and API integration
 * Ready for C++ backend connection via POST requests
 */

// ============================================
// API Endpoints Configuration
// ============================================
// These endpoints can be connected to your C++ backend
const API_ENDPOINTS = {
    login: '/api/login',
    signup: '/api/signup',
    logout: '/api/logout',
    profile: '/api/profile'
};

// ============================================
// Utility Functions
// ============================================

/**
 * Display alert message to user
 * @param {string} message - Message to display
 * @param {string} type - Alert type: 'success', 'danger', 'warning', 'info'
 */
function showAlert(message, type = 'info') {
    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3`;
    alertDiv.style.zIndex = '9999';
    alertDiv.style.minWidth = '300px';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

/**
 * Get user data from localStorage (for demo purposes)
 * In production, this would come from the backend
 */
function getUserData() {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
}

/**
 * Save user data to localStorage (for demo purposes)
 * In production, this would be handled by the backend
 */
function saveUserData(userData) {
    localStorage.setItem('userData', JSON.stringify(userData));
}

/**
 * Clear user data from localStorage
 */
function clearUserData() {
    localStorage.removeItem('userData');
}

// ============================================
// Login Page Functionality
// ============================================

/**
 * Handle login form submission
 */
function initLoginForm() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;
    
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Get form elements
        const emailInput = document.getElementById('loginEmail');
        const passwordInput = document.getElementById('loginPassword');
        
        // Validate form
        if (!loginForm.checkValidity()) {
            loginForm.classList.add('was-validated');
            return;
        }
        
        // Prepare data for API call
        const loginData = {
            email: emailInput.value.trim(),
            password: passwordInput.value
        };
        
        try {
            // Show loading state
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Logging in...';
            
            // Make API call to C++ backend
            const response = await fetch(API_ENDPOINTS.login, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData)
            });
            
            // Handle response
            if (response.ok) {
                const data = await response.json();
                
                // Save user data (for demo - in production, handle session/token)
                saveUserData({
                    name: data.name || loginData.email.split('@')[0],
                    email: loginData.email
                });
                
                // Redirect to home page
                window.location.href = 'index.html';
            } else {
                // Handle error response
                const errorData = await response.json().catch(() => ({ message: 'Login failed' }));
                showAlert(errorData.message || 'Invalid email or password. Please try again.', 'danger');
                
                // Reset button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
        } catch (error) {
            // Handle network errors or C++ backend connection issues
            console.error('Login error:', error);
            
            // For demo purposes, allow login with any credentials
            // Remove this in production when C++ backend is connected
            if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
                // Demo mode: Allow login and redirect
                saveUserData({
                    name: loginData.email.split('@')[0] || 'User',
                    email: loginData.email
                });
                showAlert('Demo mode: Login successful (Backend not connected)', 'info');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            } else {
                showAlert('An error occurred. Please try again later.', 'danger');
                const submitBtn = loginForm.querySelector('button[type="submit"]');
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="bi bi-box-arrow-in-right me-2"></i>Login';
            }
        }
    });
}

// ============================================
// Signup Page Functionality
// ============================================

/**
 * Validate password match
 */
function validatePasswordMatch() {
    const password = document.getElementById('signupPassword');
    const confirmPassword = document.getElementById('signupConfirmPassword');
    const matchFeedback = document.getElementById('passwordMatchFeedback');
    const matchSuccess = document.getElementById('passwordMatchSuccess');
    
    if (!password || !confirmPassword) return;
    
    // Real-time password matching validation
    confirmPassword.addEventListener('input', () => {
        if (confirmPassword.value.length > 0) {
            if (password.value === confirmPassword.value) {
                confirmPassword.setCustomValidity('');
                matchFeedback.classList.remove('show');
                matchSuccess.classList.add('show');
            } else {
                confirmPassword.setCustomValidity('Passwords do not match');
                matchFeedback.classList.add('show');
                matchSuccess.classList.remove('show');
            }
        } else {
            matchFeedback.classList.remove('show');
            matchSuccess.classList.remove('show');
        }
    });
    
    // Also check when password field changes
    password.addEventListener('input', () => {
        if (confirmPassword.value.length > 0) {
            validatePasswordMatch();
        }
    });
}

/**
 * Handle signup form submission
 */
function initSignupForm() {
    const signupForm = document.getElementById('signupForm');
    if (!signupForm) return;
    
    // Initialize password matching validation
    validatePasswordMatch();
    
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Get form elements
        const nameInput = document.getElementById('signupName');
        const emailInput = document.getElementById('signupEmail');
        const passwordInput = document.getElementById('signupPassword');
        const confirmPasswordInput = document.getElementById('signupConfirmPassword');
        
        // Validate password match
        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordInput.setCustomValidity('Passwords do not match');
            signupForm.classList.add('was-validated');
            return;
        } else {
            confirmPasswordInput.setCustomValidity('');
        }
        
        // Validate form
        if (!signupForm.checkValidity()) {
            signupForm.classList.add('was-validated');
            return;
        }
        
        // Prepare data for API call
        const signupData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            password: passwordInput.value
        };
        
        try {
            // Show loading state
            const submitBtn = signupForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Creating account...';
            
            // Make API call to C++ backend
            const response = await fetch(API_ENDPOINTS.signup, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signupData)
            });
            
            // Handle response
            if (response.ok) {
                const data = await response.json();
                
                // Save user data (for demo - in production, handle session/token)
                saveUserData({
                    name: signupData.name,
                    email: signupData.email
                });
                
                showAlert('Account created successfully! Redirecting...', 'success');
                
                // Redirect to home page after short delay
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            } else {
                // Handle error response
                const errorData = await response.json().catch(() => ({ message: 'Signup failed' }));
                showAlert(errorData.message || 'Failed to create account. Please try again.', 'danger');
                
                // Reset button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
        } catch (error) {
            // Handle network errors or C++ backend connection issues
            console.error('Signup error:', error);
            
            // For demo purposes, allow signup with any credentials
            // Remove this in production when C++ backend is connected
            if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
                // Demo mode: Allow signup and redirect
                saveUserData({
                    name: signupData.name,
                    email: signupData.email
                });
                showAlert('Demo mode: Account created (Backend not connected)', 'info');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            } else {
                showAlert('An error occurred. Please try again later.', 'danger');
                const submitBtn = signupForm.querySelector('button[type="submit"]');
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="bi bi-person-plus me-2"></i>Sign Up';
            }
        }
    });
}

// ============================================
// Home Page Functionality
// ============================================

/**
 * Initialize home page
 */
function initHomePage() {
    // Display user name
    const userNameElement = document.getElementById('userName');
    if (userNameElement) {
        const userData = getUserData();
        if (userData && userData.name) {
            userNameElement.textContent = userData.name;
        } else {
            // If no user data, redirect to login
            window.location.href = 'login.html';
        }
    }
    
    // Logout button handler
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            try {
                // Call logout API
                await fetch(API_ENDPOINTS.logout, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
            } catch (error) {
                console.error('Logout API error:', error);
            } finally {
                // Clear user data and redirect
                clearUserData();
                window.location.href = 'login.html';
            }
        });
    }
    
    // Profile link handlers
    const profileLinks = document.querySelectorAll('#profileLink, #profileCardBtn');
    profileLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showAlert('Profile page coming soon!', 'info');
        });
    });
    
    // Settings link handlers
    const settingsLinks = document.querySelectorAll('#settingsLink, #settingsCardBtn');
    settingsLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showAlert('Settings page coming soon!', 'info');
        });
    });
    
    // Dashboard link handler
    const dashboardBtn = document.getElementById('dashboardCardBtn');
    if (dashboardBtn) {
        dashboardBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showAlert('Dashboard page coming soon!', 'info');
        });
    }
}

// ============================================
// Page Initialization
// ============================================

/**
 * Initialize page-specific functionality when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    // Determine which page we're on and initialize accordingly
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    if (currentPage.includes('login.html')) {
        initLoginForm();
    } else if (currentPage.includes('signup.html')) {
        initSignupForm();
    } else if (currentPage.includes('index.html') || currentPage === '' || currentPage.endsWith('/')) {
        initHomePage();
    }
});

// ============================================
// Export functions for potential module use
// ============================================
// If you need to use these functions elsewhere, you can export them
// For now, they're available globally

