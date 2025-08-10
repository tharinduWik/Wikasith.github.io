// Consolidated JavaScript for portfolio
// Includes: particles init, project modal logic, counters, timeline animations, form enhancements, interactive cards

document.addEventListener('DOMContentLoaded', () => {
  /* ================= PARTICLES ================= */
  if (window.particlesJS) {
    particlesJS('particles-js', {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: '#8a56d6' },
        shape: { type: 'circle' },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: '#4b208c', opacity: 0.2, width: 1 },
        move: { enable: true, speed: 2, direction: 'none', random: true, out_mode: 'out' }
      },
      interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true }
      }
    });
  }

  /* ================= NAV TOGGLE ================= */
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => navLinks.classList.toggle('active'));
    document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', () => navLinks.classList.remove('active')));
  }

  /* ================= PROJECT MODALS ================= */
  function openProjectModal(id) {
    const el = document.getElementById(id);
    if (el) { el.style.display = 'block'; document.body.style.overflow = 'hidden'; }
  }
  function closeProjectModal(id) {
    const el = document.getElementById(id);
    if (el) { el.style.display = 'none'; document.body.style.overflow = 'auto'; }
  }
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const modalId = card.getAttribute('data-modal');
      if (modalId) openProjectModal(modalId);
    });
  });
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', e => {
      const modal = e.target.closest('.project-modal');
      if (modal) closeProjectModal(modal.id);
    });
  });
  window.addEventListener('click', (e) => {
    if (e.target.classList && e.target.classList.contains('project-modal')) {
      e.target.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });

  /* ================= COUNTERS ================= */
  function initCounters() {
    document.querySelectorAll('.counter').forEach(counter => {
      const target = parseFloat(counter.dataset.target || '0');
      const isDecimal = target % 1 !== 0;
      const decimalPlaces = isDecimal ? 1 : 0;
      const speed = 200;
      const update = () => {
        const current = parseFloat(counter.innerText) || 0;
        const increment = target / speed;
        if (current < target) {
          const next = Math.min(current + increment, target);
            counter.innerText = isDecimal ? next.toFixed(decimalPlaces) : Math.floor(next).toString();
          requestAnimationFrame(update);
        } else {
          counter.innerText = target.toFixed(decimalPlaces);
        }
      };
      update();
    });
  }
  const statsGrid = document.querySelector('.stats-grid');
  if (statsGrid) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { initCounters(); obs.disconnect(); } });
    }, { threshold: 0.5 });
    obs.observe(statsGrid);
  }

  /* ================= CONTACT SCROLL LINKS ================= */
  document.querySelectorAll('a[href="#contact"]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const target = document.getElementById('contact');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* ================= FORM HANDLING ================= */
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  if (contactForm && formMessage) {
    const submitBtn = contactForm.querySelector('.submit-btn');
    if (submitBtn) {
      submitBtn.addEventListener('click', (e) => {
        const rect = submitBtn.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.className = 'btn-ripple';
        ripple.style.left = (e.clientX - rect.left) + 'px';
        ripple.style.top = (e.clientY - rect.top) + 'px';
        submitBtn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });
    }
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      formMessage.classList.add('show');
      setTimeout(() => { formMessage.classList.remove('show'); contactForm.reset(); }, 3000);
    });
  }

  /* ================= TIMELINE ANIMATION ================= */
  const timelineItems = document.querySelectorAll('.timeline-item');
  if (timelineItems.length) {
    const options = { threshold: 0.2, rootMargin: '0px 0px -50px 0px' };
    const timelineObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          timelineObserver.unobserve(entry.target);
        }
      });
    }, options);
    timelineItems.forEach((item, idx) => {
      item.style.setProperty('--delay', (0.3 + idx * 0.3) + 's');
      timelineObserver.observe(item);
    });
  }

  /* ================= PROJECT CARD 3D HOVER ================= */
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-10px) rotateX(${y * 10}deg) rotateY(${-x * 10}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
    });
  });

});
