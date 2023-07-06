import React, { useState } from "react";
import { Icon } from "@iconify/react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import * as Yup from "yup";
// material
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  Box,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";
import { useFormik } from "formik";
// __apis__
import { addClientRequest } from "src/__apis__/clients";
import { useSetRecoilState } from "recoil";
import alertAtom from "src/recoil/atoms/alertAtom";
import { LoadingButton } from "@mui/lab";

// -----------------------------------------------------------------------------------------

const passwordGenerator = () => {
  let length = 8,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    generatedPassword = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    generatedPassword += charset.charAt(Math.floor(Math.random() * n));
  }
  return generatedPassword;
};

// -----------------------------------------------------------------------------------------

function AddClientPopUp({ isTriggered, closeHandler, refreshHandler }) {
  const [showPassword, setShowPassword] = useState(false);

  const triggerAlert = useSetRecoilState(alertAtom);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      userName: "",
      phoneNumber: "",
      password: "",
      govId: "",
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required("First name required"),
      lastName: Yup.string().required("Last name required"),
      email: Yup.string()
        .email("Email is not valid")
        .required("Email is required"),
      userName: Yup.string().required("Username is required"),
      phoneNumber: Yup.string().required("Phone number is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      await addClientRequest(values)
        .then((response) => {
          triggerAlert({
            triggered: true,
            type: "success",
            message: "Client added successfully",
          });
          refreshHandler();
          closeHandler();
          resetForm();
        })
        .catch((error) => {
          console.log("Error adding client", error);
          triggerAlert({
            triggered: true,
            type: "error",
            message: "Error adding client",
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

  return (
    <Dialog open={isTriggered} onClose={closeHandler} fullWidth>
      <DialogTitle>Add new client</DialogTitle>
      <DialogContent>
        <Box sx={{ paddingTop: 3 }}>
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
                label="Username"
                value={values.userName}
                onChange={(event) =>
                  setFieldValue("userName", event.target.value)
                }
                {...getFieldProps("userName")}
                error={Boolean(touched.userName && errors.userName)}
                helperText={touched.userName && errors.userName}
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
            <Grid item xs={12} md={6}>
              <TextField
                label="Password"
                value={values.password}
                onChange={(event) =>
                  setFieldValue("password", event.target.value)
                }
                {...getFieldProps("password")}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton
                          edge="end"
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                        </IconButton>
                        <Tooltip title="Auto generate password">
                          <IconButton
                            onClick={() =>
                              setFieldValue("password", passwordGenerator())
                            }
                            sx={{ ml: 1 }}
                          >
                            <Icon icon="line-md:loading-alt-loop" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </InputAdornment>
                  ),
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
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
          loading={isSubmitting}
          onClick={handleSubmit}
          endIcon={<SendIcon />}
        >
          Submit
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default AddClientPopUp;
