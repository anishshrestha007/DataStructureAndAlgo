import React, { useEffect, useState } from "react";
import "../css/Review.css";
import { getFormattedDate } from "../helpers/DateHelper";

export default function Review({ cvInfo: info }) {
  const [reviewInfo, setReviewInfo] = useState(null);

  /*called useEffect where props as dependency because education list is dispatch on unmount*/
  useEffect(() => {
    setReviewInfo(info);
  }, [info]);

  if (reviewInfo) {
    var personalInfo = reviewInfo.personalInformation;
    var experienceList = reviewInfo.experienceList;
    var educationList = reviewInfo.educationList;
  }

  function getExperieceDOM() {
    return experienceList.length
      ? experienceList.map((data, i) => {
          return (
            <div key={i}>
              {" "}
              <div className="company-wrapper clearfix">
                <div className="experience-title">{data.company}</div>
                <div className="time">
                  {getFormattedDate(data.fromDate)} -{" "}
                  {getFormattedDate(data.toDate)}
                </div>
              </div>
              <div className="job-wrapper clearfix">
                <div className="experience-title">{data.position} </div>
                <div className="company-description">
                  <p>{data.description}</p>
                </div>
              </div>
            </div>
          );
        })
      : "No experiences";
  }

  function getEducationDOM() {
    return educationList.length
      ? educationList.map((data, i) => {
          return (
            <div key={i}>
              {" "}
              <div className="company-wrapper clearfix">
                <div className="experience-title">{data.university}</div>
                <div className="time">
                  {getFormattedDate(data.fromDate)} -{" "}
                  {getFormattedDate(data.toDate)}
                </div>
              </div>
              <div className="job-wrapper clearfix">
                <div className="experience-title">
                  {data.degree}, {data.city}{" "}
                </div>
                <div className="company-description">
                  <p>{data.subject}</p>
                </div>
              </div>
            </div>
          );
        })
      : "No Education";
  }

  return (
    <>
      {reviewInfo ? (
        <div id="resume-wrapper" className="resume-wrapper">
          <section className="profile section-padding">
            <div className="container">
              {personalInfo.photo !== "" && (
                <div className="picture-resume-wrapper">
                  <div className="picture-resume">
                    <span>
                      <img
                        src={URL.createObjectURL(personalInfo.photo)}
                        alt=""
                      />
                    </span>
                  </div>
                  <div className="clearfix"></div>
                </div>
              )}

              <div className="name-wrapper">
                <h1>
                  {personalInfo.firstName} <br />
                  {personalInfo.lastName}
                </h1>
              </div>
              <div className="clearfix"></div>
              <div className="contact-info clearfix">
                <ul className="list-titles">
                  <li>Call</li>
                  <li>Mail</li>
                  <li>Home</li>
                </ul>
                <ul className="list-content ">
                  <li>{personalInfo.phone}</li>
                  <li>{personalInfo.email}</li>
                  <li>{personalInfo.address}</li>
                </ul>
              </div>
              <div className="contact-presentation">
                <p>{personalInfo.description} </p>
              </div>
              <div className="contact-social clearfix">
                <ul className="list-content">
                  {personalInfo.github && (
                    <li>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={personalInfo.github}
                      >
                        {personalInfo.github}
                      </a>
                    </li>
                  )}
                  {personalInfo.linkedin && (
                    <li>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={personalInfo.linkedin}
                      >
                        {personalInfo.linkedin}
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </section>

          <section className="experience section-padding">
            <div className="container">
              <h3 className="experience-title">Experience</h3>
              <div className="experience-wrapper">{getExperieceDOM()}</div>
              <h3 className="experience-title">Education</h3>
              <div className="experience-wrapper">{getEducationDOM()}</div>
              {/* TODO : Implement Skills */}
              {/* <div className="section-wrapper clearfix">
            <h3 className="section-title">Skills</h3>
            <ul>
              <li className="skill-percentage">HTML / HTML5</li>
              <li className="skill-percentage">CSS / CSS3 / SASS / LESS</li>
              <li className="skill-percentage">Javascript</li>
              <li className="skill-percentage">Jquery</li>
              <li className="skill-percentage">Wordpress</li>
              <li className="skill-percentage">Photoshop</li>
            </ul>
          </div> */}
            </div>
          </section>

          <div className="clearfix"></div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
