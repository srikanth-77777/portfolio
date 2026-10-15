import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Custom lightweight SplitText replacement
function splitTextIntoChars(el: HTMLElement, _linesClass?: string): HTMLElement[] {
  const text = el.innerText;
  el.innerHTML = "";
  const chars: HTMLElement[] = [];
  text.split("").forEach((char) => {
    const span = document.createElement("span");
    span.style.display = "inline-block";
    span.textContent = char === " " ? "\u00A0" : char;
    el.appendChild(span);
    chars.push(span);
  });
  return chars;
}

function splitTextIntoWords(el: HTMLElement, _linesClass?: string): HTMLElement[] {
  const text = el.innerText;
  el.innerHTML = "";
  const words: HTMLElement[] = [];
  text.split(" ").forEach((word, i, arr) => {
    const span = document.createElement("span");
    span.style.display = "inline-block";
    span.textContent = word;
    el.appendChild(span);
    if (i < arr.length - 1) {
      el.appendChild(document.createTextNode(" "));
    }
    words.push(span);
  });
  return words;
}

interface ParaElement extends HTMLElement {
  anim?: gsap.core.Animation;
  splitWords?: HTMLElement[];
}

interface TitleElement extends HTMLElement {
  anim?: gsap.core.Animation;
  splitChars?: HTMLElement[];
}

gsap.registerPlugin(ScrollTrigger);

export default function setSplitText() {
  ScrollTrigger.config({ ignoreMobileResize: true });
  if (window.innerWidth < 900) return;

  const paras: NodeListOf<ParaElement> = document.querySelectorAll(".para");
  const titles: NodeListOf<TitleElement> = document.querySelectorAll(".title");

  const TriggerStart = window.innerWidth <= 1024 ? "top 60%" : "20% 60%";
  const ToggleAction = "play pause resume reverse";

  paras.forEach((para: ParaElement) => {
    para.classList.add("visible");
    if (para.anim) {
      para.anim.progress(1).kill();
    }
    const words = splitTextIntoWords(para, "split-line");
    para.splitWords = words;
    para.anim = gsap.fromTo(
      words,
      { autoAlpha: 0, y: 80 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: para.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 1,
        ease: "power3.out",
        y: 0,
        stagger: 0.02,
      }
    );
  });

  titles.forEach((title: TitleElement) => {
    if (title.anim) {
      title.anim.progress(1).kill();
    }
    const chars = splitTextIntoChars(title, "split-line");
    title.splitChars = chars;
    title.anim = gsap.fromTo(
      chars,
      { autoAlpha: 0, y: 80, rotate: 10 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: title.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 0.8,
        ease: "power2.inOut",
        y: 0,
        rotate: 0,
        stagger: 0.03,
      }
    );
  });

  ScrollTrigger.addEventListener("refresh", () => setSplitText());
}
