import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CreateCv from "./CreateCv";
import Portfolio from "./Portfolio";
import { Input } from "@mui/material";
import "../css/Home.css";
import portfolioIcon from "../portfolioIcon.PNG";
import profile from "../profile.jpeg";
import MenuIcon from "@mui/icons-material/Menu";
const theme = createTheme();

export default function Home() {
  const [portfolio, setPortfolio] = useState("");
  const [createcv, setCreateCV] = useState("");
  function redirectToPortfolio() {
    setPortfolio("active");
    setCreateCV("");
  }
  function redirectToCreateCV() {
    setPortfolio("");
    setCreateCV("active");
  }

  function onAnchorTagClick() {
    const menuButton = document.getElementById("click");
    menuButton.checked = false;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="portfolio-body" style={{ height: "100%" }}>
        <nav>
          <div className="logo">
            <a href="#">
              <img src={portfolioIcon} className="portfolio-logo" alt="logo" />
            </a>
          </div>
          <input type="checkbox" id="click" />
          <label htmlFor="click" className="menu-btn">
            <MenuIcon color="action" className="custom-menu-icon" />
          </label>
          <ul>
            <li>
              <a href="#portfolio-about" onClick={() => onAnchorTagClick()}>
                About
              </a>
            </li>
            <li>
              <a href="#">Experience</a>
            </li>
            <li>
              <a href="#">Work</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
            <li>
              <a href="#">Resume</a>
            </li>
          </ul>
        </nav>
        <div id="content">
          <main className="portfolio-main fillHeight">
            <section id="portfolio-home" className="portfolio-home">
              <h1>Hi, my name is</h1>
              <h2 className="big-heading">Anish Shrestha.</h2>
              <h3 className="big-heading">I build things for the web.</h3>
              <p>
                I’m a software engineer specializing in building (and
                occasionally designing) exceptional digital experiences.
                Currently, I’m focused on building accessible, human-centered
                products at{" "}
                <a href="https://www.tro.com/" target="_blank" rel="noreferrer">
                  TRO
                </a>
                .
              </p>
              <a
                className="email-link"
                href="https://www.newline.co/courses/build-a-spotify-connected-app"
                target="_blank"
                rel="noreferrer"
              >
                Create Your Own Resume
              </a>
            </section>
            <section id="portfolio-about" className="portfolio-about">
              <h2 className="numbered-heading">About Me</h2>
              <div className="inner">
                <div className="portfolio-about-body">
                  <div>
                    <p>
                      Hello! My name is Brittany and I enjoy creating things
                      that live on the internet. My interest in web development
                      started back in 2012 when I decided to try editing custom
                      Tumblr themes — turns out hacking together a custom reblog
                      button taught me a lot about HTML &amp; CSS!
                    </p>
                    <p>
                      Fast-forward to today, and I’ve had the privilege of
                      working at{" "}
                      <a
                        href="https://us.mullenlowe.com/"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        an advertising agency
                      </a>
                      ,{" "}
                      <a
                        href="https://starry.com/"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        a start-up
                      </a>
                      ,{" "}
                      <a
                        href="https://www.apple.com/"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        a huge corporation
                      </a>
                      , and{" "}
                      <a
                        href="https://scout.camd.northeastern.edu/"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        a student-led design studio
                      </a>
                      . My main focus these days is building accessible,
                      inclusive products and digital experiences at{" "}
                      <a
                        href="https://upstatement.com/"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        Upstatement
                      </a>{" "}
                      for a variety of clients.
                    </p>
                    <p>
                      I also recently{" "}
                      <a
                        href="https://www.newline.co/courses/build-a-spotify-connected-app"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        launched a course
                      </a>{" "}
                      that covers everything you need to build a web app with
                      the Spotify API using Node &amp; React.
                    </p>
                    <p>
                      Here are a few technologies I’ve been working with
                      recently:
                    </p>
                  </div>
                  <ul className="skills-list">
                    <li>JavaScript (ES6+)</li>
                    <li>TypeScript</li>
                    <li>React</li>
                    <li>Eleventy</li>
                    <li>Node.js</li>
                    <li>WordPress</li>
                  </ul>
                </div>
                <div className="portfolio-about-img">
                  <img
                    alt=""
                    role="presentation"
                    aria-hidden="true"
                    src={profile}
                    style={{
                      maxWidth: "100%",
                      display: "block",
                      position: "static",
                      borderRadius: "30px",
                    }}
                  ></img>
                </div>
              </div>
            </section>
            <section
              id="portfolio-experience"
              className="portfolio-experience"
            ></section>
            <section id="portfolio-work" className="portfolio-work"></section>
            <section
              id="portfolio-contact"
              className="portfolio-contact"
            ></section>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
