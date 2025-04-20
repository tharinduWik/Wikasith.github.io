// Add this to your main.js file or update the counter function if it exists

// Counter animation
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower
    
    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const isDecimal = target % 1 !== 0;
        const decimalPlaces = isDecimal ? 1 : 0; // Show 1 decimal place for decimals
        
        const updateCount = () => {
            const count = parseFloat(counter.innerText);
            const increment = target / speed;
            
            if (count < target) {
                // For decimal values, round to 1 decimal place
                counter.innerText = isDecimal ? 
                    Math.min(count + increment, target).toFixed(decimalPlaces) : 
                    Math.floor(count + increment);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target.toFixed(decimalPlaces);
            }
        };
        
        updateCount();
    });
}

// Initialize counters when they come into view
document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                initCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) {
        observer.observe(statsSection);
    }
});
