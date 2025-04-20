// Modal functionality for projects
function openProjectModal(modalId) {
  document.getElementById(modalId).style.display = "block";
  document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
}

function closeProjectModal(modalId) {
  document.getElementById(modalId).style.display = "none";
  document.body.style.overflow = "auto"; // Restore scrolling
}

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
  const modals = document.getElementsByClassName('project-modal');
  for (let i = 0; i < modals.length; i++) {
    if (event.target == modals[i]) {
      modals[i].style.display = "none";
      document.body.style.overflow = "auto";
    }
  }
});

// Initialize modal functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Add click listeners to all project cards
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('click', function() {
      const modalId = this.getAttribute('data-modal');
      if (modalId) {
        openProjectModal(modalId);
      }
    });
  });

  // Add click listeners to close buttons
  const closeButtons = document.querySelectorAll('.modal-close');
  closeButtons.forEach(button => {
    button.addEventListener('click', function() {
      const modalId = this.closest('.project-modal').id;
      closeProjectModal(modalId);
    });
  });
});
