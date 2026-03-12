document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    const icon = mobileMenuBtn.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }

                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Experience Tabs Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    if (tabBtns.length > 0 && tabPanes.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons and panes
                tabBtns.forEach(b => b.classList.remove('active'));
                tabPanes.forEach(p => p.classList.remove('active'));

                // Add active class to clicked button
                btn.classList.add('active');

                // Show corresponding pane
                const targetId = btn.getAttribute('data-target');
                const targetPane = document.getElementById(targetId);
                if (targetPane) {
                    targetPane.classList.add('active');
                }
            });
        });
    }

    // Digital Readiness Assessment Tool Logic
    const calcBtn = document.getElementById('calculateAssessment');
    if (calcBtn) {
        calcBtn.addEventListener('click', () => {
            const students = parseInt(document.getElementById('studentCount').value) || 0;
            const faculty = parseInt(document.getElementById('facultyCount').value) || 0;
            const depts = parseInt(document.getElementById('deptCount').value) || 0;
            
            if (students < 100 || faculty < 10 || depts < 1) {
                alert("Please enter valid minimum numbers (Students: 100+, Faculty: 10+, Depts: 1+)");
                return;
            }

            // Calculations
            const totalUsers = students + faculty;
            const licenses = totalUsers;
            
            // Assume 1TB (1000GB) per user for OneDrive + extra Sharepoint storage
            // Displaying in PB if over 1000TB, else TB
            const storageTB = (totalUsers * 1) + 10; 
            let storageDisplay = storageTB > 1000 ? (storageTB / 1000).toFixed(1) + ' PB' : storageTB + ' TB';

            const sharepointSites = depts + 1; // 1 per dept + 1 main intranet
            
            let powerPlatForm = "Core Automation Pack";
            if (totalUsers > 5000) {
                powerPlatForm = "Enterprise Automation Suite (Premium Connectors)";
            }

            // Update DOM
            document.getElementById('resM365').innerHTML = `<strong>${licenses.toLocaleString()}</strong> Microsoft 365 A1/A3 Licenses`;
            document.getElementById('resStorage').innerHTML = `<strong>${storageDisplay}</strong> Total Cloud Storage required`;
            document.getElementById('resSharePoint').innerHTML = `<strong>${sharepointSites}</strong> Enterprise SharePoint Hubs (1 Intranet + ${depts} Dept)`;
            document.getElementById('resPowerPlatform').innerHTML = `<strong>${powerPlatForm}</strong> (Leave, Approval frameworks)`;

            // Show Results with simple animation
            const resultsDiv = document.getElementById('assessmentResults');
            resultsDiv.style.opacity = '0';
            resultsDiv.style.display = 'block';
            
            setTimeout(() => {
                resultsDiv.style.transition = 'opacity 0.5s ease';
                resultsDiv.style.opacity = '1';
            }, 50);
            
            // Scroll slightly to reveal
            resultsDiv.scrollIntoView({behavior: 'smooth', block: 'nearest'});
        });
    }
});
