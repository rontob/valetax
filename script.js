/**
 * VALETAX COPYTRADE LANDING PAGE ENGINE
 * Vanilla JS logic: Interactive simulator, IntersectionObserver, FAQ accordion, dynamic config.
 */

// 1. CONFIGURATION (Ubah link pendaftaran utama di sini)
const CONFIG = {
    REGISTER_URL: "https://s.id/daftar-valetax", // ganti sesuai affiliate/referral link
};

document.addEventListener("DOMContentLoaded", () => {
    // 2. Inisialisasi ikon secara aman (mencegah script macet jika CDN lambat)
    try {
        if (window.lucide) {
            lucide.createIcons();
        }
    } catch (err) {
        console.warn("Lucide icons error:", err);
    }

    // 3. Aktifkan mode animasi setelah JS dipastikan berjalan
    document.body.classList.add("js-ready");

    // 4. Dynamic CTA links
    const ctaLinks = document.querySelectorAll(".cta-link");
    ctaLinks.forEach(link => {
        link.setAttribute("href", CONFIG.REGISTER_URL);
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");
    });

    // 5. Auto update copyright year
    const yearEl = document.getElementById("currentYear");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // 6. Interactive Profit Simulator
    const capitalRange = document.getElementById("capitalRange");
    const capitalDisplay = document.getElementById("capitalDisplay");
    const resCapital = document.getElementById("resCapital");
    const resDaily = document.getElementById("resDaily");
    const resMonthly = document.getElementById("resMonthly");

    if (capitalRange) {
        capitalRange.addEventListener("input", (e) => {
            const capital = parseFloat(e.target.value);
            const dailyIllustrative = (capital / 5) * 1;
            const monthlyIllustrative = dailyIllustrative * 30;

            capitalDisplay.textContent = `$${capital.toLocaleString('en-US')}`;
            // FIXED: Menggunakan toFixed(2) untuk format desimal
            resCapital.textContent = `$${capital.toFixed(2)}`;
            resDaily.textContent = `~$${dailyIllustrative.toFixed(2)}*`;
            resMonthly.textContent = `~$${monthlyIllustrative.toFixed(2)}*`;
        });
    }

    // 7. FAQ Accordion Logic
    const faqQuestions = document.querySelectorAll(".faq-question");
    faqQuestions.forEach(button => {
        button.addEventListener("click", () => {
            const faqItem = button.parentElement;
            const isActive = faqItem.classList.contains("active");

            document.querySelectorAll(".faq-item").forEach(item => {
                item.classList.remove("active");
            });

            if (!isActive) {
                faqItem.classList.add("active");
            }
        });
    });

    // 8. Scroll Reveal Observer
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
            threshold: 0.05,
            rootMargin: "0px 0px -50px 0px"
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add("active"));
    }

    // 9. Mobile Menu Drawer Toggle
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });

        document.querySelectorAll(".nav-item").forEach(item => {
            item.addEventListener("click", () => {
                navLinks.classList.remove("active");
            });
        });
    }
});
