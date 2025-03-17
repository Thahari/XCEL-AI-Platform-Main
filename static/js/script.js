document.addEventListener('DOMContentLoaded', function() { 
  lucide.createIcons(); 

  const menuBtn = document.querySelector('.mobile-menu-btn'); 
  const mobileNav = document.querySelector('.mobile-nav'); 
  const menuIcon = document.querySelector('.menu-icon'); 
  const closeIcon = document.querySelector('.close-icon'); 
  const sidebarToggle = document.querySelector('.sidebar-toggle'); 
  const sidebar = document.querySelector('.sidebar'); 
  const navItems = document.querySelectorAll('.nav-item, .mobile-nav-item'); 
  const pageTitle = document.getElementById('page-title');
  const sidebarNavItems = document.querySelectorAll('.sidebar-nav-item');

  // Mobile menu toggle
  menuBtn?.addEventListener('click', function() { 
    mobileNav?.classList.toggle('hidden'); 
    menuIcon?.classList.toggle('hidden'); 
    closeIcon?.classList.toggle('hidden'); 
  });

  // Sidebar toggle
  sidebarToggle?.addEventListener('click', function() { 
    sidebar?.classList.toggle('collapsed'); 
  });

  // Navigation item click handling (Login, About & Profile included)
  navItems.forEach(item => { 
    item.addEventListener('click', function(e) { 
      const link = this.closest('a'); 
      if (link && link.getAttribute('href') !== '#' && link.href) {  
          return; 
      } 
      e.preventDefault(); 

      // Remove active state from all navigation items
      navItems.forEach(navItem => navItem.classList.remove('active')); 
      this.classList.add('active'); 

      // Update page title dynamically
      const page = this.getAttribute('data-page'); 
      if (page) { 
        pageTitle.textContent = page.charAt(0).toUpperCase() + page.slice(1); 
      }

      // Mobile behavior
      if (window.innerWidth <= 768) { 
        mobileNav?.classList.add('hidden'); 
        menuIcon?.classList.remove('hidden'); 
        closeIcon?.classList.add('hidden'); 
        sidebar?.classList.add('visible'); 
      } 
    }); 
  });

  // Sidebar navigation item handling (Includes Login)
  sidebarNavItems.forEach(item => { 
    item.addEventListener('click', function(e) { 
      const link = this.closest('a'); 
      if (link && link.getAttribute('href') !== '#') { 
        return; 
      } 
      e.preventDefault(); 

      sidebarNavItems.forEach(navItem => navItem.classList.remove('active')); 
      this.classList.add('active'); 

      // Update page title for sidebar items
      const page = this.getAttribute('data-section'); 
      if (page) { 
        pageTitle.textContent = page.charAt(0).toUpperCase() + page.slice(1); 
      }

      // Close sidebar on mobile after selection
      if (window.innerWidth <= 768) { 
        sidebar?.classList.remove('visible'); 
      } 
    }); 
  });

  // Ensure sidebar visibility on different screen sizes
  function handleResize() { 
    if (window.innerWidth > 768) { 
      sidebar?.classList.remove('visible', 'collapsed'); 
    } else { 
      sidebar?.classList.remove('visible'); 
    } 
  } 
  window.addEventListener('resize', handleResize); 
  handleResize();

  // Sidebar auto-show when hovering near the left edge (mobile)
  let edgeTimer;
  document.addEventListener('mousemove', function(e) { 
    if (window.innerWidth <= 768) { 
      if (e.clientX <= 20) { 
        clearTimeout(edgeTimer); 
        sidebar?.classList.add('visible'); 
      } else if (e.clientX > 300) {
        clearTimeout(edgeTimer); 
        edgeTimer = setTimeout(() => { 
          if (!sidebar.contains(document.activeElement)) { 
            sidebar?.classList.remove('visible'); 
          } 
        }, 500); 
      } 
    } 
  });

  // Ensure sidebar remains open when navigating on larger screens
  navItems.forEach(item => { 
    item.addEventListener('click', function() {
      if (window.innerWidth > 768) {
        sidebar?.classList.remove('collapsed'); 
      } else { 
        sidebar?.classList.add('visible'); 
      } 
    }); 
  }); 
});
