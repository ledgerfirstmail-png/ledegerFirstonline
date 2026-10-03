// Ledger First Website - Main JavaScript

// Mobile Menu
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Cookie Banner
const cookieBanner = document.getElementById('cookie-banner');
const acceptCookies = document.getElementById('accept-cookies');

if (cookieBanner && !localStorage.getItem('cookiesAccepted')) {
    setTimeout(() => {
        cookieBanner.classList.add('active');
    }, 2000);
}

if (acceptCookies) {
    acceptCookies.addEventListener('click', () => {
        cookieBanner.classList.remove('active');
        localStorage.setItem('cookiesAccepted', 'true');
        // Track cookie acceptance
        if (typeof gtag !== 'undefined') {
            gtag('event', 'cookie_accept', {
                event_category: 'engagement',
                event_label: 'cookie_banner'
            });
        }
    });
}

// Testimonial Carousel
const testimonials = document.querySelectorAll('.testimonial');
const dotsContainer = document.getElementById('carousel-dots');
let currentTestimonial = 0;

if (testimonials.length > 0 && dotsContainer) {
    // Create dots
    testimonials.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => showTestimonial(index));
        dotsContainer.appendChild(dot);
    });

    // Auto-rotate
    setInterval(() => {
        showTestimonial((currentTestimonial + 1) % testimonials.length);
    }, 5000);
}

function showTestimonial(index) {
    testimonials.forEach((t, i) => {
        t.classList.toggle('active', i === index);
    });
    
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((d, i) => {
        d.classList.toggle('active', i === index);
    });
    
    currentTestimonial = index;
}

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        // Close others
        faqItems.forEach(other => {
            if (other !== item) other.classList.remove('active');
        });
        // Toggle current
        item.classList.toggle('active');
        
        // Track FAQ click
        if (typeof gtag !== 'undefined') {
            gtag('event', 'faq_click', {
                event_category: 'engagement',
                event_label: question.textContent.trim()
            });
        }
    });
});

// Live Chat Widget
const chatToggle = document.getElementById('chat-toggle');
const chatPanel = document.getElementById('chat-panel');
const chatClose = document.getElementById('chat-close');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');
const chatBody = chatPanel?.querySelector('.chat-body');

if (chatToggle) {
    chatToggle.addEventListener('click', () => {
        chatPanel.classList.toggle('active');
        if (chatPanel.classList.contains('active')) {
            chatInput?.focus();
        }
    });
}

if (chatClose) {
    chatClose.addEventListener('click', () => {
        chatPanel.classList.remove('active');
    });
}

function sendChatMessage() {
    const message = chatInput.value.trim();
    if (!message) return;
    
    // Add user message
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-message';
    userMsg.style.cssText = 'background: var(--primary); color: white; margin-left: auto; border-radius: 12px 12px 4px 12px; padding: 12px; margin-bottom: 12px; max-width: 80%;';
    userMsg.textContent = message;
    chatBody.appendChild(userMsg);
    
    chatInput.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;
    
    // Simulate bot response
    setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.className = 'chat-message bot';
        botMsg.style.cssText = 'background: var(--bg-light); padding: 12px; margin-bottom: 12px; border-radius: 12px 12px 12px 4px; max-width: 80%;';
        
        // Simple response logic
        let response = "Thanks for reaching out! I'm connecting you with the Ledger First team. In the meantime, you can check our Help Center or email us at support@ledger-first.com";
        
        if (message.toLowerCase().includes('price') || message.toLowerCase().includes('cost')) {
            response = "Our apps start at $0/month! Pro plans are $9.99-$49.99/month. Check our pricing page for full details: ledger-first.com/pricing";
        } else if (message.toLowerCase().includes('quickbooks')) {
            response = "Yes! We can help you migrate from QuickBooks. Our migration service is free for Pro users. Would you like to schedule a call?";
        } else if (message.toLowerCase().includes('ios') || message.toLowerCase().includes('iphone')) {
            response = "iOS apps are coming July 2026! Join our waitlist to be first to know: ledger-first.com";
        } else if (message.toLowerCase().includes('custom') || message.toLowerCase().includes('enterprise')) {
            response = "We offer custom app development and enterprise licensing! Contact our founder directly: LSolo@ledger-first.com";
        }
        
        botMsg.innerHTML = `<p style="margin: 0; font-size: 14px;">${response}</p>`;
        chatBody.appendChild(botMsg);
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 1000);
    
    // Track chat message
    if (typeof gtag !== 'undefined') {
        gtag('event', 'chat_message', {
            event_category: 'engagement',
            event_label: 'live_chat'
        });
    }
}

if (chatSend) {
    chatSend.addEventListener('click', sendChatMessage);
}

if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendChatMessage();
    });
}

// Exit Intent Popup
const exitPopup = document.getElementById('exit-popup');
const exitClose = document.getElementById('exit-close');
const exitForm = document.getElementById('exit-form');
let exitIntentTriggered = false;

if (exitPopup && !localStorage.getItem('exitPopupShown')) {
    document.addEventListener('mouseleave', (e) => {
        if (e.clientY < 10 && !exitIntentTriggered) {
            exitPopup.classList.add('active');
            exitIntentTriggered = true;
            localStorage.setItem('exitPopupShown', 'true');
            
            // Track exit intent
            if (typeof gtag !== 'undefined') {
                gtag('event', 'exit_intent', {
                    event_category: 'engagement',
                    event_label: 'exit_popup_shown'
                });
            }
        }
    });
}

if (exitClose) {
    exitClose.addEventListener('click', () => {
        exitPopup.classList.remove('active');
    });
}

if (exitForm) {
    exitForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = exitForm.querySelector('input[type="email"]').value;
        
        // Here you would typically send to your email service
        console.log('Exit intent email captured:', email);
        
        // Show success
        exitPopup.innerHTML = `
            <div class="exit-popup-content" style="text-align: center;">
                <h3>🎉 You're In!</h3>
                <p>Check your inbox for the "5-Minute Bookkeeping Setup" guide + your 50% off discount code.</p>
                <button class="btn btn-primary" onclick="document.getElementById('exit-popup').classList.remove('active')" style="margin-top: 20px;">Got it!</button>
            </div>
        `;
        
        // Track conversion
        if (typeof gtag !== 'undefined') {
            gtag('event', 'exit_popup_submit', {
                event_category: 'conversion',
                event_label: 'email_capture'
            });
        }
    });
}

// Email Capture Form
const emailCaptureForm = document.getElementById('email-capture-form');

if (emailCaptureForm) {
    emailCaptureForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = emailCaptureForm.querySelector('input[type="email"]').value;
        
        console.log('Newsletter signup:', email);
        
        // Show success message
        emailCaptureForm.innerHTML = `
            <div style="background: var(--success); color: white; padding: 16px; border-radius: var(--radius); text-align: center;">
                <strong>✅ You're subscribed!</strong><br>
                <span style="font-size: 14px;">Check your inbox for a welcome email.</span>
            </div>
        `;
        
        // Track
        if (typeof gtag !== 'undefined') {
            gtag('event', 'newsletter_signup', {
                event_category: 'conversion',
                event_label: 'email_capture'
            });
        }
    });
}

// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Track page view
if (typeof gtag !== 'undefined') {
    gtag('event', 'page_view', {
        event_category: 'engagement',
        event_label: document.title
    });
}

// App card hover tracking
document.querySelectorAll('.app-card').forEach(card => {
    card.addEventListener('click', () => {
        const appName = card.querySelector('h3').textContent;
        if (typeof gtag !== 'undefined') {
            gtag('event', 'app_card_click', {
                event_category: 'engagement',
                event_label: appName
            });
        }
    });
});

// Pricing card tracking
document.querySelectorAll('.pricing-card .btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const plan = btn.closest('.pricing-card').querySelector('h3').textContent;
        if (typeof gtag !== 'undefined') {
            gtag('event', 'pricing_cta_click', {
                event_category: 'conversion',
                event_label: plan
            });
        }
    });
});

console.log('Ledger First website loaded. Ready to convert visitors into customers.');
