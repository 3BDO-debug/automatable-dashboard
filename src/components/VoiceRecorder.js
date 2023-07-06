import React, { useState, useEffect, useRef } from "react";
import { Button, Card, CardContent, Typography, Box } from "@mui/material";
import { Mic, Stop } from "@mui/icons-material";

const VoiceRecorder = ({ audioFileHandler }) => {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [chunks, setChunks] = useState([]);
  const audioElement = useRef(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const newMediaRecorder = new MediaRecorder(stream);
        setMediaRecorder(newMediaRecorder);

        newMediaRecorder.ondataavailable = (e) => {
          setChunks((oldChunks) => [...oldChunks, e.data]);
        };
      })
      .catch((err) => console.log(err));
  }, []);

  const startRecording = () => {
    if (mediaRecorder) {
      setRecording(true);
      mediaRecorder.start();
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      setRecording(false);
      mediaRecorder.stop();
    }
  };

  const saveRecording = () => {
    const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
    const audioURL = window.URL.createObjectURL(blob);
    audioElement.current.src = audioURL;
    setChunks([]);

    const file = new File([blob], "recording.ogg", { type: "audio/ogg" });
    audioFileHandler(file);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Voice Recorder</Typography>
        <Box sx={{ my: 2, display: "flex", justifyContent: "space-around" }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Mic />}
            disabled={recording}
            onClick={startRecording}
            sx={{ flex: "1", mx: 1 }}
          >
            Start
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<Stop />}
            disabled={!recording}
            onClick={stopRecording}
            sx={{ flex: "1", mx: 1 }}
          >
            Stop
          </Button>
          <Button
            variant="contained"
            disabled={chunks.length === 0}
            onClick={saveRecording}
            sx={{ flex: "1", mx: 1 }}
          >
            Save
          </Button>
        </Box>
        <audio ref={audioElement} controls style={{ width: "100%" }} />
      </CardContent>
    </Card>
  );
};

export default VoiceRecorder;
