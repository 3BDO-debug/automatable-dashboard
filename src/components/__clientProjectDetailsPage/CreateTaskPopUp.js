import React, { useCallback, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSetRecoilState } from "recoil";
import { useParams } from "react-router";
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
import {
  fetchStaffSkills,
  createClientProjectTaskRequest,
} from "src/__apis__/employees";
//
import Iconify from "../Iconify";

// ------------------------------------------------------------------------

function CreateTaskPopUp({ isTriggered, closeHandler }) {
  const [skills, setSkills] = useState([]);

  const { id } = useParams();

  const triggerAlert = useSetRecoilState(alertAtom);

  const formik = useFormik({
    initialValues: {
      taskName: "",
      requiredSkills: [],
      dueDate: null,
      description: "",
      clientProjectId: id,
    },
    validationSchema: Yup.object().shape({
      taskName: Yup.string().required("Task name is required"),
      requiredSkills: Yup.array()
        .of(
          Yup.object().shape({
            label: Yup.string().required("Option is required"),
            id: Yup.string().required("Option is required"),
          })
        )
        .min(1, "At least one option must be selected")
        .required("At least one option must be selected"),
      dueDate: Yup.date()
        .required("Due date is required")
        .min(new Date(), "Date must be today or in the future"),
      description: Yup.string().required("Task description is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      createClientProjectTaskRequest(values)
        .then((response) => {
          if (response.task_assign_failed) {
            triggerAlert({
              triggered: true,
              type: "warning",
              message: "We couldnt find free team member to assign task to",
            });
          } else {
            resetForm();
            triggerAlert({
              triggered: true,
              type: "success",
              message: "Task created successfully",
            });
            closeHandler();
          }
        })
        .catch((error) => {
          console.log("Error creating task", error);
          triggerAlert({
            triggered: true,
            type: "error",
            message: "Error creating task",
          });
        });
    },
  });

  const skillsFetcher = useCallback(async () => {
    fetchStaffSkills()
      .then((response) => {
        setSkills(response);
      })
      .catch((error) => {
        console.log("Error fetching skills", error);
      });
  }, []);

  useEffect(() => {
    skillsFetcher();
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
    if (id) {
      setFieldValue("clientProjectId", id);
    }
  }, [id, values.clientProjectId]);

  return (
    <Dialog open={isTriggered} onClose={closeHandler} fullWidth>
      <DialogTitle>Create Task</DialogTitle>
      <DialogContent>
        <Box marginTop={3}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                value={values.taskName}
                onChange={(event) =>
                  setFieldValue("taskName", event.target.value)
                }
                {...getFieldProps("taskName")}
                error={Boolean(touched.taskName && errors.taskName)}
                helperText={touched.taskName && errors.taskName}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                id="tags-standard"
                value={values.requiredSkills}
                onChange={(event, newValue) =>
                  setFieldValue("requiredSkills", newValue)
                }
                options={skills.map((skill) => ({
                  id: skill.id,
                  label: skill.name,
                }))}
                renderInput={(params) => (
                  <TextField {...params} label="Skills Keywords" />
                )}
              />
              <FormHelperText error> {errors.requiredSkills}</FormHelperText>
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
              <TextField
                label="Description"
                value={values.description}
                onChange={(event) =>
                  setFieldValue("description", event.target.value)
                }
                {...getFieldProps("description")}
                error={Boolean(touched.description && errors.description)}
                helperText={touched.description && errors.description}
                rows={4}
                fullWidth
                multiline
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
          disabled={!dirty}
          onClick={handleSubmit}
          loading={isSubmitting}
          endIcon={<Iconify icon="mdi:create-outline" />}
          variant="contained"
        >
          Create Task
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default CreateTaskPopUp;
