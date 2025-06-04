let search = document.querySelector('.search-box');

document.querySelector('#search-icon').onclick = () => {
    search.classList.toggle('active');
    navbar.classList.remove('active');
}

let navbar = document.querySelector('.navbar');

document.querySelector('#menu-icon').onclick = () => {
    navbar.classList.toggle('active');
    search.classList.remove('active');
}

window.onscroll = () => {
    navbar.classList.remove('active');
    search.classList.remove('active');

    const header = document.querySelector('header');
    const aboutSection = document.getElementById('about');
    const headerHeight = header.offsetHeight;
    const scrollY = window.scrollY;
    const aboutTop = aboutSection.offsetTop;

    if (scrollY + headerHeight >= aboutTop) {
        header.classList.add('shadow');
    } else {
        header.classList.remove('shadow');
    }
}