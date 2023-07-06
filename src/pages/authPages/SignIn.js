import React, { useState } from "react";
// material
import { styled } from "@mui/material/styles";
import {
  Box,
  Link,
  Container,
  Typography,
  Tooltip,
  Stepper,
  Paper,
  Button,
  Step,
  StepLabel,
  StepContent,
} from "@mui/material";
// components
import Page from "src/components/Page";
import LoginForm from "src/components/__signInPage/LoginForm";
import FaceRecognition from "src/components/__signInPage/FaceRecognition";

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 680,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function SignIn() {
  const [activeStep, setActiveStep] = React.useState(0);

  const [faceRecognitionImg, setFaceRecognitionImg] = useState(null);

  const steps = [
    {
      label: "Face Recognition",
      component: (
        <FaceRecognition
          faceRecognitionImgState={[faceRecognitionImg, setFaceRecognitionImg]}
        />
      ),
    },
    {
      label: "Credientials",
      component: <LoginForm faceBiometeric={faceRecognitionImg} />,
    },
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <RootStyle title="Informa | Sign in">
      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5, display: "flex", alignItems: "center" }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" gutterBottom>
                Get started absolutely free.
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                Free forever. No credit card needed.
              </Typography>
            </Box>
            <Tooltip title={"JWT"}>
              <Box
                component="img"
                src={`/static/auth/ic_${"jwt"}.png`}
                sx={{ width: 32, height: 32 }}
              />
            </Tooltip>
          </Box>

          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  optional={
                    index === 2 ? (
                      <Typography variant="caption">Last step</Typography>
                    ) : null
                  }
                >
                  {step.label}
                </StepLabel>
                <StepContent>
                  <Box sx={{ pl: 3, py: 6 }}>{step.component}</Box>
                  <Box sx={{ mb: 2 }}>
                    <div>
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        {index === steps.length - 1 ? "Finish" : "Continue"}
                      </Button>
                      <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Back
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} sx={{ p: 3 }}>
              <Typography>
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                Reset
              </Button>
            </Paper>
          )}

          <Typography
            variant="body2"
            align="center"
            sx={{ color: "text.secondary", mt: 3 }}
          >
            By registering, I agree to Minimal&nbsp;
            <Link underline="always" color="text.primary" href="#">
              Terms of Service
            </Link>
            &nbsp;and&nbsp;
            <Link underline="always" color="text.primary" href="#">
              Privacy Policy
            </Link>
            .
          </Typography>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
