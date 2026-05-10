import React from 'react';
import './About.css';

const About: React.FC = () => {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1>About Us</h1>
        <p className="subtitle">Building the future of web applications with passion and precision.</p>
      </header>

      <section className="about-section mission">
        <h2>Our Mission</h2>
        <p>
          Our mission is to provide developers with the best tools and experiences to build 
          high-performance, accessible, and beautiful web applications. We believe in the power 
          of open source and the community to drive innovation.
        </p>
      </section>

      <section className="about-section values">
        <h2>Our Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <h3>Innovation</h3>
            <p>Constantly pushing the boundaries of what's possible on the web.</p>
          </div>
          <div className="value-card">
            <h3>Community</h3>
            <p>Empowering developers through collaboration and shared knowledge.</p>
          </div>
          <div className="value-card">
            <h3>Quality</h3>
            <p>Delivering robust, well-tested, and performant solutions.</p>
          </div>
        </div>
      </section>

      <section className="about-section team">
        <h2>Meet the Team</h2>
        <p>
          We are a diverse group of engineers, designers, and creators dedicated to 
          making the web a better place for everyone.
        </p>
        <div className="team-placeholder">
          <div className="team-member">
            <div className="avatar-placeholder"></div>
            <h4>Jane Doe</h4>
            <p>Lead Developer</p>
          </div>
          <div className="team-member">
            <div className="avatar-placeholder"></div>
            <h4>John Smith</h4>
            <p>UI/UX Designer</p>
          </div>
          <div className="team-member">
            <div className="avatar-placeholder"></div>
            <h4>Alice Johnson</h4>
            <p>Product Manager</p>
          </div>
        </div>
      </section>

      <footer className="about-footer">
        <p>&copy; {new Date().getFullYear()} React Router Project. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;
