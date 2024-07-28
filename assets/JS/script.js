  // Dark Mode Toggle
  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    const navbar = document.querySelector('.navbar');

    // Load the saved theme preference
    if (localStorage.getItem('dark-mode') === 'enabled') {
      body.classList.add('dark-mode');
      navbar.classList.add('dark-mode');
    }

    // Toggle dark mode on click
    toggle.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
      navbar.classList.toggle('dark-mode');
      if (body.classList.contains('dark-mode')) {
        localStorage.setItem('dark-mode', 'enabled');
      } else {
        localStorage.removeItem('dark-mode');
      }
    });
  });
