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
                
                // Smooth scroll with offset for fixed elements
                const offset = 60;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll to top functionality
    const scrollTopButton = document.querySelector('.scroll-top');
    if (scrollTopButton) {
        scrollTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Show/hide mobile nav buttons based on scroll position
    const mobileNavButtons = document.querySelector('.mobile-nav-buttons');
    if (mobileNavButtons) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                mobileNavButtons.classList.add('visible');
            } else {
                mobileNavButtons.classList.remove('visible');
            }
        });
    }

    // Hide sidebar on scroll down, show on scroll up
    const sideMenu = document.querySelector('.side-menu');
    let lastScrollTop = 0;
    let isScrolling = false;

    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            window.requestAnimationFrame(function() {
                let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
                
                // If we're at the very top, always show the sidebar
                if (currentScroll <= 50) {
                    sideMenu.classList.remove('hidden');
                } else {
                    // Scrolling down hides the sidebar
                    if (currentScroll > lastScrollTop) {
                        sideMenu.classList.add('hidden');
                    } 
                    // Scrolling up shows the sidebar
                    else {
                        sideMenu.classList.remove('hidden');
                    }
                }
                
                lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
                isScrolling = false;
            });
            
            isScrolling = true;
        }
    }, { passive: true });


    
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

     // Better handling for chat panel on mobile
     const closeChatPanel = document.querySelector('.close-chat-panel');
     if (closeChatPanel) {
         closeChatPanel.addEventListener('click', function() {
             const chatPanel = document.querySelector('.chat-panel');
             if (chatPanel) {
                 chatPanel.classList.remove('active');
             }
         });
     }
    
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
    
    // Handle orientation changes
    window.addEventListener('orientationchange', function() {
        // Force redraw of elements that might be positioned incorrectly
        setTimeout(function() {
            const elementsToRedraw = document.querySelectorAll('.hero, .logo, .side-menu');
            elementsToRedraw.forEach(elem => {
                elem.style.display = 'none';
                void elem.offsetHeight; // Trigger reflow
                elem.style.display = '';
            });
        }, 100);
    });
    
    // Add mobile-specific classes based on screen size
    function updateMobileClasses() {
        const isMobile = window.innerWidth <= 768;
        document.body.classList.toggle('is-mobile', isMobile);
    }
    
    updateMobileClasses();
    window.addEventListener('resize', updateMobileClasses);

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

    // Set up lazy loading for images (if you have images with class 'lazy-image')
    const lazyImages = document.querySelectorAll('.lazy-image');
    if (lazyImages.length > 0) {
        // Use Intersection Observer if supported
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const src = img.getAttribute('data-src');
                        
                        if (src) {
                            img.setAttribute('src', src);
                            img.classList.add('loaded');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });
            
            lazyImages.forEach(function(img) {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for browsers without Intersection Observer
            // Simply load all images immediately
            lazyImages.forEach(function(img) {
                const src = img.getAttribute('data-src');
                if (src) {
                    img.setAttribute('src', src);
                    img.classList.add('loaded');
                }
            });
        }
    }
});