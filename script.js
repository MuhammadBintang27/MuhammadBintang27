if (window.location.pathname.includes("index.html")) {
    const h1Element = document.querySelector("#myHeader h1");
    // Sembunyikan h1 saat halaman dimuat
    h1Element.style.display = "none";

    // Event listener untuk scroll
    window.addEventListener("scroll", function () {
        // Periksa posisi scroll
        if (window.pageYOffset > 180) {
            // Tampilkan kembali h1
            h1Element.style.display = "block";
        } else {
            // Sembunyikan h1
            h1Element.style.display = "none";
        }
    });
}

window.addEventListener("scroll", function() {
    var h3Element = document.querySelector(".text-overlay");
    var scrollPosition = window.scrollY;

    if (scrollPosition > 180) {
        h3Element.style.display = "none";
    } else {
        h3Element.style.display = "block";
    }
});

window.addEventListener('scroll', function() {
    var contentSection = document.querySelector('.content');
    var navLinks = document.querySelectorAll('.nav-link');
    var scrollPosition = window.scrollY;

    if (scrollPosition >= contentSection.offsetTop) {
        navLinks.forEach(function(link) {
            link.classList.remove('active');
        });
        var targetNavLink = document.querySelector('.nav-right a[href="#index"]');
        if (targetNavLink) {
            targetNavLink.classList.add('active');
        }
    } else {
        navLinks.forEach(function(link) {
            link.classList.remove('active');
        });
    }
});
