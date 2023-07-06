import React, { useCallback, useEffect, useState } from "react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import { Icon } from "@iconify/react";
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
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// atoms
import alertAtom from "src/recoil/atoms/alertAtom";
// __apis__
import { addEmployeeRequest, fetchStaffSkills } from "src/__apis__/employees";
import { fetchAllowedViews } from "src/__apis__/accounts";
// utils
import { fData } from "src/utils/formatNumber";
//
import { UploadAvatar } from "../upload";

// ---------------------------------------------------------------------------------------

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

function AddEmployeePopUp({ isTriggered, closeHandler, refreshHandler }) {
  const [showPassword, setShowPassword] = useState(false);

  const triggerAlert = useSetRecoilState(alertAtom);

  const [allowedViews, setAllowedViews] = useState([]);
  const [staffSkills, setStaffSkills] = useState([]);

  const [filePreview, setFilePreview] = useState(null);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      userName: "",
      phoneNumber: "",
      password: "",
      role: "",
      allowedViews: [],
      skills: [],
      profilePic: null,
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string()
        .email("Please enter a valid email")
        .required("email is required"),
      userName: Yup.string().required("Username is required"),
      phoneNumber: Yup.string().required("Phone number is required"),
      password: Yup.string().required("password is required"),
      role: Yup.string().required("Role is required"),
      profilePic: Yup.mixed().required("Profile pic is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const data = new FormData();
      console.log("try file upload", values.profilePic);
      data.append("values", JSON.stringify(values));
      data.append("profilePic", values.profilePic);

      await addEmployeeRequest(data)
        .then(() => {
          triggerAlert({
            triggered: true,
            message: "Employee added successfully",
            type: "success",
          });
          resetForm();
          refreshHandler();
        })
        .catch((error) => {
          console.log("Error adding employee", error);
          triggerAlert({
            triggered: true,
            type: "error",
            message: "Error adding employee",
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

  const allowedViewsFetcher = useCallback(async () => {
    fetchAllowedViews()
      .then((response) => {
        setAllowedViews(response);
      })
      .catch((error) => {
        console.log("Error fetching allowed views", error);
      });
  }, [fetchAllowedViews, setAllowedViews]);

  const staffSkillsFetcher = useCallback(async () => {
    fetchStaffSkills()
      .then((response) => {
        setStaffSkills(response);
      })
      .catch((error) => {
        console.log("Error fetching staff skills", error);
      });
  });

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue("profilePic", file);
        setFilePreview({
          ...file,
          preview: URL.createObjectURL(file),
        });
      }
    },
    [setFieldValue]
  );

  useEffect(() => {
    allowedViewsFetcher();
    staffSkillsFetcher();
  }, []);

  return (
    <Dialog open={isTriggered} onClose={closeHandler} fullWidth>
      <DialogTitle>Add Employee</DialogTitle>
      <DialogContent>
        <Box pt={4}>
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
            <Grid item xs={12}>
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
                label="Role"
                value={values.role}
                onChange={(event) => setFieldValue("role", event.target.value)}
                {...getFieldProps("role")}
                error={Boolean(touched.role && errors.role)}
                helperText={touched.role && errors.role}
                fullWidth
                select
              >
                <MenuItem value="front-end-dev">Front-end Dev</MenuItem>
                <MenuItem value="back-end-dev">Back-end Dev</MenuItem>
                <MenuItem value="dev-ops">Dev-Ops</MenuItem>
                <MenuItem value="ui-designer">UI Designer</MenuItem>
                <MenuItem value="full-stack-dev">Full-stack Dev</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                value={values.allowedViews}
                onChange={(event, newValue) =>
                  setFieldValue("allowedViews", newValue)
                }
                options={allowedViews.map((allowedView) => ({
                  id: allowedView.id,
                  label: allowedView.name,
                }))}
                multiple
                renderInput={(params) => (
                  <TextField {...params} label="Allowed Views" />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                value={values.skills}
                onChange={(event, newValue) =>
                  setFieldValue("skills", newValue)
                }
                options={staffSkills.map((staffSkill) => ({
                  id: staffSkill.id,
                  label: staffSkill.name,
                }))}
                multiple
                renderInput={(params) => (
                  <TextField {...params} label="Skills" />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <UploadAvatar
                accept="image/*"
                file={filePreview}
                onDrop={handleDrop}
                error={Boolean(touched.profilePic && errors.profilePic)}
                caption={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: "auto",
                      display: "block",
                      textAlign: "center",
                      color: "text.secondary",
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeHandler}>Cancel</Button>
        <LoadingButton
          onClick={handleSubmit}
          disabled={!dirty}
          loading={isSubmitting}
          variant="contained"
          endIcon={<Icon icon="ic:round-send" />}
        >
          Save
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default AddEmployeePopUp;
