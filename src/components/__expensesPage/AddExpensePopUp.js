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
// atoms
import alertAtom from "src/recoil/atoms/alertAtom";
// __apis__
import { addExpenses } from "src/__apis__/resourcesManagement";
//
import Iconify from "../Iconify";

// ---------------------------------------------------------------------------

function AddExpensePopUp({ isTriggered, closeHandler, refreshHandler }) {
  const triggerAlert = useSetRecoilState(alertAtom);

  const formik = useFormik({
    initialValues: {
      amountDue: 0,
      paidTo: "",
      invoiceDescription: "",
    },
    validationSchema: Yup.object().shape({
      amountDue: Yup.number()
        .min(1, "Amount due cannot be less than 1")
        .required("Amount due is required"),
      paidTo: Yup.string().required("You must specify this field"),
    }),
    onSubmit: async (value, { resetForm }) => {
      addExpenses(value)
        .then(() => {
          triggerAlert({
            triggered: true,
            type: "success",
            message: "Expenses added successfully",
          });
          resetForm();
          closeHandler();
        })
        .catch((error) => {
          console.log("Error adding expenses", error);
          triggerAlert({
            triggered: true,
            type: "error",
            message: "Error adding expenses, please try again later",
          });
        });
    },
  });

  const {
    values,
    setFieldValue,
    errors,
    touched,
    dirty,
    getFieldProps,
    handleSubmit,
    isSubmitting,
  } = formik;

  return (
    <Dialog open={isTriggered} onClose={closeHandler} fullWidth>
      <DialogTitle>Add Expense</DialogTitle>
      <DialogContent>
        <Box pt={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                type="number"
                label="Amount Due"
                value={values.amountDue}
                onChange={(event) =>
                  setFieldValue("amountDue", event.target.value)
                }
                error={Boolean(touched.amountDue && errors.amountDue)}
                helperText={touched.amountDue && errors.amountDue}
                {...getFieldProps("amountDue")}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Paid To"
                value={values.paidTo}
                onChange={(event) =>
                  setFieldValue("paidTo", event.target.value)
                }
                error={Boolean(touched.paidTo && errors.paidTo)}
                helperText={touched.paidTo && errors.paidTo}
                {...getFieldProps("paidTo")}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                value={values.invoiceDescription}
                onChange={(event) =>
                  setFieldValue("invoiceDescription", event.target.value)
                }
                {...getFieldProps("invoiceDescription")}
                rows={4}
                label="Invoice Description"
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
          onClick={handleSubmit}
          loading={isSubmitting}
          disabled={!dirty}
          endIcon={<Iconify icon="material-symbols:send" />}
        >
          Submit
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default AddExpensePopUp;
