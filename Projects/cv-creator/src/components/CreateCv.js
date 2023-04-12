import * as React from "react";
import { useReducer } from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import PersonalInformation from "./PersonalInformation";
import Experience from "./Experience";
import Education from "./Education";
import Review from "./Review";
import reducer from "../Reducer";

import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/anishshrestha007">
        Anish Shrestha
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const cvInfo = {
  personalInformation: {
    firstName: "Anish",
    lastName: "Shrestha",
    title: "Senior Software Engineer",
    address: "22 Abery Street, Plumstead, London, SE18 1DD",
    phone: "+447837874176",
    email: "anishronnie@gmail.com",
    description:
      "Senior Full Stack Software Engineer with experience in writing modular, secure and well-tested front-end code with React framework for about 5 years and working as .Net developer mostly as .Net Core.Supportive and enthusiastic team player dedicated to streamlining processes and efficiently resolving project issues.",
    photo: "",
    github: "https://github.com/anishshrestha007",
    linkedin: "https://www.linkedin.com/in/anish-shrestha-331712152/",
  },
  experienceList: [],
  educationList: [],
};

const steps = ["Personal Information", "Experience", "Education", "Review"];

function getStepContent(step, dispatch, cv) {
  switch (step) {
    case 0:
      return (
        <PersonalInformation
          personalInfo={cv.personalInformation}
          dispatch={dispatch}
        />
      );
    case 1:
      return (
        <Experience experienceInfo={cv.experienceList} dispatch={dispatch} />
      );
    case 2:
      return <Education educationInfo={cv.educationList} dispatch={dispatch} />;
    case 3:
      return <Review cvInfo={cv} />;
    default:
      throw new Error("Unknown step");
  }
}

function printDocument() {
  const input = document.getElementById("resume-wrapper");
  html2canvas(input).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(imgData, "JPEG", 0, 0);
    //pdf.output("dataurlnewwindow");
    pdf.save("download.pdf");
  });
}

export default function CreateCv() {
  const [activeStep, setActiveStep] = React.useState(0);

  const [cvInformation, dispatch] = useReducer(reducer, cvInfo);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      printDocument();
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component="h1" variant="h4" align="center">
          CURRICULUM VITAE
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <React.Fragment>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for creating CV from our site.
              </Typography>
              <Typography variant="subtitle1">
                Your CV has been sucessfully downloaded. Please review the
                document and if not satisfied you can create again. It's free.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep, dispatch, cvInformation)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? "Download Pdf" : "Next"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </React.Fragment>
      </Paper>
      <Copyright />
    </Container>
  );
}
