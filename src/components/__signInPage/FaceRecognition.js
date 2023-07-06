import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
// material
import { Box, Button, Card, Grid } from "@mui/material";
//
import Iconify from "../Iconify";

// -------------------------------------------------------------------------------------------

function FaceRecognition({ faceRecognitionImgState }) {
  const webcamRef = useRef(null);

  const [faceRecognitionImg, setFaceRecognitionImg] = faceRecognitionImgState;

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setFaceRecognitionImg(imageSrc);
  }, [webcamRef]);

  const reTake = useCallback(() => {
    setFaceRecognitionImg(null);
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {faceRecognitionImg ? (
          <Card>
            <Box component="img" src={faceRecognitionImg} />
          </Card>
        ) : (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Webcam height={300} width={700} ref={webcamRef} />
          </Box>
        )}
      </Grid>
      <Grid item xs={12}>
        <Button
          startIcon={
            <Iconify
              icon={
                faceRecognitionImg
                  ? "material-symbols:cancel-outline"
                  : "material-symbols:camera-video-outline"
              }
            />
          }
          fullWidth
          onClick={() => {
            if (faceRecognitionImg) {
              reTake();
            } else {
              capture();
            }
          }}
          sx={{ mr: 2 }}
          variant="outlined"
          color={faceRecognitionImg ? "error" : "primary"}
        >
          {faceRecognitionImg ? "Re-Take Image" : "Capture"}
        </Button>
      </Grid>
    </Grid>
  );
}

export default FaceRecognition;
