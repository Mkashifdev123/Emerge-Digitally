document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".carousel");
  const firstSlideItem = carousel.querySelector(".slide-item");
  const menuIcon = document.querySelector(".menu-icon");
  const navLinks = document.querySelector(".nav-links");

  // Auto slide every 3 seconds, speed up on arrow hold
  let normalInterval = 3000;
  let fastInterval = 300;
  let currentInterval = normalInterval;
  let autoSlideTimer = null;

  // Handle window resize: reset auto-slide to keep everything in sync
  window.addEventListener('resize', () => {
    startAutoSlide(normalInterval);
  });

  function startAutoSlide(interval = normalInterval) {
    clearInterval(autoSlideTimer);
    autoSlideTimer = setInterval(() => {
      const slideItemWidth = firstSlideItem.offsetWidth + 14;
      const maxScroll = carousel.scrollWidth - carousel.clientWidth;
      if (Math.round(carousel.scrollLeft) >= maxScroll) {
        carousel.scrollLeft = 0;
      } else {
        carousel.scrollLeft += slideItemWidth;
      }
    }, interval);
    currentInterval = interval;
  }

  startAutoSlide(normalInterval);

  // Arrow button functionality
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');

  function scrollToPrev() {
    if (!carousel || !firstSlideItem) return;
    const slideItemWidth = Math.round(firstSlideItem.offsetWidth + 14);
    // If at the very start, jump to the last full slide
    if (Math.round(carousel.scrollLeft) <= 0) {
      const maxScroll = Math.round(carousel.scrollWidth - carousel.clientWidth);
      carousel.scrollLeft = maxScroll;
    } else {
      carousel.scrollLeft = Math.round(carousel.scrollLeft - slideItemWidth);
    }
  }

  function scrollToNext() {
    if (!carousel || !firstSlideItem) return;
    const slideItemWidth = Math.round(firstSlideItem.offsetWidth + 14);
    const maxScroll = Math.round(carousel.scrollWidth - carousel.clientWidth);
    if (Math.round(carousel.scrollLeft) >= maxScroll) {
      carousel.scrollLeft = 0;
    } else {
      carousel.scrollLeft = Math.round(carousel.scrollLeft + slideItemWidth);
    }
  }

  if (prevBtn) prevBtn.addEventListener('click', () => {
    scrollToPrev();
    startAutoSlide(normalInterval);
  });
  if (nextBtn) nextBtn.addEventListener('click', () => {
    scrollToNext();
    startAutoSlide(normalInterval);
  });

  // Speed up auto-slide when holding arrow, return to normal on release
  function handleArrowHoldStart(directionFn) {
    startAutoSlide(fastInterval);
    directionFn();
  }
  function handleArrowHoldEnd() {
    startAutoSlide(normalInterval);
  }

  // Mouse events
  if (prevBtn) {
    prevBtn.addEventListener('mousedown', () => handleArrowHoldStart(scrollToPrev));
    prevBtn.addEventListener('mouseup', handleArrowHoldEnd);
    prevBtn.addEventListener('mouseleave', handleArrowHoldEnd);
    prevBtn.addEventListener('touchstart', (e) => { e.preventDefault(); handleArrowHoldStart(scrollToPrev); });
    prevBtn.addEventListener('touchend', handleArrowHoldEnd);
    prevBtn.addEventListener('touchcancel', handleArrowHoldEnd);
  }
  if (nextBtn) {
    nextBtn.addEventListener('mousedown', () => handleArrowHoldStart(scrollToNext));
    nextBtn.addEventListener('mouseup', handleArrowHoldEnd);
    nextBtn.addEventListener('mouseleave', handleArrowHoldEnd);
    nextBtn.addEventListener('touchstart', (e) => { e.preventDefault(); handleArrowHoldStart(scrollToNext); });
    nextBtn.addEventListener('touchend', handleArrowHoldEnd);
    nextBtn.addEventListener('touchcancel', handleArrowHoldEnd);
  }

  // Toggle navigation links on menu icon click
  if (menuIcon && navLinks) {
    menuIcon.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }
});
