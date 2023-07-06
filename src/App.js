import React from "react";
// material
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
// routes
import Router from "./routes";
// theme
import ThemeProvider from "./theme";
// components
import { MotionLazyContainer } from "./components/animate";
import { ProgressBarStyle } from "./components/ProgressBar";
import ThemeSettings from "./components/settings";
import Alert from "./components/Alert";

// ------------------------------------------------------------------------

function App() {
  return (
    <MotionLazyContainer>
      <ThemeProvider>
        <ThemeSettings>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <ProgressBarStyle />
            <Router />
            <Alert />
          </LocalizationProvider>
        </ThemeSettings>
      </ThemeProvider>
    </MotionLazyContainer>
  );
}

export default App;
