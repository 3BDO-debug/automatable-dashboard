import React, { useCallback, useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useSetRecoilState } from "recoil";
import { useParams } from "react-router";
// material
import {
  Autocomplete,
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Slide,
  TextField,
} from "@mui/material";
import { Dialog } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Grid } from "@mui/material";
// atoms
import alertAtom from "src/recoil/atoms/alertAtom";
// __apis__
import { fetchEmployees } from "src/__apis__/employees";
import { addClientProject } from "src/__apis__/clients";
//
import Iconify from "../Iconify";

// ----------------------------------------------------------------------------------------------------------------------

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// ----------------------------------------------------------------------------------------------------------------------

function RegisterClientProject({ isTriggered, closeHandler, refreshHandler }) {
  const [employees, setEmployees] = useState([]);

  const triggerAlert = useSetRecoilState(alertAtom);

  const { id } = useParams();

  const formik = useFormik({
    initialValues: {
      projectName: "",
      teamMembers: [],
      description: "",
      clientId: null,
    },
    validationSchema: Yup.object().shape({
      projectName: Yup.string().required("Project name is required"),
      teamMembers: Yup.array()
        .of(
          Yup.object().shape({
            label: Yup.string().required("Option is required"),
            id: Yup.string().required("Option is required"),
          })
        )
        .min(1, "At least one option must be selected")
        .required("At least one option must be selected"),
      description: Yup.string().required("Project description is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      addClientProject(values)
        .then(() => {
          triggerAlert({
            triggered: true,
            message: "Client Project Registered Successfully",
            type: "success",
          });
          resetForm();
          refreshHandler();
          closeHandler();
        })
        .catch((error) => {
          console.log("Error adding client project", error);
          triggerAlert({
            triggered: true,
            message: "Something wrong happened adding client project",
            type: "error",
          });
        });
    },
  });

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

  const employeesFetcher = useCallback(async () => {
    fetchEmployees()
      .then((response) => {
        setEmployees(response);
      })
      .catch((error) => {
        console.log("Error fetching employees", error);
      });
  }, [setEmployees]);

  useEffect(() => {
    employeesFetcher();
  }, []);

  useEffect(() => {
    setFieldValue("clientId", id);
  }, [id]);

  return (
    <Dialog
      open={isTriggered}
      onClose={closeHandler}
      TransitionComponent={Transition}
      fullWidth
    >
      <DialogTitle>Register Client Project</DialogTitle>
      <DialogContent>
        <Box paddingTop={4}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Project Name"
                value={values.projectName}
                onChange={(event) =>
                  setFieldValue("projectName", event.target.value)
                }
                {...getFieldProps("projectName")}
                error={Boolean(touched.projectName && errors.projectName)}
                helperText={touched.projectName && errors.projectName}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                id="tags-standard"
                value={values.teamMembers}
                onChange={(event, newValue) =>
                  setFieldValue("teamMembers", newValue)
                }
                options={employees.map((employee) => ({
                  id: employee.id,
                  label: employee.fullname,
                }))}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={touched.selectedOptions && !!errors.selectedOptions}
                    helperText={
                      touched.selectedOptions && errors.selectedOptions
                    }
                    label="Team Members"
                  />
                )}
              />
              <FormHelperText error>{errors.teamMembers}</FormHelperText>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Project Full Description"
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
          variant="contained"
          disabled={!dirty}
          onClick={handleSubmit}
          endIcon={<Iconify icon="ic:outline-send" />}
        >
          Submit
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default RegisterClientProject;
