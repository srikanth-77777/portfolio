import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br />
          experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Computer Science Student</h4>
                <h5>B.Tech — AI & Machine Learning Specialization</h5>
              </div>
              <h3>2023–NOW</h3>
            </div>
            <p>
              Pursuing a Bachelor of Technology in Computer Science with a
              specialization in Artificial Intelligence and Machine Learning.
              Actively building projects in deep learning, computer vision, and
              data science while continuously upskilling in modern AI frameworks.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Information & Communication Technology Intern</h4>
                <h5>Stellantis (FCA Citroën) India Automobile Pvt. Ltd., Chennai</h5>
              </div>
              <h3>12/2025–01/2026</h3>
            </div>
            <p>
              Created a proof-of-concept email automation tool using Python to
              onboard new members and streamline communication processes.
              Achieved 20% faster onboarding through improved communication
              efficiency. Gained hands-on experience in IT processes, corporate
              communication systems, and process automation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
