const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

function applyTheme(theme) {
    if (theme === 'light') {
        body.classList.add('light-mode');
        themeToggle.textContent = '🌙';
    } else {
        body.classList.remove('light-mode');
        themeToggle.textContent = '☀️';
    }
}

const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
    const isLight = body.classList.toggle('light-mode');
    const newTheme = isLight ? 'light' : 'dark';
    themeToggle.textContent = isLight ? '🌙' : '☀️';
    localStorage.setItem('theme', newTheme);
});

const centerLastProject = () => {
    const projectGrid = document.querySelector('.projects-grid');
    const visibleProjects = Array.from(projectGrid.children).filter(card => 
        !card.classList.contains('hidden')
    );
    visibleProjects.forEach(card => card.classList.remove('centered-single'));
    if (visibleProjects.length % 2 !== 0 && visibleProjects.length > 0) {
        const lastCard = visibleProjects[visibleProjects.length - 1];
        lastCard.classList.add('centered-single');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    
    // Scroll fluide
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.hash !== "") {
                e.preventDefault();
                
                const hash = this.hash;
                const targetElement = document.querySelector(hash);

                if (targetElement) {
                    const headerHeight = document.querySelector('.main-header').offsetHeight;
                    const topPosition = targetElement.offsetTop - headerHeight;

                    window.scrollTo({
                        top: topPosition,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    centerLastProject();

    // Filtrage des projets
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filterValue = button.getAttribute('data-filter');
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    setTimeout(() => {
                        card.classList.remove('hidden');
                        centerLastProject();
                    }, 400); // Temps pour la transition CSS
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.classList.add('hidden');
                        centerLastProject();
                    }, 400);
                }
            });
        });
    });
});

// Aniamtions à l'apparition/disparition
const animatedElements = document.querySelectorAll('.skills-category, .project-card, .profile-info, .timeline-item, h2');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
}, {
    threshold: 0.1 // L'animation se déclenche quand 10% de l'élément est visible
});

animatedElements.forEach(element => {
    observer.observe(element);
});