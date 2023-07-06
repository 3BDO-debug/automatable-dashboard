import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Icon } from "@iconify/react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
// material
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
// __apis__
import { loginRequest } from "src/__apis__/auth";
// atoms
import alertAtom from "src/recoil/atoms/alertAtom";

// -------------------------------------------------------------------------------------------------------------

function convertBase64ToFile(base64Image) {
  // Get the data and mime type from the base64 string
  const dataAndType = base64Image.split(",");
  const mime = dataAndType[0].match(/:(.*?);/)[1];
  const data = atob(dataAndType[1]);

  // Create an ArrayBuffer with the length of the decoded data
  const buffer = new ArrayBuffer(data.length);
  const view = new Uint8Array(buffer);

  // Decode the data and store it in the ArrayBuffer
  for (let i = 0; i < data.length; i++) {
    view[i] = data.charCodeAt(i);
  }

  // Create a file with the ArrayBuffer and mime type
  return new File([buffer], "image", { type: mime });
}

// -------------------------------------------------------------------------------------------------------------

function LoginForm({ faceBiometeric }) {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const triggerAlert = useSetRecoilState(alertAtom);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      const data = new FormData();
      data.append("username", values.username);
      data.append("password", values.password);
      data.append("faceBiometeric", convertBase64ToFile(faceBiometeric));

      await loginRequest(data)
        .then(() => {
          triggerAlert({
            triggered: true,
            type: "success",
            message: "Signed in successfully",
          });
          navigate("/overview/home");
        })
        .catch((error) => {
          console.log("Error while trying to login", error);
          if (error.response.status === 401) {
            if (error.response.data.message) {
              triggerAlert({
                triggered: true,
                type: "error",
                message:
                  "Your facial biometerics didnt match any allowed users please retake the photo or contact an admin",
              });
            } else {
              triggerAlert({
                triggered: true,
                type: "error",
                message: "Wrong username or password",
              });
            }
          } else {
            triggerAlert({
              triggered: true,
              type: "error",
              message: "Error while trying to sign-in",
            });
          }
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

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Enter") {
        handleSubmit();
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  return (
    <Box component={"form"} onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            label="Username"
            type="text"
            id="username"
            name="username"
            {...getFieldProps("username")}
            error={Boolean(touched.username && errors.username)}
            helperText={touched.username && errors.username}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Password"
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            {...getFieldProps("password")}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <LoadingButton
            variant="contained"
            onClick={handleSubmit}
            loading={isSubmitting}
            disabled={!dirty}
            endIcon={<SendIcon />}
            fullWidth
          >
            Sign in
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
}

export default LoginForm;
