import React, { useCallback, useState } from "react";
import { useSetRecoilState } from "recoil";
// material
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// atoms
import alertAtom from "src/recoil/atoms/alertAtom";
// __apis__
import { requestTaskSubmissionAction } from "src/__apis__/employees";
//
import Iconify from "../Iconify";

//-----------------------------------------------------------------------------

function TaskDetailsPopUp({ isTriggered, closeHandler, data }) {
  const triggerAlert = useSetRecoilState(alertAtom);
  const [submitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(
    async (action) => {
      setIsSubmitting(true);
      const requestData = new FormData();
      requestData.append("action", action);
      requestData.append("taskId", data?.id);

      await requestTaskSubmissionAction(requestData)
        .then((response) => {
          setIsSubmitting(true);
          closeHandler();
          triggerAlert({
            triggered: true,
            type: "success",
            message: "Task submittion reviewed",
          });
        })
        .catch((error) => {
          console.log("Error in task submittion action", error);
          triggerAlert({
            triggered: true,
            type: "error",
            message: "Something wrong happened",
          });
        });

      setIsSubmitting(false);
    },
    [data]
  );

  return (
    <Dialog open={isTriggered} onClose={closeHandler} fullWidth>
      <DialogTitle>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6">{data?.name}</Typography>
          <Tooltip title="Download Submission">
            <IconButton href={data?.task_submission} component="a" download>
              <Iconify
                sx={{ width: 35, height: 35 }}
                icon="line-md:download-loop"
              />
            </IconButton>
          </Tooltip>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box pt={4}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={6}
                value={data?.description}
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <LoadingButton
                  variant="outlined"
                  color="error"
                  onClick={() => handleSubmit("Submission Declined")}
                  loading={submitting}
                >
                  Decline Task Submission
                </LoadingButton>
                <LoadingButton
                  variant="contained"
                  onClick={() => handleSubmit("Submission Accepted")}
                  loading={submitting}
                >
                  Accept Task Submission
                </LoadingButton>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default TaskDetailsPopUp;
