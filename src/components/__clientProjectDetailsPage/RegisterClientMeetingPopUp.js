import React, { useCallback, useState } from "react";
import { useParams } from "react-router";
// material
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useSetRecoilState } from "recoil";
// __apis__
import { addClientMeeting } from "src/__apis__/clients";
// atoms
import alertAtom from "src/recoil/atoms/alertAtom";
//
import Iconify from "../Iconify";
import VoiceRecorder from "../VoiceRecorder";

// ------------------------------------------------------------------------------------------------------

function RegisterClientMeetingPopUp({ isTriggered, closeHander }) {
  const [audioFile, setAudioFile] = useState(null); // Add this line
  const [submitting, setIsSubmitting] = useState(false);
  const [description, setDescription] = useState("");

  const triggerAlert = useSetRecoilState(alertAtom);

  const { id } = useParams();

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    const data = new FormData();
    data.append("clientProjectId", id);
    data.append("file", audioFile);
    data.append("description", description);

    addClientMeeting(data)
      .then((response) => {
        triggerAlert({
          triggered: true,
          type: "success",
          message: "Meeting recorded successfully",
        });
        setIsSubmitting(false);
        setAudioFile(null);
        closeHander();
      })
      .catch((error) => {
        console.log("ERROR RECORDING MEETING", error);
        setIsSubmitting(false);
        triggerAlert({
          triggered: true,
          type: "error",
          message: "Error recording meeting",
        });
      });
  }, [id, audioFile, description]);

  return (
    <Dialog open={isTriggered} onClose={closeHander} fullWidth>
      <DialogTitle>Track Client Meeting</DialogTitle>
      <DialogContent>
        <Box pt={4}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Meeting Description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                fullWidth
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <VoiceRecorder audioFileHandler={(file) => setAudioFile(file)} />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", float: "right" }}>
                <Button onClick={closeHander} variant="outlined" color="error">
                  Cancel
                </Button>
                <LoadingButton
                  variant="contained"
                  sx={{ ml: 2 }}
                  endIcon={<Iconify icon="material-symbols:save" />}
                  onClick={handleSubmit}
                  loading={submitting}
                  disabled={!audioFile}
                >
                  Save
                </LoadingButton>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default RegisterClientMeetingPopUp;
