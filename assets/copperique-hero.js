document.addEventListener('DOMContentLoaded', () => {
  const heroes = document.querySelectorAll('.copperique-hero.hero-animated');

  heroes.forEach(hero => {
    const layers = hero.querySelectorAll('.parallax-layer');
    
    // Only apply parallax on desktop
    if (window.innerWidth < 992) return;

    let rafId = null;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      // Calculate mouse position relative to center of hero section
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Normalize values between -1 and 1
      targetX = x / (rect.width / 2);
      targetY = y / (rect.height / 2);
    });

    hero.addEventListener('mouseleave', () => {
      targetX = 0;
      targetY = 0;
    });

    function animate() {
      // Smooth interpolation (easing)
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;

      layers.forEach(layer => {
        const speed = parseFloat(layer.getAttribute('data-parallax-speed')) || 0.05;
        
        // Multiplier of 100 ensures max 5px displacement for speed 0.05, 10px for 0.1
        const xOffset = currentX * speed * 100;
        const yOffset = currentY * speed * 100;
        
        // We use string replacement or just overwrite transform. 
        // Note: this overrides the CSS float animation slightly on hover, 
        // but since we are transforming X and Y, the CSS float (which is only Y) will be mixed.
        // To preserve CSS float animation, we could wrap the image in a parallax container,
        // but this simple approach creates a nice dynamic organic feel.
        layer.style.transform = `translate3d(${xOffset}px, ${yOffset}px, 0)`;
      });

      rafId = requestAnimationFrame(animate);
    }

    animate();
  });
});
