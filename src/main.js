import './style.css';


/* =========================================================
   THEME TOGGLE
========================================================= */

const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

function currentTheme() {
  return root.getAttribute('data-theme') === 'dark'
    ? 'dark'
    : 'light';
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {

    const next =
      currentTheme() === 'dark'
        ? 'light'
        : 'dark';

    root.setAttribute('data-theme', next);

    localStorage.setItem(
      'hurudza-theme',
      next
    );

  });
}


/* =========================================================
   NAVIGATION
========================================================= */

const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');


if (nav) {

  window.addEventListener(
    'scroll',
    () => {

      nav.classList.toggle(
        'is-scrolled',
        window.scrollY > 12
      );

    },
    {
      passive: true
    }
  );

}


if (navToggle && nav) {

  navToggle.addEventListener(
    'click',
    () => {

      const isOpen =
        nav.classList.toggle('is-open');

      navToggle.setAttribute(
        'aria-expanded',
        String(isOpen)
      );

    }
  );

}


if (navLinks && nav) {

  navLinks
    .querySelectorAll('a')
    .forEach((link) => {

      link.addEventListener(
        'click',
        () => {

          nav.classList.remove('is-open');

          if (navToggle) {

            navToggle.setAttribute(
              'aria-expanded',
              'false'
            );

          }

        }
      );

    });

}


/* =========================================================
   HERO WORD ROTATOR
========================================================= */

const rotatorWords =
  document.querySelectorAll(
    '#rotator .rotator__word'
  );

let rotatorIndex = 0;


if (rotatorWords.length) {

  setInterval(() => {

    rotatorWords[
      rotatorIndex
    ].classList.remove('is-active');

    rotatorIndex =
      (rotatorIndex + 1) %
      rotatorWords.length;

    rotatorWords[
      rotatorIndex
    ].classList.add('is-active');

  }, 2400);

}


/* =========================================================
   REUSABLE CAROUSEL
========================================================= */

function initCarousel({
  trackId,
  slideClass,
  dotsId,
  prevId,
  nextId,
  interval = 4500
}) {

  const track =
    document.getElementById(trackId);

  const slides = track
    ? Array.from(
        track.querySelectorAll(slideClass)
      )
    : [];

  const dotsWrap =
    document.getElementById(dotsId);

  const prevBtn =
    document.getElementById(prevId);

  const nextBtn =
    document.getElementById(nextId);


  if (!slides.length) {
    return;
  }


  let current = 0;
  let autoplay;


  function renderDots() {

    if (!dotsWrap) {
      return;
    }

    dotsWrap.innerHTML = '';


    slides.forEach((_, i) => {

      const dot =
        document.createElement('button');

      dot.setAttribute(
        'aria-label',
        `Go to slide ${i + 1}`
      );


      if (i === current) {

        dot.classList.add(
          'is-active'
        );

      }


      dot.addEventListener(
        'click',
        () => {

          goTo(i);
          startAutoplay();

        }
      );


      dotsWrap.appendChild(dot);

    });

  }


  function goTo(index) {

    slides[
      current
    ].classList.remove('is-active');


    if (
      dotsWrap &&
      dotsWrap.children[current]
    ) {

      dotsWrap.children[
        current
      ].classList.remove('is-active');

    }


    current =
      (index + slides.length) %
      slides.length;


    slides[
      current
    ].classList.add('is-active');


    if (
      dotsWrap &&
      dotsWrap.children[current]
    ) {

      dotsWrap.children[
        current
      ].classList.add('is-active');

    }

  }


  function startAutoplay() {

    clearInterval(autoplay);

    autoplay = setInterval(
      () => {

        goTo(current + 1);

      },
      interval
    );

  }


  renderDots();
  startAutoplay();


  if (nextBtn) {

    nextBtn.addEventListener(
      'click',
      () => {

        goTo(current + 1);
        startAutoplay();

      }
    );

  }


  if (prevBtn) {

    prevBtn.addEventListener(
      'click',
      () => {

        goTo(current - 1);
        startAutoplay();

      }
    );

  }

}


/* =========================================================
   HERO CAROUSEL
========================================================= */

initCarousel({
  trackId: 'carouselTrack',
  slideClass: '.carousel__slide',
  dotsId: 'carouselDots',
  prevId: 'carouselPrev',
  nextId: 'carouselNext'
});


/* =========================================================
   STORY GALLERY CAROUSEL
========================================================= */

initCarousel({
  trackId: 'storyGalleryTrack',
  slideClass: '.story__gallery-slide',
  dotsId: 'storyGalleryDots',
  prevId: 'storyGalleryPrev',
  nextId: 'storyGalleryNext',
  interval: 5000
});


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealEls =
  document.querySelectorAll('.reveal');


if (revealEls.length) {

  const io =
    new IntersectionObserver(
      (entries) => {

        entries.forEach(
          (entry) => {

            if (
              entry.isIntersecting
            ) {

              entry.target.classList.add(
                'is-visible'
              );

              io.unobserve(
                entry.target
              );

            }

          }
        );

      },
      {
        threshold: 0.15,
        rootMargin:
          '0px 0px -40px 0px'
      }
    );


  revealEls.forEach(
    (el) => io.observe(el)
  );

}


/* =========================================================
   CONTACT FORM
   FormSubmit AJAX
========================================================= */

const form =
  document.getElementById(
    'contactForm'
  );

const note =
  document.getElementById(
    'formNote'
  );


if (form) {

  form.addEventListener(
    'submit',
    async (event) => {

      /*
       * Prevent the normal FormSubmit redirect.
       * We will submit using fetch instead.
       */

      event.preventDefault();


      const button =
        form.querySelector(
          'button[type="submit"]'
        );


      const originalButtonText =
        button
          ? button.textContent
          : 'Send message';


      /*
       * Get customer name before resetting
       * the form.
       */

      const name =
        form.elements['name']
          ?.value
          .trim() || '';


      /*
       * Disable the button while sending.
       */

      if (button) {

        button.disabled = true;

        button.textContent =
          'Sending...';

      }


      /*
       * Display sending status.
       */

      if (note) {

        note.textContent =
          'Sending your message...';

        note.classList.remove(
          'is-success',
          'is-error'
        );

      }


      try {

        /*
         * Convert the form fields into
         * FormData.
         */

        const formData =
          new FormData(form);


        /*
         * Send the form to FormSubmit
         * without leaving the website.
         */

        const response =
          await fetch(
            form.action,
            {
              method: 'POST',

              body: formData,

              headers: {
                Accept:
                  'application/json'
              }
            }
          );


        /*
         * Check if FormSubmit accepted
         * the submission.
         */

        if (!response.ok) {

          throw new Error(
            `Form submission failed: ${response.status}`
          );

        }


        /*
         * Successfully sent.
         */

        form.reset();


        if (note) {

          note.textContent =
            `Thank you${name ? `, ${name}` : ''}! Your message has been sent. We'll get back to you shortly.`;

          note.classList.add(
            'is-success'
          );

        }


        /*
         * Update button temporarily.
         */

        if (button) {

          button.textContent =
            'Message sent ✓';

        }


        /*
         * Restore the button after
         * four seconds.
         */

        setTimeout(
          () => {

            if (button) {

              button.disabled = false;

              button.textContent =
                originalButtonText;

            }

          },
          4000
        );


      } catch (error) {

        console.error(
          'Contact form error:',
          error
        );


        /*
         * Show user-friendly error.
         */

        if (note) {

          note.textContent =
            'Sorry, something went wrong. Please try again or email us directly.';

          note.classList.add(
            'is-error'
          );

        }


        /*
         * Re-enable the button.
         */

        if (button) {

          button.disabled = false;

          button.textContent =
            originalButtonText;

        }

      }

    }
  );

}