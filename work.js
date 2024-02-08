console.log("--WORK PAGE LOADED--");

// Work loader
let main = document.querySelector(".main-wrapper");
let loaderTl = gsap.timeline();

loaderTl.set(main, {
  autoAlpha: 1,
});
loaderTl.from(".project_heading", {
  y: "100%",
  autoAlpha: 0,
  duration: 0.5,
  ease: "power3.inOut",
});
loaderTl.from(
  ".project-header_desc",
  {
    y: "100%",
    autoAlpha: 0,
    duration: 0.5,
    ease: "power3.inOut",
  },
  "<+0.2",
);
loaderTl.from(
  ".navbar",
  {
    y: "-100%",
    autoAlpha: 0,
    duration: 0.75,
    ease: "power3.inOut",
  },
  0,
);

// Project image reveal on scroll
let projectImages = document.querySelectorAll(".project-grid_item");
projectImages.forEach((image) => {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: image,
      start: "top 65%",
      markers: false,
      //toggleActions: "play pause play reverse",
    },
  });

  tl.to(image.querySelector(".project_grid-overlay"), {
    y: "-100%",
    duration: 0.65,
    ease: "power3.inOut",
  });

  tl.from(
    image.querySelector(".project_grid-item_image"),
    {
      scale: 1.2,
      duration: 0.65,
      ease: "power3.inOut",
    },
    0,
  );
});
