import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSetRecoilState } from "recoil";
// material
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Skeleton,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// __apis__
import { fetchClientDetails, updateClientDetails } from "src/__apis__/clients";
// atoms
import alertAtom from "src/recoil/atoms/alertAtom";
//
import Iconify from "../Iconify";

// ---------------------------------------------------------------------------------

function ClientInfo() {
  const [client, setClient] = useState({});

  const { id } = useParams();

  const triggerAlert = useSetRecoilState(alertAtom);

  const [fetching, setIsFetching] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      govId: "",
      clientId: null,
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string()
        .email("Please enter a valid email")
        .required("Email is required"),
      phoneNumber: Yup.string().required("Phone number is required"),
      govId: Yup.string().required("GOV ID is required"),
    }),
    onSubmit: async (values) => {
      updateClientDetails(values)
        .then((response) => {
          clientDataUpdater(response);
          triggerAlert({
            triggered: true,
            type: "success",
            message: "Updated client details successfully",
          });
        })
        .catch((error) => {
          triggerAlert({
            triggered: true,
            type: "error",
            message: "Error updating client details",
          });
        });
    },
  });

  const {
    values,
    setFieldValue,
    getFieldProps,
    touched,
    dirty,
    errors,
    isSubmitting,
    handleSubmit,
  } = formik;

  const clientDetailsFetcher = useCallback(async () => {
    setIsFetching(true);
    fetchClientDetails(id)
      .then((response) => {
        setClient(response);
        setIsFetching(false);
      })
      .catch((error) => {
        console.log("Error fetching client details", error);
      });
  }, [id]);

  useEffect(() => {
    if (id) {
      clientDetailsFetcher();
      setFieldValue("clientId", id);
    }
  }, [id]);

  const clientDataUpdater = useCallback(
    (data) => {
      setFieldValue("firstName", data?.account_data?.first_name);
      setFieldValue("lastName", data?.account_data?.last_name);
      setFieldValue("email", data?.account_data?.email);
      setFieldValue("phoneNumber", data?.account_data?.phone_number);
      setFieldValue("govId", data?.account_data?.gov_id);
    },
    [setFieldValue]
  );

  useEffect(() => {
    if (client) {
      clientDataUpdater(client);
    }
  }, [client]);

  return (
    <Card>
      <CardHeader title="General Info" />
      <CardContent>
        {fetching ? (
          <Skeleton height={300} />
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="First name"
                value={values.firstName}
                onChange={(event) =>
                  setFieldValue("firstName", event.target.value)
                }
                {...getFieldProps("firstName")}
                error={Boolean(touched.firstName && errors.firstName)}
                helperText={touched.firstName && errors.firstName}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Last name"
                value={values.lastName}
                onChange={(event) =>
                  setFieldValue("lastName", event.target.value)
                }
                {...getFieldProps("lastName")}
                error={Boolean(touched.lastName && errors.lastName)}
                helperText={touched.lastName && errors.lastName}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Email"
                value={values.email}
                onChange={(event) => setFieldValue("email", event.target.value)}
                {...getFieldProps("email")}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Phone number"
                value={values.phoneNumber}
                onChange={(event) =>
                  setFieldValue("phoneNumber", event.target.value)
                }
                {...getFieldProps("phoneNumber")}
                error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                helperText={touched.phoneNumber && errors.phoneNumber}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="GOV ID"
                value={values.govId}
                onChange={(event) => setFieldValue("govId", event.target.value)}
                {...getFieldProps("govId")}
                error={Boolean(touched.govId && errors.govId)}
                helperText={touched.govId && errors.govId}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <LoadingButton
                variant="contained"
                startIcon={<Iconify icon="material-symbols:save-as-outline" />}
                sx={{ float: "right" }}
                onClick={handleSubmit}
                disabled={!dirty}
                loading={isSubmitting}
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

export default ClientInfo;
