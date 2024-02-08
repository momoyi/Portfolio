console.log("--HOMEPAGE LOADED--");

const init = () => {
  function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Marquee rows in hero section
  const marquee1 = $(".hero_rows").children().eq(0);
  const marquee2 = $(".hero_rows").children().eq(1);

  if (!marquee1) {
    return;
  }
  if (!marquee2) {
    return;
  }

  const duration = 35;
  const marquee1_content = marquee1.children().eq(0);
  const marquee2_content = marquee2.children().eq(0);

  if (!marquee1_content) {
    return;
  }
  if (!marquee2_content) {
    return;
  }

  const marquee1_contentClone = marquee1_content.clone();
  marquee1.append(marquee1_contentClone);
  const marquee2_contentClone = marquee2_content.clone();
  marquee2.append(marquee2_contentClone);

  let tween1;
  let tween2;

  const playMarquee1 = () => {
    let progress = tween1 ? tween1.progress() : 0;
    tween1 && tween1.progress(0).kill();
    const width = marquee1_content.width();
    const gap = parseInt(marquee1_content.css("columnGap"), 10);
    const distanceToTranslate = -1 * (gap + width);

    tween1 = gsap.timeline();
    tween1.fromTo(
      marquee1.children(),
      { x: 200 },
      { x: 0, duration: 1, ease: "power3.inOut" },
    );
    tween1.fromTo(
      marquee1.children(),
      { x: 0 },
      { x: distanceToTranslate, duration, ease: "none", repeat: -1 },
      ">-0.2",
    );
    tween1.progress(progress);
  };

  const playMarquee2 = () => {
    let progress = tween2 ? tween2.progress() : 0;
    tween2 && tween2.progress(0).kill();
    const width = marquee2_content.width();
    const gap = parseInt(marquee2_content.css("columnGap"), 10);
    const distanceToTranslate = -1 * (gap + width);

    gsap.set(marquee2.children(), { x: distanceToTranslate });
    tween2 = gsap.timeline();
    tween2.fromTo(
      marquee2.children(),
      { x: distanceToTranslate - 200 },
      { x: distanceToTranslate, duration: 1, ease: "power3.inOut" },
    );
    tween2.fromTo(
      marquee2.children(),
      { x: distanceToTranslate },
      { x: 0, duration, ease: "none", repeat: -1 },
      ">-0.2",
    );
    tween2.progress(progress);
  };

  const load = () => {
    //Loader elements
    const initialLoader = document.querySelector(".loader_container");
    const subsequentLoader = document.querySelector(".grey_loader");
    const loaderTrack = document.querySelector(".loader_track");
    const loaderCounter = document.querySelector(".loader_counter");
    const facts = document.querySelectorAll(".loader_fact");

    // Marquee variables
    const width = marquee1_content.width();
    const gap = parseInt(marquee1_content.css("columnGap"), 10);
    const distanceToTranslate = -1 * (gap + width);

    document.body.style.overflowY = "hidden";
    const selectedFact = facts[randomInteger(0, facts.length - 1)];

    // Function to check if the preloader has been shown
    function hasPreloaderBeenShown() {
      return sessionStorage.getItem("preloaderShown") === "true";
    }

    // Function to set the flag indicating that the preloader has been shown
    function setPreloaderShown() {
      sessionStorage.setItem("preloaderShown", "true");
    }

    // Function to show or hide the preloader based on the session storage (replace '.page-load-wrapper' with your class name)
    function handlePreloader() {
      let loaderTl = gsap.timeline({});
      gsap.set(marquee1.children(), { x: 200 });
      gsap.set(marquee2.children(), { x: distanceToTranslate });

      if (!hasPreloaderBeenShown()) {
        initialLoader.style.display = "flex";
        subsequentLoader.style.display = "none";

        // Reveal page wrapper to avoid flashing.
        loaderTl.to(".page-wrapper", {
          autoAlpha: 1,
          duration: 0.5,
          ease: "power1.out",
        });

        let tween = gsap.to(loaderTrack, {
          width: "100%",
          duration: 3,
          ease: "power1.out",
          paused: true,
          onUpdate: countPercent,
          onComplete: () => {
            document.body.style.overflowY = "auto";
          },
        });

        function countPercent() {
          newPercent = (tween.progress() * 100).toFixed();

          loaderCounter.innerText = newPercent + "%";
        }

        facts.forEach((el) => {
          el.style.display = "none";
        });
        selectedFact.setAttribute("style", "display:flex !important");
        loaderTl.to(selectedFact, {
          y: 0,
          autoAlpha: 1,
          ease: "power3.inOut",
          duration: 0.5,
          delay: 0.5,
        });
        loaderTl.add(tween.play());
        loaderTl.to(loaderCounter, {
          y: "-100%",
          autoAlpha: 0,
          ease: "power3.inOut",
          duration: 0.4,
          delay: 0.5,
        });
        loaderTl.to(
          ".loader_fact-label",
          {
            y: "-100%",
            autoAlpha: 0,
            ease: "power3.inOut",
            duration: 0.4,
          },
          "<",
        );
        loaderTl.to(
          selectedFact,
          {
            y: "-100%",
            autoAlpha: 0,
            ease: "power3.inOut",
            duration: 0.4,
          },
          "<",
        );
        loaderTl.to(
          ".loader_track-container",
          {
            autoAlpha: 0,
            ease: "power1.out",
            duration: 0.3,
          },
          "<",
        );
        loaderTl.to(
          initialLoader,
          {
            y: "-100%",
            ease: "power3.inOut",
            duration: 0.7,
          },
          ">",
        );
        loaderTl.fromTo(
          marquee1.children(),
          { x: 200 },
          {
            x: 0,
            duration: 1,
            ease: "power3.inOut",
          },
          ">-0.75",
        );
        loaderTl.fromTo(
          marquee1.children(),
          { x: 0 },
          { x: distanceToTranslate, duration, ease: "none", repeat: -1 },
          ">-0.2",
        );
        loaderTl.fromTo(
          marquee2.children(),
          { x: distanceToTranslate - 200 },
          { x: distanceToTranslate, duration: 1, ease: "power3.inOut" },
          "<-0.75",
        );
        loaderTl.fromTo(
          marquee2.children(),
          { x: distanceToTranslate },
          { x: 0, duration, ease: "none", repeat: -1 },
          ">-0.2",
        );

        // Set the flag to indicate that the preloader has been shown
        setPreloaderShown();
      } else {
        initialLoader.style.display = "none";
        subsequentLoader.style.display = "flex";

        // Reveal page wrapper to avoid flashing.
        loaderTl.to(".page-wrapper", {
          autoAlpha: 1,
          duration: 0.5,
          ease: "power1.out",
        });

        loaderTl.to(subsequentLoader, {
          autoAlpha: 0,
          ease: "power3.out",
          duration: 0.7,
          onComplete: () => {
            document.body.style.overflowY = "auto";
          },
        });
        loaderTl.fromTo(
          marquee1.children(),
          { x: 200 },
          { x: 0, duration: 1, ease: "power3.inOut" },
          ">-0.75",
        );
        loaderTl.fromTo(
          marquee1.children(),
          { x: 0 },
          { x: distanceToTranslate, duration, ease: "none", repeat: -1 },
          ">-0.2",
        );
        loaderTl.fromTo(
          marquee2.children(),
          { x: distanceToTranslate - 200 },
          { x: distanceToTranslate, duration: 1, ease: "power3.inOut" },
          "<-0.75",
        );
        loaderTl.fromTo(
          marquee2.children(),
          { x: distanceToTranslate },
          { x: 0, duration, ease: "none", repeat: -1 },
          ">-0.2",
        );
      }
    }

    handlePreloader();
  };

  load();

  function debounce(func) {
    var timer;
    return function(event) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(
        () => {
          func();
        },
        500,
        event,
      );
    };
  }

  window.addEventListener("resize", () => {
    debounce(playMarquee1);
    debounce(playMarquee2);
    trackMedia();
  });

  // Hero Media Reveal
  const hero_row_container1 = document.querySelectorAll(
    ".hero_row-container",
  )[0];
  const hero_media = document.querySelectorAll(".hero_media-container");
  const hero_row_container2 = document.querySelectorAll(
    ".hero_row-container",
  )[1];

  document.querySelectorAll(".hero_media-container").forEach((container) => {
    gsap.set(container, { autoAlpha: 1 });
  });

  let heroTL1 = gsap.timeline({
    paused: true,
    duration: 0.25,
    ease: "power1.out",
  });

  let heroTL2 = gsap.timeline({
    paused: true,
    duration: 0.25,
    ease: "power1.out",
  });

  heroTL1.to(hero_media[0], {
    height: hero_media[1].querySelector(".hero_media").offsetHeight,
  });

  heroTL1.from(hero_media[0].querySelector(".hero_media"), { scale: 1.2 }, "<");

  heroTL2.to(hero_media[1], {
    height: hero_media[1].querySelector(".hero_media").offsetHeight,
  });
  heroTL2.from(hero_media[1].querySelector(".hero_media"), { scale: 1.2 }, "<");

  hero_row_container1.addEventListener("mouseenter", () => {
    heroTL1.play();
  });
  hero_row_container2.addEventListener("mouseenter", () => {
    heroTL2.play();
  });

  hero_row_container1.addEventListener("mouseleave", () => {
    heroTL1.reverse();
  });
  hero_row_container2.addEventListener("mouseleave", () => {
    heroTL2.reverse();
  });
};

// Playground Section Images Animation
let playgroundTL = gsap.timeline({
  scrollTrigger: {
    trigger: ".section_playground",
    start: "top 55%",
    toggleActions: "play pause play reverse",
  },
  duration: 0.5,
  ease: "power3.inOut",
});

playgroundTL.fromTo(
  ".playground_preview .preview_overlay",
  {
    height: "100%",
  },
  {
    height: 0,
  },
);

playgroundTL.to(
  ".playground_preview img",
  {
    scale: 1,
  },
  "<",
);

// Text Fill Animation
const target1 = new SplitType("#textFill1", { types: "lines, words" });
const target2 = new SplitType("#textFill2", { types: "lines, words" });
const target3 = new SplitType("#textFill3", { types: "lines, words" });

const lines = document.querySelectorAll('[data-anim="text-color-fill"] .line');
lines.forEach((line) => {
  gsap.to(line, {
    scrollTrigger: {
      trigger: line,
      start: "top center",
      end: "bottom center",
      scrub: 0.5,
    },
    backgroundPosition: "0% 0%",
  });
});

// Work section expands
gsap.from(".section_work", {
  scale: 0.925,
  duration: 0.5,
  ease: "power3.inOut",
  scrollTrigger: {
    trigger: ".section_work",
    start: "top 45%",
    toggleActions: "play pause play reverse",
  },
});

// Testimonials section reveal on scroll
let testimonialsTL = gsap.timeline({
  scrollTrigger: {
    trigger: ".swiper",
    start: "top 65%",
    toggleActions: "play pause play reverse",
  },
  ease: "power3.inOut",
});

testimonialsTL.from(".swiper-slide.is-testimonial-card", {
  y: 48,
  autoAlpha: 0,
  duration: 0.5,
  stagger: 0.1,
});

// Run init function
document.addEventListener("DOMContentLoaded", init);

// Track hero preview image movements
let heroSection = document.querySelector(".section_hero");
let hero1 = document.getElementById("hero_media_1");
let hero2 = document.getElementById("hero_media_2");

function trackMedia(event) {
  var cursorX = event.pageX;

  let mediaWidth = hero1.offsetWidth;

  hero1.style.transform = `translateX(${cursorX - mediaWidth / 2 - 50}px)`;
  hero2.style.transform = `translateX(${cursorX - mediaWidth / 2 - 50}px)`;
}

heroSection.addEventListener("mousemove", (e) => {
  trackMedia(e);
});
