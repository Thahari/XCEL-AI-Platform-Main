let container = document.getElementById('container')

toggle = () => {
	container.classList.toggle('sign-in')
	container.classList.toggle('sign-up')
}

setTimeout(() => {
	container.classList.add('sign-in')
}, 200)
document.addEventListener('DOMContentLoaded', function () {
  // Initialize Lucide icons
  lucide.createIcons();

  // Mobile menu toggle
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  const menuIcon = document.querySelector('.menu-icon');
  const closeIcon = document.querySelector('.close-icon');

  menuBtn.addEventListener('click', function () {
    mobileNav.classList.toggle('hidden');
    menuIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
  });

  // Sidebar toggle
  const sidebarToggle = document.querySelector('.sidebar-toggle');
  const sidebar = document.querySelector('.sidebar');

  sidebarToggle.addEventListener('click', function () {
    sidebar.classList.toggle('collapsed');
  });

  // Mobile sidebar toggle
  function toggleMobileSidebar() {
    if (window.innerWidth <= 768) {
      sidebar.classList.toggle('visible');
    }
  }

  // Top navigation active state and page switching
  const navItems = document.querySelectorAll('.nav-item, .mobile-nav-item');
  const pageTitle = document.getElementById('page-title');

  navItems.forEach(item => {
    item.addEventListener('click', function (e) {
      if (this.tagName === 'A' && this.getAttribute('href') !== '#') {
        return;
      }
      e.preventDefault();

      // Remove active class from all items
      navItems.forEach(navItem => {
        navItem.classList.remove('active');
      });

      // Add active class to clicked item
      this.classList.add('active');

      // Update page title based on clicked item
      const page = this.getAttribute('data-page');
      if (page) {
        pageTitle.textContent = page.charAt(0).toUpperCase() + page.slice(1);

        // Show sidebar when navigating to a page
        if (window.innerWidth <= 768) {
          sidebar.classList.add('visible');
        }
      }

      // Close mobile menu if open
      if (!mobileNav.classList.contains('hidden')) {
        mobileNav.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      }
    });
  });

  // Sidebar navigation active state
  const sidebarNavItems = document.querySelectorAll('.sidebar-nav-item');

  sidebarNavItems.forEach(item => {
    item.addEventListener('click', function (e) {
      if (this.tagName === 'A' && this.getAttribute('href') !== '#') {
        return;
      }
      e.preventDefault();

      // Remove active class from all items
      sidebarNavItems.forEach(navItem => {
        navItem.classList.remove('active');
      });

      // Add active class to clicked item
      this.classList.add('active');

      // Update page title based on clicked sidebar item
      const page = this.getAttribute('data-page');
      if (page) {
        pageTitle.textContent = page.charAt(0).toUpperCase() + page.slice(1);
      }
      // Close sidebar on mobile after selection
      if (window.innerWidth <= 768) {
        sidebar.classList.remove('visible');
      }
    });
  });

  // Auto-show sidebar on page load for desktop
  function handleResize() {
    if (window.innerWidth > 768) {
      sidebar.classList.remove('visible');
      sidebar.classList.remove('collapsed');
    } else {
      // On mobile, hide sidebar by default
      sidebar.classList.remove('visible');
    }
  }

  // Handle window resize
  window.addEventListener('resize', handleResize);

  // Initial setup
  handleResize();

  // Show sidebar when hovering near the left edge on mobile
  const edgeTriggerWidth = 20; // pixels from left edge
  let edgeTimer;

  document.addEventListener('mousemove', function (e) {
    if (window.innerWidth <= 768) {
      if (e.clientX <= edgeTriggerWidth) {
        clearTimeout(edgeTimer);
        sidebar.classList.add('visible');
      } else if (e.clientX > 300) {
        // Only hide if mouse moves far enough away
        clearTimeout(edgeTimer);
        edgeTimer = setTimeout(() => {
          if (!sidebar.contains(document.activeElement)) {
            sidebar.classList.remove('visible');
          }
        }, 500);
      }
    }
  });

  // Automatically show sidebar when navigating to a new page
  function showSidebarOnNavigation() {
    if (window.innerWidth > 768) {
      sidebar.classList.remove('collapsed');
    } else {
      sidebar.classList.add('visible');
    }
  }

  // Simulate navigation for demo purposes
  navItems.forEach(item => {
    item.addEventListener('click', showSidebarOnNavigation);
  });
});
