console.log("--GLOBALS LOADED--");

gsap.registerPlugin(ScrollTrigger);

// if (!ScrollTrigger.isTouch) {
//   const lenis = new Lenis();

//   lenis.on("scroll", ScrollTrigger.update);

//   gsap.ticker.add((time) => {
//     lenis.raf(time * 1000);
//   });

//   ScrollTrigger.normalizeScroll(true);
//   gsap.ticker.lagSmoothing(0);
// }

// Button hover
let buttons = $(".button");
buttons.each((index) => {
  let buttonText = buttons[index].firstChild.firstChild;
  let clonedText = buttonText.cloneNode(true);
  // clonedText.css("position", "absolute");
  clonedText.style.position = "absolute";
  buttons[index].firstChild.append(clonedText);

  buttons[index].addEventListener("mouseenter", (e) => {
    e.target.classList.add("hovered");
  });

  buttons[index].addEventListener("mouseleave", (e) => {
    e.target.classList.remove("hovered");
  });
});

// Text Reveal on scroll
let reveals = document.querySelectorAll("[data-text-reveal]");
reveals.forEach((text) => {
  let split = new SplitType(text, { types: "lines, words" });

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: text,
      start: "top 70%",
      markers: false,
      toggleActions: "play pause play reverse",
    },
  });

  tl.fromTo(
    split.lines,
    {
      y: "100%",
      autoAlpha: 0,
    },
    {
      y: 0,
      autoAlpha: 1,
      duration: 0.4,
      stagger: 0.05,
      ease: "power3.out",
    },
  );
});

// ------- Footer Code

// Footer Local Time
var time = document.getElementById("time");

function displayClock() {
  const options = {
    timeZone: "Africa/Lagos",
    timeZoneName: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  const today = new Date();
  time.innerHTML = today.toLocaleTimeString("en-GB", options);
}

setInterval(() => {
  displayClock();
}, 1000);

// Footer animation
let footer = document.querySelector(".footer");
let footerRow = document.querySelector(".footer .footer_row");
let footerParagraph = document.querySelector(".footer .footer_paragraph");

let footerTl = gsap.timeline({
  scrollTrigger: {
    trigger: footer,
    start: "top 30%",
    markers: false,
    toggleActions: "play pause play reverse",
  },
});

footerTl.from(footerParagraph, {
  autoAlpha: 0,
  y: -40,
  duration: 0.5,
  ease: "power3.out",
});
footerTl.from(footerRow, {
  autoAlpha: 0,
  duration: 0.5,
});

// Footer copying
let copyTrigger = document.getElementById("email_copy");
let copyFeedback = document.getElementById("copy_message");

function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand("copy");
    var msg = successful ? "successful" : "unsuccessful";
    console.log("Fallback: Copying text command was " + msg);
  } catch (err) {
    console.error("Fallback: Oops, unable to copy", err);
  }

  document.body.removeChild(textArea);
}

function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    copyFeedback.innerText = "Copied!";
    return;
  }

  navigator.clipboard.writeText(text).then(
    function () {
      copyFeedback.innerText = "Copied!";
    },
    function (err) {
      alert("Error copying email. Please copy manually");
      console.error("Async: Could not copy text: ", err);
    },
  );
}

copyTrigger.addEventListener("click", () => {
  copyTextToClipboard("moyi.abioye@gmail.com");
});

copyTrigger.addEventListener("mouseleave", () => {
  setTimeout(() => {
    copyFeedback.innerText = "Click To Copy";
  }, 500);
});

// Mobile navbar animation
let navbarTL = gsap.timeline({
  paused: true,
});

let hamburgerTL = gsap.timeline({
  paused: true,
});

const menuButton = document.querySelector(".menu_button");
const navbar = document.querySelector(".navbar");
const menuLines = document.querySelectorAll(".menu_line");
let navbarOpen = false;

hamburgerTL.to(menuLines[0], {
  rotation: -45,
  y: 7,
  duration: 0.2,
  ease: "power1.out",
});
hamburgerTL.to(
  menuLines[2],
  {
    rotation: 45,
    y: -7,
    duration: 0.2,
    ease: "power1.out",
  },
  "<",
);
hamburgerTL.to(
  menuLines[1],
  {
    autoAlpha: 0,
    duration: 0.2,
    ease: "power1.out",
  },
  "<",
);

navbarTL.set(navbar, {
  height: "100svh",
});
navbarTL.to(
  ".navbar_overlay",
  {
    height: "100%",
    duration: 0.5,
    ease: "power3.inOut",
  },
  "<",
);
navbarTL.add(hamburgerTL.play(), 0);
navbarTL.from(".navbar-mobile_link", {
  y: 40,
  autoAlpha: 0,
  stagger: 0.05,
  ease: "power3.out",
  duration: 0.4,
});
navbarTL.from(
  ".navbar_mobile-footer",
  {
    autoAlpha: 0,
    ease: "power3.out",
    duration: 0.5,
  },
  "<+0.2",
);

function processNavbarChange() {
  if (navbarOpen) {
    navbarOpen = false;
    document.body.style.overflowY = "auto";
    navbarTL.reverse();
  } else {
    navbarOpen = true;
    document.body.style.overflowY = "hidden";
    navbarTL.play();
  }
}

// Handling link / routing

function delay(URL) {
  setTimeout(function () {
    window.location = URL;
  }, 500);
}

let navbarCloseTriggers = document.querySelectorAll("[data-nav-close]");
let loadOutTriggers = document.querySelectorAll("[data-load-out]");
let mainWrapper = document.querySelector(".main-wrapper");

navbarCloseTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    navbarOpen = false;
    document.body.style.overflowY = "auto";
    navbarTL.reverse();
  });
});

loadOutTriggers.forEach((trigger) => {
  trigger.addEventListener("click", (e) => {
    event.preventDefault();
    gsap.to(mainWrapper, {
      autoAlpha: 0,
      duration: 0.5,
      ease: "power3.out",
    });
    delay(e.currentTarget.href);
  });
});

menuButton.addEventListener("click", () => {
  processNavbarChange();
});
