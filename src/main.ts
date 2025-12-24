// GSAP TypeScript Demo
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrollSmoother } from "gsap/ScrollSmoother";
// 注册插件
gsap.registerPlugin(ScrollTrigger, SplitText, ScrollSmoother);
const button = document.querySelector("button");
const replayButton = document.querySelector("#replay");
const boxContainer = document.querySelector(".box-container");
let tl: gsap.core.Timeline | null = null;
replayButton?.addEventListener("click", () => {
  tl?.restart();
});
button?.addEventListener("click", () => {
  if (tl?.paused()) {
    tl?.play();
  } else {
    tl?.pause();
  }
});

// 等待 DOM 加载完成
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    initAnimations();
  }, 0);
});

function initAnimations() {
  const imgWrapper = document.querySelector("#img-wrapper");
  const bannerWrapper = document.querySelector("#banner-wrapper");
  const plus = document.querySelector("#plus");
  const description = document.querySelector("#description");
  const bannerText = document.querySelector("#banner-text");
  const giftGuideWrapper = document.querySelector("#gift-guide-wrapper");
  const giftGuideContainer = document.querySelector("#gift-guide-container");
  const giftGuideOverlay = document.querySelector("#gift-guide-overlay");
  const textContainer = document.querySelector("#text-container");
  const stickyWrapper = document.querySelector("#sticky-wrapper");
  const allText = textContainer?.querySelectorAll(
    "h1"
  ) as NodeListOf<HTMLHeadingElement>;
  const horizantalWrapper = document.querySelector("#horizontal-wrapper");
  const horizantalContainer = document.querySelector("#horizontal-container");
  const fadeContainer = document.querySelector("#fade-container");
  const childLength = fadeContainer?.children.length || 0;
  const fadeChildren = fadeContainer?.querySelectorAll(".fade-item");
  const extraPx = 1000;
  const endPx = window.innerHeight * childLength - extraPx;
  console.log(endPx)
  const tl3 = gsap.timeline({
    scrollTrigger: {
      trigger: fadeContainer,
      start: "top top",
      end: `+=${endPx}`,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
    },
  });
  fadeChildren?.forEach((child, index) => {
    if (index == 0) {
      tl3.to(child, {
        x: 100,
        opacity: 0
      });
    } else if (index == childLength - 1) {
      tl3.fromTo(
        child,
        {
          opacity: 1,
          y: "150%",
          x: 0,
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 0.5,
        }, "-=0.3"
      );
    } else {
      tl3.fromTo(
        child,
        {
          opacity: 1,
          y: "150%",
          x: 0,
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 0.5,
        }, "-=0.3"
      );
      tl3.to(child, {
        opacity: 0,
        x: 100,
        y: 0,
        duration: 0.5,
      });
    }
  });

  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: horizantalContainer,
      start: "center center",
      end: "+=1500",
      scrub: 1,
      pin: true,
    },
  });
  tl2.to(horizantalWrapper, {
    x: "-70%",
  });

  tl = gsap.timeline({
    scrollTrigger: {
      trigger: textContainer,
      start: "top top",
      end: allText?.length * 100 + "%",
      scrub: 1,
      pin: true,
      anticipatePin: 1,
    },
  });
  allText.forEach((text, index) => {
    tl.fromTo(
      text,
      {
        opacity: 0,
        scale: 5,
        rotateZ: Math.random() * 20 - 10,
        z: 100,
      },
      {
        opacity: 1,
        scale: 1,
        rotateZ: 0,
        z: 0,
        duration: 1,
        ease: "power4.out",
      }
    );
    if (index != 0) {
      const previousText = allText[index - 1];
      tl.to(
        previousText,
        {
          opacity: 0,
          duration: 0.5,
          filter: "blur(10px)",
          ease: "power2.inOut",
          immediateRender: false,
        },
        "<"
      );
    }
  });
  const last = allText[allText.length - 1];
  tl.to(last, {
    scale: 1.5,
    color: "#FF5900",
    duration: 2,
  });

  gsap.to(imgWrapper, {
    width: "100vw",
    height: "100vh",
    duration: 3,
    ease: "power2.inOut",
    scrollTrigger: {
      trigger: bannerWrapper,
      start: "center center",
      end: "bottom top",
      scrub: true,
      pin: true,
      onEnter: () => {
        // 从上方进入触发区域时隐藏
        if (plus instanceof HTMLElement) {
          plus.style.display = "none";
        }
        if (description instanceof HTMLElement) {
          description.style.display = "none";
        }
      },
      onUpdate: (self) => {
        if (bannerText instanceof HTMLElement) {
          if (self.progress > 0.85) {
            bannerText.style.display = "flex";
          } else {
            bannerText.style.display = "none";
          }
        }
      },
      onLeaveBack: () => {
        // 向上滚动离开触发区域时显示（关键：修复滚上去的问题）
        if (plus instanceof HTMLElement) {
          plus.style.display = "block";
        }
        if (description instanceof HTMLElement) {
          description.style.display = "block";
        }
      },
    },
  });
  gsap.to(giftGuideWrapper, {
    width: "100%",
    duration: 0.5,
    scrollTrigger: {
      trigger: giftGuideContainer,
      start: "top 50%",
      end: "top 25%",
      scrub: true,
    },
  });
  gsap.to(giftGuideWrapper, {
    height: "100vh",
    scrollTrigger: {
      trigger: giftGuideContainer,
      start: "center center",
      end: "+=800",
      pin: true,
      scrub: 1,
    },
  });
  gsap.to(giftGuideOverlay, {
    opacity: 1,
    duration: 1,
    scrollTrigger: {
      trigger: giftGuideContainer,
      start: "bottom-=100px bottom",
      end: "60% center",
      scrub: true,
    },
  });

  // 滚动切换 sticky-container 的 active 状态
  const stickyContainers = document.querySelectorAll(
    ".sticky-container"
  ) as NodeListOf<HTMLElement>;

  stickyContainers.forEach((container) => {
    const content = container.querySelector(".content") as HTMLElement;
    if (!content) return;

    ScrollTrigger.create({
      trigger: container,
      start: "top 50%",
      end: "bottom 50%",
      onEnter: () => {
        content.classList.add("active");
        if (stickyWrapper instanceof HTMLElement) {
          stickyWrapper.style.backgroundColor = container.dataset.bg as string;
        }
      },
      onEnterBack: () => {
        content.classList.add("active");
        if (stickyWrapper instanceof HTMLElement) {
          stickyWrapper.style.backgroundColor = container.dataset.bg as string;
        }
      },
      onLeave: () => {
        content.classList.remove("active");
      },
      onLeaveBack: () => {
        content.classList.remove("active");
      },
    });
  });
}
