        // Mobile Menu Toggle
        const mobileMenu = document.getElementById('mobile-menu');
        const navList = document.querySelector('.nav-list');

        mobileMenu.addEventListener('click', () => {
            navList.classList.toggle('active');
        });

        // Smooth Scrolling & Active Nav Link
        document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                navList.classList.remove('active'); // Close mobile menu on click

                document.querySelectorAll('nav a').forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                     // Adjust for sticky header height if necessary
                    const headerOffset = document.querySelector('header').offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - headerOffset;
                
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            });
        });
        
        // Update active nav link on scroll
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav ul li a');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - document.querySelector('header').offsetHeight - 50; // Adjusted offset
                if (pageYOffset >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === current) {
                    link.classList.add('active');
                }
            });
             // Default to home if no section is active (e.g. at the very top or bottom out of section range)
            if (!current && pageYOffset < sections[0].offsetTop) {
                 document.querySelector('nav ul li a[href="#hero"]').classList.add('active');
            }
        });


        // Form Submission
        const reportForm = document.getElementById('reportForm');
        const formMessage = document.getElementById('formMessage');

        if (reportForm) {
            reportForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Basic validation (can be expanded)
                const name = document.getElementById('name').value;
                const address = document.getElementById('address').value;
                const schedule = document.getElementById('collection_schedule').value;
                const missedDate = document.getElementById('missed_date').value;

                if (!name || !address || !schedule || !missedDate) {
                    formMessage.textContent = 'Please fill in all required fields.';
                    formMessage.style.color = 'red';
                    return;
                }

                // Simulate form submission
                formMessage.textContent = 'Thank you! Your report has been submitted. (This is a demo - no data is actually sent)';
                formMessage.style.color = 'green';
                reportForm.reset();

                setTimeout(() => {
                    formMessage.textContent = '';
                }, 5000);
            });
        }