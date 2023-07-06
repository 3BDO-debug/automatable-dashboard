import React, { useState } from "react";
// material
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

// ---------------------------------------------

function ForgetPassword() {
  const [otp, setOtp] = useState([
    { index: "1", value: null, active: false },
    { index: "2", value: null, active: false },
    { index: "3", value: null, active: false },
    { index: "4", value: null, active: false },
  ]);

  const handleOtpChange = (currentIndex, value) => {
    let copy = [...otp];

    for (let index = 0; index < copy.length; index++) {
      const element = copy[index];

      if (element.index === currentIndex) {
        element.value = value;
        const nextElement = copy[index + 1];
        nextElement.active = true;
      }
    }

    setOtp(copy);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid container sx={{ width: "400px", marginTop: "30vh" }} spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h3">We got you covered.</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2" color="text.secondary">
            Reset password now
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <TextField
                value={otp[0].value}
                onChange={(event) => handleOtpChange("1", event.target.value)}
                inputRef={(input) => input && otp[0].active && input.focus()}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                value={otp[1].value}
                onChange={(event) => handleOtpChange("2", event.target.value)}
                inputRef={(input) => input && otp[1].active && input.focus()}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                value={otp[2].value}
                onChange={(event) => handleOtpChange("3", event.target.value)}
                inputRef={(input) => input && otp[2].active && input.focus()}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                value={otp[3].value}
                onChange={(event) => handleOtpChange("4", event.target.value)}
                inputRef={(input) => input && otp[3 ].active && input.focus()}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button
            sx={{ width: "100%" }}
            endIcon={<SendIcon />}
            variant="contained"
          >
            Reset password
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ForgetPassword;
