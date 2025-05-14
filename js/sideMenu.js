/**
 * Main JavaScript for YourWall revised website with side menu layout
 */

document.addEventListener('DOMContentLoaded', function() {
    // Side Menu Toggle Functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        });
    }
    
    // Close menu functionality
    const closeMenu = document.querySelector('.close-menu');
    
    if (closeMenu) {
        closeMenu.addEventListener('click', function() {
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = ''; // Re-enable scrolling
        });
    }
    
    // Close menu when clicking on overlay
    overlay.addEventListener('click', function() {
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Chat Widget Functionality
    const chatBubble = document.querySelector('.chat-bubble');
    const chatPanel = document.querySelector('.chat-panel');
    const closeChat = document.querySelector('.close-chat');
    
    if (chatBubble && chatPanel) {
        chatBubble.addEventListener('click', function() {
            chatPanel.classList.toggle('active');
        });
    }
    
    if (closeChat) {
        closeChat.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent triggering the chatBubble click event
            chatPanel.classList.remove('active');
        });
    }
    
    // Tab functionality for product pages
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length > 0 && tabContents.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button and corresponding content
                button.classList.add('active');
                const tabId = button.getAttribute('data-tab');
                const activeContent = document.querySelector(`.tab-content[data-tab="${tabId}"]`);
                
                if (activeContent) {
                    activeContent.classList.add('active');
                }
            });
        });
        
        // Activate first tab by default
        if (tabButtons[0]) {
            tabButtons[0].click();
        }
    }
    
    // Simple form validation
    const contactForms = document.querySelectorAll('form');
    
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            // Reset previous error states
            requiredFields.forEach(field => {
                field.classList.remove('error');
                const errorMsg = field.parentElement.querySelector('.error-message');
                if (errorMsg) errorMsg.remove();
            });
            
            // Check required fields
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('error');
                    
                    // Add error message
                    const errorMsg = document.createElement('div');
                    errorMsg.className = 'error-message';
                    errorMsg.textContent = 'This field is required';
                    errorMsg.style.color = '#d9534f';
                    errorMsg.style.fontSize = '0.8rem';
                    errorMsg.style.marginTop = '0.25rem';
                    
                    field.parentElement.appendChild(errorMsg);
                    
                    isValid = false;
                }
            });
            
            // Validate email format if email field exists
            const emailField = form.querySelector('input[type="email"]');
            if (emailField && emailField.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailField.value.trim())) {
                    emailField.classList.add('error');
                    
                    // Add error message for email
                    const errorMsg = document.createElement('div');
                    errorMsg.className = 'error-message';
                    errorMsg.textContent = 'Please enter a valid email address';
                    errorMsg.style.color = '#d9534f';
                    errorMsg.style.fontSize = '0.8rem';
                    errorMsg.style.marginTop = '0.25rem';
                    
                    emailField.parentElement.appendChild(errorMsg);
                    
                    isValid = false;
                }
            }
            
            // If form is not valid, prevent submission
            if (!isValid) {
                e.preventDefault();
                
                // Scroll to the first error
                const firstError = form.querySelector('.error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstError.focus();
                }
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    overlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
                
                // Scroll to the target
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL without page reload
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Scroll animations
    const animateElements = () => {
        const animatedElements = document.querySelectorAll('.fade-in, .slide-in, .benefit-card, .application-card');
        const windowHeight = window.innerHeight;
        
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150; // Distance from bottom of viewport to trigger animation
            
            if (elementTop < windowHeight - elementVisible) {
                if (element.classList.contains('benefit-card') || element.classList.contains('application-card')) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                } else {
                    element.classList.add('visible');
                }
            }
        });
    };
    
    // Set initial styles for animated elements
    const setupAnimatedElements = () => {
        const cards = document.querySelectorAll('.benefit-card, .application-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        });
    };
    
    setupAnimatedElements();
    animateElements(); // Run once on page load
    window.addEventListener('scroll', animateElements);
    
    // Handle fixed header on scroll
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('fixed-header');
            } else {
                header.classList.remove('fixed-header');
            }
        });
    }
    
    // Handle newsletter form submission (for demo purposes)
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            if (!emailInput || !emailInput.value.trim()) return;
            
            // Simple email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Success message (in production, you would submit to a server)
            const formContainer = this.parentElement;
            const successMessage = document.createElement('p');
            successMessage.textContent = 'Thank you for subscribing!';
            successMessage.style.color = '#52B788';
            
            this.style.display = 'none';
            formContainer.appendChild(successMessage);
            
            // Clear form
            emailInput.value = '';
        });
    }
});