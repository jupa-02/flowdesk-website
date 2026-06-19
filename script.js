// OS Detection for highlighting the correct download button
function detectOS() {
    const platform = window.navigator.platform.toLowerCase();
    const userAgent = window.navigator.userAgent.toLowerCase();
    
    const btnMac = document.getElementById('btn-mac');
    const btnWin = document.getElementById('btn-win');
    
    if (platform.includes('mac') || userAgent.includes('mac')) {
        // Mac user
        if (btnWin) {
            btnWin.style.display = 'none'; // Hide Windows button
        }
    } else if (platform.includes('win') || userAgent.includes('win')) {
        // Windows user
        if (btnMac) {
            btnMac.style.display = 'none'; // Hide Mac button
        }
        if (btnWin) {
            // Make Windows button the primary CTA
            btnWin.classList.remove('btn-secondary');
            btnWin.classList.add('btn-primary');
        }
    }
}

// Reveal elements on scroll
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;

    reveals.forEach(reveal => {
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 50;

        // Add 'active' if element is within view
        if (revealTop < windowHeight - revealPoint) {
            reveal.classList.add('active');
        }
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    detectOS();
    
    // Trigger reveals initially and on scroll
    setTimeout(revealOnScroll, 100);
    window.addEventListener('scroll', revealOnScroll);

    // Aurora Borealis Mouse Parallax
    const blobs = document.querySelectorAll('.aurora-blob');
    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener('mousemove', (e) => {
        // Normalize mouse coordinates (-1 to 1) relative to center
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    });

    let currentX = 0;
    let currentY = 0;

    function animateAuroras() {
        // Easing factor for smooth, fluid motion
        currentX += (mouseX - currentX) * 0.05;
        currentY += (mouseY - currentY) * 0.05;
        
        blobs.forEach((blob, index) => {
            // Different movement multiplier for each blob (3D depth effect)
            const factor = (index + 1) * 150; // Increased factor for more visible movement
            
            // Using translate property independently of transform so CSS keyframes still work
            blob.style.translate = `${currentX * factor}px ${currentY * factor}px`;
        });
        
        requestAnimationFrame(animateAuroras);
    }
    
    animateAuroras();
});
