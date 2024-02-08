console.log("--WORK COMPONENT LOADED--");

$("[work-scroll-component]").each(function(index) {
  // get elements
  let component = $(this);
  let imageList = component.find("[work-scroll-toggle='images']");
  let progressList = component.find("[work-scroll-toggle='progress-list']");
  let headingsList = component.find(".work_heading");
  let buttonsList = component.find(".work_button");
  let descList = component.find(".work_description");
  let tagsList = component.find(".work_tags");
  // set item total
  let itemTotal = imageList.first().children().length;
  component.find("[work-scroll-toggle='number-total']").text(itemTotal);

  // create trigger divs & spacer
  let firstTrigger = component.find("[work-scroll-toggle='trigger']").first();
  for (let i = 1; i < itemTotal; i++) {
    firstTrigger.clone().appendTo(component);
  }
  let triggers = component.find("[work-scroll-toggle='trigger']");
  firstTrigger.css("margin-top", "-100vh");
  let spacer = $(
    "<div class='tr-scroll-toggle-spacer' style='width: 100%; height: 100vh;'></div>",
  )
    .hide()
    .appendTo(component);
  // check for min width
  let minWidth = 0;
  let trMinWidth = component.attr("tr-min-width");
  if (trMinWidth !== undefined && trMinWidth !== false) {
    minWidth = +trMinWidth;
  }

  // Split up headings
  component.find(".work_heading").each(function(index) {
    $(this).attr("id", `split_heading${index}`);
    SplitType.create(`#split_heading${index}`, { types: "chars" });
  });

  // main breakpoint
  gsap.matchMedia().add(`(min-width: ${minWidth}px)`, () => {
    // show spacer
    spacer.show();
    function animateContent(index) {
      let headings = component.find(".work_heading");
      let descriptions = component.find(".work_description");
      let tl = gsap.timeline();
      let headingChars = component
        .find(".work_heading")
      [index].querySelectorAll(".char");
      tl.to(headings, { duration: 0.2, opacity: 0 });
      tl.set(headings[index], { opacity: 1 });
      // tl.to(headings[index], { opacity: 1 });
      tl.fromTo(
        headingChars,
        { yPercent: 50, autoAlpha: 0 },
        { duration: 0.2, yPercent: 0, autoAlpha: 1, stagger: 0.015 },
      );
      tl.to(descriptions, { duration: 0.2, opacity: 0 }, 0);
      tl.set(descriptions[index], { opacity: 1 }, 0.2);
      tl.fromTo(
        descriptions[index],
        { yPercent: 50, autoAlpha: 0 },
        { duration: 0.2, yPercent: 0, autoAlpha: 1 },
        "<+=0.15",
      );
      tl.to(buttonsList, { duration: 0.2, opacity: 0 }, 0);
      tl.to(buttonsList[index], { opacity: 1 }, 0.2);
      tl.to(tagsList, { duration: 0.2, opacity: 0 }, 0);
      tl.to(tagsList[index], { opacity: 1 }, 0.2);
    }

    // switch which item is active
    function makeItemActive(activeIndex) {
      component
        .find("[work-scroll-toggle='number-current']")
        .text(activeIndex + 1);
      imageList.each(function() {
        $(this).children().removeClass("is-active");
        $(this).children().eq(activeIndex).addClass("is-active");
      });
      progressList.each(function() {
        $(this).children().removeClass("is-active");
        $(this).children().eq(activeIndex).addClass("is-active");
      });
      headingsList.each(function() {
        $(this).removeClass("is-active");
        headingsList[activeIndex].classList.add("is-active");
      });
      descList.each(function() {
        $(this).removeClass("is-active");
        descList[activeIndex].classList.add("is-active");
      });
      buttonsList.each(function() {
        $(this).removeClass("is-active");
        buttonsList[activeIndex].classList.add("is-active");
      });
      tagsList.each(function() {
        $(this).removeClass("is-active");
        tagsList[activeIndex].classList.add("is-active");
      });
      animateContent(activeIndex);
    }

    makeItemActive(0);
    // triggers timeline
    triggers.each(function(index) {
      let triggerIndex = index;
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: $(this),
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
          onToggle: ({ self, isActive }) => {
            if (isActive) {
              makeItemActive(triggerIndex);
            }
          },
        },
        defaults: {
          ease: "none",
        },
      });
      progressList.each(function() {
        let childItem = $(this).children().eq(triggerIndex);
        tl.to(childItem, { width: "100%" }, 0);
      });
      imageList.each(function() {
        let childItem = $(this).children().eq(triggerIndex);
        tl.from(childItem, { scale: 1.1 }, 0);
      });
      //tl.to(component.find(".work_progress-pill"), { width: "100%" }, 0);
    });

    // component timeline
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: component,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
      defaults: {
        ease: "none",
      },
    });

    // smaller screen sizes
    return () => {
      spacer.hide();
      imageLists.each(function(index) {
        $(this).children().removeClass("is-active");
      });
    };
  });
});
