import React, { useCallback, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
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
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// atoms
import alertAtom from "src/recoil/atoms/alertAtom";
// __apis__
import {
  addEarning,
  fetchIncomeSources,
} from "src/__apis__/resourcesManagement";
//
import Iconify from "../Iconify";

// --------------------------------------------------------------------------------

function AddEarningsPopUp({ isTriggered, closeHandler }) {
  const [incomeSources, setIncomeSources] = useState([]);

  const triggerAlert = useSetRecoilState(alertAtom);

  const formik = useFormik({
    initialValues: { price: 0, incomeSource: null },
    validationSchema: Yup.object().shape({
      price: Yup.number("Please enter a valid number"),
    }),
    onSubmit: async (values, { resetForm }) => {
      addEarning(values)
        .then(() => {
          triggerAlert({
            triggered: true,
            type: "success",
            message: "Earning added successfully",
          });
          resetForm();
          closeHandler();
        })
        .catch((error) => {
          console.log("Error adding earning", error);
          triggerAlert({
            triggered: true,
            type: "error",
            message: "Error adding earning",
          });
        });
    },
  });

  const {
    values,
    setFieldValue,
    getFieldProps,
    dirty,
    touched,
    errors,
    isSubmitting,
    handleSubmit,
  } = formik;

  const incomeSourcesFetcher = useCallback(async () => {
    fetchIncomeSources()
      .then((response) => {
        setIncomeSources(response);
      })
      .catch((error) => {
        console.log("Error fetching income sources", error);
      });
  }, [setIncomeSources]);

  useEffect(() => {
    incomeSourcesFetcher();
  }, []);

  return (
    <Dialog open={isTriggered} onClose={closeHandler} fullWidth>
      <DialogTitle>Add Earning</DialogTitle>
      <DialogContent>
        <Box pt={3}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Autocomplete
                value={values.incomeSource}
                onChange={(event, newValue) =>
                  setFieldValue("incomeSource", newValue)
                }
                onInputChange={(event, newInputValue) => {}}
                options={incomeSources.map((incomeSource) => ({
                  id: incomeSource.id,
                  label: incomeSource.name,
                }))}
                renderInput={(params) => (
                  <TextField {...params} label="Income Source" />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Price"
                type="number"
                value={values.price}
                onChange={(event) => setFieldValue("price", event.target.value)}
                error={Boolean(touched.price && errors.price)}
                helperText={touched.price && errors.price}
                {...getFieldProps("price")}
                fullWidth
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="error">
          Cancel
        </Button>
        <LoadingButton
          variant="contained"
          endIcon={<Iconify icon="material-symbols:send" />}
          disabled={!dirty}
          loading={isSubmitting}
          onClick={handleSubmit}
        >
          Submit
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default AddEarningsPopUp;
