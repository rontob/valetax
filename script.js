/**
 * VALETAX COPYTRADE LANDING PAGE ENGINE
 * Vanilla JS logic: Interactive simulator, IntersectionObserver, FAQ accordion, dynamic config.
 */

// 1. CONFIGURATION (Ubah link pendaftaran utama di sini)
const CONFIG = {
    REGISTER_URL: "https://valetax.com/register", // ganti sesuai affiliate/referral link
};

document.addEventListener("DOMContentLoaded", () => {
    // Initialize Lucide Icons
    if (window.lucide) {
        lucide.createIcons();
    }

    // Attach dynamic URLs to CTA buttons
    const ctaLinks = document.querySelectorAll(".cta-link");
    ctaLinks.forEach(link => {
        link.setAttribute("href", CONFIG.REGISTER_URL);
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");
    });

    // Auto update copyright year
    const yearEl = document.getElementById("currentYear");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // 2. INTERACTIVE PROFIT SIMULATOR LOGIC
    const capitalRange = document.getElementById("capitalRange");
    const capitalDisplay = document.getElementById("capitalDisplay");
    const resCapital = document.getElementById("resCapital");
    const resDaily = document.getElementById("resDaily");
    const resMonthly = document.getElementById("resMonthly");

    if (capitalRange) {
        capitalRange.addEventListener("input", (e) => {
            const capital = parseFloat(e.target.value);
            
            // Mathematical linear model for illustrative purposes ($5 base -> $1 daily sample)
            const dailyIllustrative = (capital / 5) * 1;
            const monthlyIllustrative = dailyIllustrative * 30;

            capitalDisplay.textContent = `$${capital.toLocaleString()}`;
            resCapital.textContent = `$${capital.toLocaleString('.2f')}`;
            resDaily.textContent = `~$${dailyIllustrative.toFixed(2)}*`;
            resMonthly.textContent = `~$${monthlyIllustrative.toFixed(2)}*`;
        });
    }

    // 3. FAQ ACCORDION LOGIC
    const faqQuestions = document.querySelectorAll(".faq-question");
    faqQuestions.forEach(button => {
        button.addEventListener("click", () => {
            const faqItem = button.parentElement;
            const isActive = faqItem.classList.contains("active");

            // Close all items
            document.querySelectorAll(".faq-item").forEach(item => {
                item.classList.remove("active");
            });

            // Toggle current item if it wasn't active
            if (!isActive) {
                faqItem.classList.add("active");
            }
        });
    });

    // 4. SCROLL REVEAL ANIMATION (IntersectionObserver)
    const revealElements = document.querySelectorAll(".reveal");
    
    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for older browsers
        revealElements.forEach(el => el.classList.add("active"));
    }

    // 5. MOBILE MENU DRAWER TOGGLE
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.style.display === "flex";
            navLinks.style.display = isOpen ? "none" : "flex";
            if (!isOpen) {
                navLinks.style.flexDirection = "column";
                navLinks.style.position = "absolute";
                navLinks.style.top = "70px";
                navLinks.style.left = "0";
                navLinks.style.width = "100%";
                navLinks.style.background = "#070B14";
                navLinks.style.padding = "1.5rem";
                navLinks.style.borderBottom = "1px solid rgba(255,255,255,0.1)";
            }
        });
    }
});
