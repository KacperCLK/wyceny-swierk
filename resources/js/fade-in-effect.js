class ApperFX {
    constructor() {
        this.init();
    }

    init() {
        // Opis dostępnych argumentów dataset:
        // data-animate (string): Określa animacje, które mają być zastosowane (np. "fade slide").
        //                           Domyślnie "fade" lub "none" (jeśli nie podano).
        // data-duration (string): Czas trwania animacji w sekundach (np. "1s", "2s"). Domyślnie "1.4s".
        // data-delay (string): Opóźnienie animacji w sekundach (np. "0.5s", "1s"). Domyślnie "0s".
        // data-threshold (float): Próg dla IntersectionObserver, określa, w jakim stopniu element musi być widoczny.
        //                          Domyślnie 0.1 (10% elementu musi być widoczne).
        // data-opacity (string): Końcowa wartość opacity (np. "1", "0.5"). Domyślnie "1".
        // data-direction (string): Kierunek animacji przesuwania (np. "left", "right", "top", "bottom"). Domyślnie "left".
        // data-distance (string): Odległość przesunięcia (np. "100px", "width", "height"). Domyślnie "200px".
        //                          Może być wartością "width" lub "height", aby wykorzystać odpowiednio szerokość lub wysokość elementu.
        // data-endopacity (string): Końcowa wartość opacity, może być użyte do zmiany opacity po animacji.
        //                            Domyślnie wartość z data-opacity lub 1, jeśli brak.
        // data-endtranslatex (string): Końcowa pozycja transformacji na x (np. 100px), domyślnie 0px.
        // data-endtranslatey (string): Końcowa pozycja transformacji na y (np. 100px), domyślnie 0px.
        
        // Przygotuj wszystkie elementy z data-animate (rodziców i wszystkie zagnieżdżone)
        const animatedElements = document.querySelectorAll("[data-animate]");
        animatedElements.forEach(el => {
            this.prepareElement(el);
        });

        // Przypisz IntersectionObserver tylko do elementów top-level (bez nadrzędnego z data-animate)
        animatedElements.forEach(el => {
            if (!el.parentElement || !el.parentElement.closest("[data-animate]")) {
                const threshold = parseFloat(el.dataset.threshold) || 0.1;
                const observer = new IntersectionObserver((entries, obs) => this.handleIntersect(entries, obs), { threshold });
                observer.observe(el);
            }
        });
    }

    prepareElement(el) {
        // Ustawienia początkowe: niewidoczność i odpowiednia transformacja
        el.style.opacity = "0";
        el.style.visibility = "visible"
        const animations = el.dataset.animate.split(" ");
        if (animations.includes("slide")) {
            const direction = el.dataset.direction || "left";
            let distance = el.dataset.distance || "200px";

            if (el.dataset.distance === "width") distance = el.offsetWidth + 'px';
            if (el.dataset.distance === "height") distance = el.offsetHeight + 'px';

            const transformMap = {
                left: `translateX(-${distance})`,
                right: `translateX(${distance})`,
                top: `translateY(-${distance})`,
                bottom: `translateY(${distance})`
            };

            el.style.transform = transformMap[direction] || transformMap.left;
        }
    }

    handleIntersect(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                observer.unobserve(entry.target);
                // Najpierw animujemy element top-level
                this.animate(entry.target, () => {
                    // Następnie wyszukujemy wszystkie zagnieżdżone elementy z data-animate i animujemy je sekwencyjnie
                    const nestedElements = entry.target.querySelectorAll("[data-animate]");
                    this.animateElementsSequentially(nestedElements);
                });
            }
        });
    }

    animate(el, callback = () => {}) {
        const duration = parseFloat(el.dataset.duration) || 1.4;
        const delay = parseFloat(el.dataset.delay) || 0;
        const animations = el.dataset.animate.split(" ");
        const endopacity = el.dataset.endopacity || 1;
        let endtranslatex = el.dataset.endtranslatex || '0px';
        let endtranslatey = el.dataset.endtranslatey || '0px';
        
        let transitionStyles = `opacity ${duration}s ease-out ${delay}s`;
        let finalStyles = `opacity: ${endopacity};`;

        if (animations.includes("slide")) {
            transitionStyles += `, transform ${duration}s ease-out ${delay}s`;
            finalStyles += `transform: translateX(${endtranslatex}) translateY(${endtranslatey});`;
        }

        requestAnimationFrame(() => {
            el.style.transition = transitionStyles;
            el.style.cssText += finalStyles;
            setTimeout(callback, (duration + delay) * 1000);
        });
    }

    animateElementsSequentially(elements, index = 0) {
        if (index >= elements.length) return;

        const el = elements[index];
        // Jeśli element nie posiada atrybutu data-animate, pomijamy go
        if (!el.dataset.animate) {
            this.animateElementsSequentially(elements, index + 1);
            return;
        }
        // Animujemy element, a po zakończeniu wywołujemy animację kolejnego elementu
        this.animate(el, () => {
            this.animateElementsSequentially(elements, index + 1);
        });
    }
}

document.addEventListener("DOMContentLoaded", () => new ApperFX());
