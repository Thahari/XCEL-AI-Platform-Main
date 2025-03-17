document.addEventListener('DOMContentLoaded', function() {
    const skills = document.querySelectorAll('.skills li');
    skills.forEach(skill => {
    skill.addEventListener('mouseover', () => {
    skill.style.transform = 'scale(1.1)';
    });
    skill.addEventListener('mouseout', () => {
    skill.style.transform = 'scale(1)';
    });
    });
    });