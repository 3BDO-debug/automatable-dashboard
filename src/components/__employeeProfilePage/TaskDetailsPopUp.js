import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useSetRecoilState } from "recoil";
// material
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  Card,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// atoms
import alertAtom from "src/recoil/atoms/alertAtom";
//
import Iconify from "../Iconify";
import { addTaskSubmission } from "src/__apis__/employees";

// --------------------------------------------------------------------------

function TaskDetailsPopUp({ isTriggered, closeHandler, data }) {
  const [file, setFile] = useState(null);
  const [isUploading, setUploading] = useState(false);

  const [submitting, setIsSubmitting] = useState(false);

  const triggerAlert = useSetRecoilState(alertAtom);

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    setFile(acceptedFiles[0]);
    setUploading(true);

    // Mock upload process
    setTimeout(() => {
      setUploading(false);
    }, 2000);
  }, []);

  const onSubmitHandler = useCallback(async () => {
    setIsSubmitting(true);
    const requestData = new FormData();

    requestData.append("file", file);
    requestData.append("taskId", data?.id);

    addTaskSubmission(requestData)
      .then((response) => {
        triggerAlert({
          triggered: true,
          type: "success",
          message: "Uploaded submission",
        });
        setIsSubmitting(false);
        setFile(null);
        closeHandler();
      })
      .catch((error) => {
        console.log("Error uploading file submission", error);
        triggerAlert({
          triggered: true,
          type: "error",
          message: "Error uplaoding file submission",
        });
      });
  }, [file, data, triggerAlert]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Dialog open={isTriggered} onClose={closeHandler} fullWidth>
      <DialogTitle>{data?.name}</DialogTitle>
      <DialogContent>
        <Box pt={4}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Task Description"
                fullWidth
                value={data?.description}
                multiline
                rows={6}
              />
            </Grid>
            <Grid item xs={12}>
              <Card
                {...getRootProps()}
                sx={{
                  height: "200px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  p: 2,
                  border: "2px dashed #000",
                  borderColor: isDragActive ? "primary.main" : "grey.500",
                }}
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <Typography variant="subtitle1">
                    Drop the files here...
                  </Typography>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <IconButton color="primary" fontSize="large">
                      <CloudUploadIcon fontSize="large" />
                    </IconButton>
                    <Typography variant="subtitle1">
                      Drag 'n' drop some files here, or click to select files
                    </Typography>
                  </Box>
                )}
              </Card>
              {isUploading && <CircularProgress size={30} sx={{ mt: 3 }} />}
              {file && (
                <Typography sx={{ my: 2 }} variant="subtitle1">
                  File: {file.name}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ float: "right" }}>
                <Button variant="outlined" onClick={closeHandler} color="error">
                  Cancel
                </Button>
                <LoadingButton
                  variant="contained"
                  disabled={!Boolean(file)}
                  loading={submitting}
                  onClick={onSubmitHandler}
                  sx={{ ml: 2 }}
                  endIcon={<Iconify icon="material-symbols:send" />}
                >
                  Submit
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
