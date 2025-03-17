import './bootstrap';
import './fade-in-effect';

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (!target) return;

        const startPosition = window.scrollY;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY;
        const distance = targetPosition - startPosition;
        const duration = 800; // czas przewijania w ms (np. 800ms = 0.8 sekundy)
        let startTime = null;

        function animationScroll(currentTime) {
            if (!startTime) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1); // Normalizowanie do zakresu 0-1
            const easeInOutCubic = progress < 0.5 
                ? 4 * progress * progress * progress 
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;
            
            window.scrollTo(0, startPosition + distance * easeInOutCubic);

            if (timeElapsed < duration) {
                requestAnimationFrame(animationScroll);
            }
        }

        requestAnimationFrame(animationScroll);
    });
});
