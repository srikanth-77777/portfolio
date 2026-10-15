import gsap from "gsap";

// Custom char splitter for landing animations (replaces gsap-trial SplitText)
function splitToChars(selector: string): HTMLElement[] {
  const els = document.querySelectorAll<HTMLElement>(selector);
  const allChars: HTMLElement[] = [];
  els.forEach((el) => {
    const text = el.innerText;
    el.innerHTML = "";
    const wrapper = document.createElement("span");
    wrapper.style.display = "inline-block";
    text.split("").forEach((char) => {
      if (char === "\n") {
        wrapper.appendChild(document.createElement("br"));
        return;
      }
      const span = document.createElement("span");
      span.style.display = "inline-block";
      span.textContent = char === " " ? "\u00A0" : char;
      wrapper.appendChild(span);
      allChars.push(span);
    });
    el.appendChild(wrapper);
  });
  return allChars;
}

export function initialFX() {
  document.body.style.overflowY = "auto";
  document.getElementsByTagName("main")[0]?.classList.add("main-active");

  gsap.to("body", {
    backgroundColor: "#0b080c",
    duration: 0.5,
    delay: 1,
  });

  const landingChars = splitToChars(".landing-info h3, .landing-intro h2, .landing-intro h1");
  gsap.fromTo(
    landingChars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  const h2InfoChars = splitToChars(".landing-h2-info");
  gsap.fromTo(
    h2InfoChars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  gsap.fromTo(
    ".landing-info-h2",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      y: 0,
      delay: 0.8,
    }
  );

  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );

  // Looping role text animation
  const h2Info1Chars = splitToChars(".landing-h2-info-1");
  const h2_1Chars = splitToChars(".landing-h2-1");
  const h2_2Chars = splitToChars(".landing-h2-2");

  loopText(h2InfoChars, h2Info1Chars);
  loopText(h2_1Chars, h2_2Chars);
}

function loopText(text1: HTMLElement[], text2: HTMLElement[]) {
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
  const delay = 4;
  const delay2 = delay * 2 + 1;

  // Initialize text2 as hidden
  gsap.set(text2, { autoAlpha: 0, y: 80 });

  tl.to(
    text2,
    { autoAlpha: 1, duration: 1.2, ease: "power3.inOut", y: 0, stagger: 0.1, delay },
    0
  )
    .to(
      text1,
      { autoAlpha: 0, y: -80, duration: 1.2, ease: "power3.inOut", stagger: 0.1, delay },
      0
    )
    .set(text1, { y: 80 }, 1 + delay2 - 0.1) // Reset text1 to bottom before it comes up
    .to(
      text1,
      { autoAlpha: 1, duration: 1.2, ease: "power3.inOut", y: 0, stagger: 0.1, delay: delay2 },
      1
    )
    .to(
      text2,
      { autoAlpha: 0, y: -80, duration: 1.2, ease: "power3.inOut", stagger: 0.1, delay: delay2 },
      1
    )
    .set(text2, { y: 80 }); // Reset text2 for the next loop
}
