/* ============================================
   TRUST CARE@HOME - Vanilla JavaScript
   Pure ES6+ - No dependencies
   ============================================ */

// ============================================
// 1. INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initSmoothScrolling();
    initContactForm();
    initHeroButtons();
    initHeroCarousel();
    initCursorFollower();
});
    // OTP Verification Logic for Contact Form

// ============================================
// 2. MOBILE HAMBURGER MENU
// ============================================

/**
 * Initialize mobile menu toggle functionality
 * Handles hamburger button click to show/hide navigation menu
 */
function initMobileMenu() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (!hamburgerBtn || !navMenu) return;
    
    // Toggle menu on hamburger click
    hamburgerBtn.addEventListener('click', () => {
        const isActive = navMenu.classList.contains('active');
        
        if (isActive) {
            navMenu.classList.remove('active');
            hamburgerBtn.classList.remove('active');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
        } else {
            navMenu.classList.add('active');
            hamburgerBtn.classList.add('active');
            hamburgerBtn.setAttribute('aria-expanded', 'true');
        }
    });
    
    // Close menu when nav link is clicked
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburgerBtn.classList.remove('active');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
        });
    });
    
    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (!hamburgerBtn.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburgerBtn.classList.remove('active');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
        }
    });
}

// ============================================
// 3. SMOOTH SCROLLING FOR NAVIGATION LINKS
// ============================================

/**
 * Smooth scroll to section when nav links are clicked
 * Uses native CSS scroll-behavior with JavaScript enhancement
 */
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Skip if href is just '#'
            if (href === '#') return;
            
            // Prevent default and manually scroll with offset for sticky header
            e.preventDefault();
            
            const targetElement = document.querySelector(href);
            if (!targetElement) return;
            
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

// ============================================
// 5. CONTACT FORM HANDLING
// ============================================

/**
 * Initialize contact form with validation and submission handling
 * Form validation is UI-only as per README (backend integration pending)
 * 
 * FUTURE INTEGRATION NOTES:
 * - Firebase Phone OTP: Implement phone verification via Firebase Authentication
 * - Google Apps Script: Send form data to Google Apps Script endpoint
 * - Google Sheets: Store submissions in admin-only Google Sheet
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    // Validate on input blur
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });
    });
    
    // Submit form
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validate all fields
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            handleFormSubmit(contactForm);
        }
    });
}

/**
 * Validate a single form field
 * @param {HTMLElement} field - The form field to validate
 * @returns {boolean} - True if field is valid
 */
function validateField(field) {
    const errorElement = document.getElementById(field.id + 'Error');
    let isValid = true;
    let errorMessage = '';
    
    // Check if field is required and empty
    if (field.hasAttribute('required') && field.value.trim() === '') {
        isValid = false;
        errorMessage = 'This field is required';
    }
    
    // Email validation
    if (field.type === 'email' && field.value.trim() !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    // Phone number validation (10 digits for Indian phone)
    if (field.type === 'tel' && field.value.trim() !== '') {
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(field.value.replace(/\D/g, ''))) {
            isValid = false;
            errorMessage = 'Please enter a valid 10-digit phone number';
        }
    }
    
    // Update error display
    if (errorElement) {
        if (isValid) {
            errorElement.classList.remove('show');
            errorElement.textContent = '';
            field.style.borderColor = '';
        } else {
            errorElement.classList.add('show');
            errorElement.textContent = errorMessage;
            field.style.borderColor = '#ef4444';
        }
    }
    
    return isValid;
}

/**
 * Handle form submission
 * Currently shows success message (UI only)
 * 
 * FUTURE IMPLEMENTATION:
 * 1. Firebase Phone OTP: Verify user's phone number via OTP
 * 2. Google Apps Script: POST form data to Apps Script endpoint
 * 3. Data Processing: Apps Script processes and stores in Google Sheets
 * 4. Error Handling: Implement retry logic and error notifications
 * 
 * @param {HTMLElement} form - The contact form element
 */
function handleFormSubmit(form) {
    const formData = new FormData(form);
    
    // Collect form data
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        service: formData.get('service'),
        message: formData.get('message'),
        timestamp: new Date().toISOString()
    };
    
    // Log form data (for development/debugging)
    console.log('Form submitted:', data);
    
    // TODO: Firebase Phone OTP Verification
    // firebase.auth().signInWithPhoneNumber(data.phone, window.recaptchaVerifier)
    //     .then((confirmationResult) => {
    //         window.confirmationResult = confirmationResult;
    //         promptForOTP(); // Show OTP input dialog
    //     })
    //     .catch((error) => {
    //         showError('Failed to send OTP: ' + error.message);
    //     });
    
    // TODO: Google Apps Script Integration
    // fetch('YOUR_GOOGLE_APPS_SCRIPT_ENDPOINT', {
    //     method: 'POST',
    //     body: JSON.stringify(data),
    //     headers: {
    //         'Content-Type': 'application/json',
    //     }
    // })
    // .then(response => response.json())
    // .then(result => {
    //     showSuccess('Thank you! We will contact you soon.');
    //     form.reset();
    // })
    // .catch(error => {
    //     showError('Failed to submit form. Please try again.');
    //     console.error('Error:', error);
    // });
    
    // Current behavior: Show success message
    showSuccess('Thank you for reaching out! We will contact you within 24 hours.');
    form.reset();
    
    // Reset validation styles
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.style.borderColor = '';
    });
}

// ============================================
// 6. UI FEEDBACK FUNCTIONS
// ============================================

/**
 * Show success message to user
 * @param {string} message - The success message to display
 */
function showSuccess(message) {
    // Create and display success notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: #10b981;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        font-weight: 500;
        animation: slideIn 0.3s ease;
        max-width: 90%;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    if (!document.querySelector('style[data-notification]')) {
        style.setAttribute('data-notification', 'true');
        document.head.appendChild(style);
    }
    
    // Auto-remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

/**
 * Show error message to user
 * @param {string} message - The error message to display
 */
function showError(message) {
    // Create and display error notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: #ef4444;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        font-weight: 500;
        animation: slideIn 0.3s ease;
        max-width: 90%;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// ============================================
// 7. HERO BUTTONS
// ============================================

/**
 * Initialize hero section buttons with navigation
 */
function initHeroButtons() {
    const ctaButton = document.getElementById('ctaButton');
    const learnMoreBtn = document.getElementById('learnMoreBtn');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            // Scroll to contact section
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', () => {
            // Scroll to about section
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// ============================================
// 8. HERO IMAGE CAROUSEL
// ============================================

/**
 * Initialize hero image carousel – minimal, auto-play + dots only
 */
function initHeroCarousel() {
    const track = document.getElementById('heroCarouselTrack');
    const dotsContainer = document.getElementById('heroCarouselDots');

    if (!track || !dotsContainer) return;

    const slides = track.querySelectorAll('.hero-carousel-slide');
    const totalSlides = slides.length;
    if (totalSlides === 0) return;

    let currentIndex = 0;
    let autoPlayTimer = null;
    const AUTO_PLAY_INTERVAL = 5000;

    function goToSlide(index) {
        currentIndex = (index + totalSlides) % totalSlides;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        dotsContainer.querySelectorAll('.hero-carousel-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
            dot.setAttribute('aria-current', i === currentIndex ? 'true' : 'false');
        });
    }

    function next() {
        goToSlide(currentIndex + 1);
        resetAutoPlay();
    }

    function resetAutoPlay() {
        if (autoPlayTimer) clearInterval(autoPlayTimer);
        autoPlayTimer = setInterval(next, AUTO_PLAY_INTERVAL);
    }

    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'hero-carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Go to image ${i + 1}`);
        dot.setAttribute('aria-current', i === 0 ? 'true' : 'false');
        dot.addEventListener('click', () => {
            goToSlide(i);
            resetAutoPlay();
        });
        dotsContainer.appendChild(dot);
    }

    resetAutoPlay();

    const carousel = track.closest('.hero-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => {
            if (autoPlayTimer) clearInterval(autoPlayTimer);
            autoPlayTimer = null;
        });
        carousel.addEventListener('mouseleave', () => {
            autoPlayTimer = setInterval(next, AUTO_PLAY_INTERVAL);
        });
    }
}

// ============================================
// 9. CURSOR FOLLOWER
// ============================================

/**
 * Initialize cursor follower with medical cross symbol
 */
function initCursorFollower() {
    const follower = document.querySelector('.cursor-follower');
    if (!follower) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animate() {
        const dx = mouseX - followerX;
        const dy = mouseY - followerY;
        
        followerX += dx * 0.1;
        followerY += dy * 0.1;
        
        follower.style.transform = `translate(${followerX}px, ${followerY}px)`;
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// ============================================
// 9. UTILITY FUNCTIONS (Future Enhancements)
// ============================================

/**
 * Future: Firebase Phone OTP Verification
 * 
 * Setup Required:
 * 1. Initialize Firebase in head
 * 2. Enable Phone Authentication in Firebase Console
 * 3. Setup reCAPTCHA verification
 * 
 * Implementation example:
 * function setupPhoneAuth() {
 *     const recaptchaContainer = document.getElementById('recaptcha-container');
 *     window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(recaptchaContainer);
 * }
 * 
 * function verifyPhoneOTP(otp) {
 *     window.confirmationResult.confirm(otp)
 *         .then((result) => {
 *             console.log('User verified:', result.user);
 *             submitFormToBackend();
 *         })
 *         .catch((error) => {
 *             showError('Invalid OTP. Please try again.');
 *         });
 * }
 */

/**
 * Future: Google Apps Script Integration
 * 
 * Apps Script Setup:
 * 1. Create Google Apps Script in Google Cloud Console
 * 2. Deploy as web app with anonymous access
 * 3. Setup Google Sheet for data storage
 * 4. Endpoint URL will look like: https://script.google.com/macros/d/{SCRIPT_ID}/usercopy
 * 
 * Apps Script code example:
 * function doPost(e) {
 *     const sheet = SpreadsheetApp.getActiveSheet();
 *     const data = JSON.parse(e.postData.contents);
 *     sheet.appendRow([
 *         new Date(),
 *         data.name,
 *         data.email,
 *         data.phone,
 *         data.service,
 *         data.message
 *     ]);
 *     return ContentService.createTextOutput('Success');
 * }
 */

/**
 * Future: Email Notifications
 * 
 * Integration approach:
 * 1. Use Google Apps Script to send emails
 * 2. Send confirmation email to user
 * 3. Send notification to admin
 * 4. Include form submission details and timestamps
 */

// ============================================
// 9. ANALYTICS & TRACKING (Future)
// ============================================

/**
 * Future: Google Analytics integration
 * - Track form submissions
 * - Monitor section views
 * - Analyze user behavior
 */

/**
 * Log page view
 * @param {string} sectionName - Name of section viewed
 */
function logSectionView(sectionName) {
    // TODO: Implement Google Analytics tracking
    // gtag('event', 'page_view', {
    //     page_title: sectionName,
    //     page_location: window.location.href
    // });
}

/**
 * Track form submission
 */
function trackFormSubmission() {
    // TODO: Implement Google Analytics event tracking
    // gtag('event', 'form_submission', {
    //     'form_name': 'contact_form',
    //     'form_location': 'contact_section'
    // });
}

// ============================================
// 10. LOGGING & DEBUGGING
// ============================================

/**
 * Log initialization status for debugging
 */
function logInitStatus() {
    console.log('TRUST CARE@HOME - Website Initialization');
    console.log('- Mobile Menu: Initialized');
    console.log('- Smooth Scrolling: Initialized');
    console.log('- FAQ Accordion: Initialized');
    console.log('- Contact Form: Initialized');
    console.log('- Hero Buttons: Initialized');
    console.log('✓ All components ready for use');
}

// Log status on production
if (window.location.hostname !== 'localhost') {
    console.log('%cTRUST CARE@HOME', 'font-size: 20px; font-weight: bold; color: hsl(222, 47%, 20%);');
    console.log('%cCompassionate Care at Your Doorstep', 'font-size: 14px; color: hsl(174, 62%, 47%);');
}

// ============================================
// EXPORT FOR TESTING (if using modules)
// ============================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initMobileMenu,
        initSmoothScrolling,
        initContactForm,
        validateField,
        handleFormSubmit,
        showSuccess,
        showError,
        initHeroButtons,
        initHeroCarousel
    };
}
