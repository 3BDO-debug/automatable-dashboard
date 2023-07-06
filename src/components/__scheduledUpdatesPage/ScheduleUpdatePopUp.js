import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSetRecoilState } from "recoil";
import moment from "moment";
// material
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// atoms
import alertAtom from "src/recoil/atoms/alertAtom";
//
import Iconify from "../Iconify";
import { addScheduledUpdate } from "src/__apis__/clients";

// ------------------------------------------------------------------------------------------------------------------------------

const validationSchema = yup.object({
  update_name: yup.string().max(255, "Max 255 characters").required("Required"),
  release_date: yup.date().required("Required"),
  major_update: yup.boolean().required("Required"),
  release_description: yup.string().required("Required"),
});

// ------------------------------------------------------------------------------------------------------------------------------

function ScheduleUpdatePopUp({ isTriggered, closeHandler, fetchHandler }) {
  const triggerAlert = useSetRecoilState(alertAtom);

  const formik = useFormik({
    initialValues: {
      update_name: "",
      release_date: null,
      major_update: false,
      release_description: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const formattedDate = moment(values.release_date).format("DD-MM-YYYY");

      await addScheduledUpdate({
        ...values,
        release_date: formattedDate,
      })
        .then((response) => {
          triggerAlert({
            triggered: true,
            type: "success",
            message: "Added scheduled update successfully",
          });
          resetForm();
          closeHandler();
        })
        .catch((error) => {
          console.log("ERROR SCHEDULING UPDATE", error);
          triggerAlert({
            triggered: true,
            type: "error",
            message: "Error scheduling update",
          });
        });

      await fetchHandler();
    },
  });

  return (
    <Dialog open={isTriggered} onClose={closeHandler} fullWidth>
      <DialogTitle>Schedule Update</DialogTitle>
      <DialogContent>
        <Box pt={4}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  name="update_name"
                  label="Update Name"
                  value={formik.values.update_name}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.update_name &&
                    Boolean(formik.errors.update_name)
                  }
                  helperText={
                    formik.touched.update_name && formik.errors.update_name
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <MobileDatePicker
                  name="release_date"
                  label="Release Date"
                  sx={{ width: "100%" }}
                  value={formik.values.release_date}
                  onChange={(value) =>
                    formik.setFieldValue("release_date", value)
                  }
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      name="major_update"
                      checked={formik.values.major_update}
                      onChange={formik.handleChange}
                    />
                  }
                  label="Major Update"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="release_description"
                  label="Release Description"
                  value={formik.values.release_description}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.release_description &&
                    Boolean(formik.errors.release_description)
                  }
                  helperText={
                    formik.touched.release_description &&
                    formik.errors.release_description
                  }
                  fullWidth
                  rows={4}
                  multiline
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ float: "right" }}>
                  <Button onClick={closeHandler}>Cancel</Button>
                  <LoadingButton
                    endIcon={<Iconify icon="ic:baseline-schedule-send" />}
                    variant="contained"
                    sx={{ ml: 2 }}
                    onClick={formik.handleSubmit}
                  >
                    Save
                  </LoadingButton>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default ScheduleUpdatePopUp;
