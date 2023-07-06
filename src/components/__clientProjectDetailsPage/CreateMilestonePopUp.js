import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";
import { useParams } from "react-router";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useSetRecoilState } from "recoil";
// material
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Grid,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// atoms
import alertAtom from "src/recoil/atoms/alertAtom";
// __apis__
import { fetchTasks } from "src/__apis__/employees";
//
import Iconify from "../Iconify";
import { createClientProjectMilestoneRequest } from "src/__apis__/clients";

// -------------------------------------------------------------------------------------

function CreateMilestonePopUp({ isTriggered, closeHandler }) {
  const [tasks, setTasks] = useState([]);

  const { id } = useParams();

  const triggerAlert = useSetRecoilState(alertAtom);

  const formik = useFormik({
    initialValues: {
      name: "",
      price: 0,
      dueDate: moment(),
      milestoneTasks: [],
      description: "",
      clientProjectId: id,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Milestone name is required"),
      price: Yup.number()
        .min(1, "Price should be greater than or equal 1")
        .required("Milestone price is required"),
      dueDate: Yup.date()
        .required("Due date is required")
        .min(moment(), "Date must be today or in the future"),
      milestoneTasks: Yup.array()
        .of(
          Yup.object().shape({
            label: Yup.string().required("Option is required"),
            id: Yup.string().required("Option is required"),
          })
        )
        .min(1, "At least one option must be selected")
        .required("At least one option must be selected"),
      description: Yup.string().required("Milestone description is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      createClientProjectMilestoneRequest(values)
        .then(() => {
          resetForm();
          triggerAlert({
            triggered: true,
            type: "success",
            message: "Milestone created successfully",
          });
        })
        .catch((error) => {
          console.log("Error creating milestone", error);
          triggerAlert({
            triggered: true,
            type: "error",
            message: "Error creating client project milestone",
          });
        });
    },
  });

  const tasksFetcher = useCallback(async () => {
    fetchTasks(id)
      .then((response) => {
        setTasks(response);
      })
      .catch((error) => {
        console.log("Error fetching tasks", error);
      });
  }, []);

  useEffect(() => {
    tasksFetcher();
  }, []);

  const {
    errors,
    dirty,
    touched,
    handleSubmit,
    isSubmitting,
    getFieldProps,
    setFieldValue,
    values,
  } = formik;

  useEffect(() => {
    setFieldValue("clientProjectId", id);
  }, [id, values]);

  return (
    <Dialog open={isTriggered} onClose={closeHandler} fullWidth>
      <DialogTitle>Create Project Milestone</DialogTitle>
      <DialogContent>
        <Box pt={4}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                value={values.name}
                onChange={(event) => setFieldValue("name", event.target.value)}
                {...getFieldProps("name")}
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && errors.name}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Price"
                type="number"
                value={values.price}
                onChange={(event) => setFieldValue("price", event.target.value)}
                {...getFieldProps("price")}
                error={Boolean(touched.price && errors.price)}
                helperText={touched.price && errors.price}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <DatePicker
                label="Due Date"
                value={values.dueDate}
                onChange={(newValue) => setFieldValue("dueDate", newValue)}
                sx={{ width: "100%" }}
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
              <FormHelperText error>{errors.dueDate}</FormHelperText>
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                value={values.milestoneTasks}
                onChange={(event, newValue) =>
                  setFieldValue("milestoneTasks", newValue)
                }
                options={tasks.map((task) => ({
                  id: task.id,
                  label: task.name,
                }))}
                renderInput={(params) => (
                  <TextField {...params} label="Milestone tasks" />
                )}
              />
              <FormHelperText error>{errors.milestoneTasks}</FormHelperText>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                value={values.description}
                onChange={(event) =>
                  setFieldValue("description", event.target.value)
                }
                {...getFieldProps("description")}
                error={Boolean(touched.description && errors.description)}
                helperText={touched.description && errors.description}
                fullWidth
                multiline
                rows={3}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="error" onClick={closeHandler}>
          Cancel
        </Button>
        <LoadingButton
          variant="contained"
          disabled={!dirty}
          onClick={handleSubmit}
          loading={isSubmitting}
          endIcon={<Iconify icon="ic:outline-send" />}
        >
          Save
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default CreateMilestonePopUp;
