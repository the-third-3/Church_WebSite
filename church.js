// Submenu toggle for dropdown navigation items
function toggleSubMenu(button) {
  const subMenu = button.nextElementSibling;
  if (!subMenu) return;

  const isOpen = subMenu.classList.contains('show');

  // Close all other open submenus for clean accordian behavior
  document.querySelectorAll('.sub-menu.show').forEach((menu) => {
    if (menu !== subMenu) {
      menu.classList.remove('show');
      if (menu.previousElementSibling) {
        menu.previousElementSibling.classList.remove('rotate');
      }
    }
  });

  if (isOpen) {
    subMenu.classList.remove('show');
    button.classList.remove('rotate');
  } else {
    subMenu.classList.add('show');
    button.classList.add('rotate');
  }
}

// Mobile sidebar drawer toggle
function toggleMobileNav() {
  document.body.classList.toggle('mobile-nav-active');
}

// Initialize listeners on DOM load
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggle-btn');
  const mobileToggle = document.getElementById('mobile-toggle');
  const backdrop = document.querySelector('.mobile-backdrop');

  // Desktop sidebar collapse/expand toggle
  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // On small screens, close the drawer
      if (window.innerWidth <= 720) {
        document.body.classList.remove('mobile-nav-active');
      } else {
        document.body.classList.toggle('sidebar-collapsed');
        const isCollapsed = document.body.classList.contains('sidebar-collapsed');
        localStorage.setItem('sidebar_collapsed', isCollapsed ? 'true' : 'false');
      }
    });

    // Restore desktop sidebar state preference
    if (window.innerWidth > 960 && localStorage.getItem('sidebar_collapsed') === 'true') {
      document.body.classList.add('sidebar-collapsed');
    }
  }

  // Mobile toggle button
  if (mobileToggle) {
    mobileToggle.addEventListener('click', toggleMobileNav);
  }

  // Backdrop click to dismiss mobile menu
  if (backdrop) {
    backdrop.addEventListener('click', () => {
      document.body.classList.remove('mobile-nav-active');
    });
  }

  // Close mobile nav on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('mobile-nav-active')) {
      document.body.classList.remove('mobile-nav-active');
    }
  });
});