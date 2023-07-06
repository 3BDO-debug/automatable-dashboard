import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import * as Yup from "yup";
import { useFormik } from "formik";
// material
import {
  Autocomplete,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Skeleton,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// __apis__
import { fetchClientProject } from "src/__apis__/clients";
import { fetchEmployees } from "src/__apis__/employees";
//
import Iconify from "../Iconify";

// ----------------------------------------------------------------------------------------------

function GeneralInfo({ clientProject }) {
  const { id } = useParams();

  const [employees, setEmployees] = useState([]);

  const formik = useFormik({
    initialValues: {
      projectName: "",
      supervisedBy: "",
      description: "",
      teamMembers: [],
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
    if (clientProject) {
      setFieldValue("projectName", clientProject?.project_name);
      setFieldValue("supervisedBy", clientProject?.supervisor);
      setFieldValue("description", clientProject?.project_description);
      setFieldValue("teamMembers", clientProject?.staff_members);
    }
  }, [clientProject]);

  return (
    <Card>
      <CardHeader title="General Info" />
      <CardContent>
        {!clientProject ? (
          <Skeleton sx={{ width: "100%", height: 500 }} />
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Project Name"
                value={values.projectName}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Supervisor"
                value={values.supervisedBy}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                options={employees.map((employee) => ({
                  id: employee.id,
                  fullname: employee.fullname,
                }))}
                value={values.teamMembers}
                getOptionLabel={(option) => option.fullname}
                renderInput={(params) => (
                  <TextField {...params} label="Team Members" />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                value={values.description}
                rows={4}
                fullWidth
                multiline
              />
            </Grid>
            <Grid item xs={12}>
              <LoadingButton
                startIcon={
                  <Iconify icon="material-symbols:edit-outline-rounded" />
                }
                variant="contained"
                sx={{ float: "right" }}
              >
                Update
              </LoadingButton>
            </Grid>
          </Grid>
        )}
      </CardContent>
    </Card>
  );
}

export default GeneralInfo;
