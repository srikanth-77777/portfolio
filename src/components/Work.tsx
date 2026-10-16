import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const projects = [
  {
    title: "AquaTwin AI",
    category: "AI / IoT & Digital Twin",
    description:
      "Real-time intelligent digital twin for urban water infrastructure — featuring live pressure & flow monitoring, AI-driven leak detection, water quality analytics, and scenario simulation.",
    tools: "Python, Flask, JavaScript, Chart.js, WebSockets, AI/ML",
    image: "/images/aquatwin-1.png",
    images: [
      "/images/aquatwin-1.png",
      "/images/aquatwin-2.png",
      "/images/aquatwin-3.png",
      "/images/aquatwin-4.png",
    ],
    link: "https://aquatwin-ai.onrender.com",
    liveUrl: "https://aquatwin-ai.onrender.com",
    githubUrl: "https://github.com/srikanth-77777/aquatwin-ai",
  },
  {
    title: "EnvisionAI",
    category: "ML / Time-Series Forecasting",
    description:
      "Full-stack grid load forecasting platform analyzing 570,000+ hourly PJM grid records. Achieves R² > 0.98 & MAPE < 3% with LightGBM/XGBoost. Features FastAPI backend with real-time 24-hour rolling forecasts, AI anomaly explanations, and 72% memory optimization via lazy model loading.",
    tools: "Python, FastAPI, LightGBM, XGBoost, Scikit-learn, Pandas, GridSearchCV, Joblib",
    image: "/images/envision-3.png",
    images: [
      "/images/envision-3.png",
      "/images/envision-2.png",
      "/images/envision-4.png",
      "/images/envision-1.png",
    ],
    link: "https://energy-forecast-forecaster.onrender.com",
    liveUrl: "https://energy-forecast-forecaster.onrender.com",
    githubUrl: "https://github.com/srikanth-77777",
  },
  {
    title: "PulmoAI",
    category: "Medical AI & Deep Learning",
    description:
      "Deep-learning clinical diagnostic system for lung cancer classification — featuring multi-subtype detection, malignant vs. benign binary classification, interactive Grad-CAM heatmap visualization, and integrated Medical AI diagnostic assistant.",
    tools: "Python, TensorFlow, CNN, Grad-CAM, FastAPI, LIME, Medical Imaging",
    image: "/images/project3-3.png",
    images: [
      "/images/project3-3.png",
      "/images/project3-4.png",
      "/images/project3-5.png",
      "/images/project3-6.png",
      "/images/project3-1.png",
      "/images/project3-2.png",
    ],
    link: "https://web-production-1f14a.up.railway.app/",
    liveUrl: "https://web-production-1f14a.up.railway.app/",
    githubUrl: "https://github.com/srikanth-77777/lung-cancer-detection",
  },
  {
    title: "AegisSec",
    category: "Computer Vision / AI Surveillance",
    description:
      "Autonomous AI-powered CCTV surveillance and threat verification system — featuring real-time edge object detection, dynamic camera feed routing, instant snapshot logging, and automated security incident alarms.",
    tools: "Python, OpenCV, MobileNet SSD, FastAPI, SQLite, HTML5/CSS3, JWT Auth",
    image: "/images/aegis-2.png",
    images: [
      "/images/aegis-2.png",
      "/images/aegis-4.png",
      "/images/aegis-1.png",
      "/images/aegis-3.png",
    ],
    link: "https://cctv-surveillance-detection-and-alarming-syatem-production.up.railway.app/frontend/login.html",
    liveUrl: "https://cctv-surveillance-detection-and-alarming-syatem-production.up.railway.app/frontend/login.html",
    githubUrl: "https://github.com/srikanth-77777/cctv-surveillance-detection-and-alarming-syatem",
  },
];

const Work = () => {
  useGSAP(() => {
    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${translateX}`,
        scrub: true,
        pin: true,
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      ease: "none",
    });

    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>
                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                {project.description && (
                  <p className="work-description">{project.description}</p>
                )}
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
                <div className="work-links">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="work-link work-link-live">
                      ↗ Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="work-link work-link-github">
                      ⌥ GitHub
                    </a>
                  )}
                </div>
              </div>
              <WorkImage image={project.image} alt={project.title} link={project.link} images={project.images} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
