let intro = document.querySelector('.intro');
let logoSpan = document.querySelector('.logo');

function typeEffect() {
    const descElement = document.querySelector('.descc');
    if (!descElement) return;

    // Use a placeholder to preserve <br> tags during word splitting
    const placeholder = '||BR||';
    const modifiedHTML = descElement.innerHTML.replace(/<br\s*\/?>/gi, placeholder);

    // Use a temporary element to safely get the text content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = modifiedHTML;
    let textContent = tempDiv.textContent || tempDiv.innerText || "";
    
    // Normalize whitespace to avoid typing long gaps from source code indentation
    textContent = textContent.replace(/\s+/g, ' ').trim();

    descElement.innerHTML = ''; // Clear original element for typing
    descElement.classList.add('typing'); // Add class for cursor effect
    let i = 0;

    const intervalId = setInterval(() => {
        if (i < textContent.length) {
            // Check if the next sequence of characters matches our placeholder
            if (textContent.substring(i, i + placeholder.length) === placeholder) {
                descElement.innerHTML += '<br>';
                i += placeholder.length;
            } else {
                descElement.innerHTML += textContent[i];
                i++;
            }
        } else {
            clearInterval(intervalId);
            // Remove cursor after a short delay for a more natural feel
            setTimeout(() => {
                descElement.classList.remove('typing');
            }, 500);
        }
    }, 20); // Speed of typing in milliseconds per character
}

window.addEventListener('DOMContentLoaded', () => {

    // ===== THEME TOGGLE =====
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');

    // Apply saved theme on load
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark');
        themeIcon.textContent = '☀️';
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        themeIcon.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // ===== EXISTING INTRO ANIMATION =====

    setTimeout(() => { logoSpan.classList.add('active'); }, 400);
    setTimeout(() => { logoSpan.classList.remove('active'); logoSpan.classList.add('fade'); }, 2000);

    setTimeout(() => {
        intro.style.top = '-100vh';
        // Start the typing effect after the intro animation is complete
        typeEffect();
    }, 2300);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    });
    // ===== AUTO-CLOSE HAMBURGER ON NAV LINK CLICK =====
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelectorAll('.nav-link, .get-started-btn');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.checked = false;
        });
    });
    // ==================================================

    const hiddenElements = document.querySelectorAll('.feature-desc li, .about-desc li');
    hiddenElements.forEach((el) => observer.observe(el));
});


    const backToTop = document.getElementById("backToTop");

    // Show button when scrolling
    window.addEventListener("scroll", () => {
        if (window.scrollY > 200) {
            backToTop.style.display = "block";
        } else {
            backToTop.style.display = "none";
        }
    });

    // Scroll to top when clicked
    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
    const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / 100;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCount, 20);
        } else {
            counter.innerText = target;
        }
    };
    updateCount();
});