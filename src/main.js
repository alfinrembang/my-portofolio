document.addEventListener('DOMContentLoaded', () => {
  /* =====================
     THEME TOGGLE
  ===================== */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeToggleIcon = document.getElementById('theme-toggle-icon');
  const themeToggleLight = document.getElementById('theme-toggle-light');
  const themeToggleDark = document.getElementById('theme-toggle-dark');
  const htmlEl = document.documentElement;
  
  // Check local storage or system preference
  let isDarkMode = localStorage.getItem('theme') === 'dark' || 
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);

  function updateTheme() {
    if (isDarkMode) {
      htmlEl.classList.add('dark');
      themeToggleBtn.classList.replace('bg-slate-200', 'bg-[#1a1a1a]');
      themeToggleBtn.classList.replace('border-slate-300', 'border-white/20');
      themeToggleIcon.classList.remove('translate-x-0');
      themeToggleIcon.classList.add('translate-x-7');
    } else {
      htmlEl.classList.remove('dark');
      themeToggleBtn.classList.replace('bg-[#1a1a1a]', 'bg-slate-200');
      themeToggleBtn.classList.replace('border-white/20', 'border-slate-300');
      themeToggleIcon.classList.remove('translate-x-7');
      themeToggleIcon.classList.add('translate-x-0');
    }
  }

  // Initialize theme
  updateTheme();

  themeToggleBtn.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    updateTheme();
    // Restart typewriter when theme changes
    if (typeof runTypewriter === 'function') {
      runTypewriter(100);
    }
  });


  /* =====================
     MOBILE MENU
  ===================== */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIconOpen = document.getElementById('menu-icon-open');
  const menuIconClose = document.getElementById('menu-icon-close');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function toggleMenu() {
    const isHidden = mobileMenu.classList.contains('hidden');
    if (isHidden) {
      mobileMenu.classList.remove('hidden');
      menuIconOpen.classList.add('hidden');
      menuIconClose.classList.remove('hidden');
    } else {
      mobileMenu.classList.add('hidden');
      menuIconOpen.classList.remove('hidden');
      menuIconClose.classList.add('hidden');
    }
  }

  mobileMenuBtn.addEventListener('click', toggleMenu);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuIconOpen.classList.remove('hidden');
      menuIconClose.classList.add('hidden');
    });
  });


  /* =====================
     INTERSECTION OBSERVER (FADE IN)
  ===================== */
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.replace('opacity-0', 'opacity-100');
        entry.target.classList.replace('translate-y-12', 'translate-y-0');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in-section').forEach(el => {
    observer.observe(el);
  });


  /* =====================
     POPULATE TECH STACK MARQUEE
  ===================== */
  const techs = [
    { name: 'HTML5', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
    { name: 'CSS3', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
    { name: 'JavaScript', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
    { name: 'Node.js', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
    { name: 'Python', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
    { name: 'PHP', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg' },
    { name: 'React', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
    { name: 'Next.js', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg', invertDark: true },
    { name: 'Laravel', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg' },
    { name: 'Vue.js', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg' },
    { name: 'Tailwind CSS', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
    { name: 'MySQL', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
    { name: 'GitHub', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg', invertDark: true },
    { name: 'VS Code', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg' },
    { name: 'Gemini', url: './src/assets/gemini.png' },
    { name: 'Inertia.js', url: './src/assets/inertiajs.png', scale: 2.2 },
    { name: 'Antigravity', url: './src/assets/antigravity.png', scale: 1.5 },
    { name: 'Cursor', url: './src/assets/cursor.png', scale: 1.5 }
  ];

  const marqueeContainer = document.getElementById('tech-stack-marquee');
  if (marqueeContainer) {
    const fadeLeft = document.createElement('div');
    fadeLeft.className = 'absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#fafafa] dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none transition-colors duration-500';
    
    const fadeRight = document.createElement('div');
    fadeRight.className = 'absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#fafafa] dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none transition-colors duration-500';

    const scrollContainer = document.createElement('div');
    scrollContainer.className = 'flex w-max';

    // Create two sets for infinite loop
    for (let set = 0; set < 2; set++) {
      const group = document.createElement('div');
      group.className = 'flex space-x-12 sm:space-x-20 md:space-x-24 px-6 sm:px-10 md:px-12 animate-marquee';
      if (set === 1) group.setAttribute('aria-hidden', 'true');

      techs.forEach(tech => {
        const item = document.createElement('div');
        item.className = 'flex flex-col items-center justify-center gap-4 group min-w-[80px] sm:min-w-[100px] cursor-pointer';
        
        const imgClass = `w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain transition-all duration-500 group-hover:scale-110 ${tech.invertDark ? 'dark:invert' : ''}`;
        const wrapperStyle = tech.scale ? `style="transform: scale(${tech.scale});"` : '';
        
        item.innerHTML = `
          <div class="flex items-center justify-center" ${wrapperStyle}>
            <img src="${tech.url}" alt="${tech.name}" class="${imgClass}" />
          </div>
          <span class="text-sm font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">${tech.name}</span>
        `;
        group.appendChild(item);
      });

      scrollContainer.appendChild(group);
    }

    marqueeContainer.appendChild(fadeLeft);
    marqueeContainer.appendChild(fadeRight);
    marqueeContainer.appendChild(scrollContainer);
  }


  /* =====================
     POPULATE EXPERIENCE
  ===================== */
  const experiences = [
    {
      year: "2025 awal masuk smk jurusan RPL",
      role: "Belajar dasar dasar pemrograman menggunakan C#, HTML, CSS, JavaScript dan design UI/UX menggunakan Figma",
      company: "Siswa / Pelajar",
      description: "Belajar menguasai logika dan alur untuk mengembangkan website statis terutama di sisi fronted, serta belajar membuat desain UI/UX menggunakan Figma, C# untuk belajar tentang cara menggukanan sebuah kondisi if dan else, serta belajar menggunakan simbol simbol operator logika seperti &&, //, >, <, ==, !=, dll.",
      tech: ["C#", "HTML", "CSS", "JavaScript", "Figma", "Open AI"]
    },
    {
      year: "2025 - 2026 memasuki awal kelas 11 jurusan RPL ",
      role: "Frontend Developer",
      company: "Siswa / Pelajar",
      description: "Belajar menggunakan framework Laravel untuk mengembangkan website dinamis sekala sedang, menggunakan metode MVC (Model View Controller) untuk mengatur alur di sisi backend, belajar untuk menggunakan dan mengolah database MySQL. Selain itu Saya juga belajar menggunakan framework Flutter untuk mengembangkan aplikasi mobile, menggunakan bahasa pemrograman Dart.",
      tech: ["Laravel","PHP", "Flutter", "Dart", "MySQL", "Open AI"]
    },
    {
      year: "2026 memasuki awal kelas 12 jurusan RPL",
      role: "Full Stack Developer & Prompt Engineer",
      company: "Siswa / Pelajar dan melakukan program magang di CV. Tamara Management",
      description: "Mengembangkan dasar sasar pemrograman Web development menggunakan framework Laravel Inertia.js, saya juga belajar menggunakan sebuah teknologi modern yaitu Prompt Engineering untuk membantu saya dalam pengembangan Website, menggunakan teknologi populer untuk mengambangkan website berskala besar React.js untuk sisi frontend dan Laravel untuk sisi backend, saya juga belajar untuk membuat interface pengguna tapi saya lebih banyak belajar untuk mengembangkan Website di sisi backend mengatur migrasi database dan controller.",
      tech: ["Laravel", "Inertia.js", "React.js", "PHP", "MySQL", "Open AI"]
    }
  ];

  const expContainer = document.getElementById('experience-timeline');
  if (expContainer) {
    experiences.forEach((exp, index) => {
      const isEven = index % 2 === 0;
      const delay = index * 150;
      
      const techHTML = exp.tech.map(t => 
        `<span class="px-2.5 py-1 text-[10px] sm:text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-md transition-colors">${t}</span>`
      ).join('');

      const alignClasses = isEven 
        ? 'md:pr-16 md:justify-end text-left md:text-right' 
        : 'md:pl-16 md:ml-auto text-left';
      
      const itemAlignClasses = isEven 
        ? 'md:items-end' 
        : 'md:items-start';

      const techAlignClasses = isEven
        ? 'md:justify-end'
        : 'justify-start';

      const html = `
        <div class="relative flex flex-col md:flex-row items-start group pb-8 md:pb-24 last:pb-0">
          <div class="absolute left-[15px] md:left-1/2 w-4 h-4 rounded-full bg-indigo-500 border-4 border-[#fafafa] dark:border-[#0a0a0a] -translate-x-1/2 mt-1.5 md:mt-0 shadow-[0_0_15px_rgba(99,102,241,0.5)] group-hover:scale-150 transition-transform duration-300 z-20"></div>
          
          <div class="w-full md:w-1/2 flex pl-10 md:pl-0 ${alignClasses}">
            <div class="fade-in-section opacity-0 translate-y-12 transition-all duration-1000 ease-out w-full flex flex-col gap-2 ${itemAlignClasses}" style="transition-delay: ${delay}ms">
              <span class="inline-block px-3 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs sm:text-sm font-bold tracking-wider rounded-full w-max border border-indigo-100 dark:border-indigo-500/20 mb-2 md:mb-0 transition-colors">
                ${exp.year}
              </span>
              <h3 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-500 transition-colors">
                ${exp.role}
              </h3>
              <h4 class="text-sm sm:text-base font-semibold text-slate-600 dark:text-slate-300 transition-colors">
                ${exp.company}
              </h4>
              <p class="mt-3 text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed transition-colors">
                ${exp.description}
              </p>
              
              <div class="flex flex-wrap gap-2 mt-4 ${techAlignClasses}">
                ${techHTML}
              </div>
            </div>
          </div>
        </div>
      `;
      expContainer.insertAdjacentHTML('beforeend', html);
    });

    // Re-observe the new fade-in-sections that were dynamically added
    setTimeout(() => {
      expContainer.querySelectorAll('.fade-in-section').forEach(el => {
        observer.observe(el);
      });
    }, 100);
  }

  /* =====================
     TYPEWRITER EFFECT
  ===================== */
  const titleEl = document.getElementById('hero-type-title');
  const descEl = document.getElementById('hero-type-desc');
  let typingSession = 0;

  // Make it globally available inside the closure so the theme toggle can call it
  window.runTypewriter = function(delayMs = 0) {
    if (!titleEl || !descEl) return;
    
    typingSession++;
    const currentSession = typingSession;

    // Hardcode the strings to avoid HTML whitespace/newline parsing bugs
    const titleHtml = "Full Stack Developer <br class='hidden lg:block'/>& Prompt Engineer";
    const descHtml = "Membangun aplikasi web berskala besar menggunakan teknologi modern.";

    titleEl.innerHTML = '';
    descEl.innerHTML = '';

    // A robust function to type HTML gracefully without breaking tags
    function typeHTML(el, htmlString, speed, keepCursor, callback) {
      let i = 0;
      let currentHTML = '';
      
      function typing() {
        if (currentSession !== typingSession) return; // Abort if user clicked toggle again

        if (i < htmlString.length) {
          if (htmlString.charAt(i) === '<') {
            // Find the end of the tag to insert it all at once
            const endTag = htmlString.indexOf('>', i);
            if (endTag !== -1) {
              currentHTML += htmlString.substring(i, endTag + 1);
              i = endTag + 1;
            } else {
              currentHTML += htmlString.charAt(i);
              i++;
            }
          } else {
            currentHTML += htmlString.charAt(i);
            i++;
          }
          
          el.innerHTML = currentHTML + '<span class="inline-block w-[3px] h-[1em] bg-slate-900 dark:bg-white ml-1 animate-blink align-middle"></span>';
          
          // Instant typing for spaces to avoid slow gaps
          if (htmlString.charAt(i) === ' ' || htmlString.charAt(i-1) === '>') {
            setTimeout(typing, 5); // very fast but prevents stack overflow
          } else {
            setTimeout(typing, speed);
          }
        } else {
          el.innerHTML = currentHTML + (keepCursor ? '<span class="inline-block w-[3px] h-[1em] bg-slate-900 dark:bg-white ml-1 animate-blink align-middle"></span>' : ''); 
          if (callback) callback();
        }
      }
      setTimeout(typing, 100); // initial small delay
    }

    // Wait for the requested delay before starting
    setTimeout(() => {
      if (currentSession !== typingSession) return;
      typeHTML(titleEl, titleHtml, 50, false, () => {
        typeHTML(descEl, descHtml, 30, true); // keep cursor permanently on the last line
      });
    }, delayMs);
  };

  /* =====================
     BOOT SCREEN LOGIC
  ===================== */
  const bootScreen = document.getElementById('boot-screen');
  const bootTextContainer = document.getElementById('boot-text');
  
  if (bootScreen && bootTextContainer) {
    const bootLines = [
      "INITIALIZING ALFIN.RA CORE...",
      "LOADING NEURAL NETWORKS [OK]",
      "ESTABLISHING SECURE CONNECTION [OK]",
      "DECRYPTING PORTFOLIO ASSETS...",
      "BYPASSING SECURITY PROTOCOLS...",
      "ACCESS GRANTED. WELCOME."
    ];
    
    let delay = 300;
    bootLines.forEach((line, index) => {
      setTimeout(() => {
        bootTextContainer.innerHTML += `> ${line}<br>`;
      }, delay);
      // Speed up the sequence towards the end
      delay += (index === bootLines.length - 2) ? 600 : 250; 
    });
    
    // Hide the boot screen after sequence is done
    setTimeout(() => {
      bootScreen.style.opacity = '0';
      setTimeout(() => {
        bootScreen.style.display = 'none';
      }, 500); // Wait for CSS transition (duration-500)
    }, delay + 400);
    
    // Adjust typewriter to start exactly when boot screen fades out
    window.runTypewriter(delay + 500);
  } else {
    // Fallback if boot screen is missing
    window.runTypewriter(1500);
  }
  /* =====================
     3D TILT EFFECT
  ===================== */
  const tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element
      const y = e.clientY - rect.top;  // y position within the element
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate rotation based on mouse position (max 10 degrees tilt)
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      card.style.transition = 'transform 0.1s ease';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      card.style.transition = 'transform 0.5s ease-out';
    });
  });

  /* =====================
     CUSTOM CURSOR
  ===================== */
  const customCursor = document.getElementById('custom-cursor');
  if (customCursor) {
    
    // Always attach the listener to support hybrid devices (touchscreen laptops with mice)
    document.addEventListener('mousemove', (e) => {
      customCursor.style.left = e.clientX + 'px';
      customCursor.style.top = e.clientY + 'px';
      
      // If it was hidden by a touch event, show it again
      if (customCursor.style.display === 'none') {
        customCursor.style.display = 'block';
      }
    });

    // Hide custom cursor on actual touch interaction
    document.addEventListener('touchstart', () => {
      customCursor.style.display = 'none';
    });

    // Add active state on hoverable elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .tilt-card, .glitch-hover, .glitch-img-hover');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        customCursor.classList.add('cursor-active');
      });
      el.addEventListener('mouseleave', () => {
        customCursor.classList.remove('cursor-active');
      });
    });
  }

});
