import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSetRecoilState } from "recoil";
// material
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// __apis__
import { addIncomeSource } from "src/__apis__/resourcesManagement";
// atoms
import alertAtom from "src/recoil/atoms/alertAtom";
// components
import Iconify from "../Iconify";

// --------------------------------------------------------------------------

function AddIncomeSourcePopUp({ isTriggered, closeHandler }) {
  const triggerAlert = useSetRecoilState(alertAtom);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Income source name is required"),
      description: Yup.string().required(
        "Income source description is required"
      ),
    }),
    onSubmit: (values, { resetForm, setSubmitting }) => {
      addIncomeSource(values)
        .then(() => {
          triggerAlert({
            triggered: true,
            type: "success",
            message: "Income source has been added successfully",
          });
          resetForm();
          closeHandler();
        })
        .catch((error) => {
          console.log("Error adding income source", error);
          triggerAlert({
            triggered: true,
            type: "error",
            message: "Error adding income source",
          });
        });
    },
  });

  const {
    values,
    setFieldValue,
    getFieldProps,
    touched,
    errors,
    dirty,
    handleSubmit,
    isSubmitting,
  } = formik;

  return (
    <Dialog open={isTriggered} onClose={closeHandler} fullWidth>
      <DialogTitle>Add Income Source</DialogTitle>
      <DialogContent>
        <Box pt={4}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                value={values.name}
                onChange={(event) => setFieldValue("name", event.target.value)}
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && errors.name}
                {...getFieldProps("name")}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                value={values.description}
                onChange={(event) =>
                  setFieldValue("description", event.target.value)
                }
                error={Boolean(touched.description && errors.description)}
                helperText={touched.description && errors.description}
                {...getFieldProps("description")}
                multiline
                rows={3}
                fullWidth
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeHandler} variant="outlined" color="error">
          Cancel
        </Button>
        <LoadingButton
          loading={isSubmitting}
          onClick={handleSubmit}
          disabled={!dirty}
          variant="contained"
          endIcon={<Iconify icon="material-symbols:send" />}
        >
          Submit
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default AddIncomeSourcePopUp;
