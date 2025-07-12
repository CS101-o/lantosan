document.addEventListener('DOMContentLoaded', function() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.hero-slider .slide');
    const totalSlides = slides.length;
    const nextButton = document.querySelector('.slide-arrow.next');
    const prevButton = document.querySelector('.slide-arrow.prev');

    function showSlide(index) {
        // Loop back to the first slide if at the end
        if (index >= totalSlides) {
            currentSlide = 0;
        }
        // Loop to the last slide if at the beginning
        else if (index < 0) {
            currentSlide = totalSlides - 1;
        } else {
            currentSlide = index;
        }

        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });

        // Show the new current slide
        slides[currentSlide].classList.add('active');
    }

    // Event Listeners for arrow buttons
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            showSlide(currentSlide + 1);
        });
    }

    if (prevButton) {
        prevButton.addEventListener('click', function() {
            showSlide(currentSlide - 1);
        });
    }

    // Optional: Auto-play the slider every 7 seconds
    setInterval(function() {
        showSlide(currentSlide + 1);
    }, 7000);

    // Show the first slide initially
    showSlide(currentSlide);
});