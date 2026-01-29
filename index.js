// =======================
// NAVBAR SCROLL EFFECT
// =======================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

document.querySelectorAll('.photo-ring-wrapper').forEach(wrapper => {

  const track = wrapper.querySelector('.photo-ring-track');
  const original = track.innerHTML;

  // gandakan isi
  track.innerHTML = original + original + original;

  // STATE PER RING
  let position = 0;
  let autoScrollSpeed = 0.25;
  let autoScrollActive = true;
  let isInteracting = false;

  // hitung ukuran
  const gap = 24;
  const itemWidth = track.children[0].offsetWidth + gap;
  const itemsCount = track.children.length / 3;
  const loopWidth = itemWidth * itemsCount;

  // start di tengah
  position = -loopWidth;
  track.style.transform = `translateX(${position}px)`;

  // AUTO SCROLL
  function autoScroll() {
    if (autoScrollActive && !isInteracting) {
      position -= autoScrollSpeed;

      if (position <= -loopWidth * 2) position += loopWidth;
      if (position >= 0) position -= loopWidth;

      track.style.transform = `translateX(${position}px)`;
    }
    requestAnimationFrame(autoScroll);
  }
  autoScroll();

  // ===== INTERAKSI USER =====

  // wheel
  wrapper.addEventListener('wheel', e => {
    e.preventDefault();
    isInteracting = true;
    autoScrollActive = false;
    position -= e.deltaY * 0.8;

    if (position <= -loopWidth * 2) position += loopWidth;
    if (position >= 0) position -= loopWidth;

    track.style.transform = `translateX(${position}px)`;

    clearTimeout(wrapper._resumeTimer);
    wrapper._resumeTimer = setTimeout(() => {
      isInteracting = false;
      autoScrollActive = true;
    }, 800);
  }, { passive: false });

  // touch (mobile)
  let startX = 0;

  wrapper.addEventListener('touchstart', e => {
    isInteracting = true;
    autoScrollActive = false;
    startX = e.touches[0].clientX;
  });

  wrapper.addEventListener('touchmove', e => {
    if (!isInteracting) return;
    const delta = e.touches[0].clientX - startX;
    startX = e.touches[0].clientX;
    position += delta;

    if (position <= -loopWidth * 2) position += loopWidth;
    if (position >= 0) position -= loopWidth;

    track.style.transform = `translateX(${position}px)`;
  });

  wrapper.addEventListener('touchend', () => {
    isInteracting = false;
    autoScrollActive = true;
  });

});
