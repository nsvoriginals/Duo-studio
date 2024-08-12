function init() {
  // Register GSAP ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Initialize Locomotive Scroll
  const locoScroll = new LocomotiveScroll({
      el: document.querySelector(".smooth-scroll"),
      smooth: true
  });

  // Update ScrollTrigger on Locomotive Scroll update
  locoScroll.on("scroll", ScrollTrigger.update);

  // ScrollTrigger proxy settings for Locomotive Scroll
  ScrollTrigger.scrollerProxy(".smooth-scroll", {
      scrollTop(value) {
          return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
          return {
              top: 0, 
              left: 0, 
              width: window.innerWidth, 
              height: window.innerHeight
          };
      },
      pinType: document.querySelector(".smooth-scroll").style.transform ? "transform" : "fixed"
  });

  // Refresh ScrollTrigger and update Locomotive Scroll on window update
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // Refresh ScrollTrigger after initialization
  ScrollTrigger.refresh();
}

init();

var tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.page1 h1',
    scroller: '.smooth-scroll', // Ensure this matches the element used in Locomotive Scroll
    markers: true,
    start: 'top 30%',
    end: 'top 0%',
    scrub: 2
  }
});

var tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: '.main',
    scroller: '.smooth-scroll', // Use the same scroller as the Locomotive Scroll
    markers: true,
    start: 'top 100%', // Adjust these values to fit your design needs
    end: 'top 90%',
    scrub: 2
  }
});

// GSAP animation using ScrollTrigger
tl.to('.page1 h1', {
  x: -100,
  duration: 1,
}, 'anim');

tl.to('.page1 h2', {
  x: 100,
  duration: 1,
}, 'anim');

tl.to('.page1 video', {
  width: '90%',
}, 'anim');

tl2.to('.main', {
  backgroundColor: "#fff",
});
