import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  useEffect(() => {
    // Simple native smooth scrolling via CSS scroll-behavior
    document.documentElement.style.scrollBehavior = "smooth";

    let links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        e.preventDefault();
        let anchor = e.currentTarget as HTMLAnchorElement;
        let section = anchor.getAttribute("data-href");
        if (section) {
          const target = document.querySelector(section);
          target?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }, []);

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable" onClick={(e) => {
          e.preventDefault();
          window.dispatchEvent(new CustomEvent('show-bubble', { detail: 'yeah, that\'s my nickname! 😎' }));
        }}>
          Srikanth
        </a>
        <a
          href="mailto:vikashsrikanth77@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          vikashsrikanth77@gmail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
