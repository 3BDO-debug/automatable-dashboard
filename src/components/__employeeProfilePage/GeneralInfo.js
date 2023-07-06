import React from "react";
// material
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  TextField,
  Autocomplete,
  Box,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Iconify from "../Iconify";

// ------------------------------------------------------------------------------------------

function GeneralInfo() {
  return (
    <Card>
      <CardHeader title="General Information" />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField label="First Name" fullWidth />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Last Name" fullWidth />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Username" fullWidth />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Email" fullWidth />
          </Grid>

          <Grid item xs={12} md={6}>
            <Autocomplete
              options={[]}
              renderInput={(params) => (
                <TextField {...params} label="Skills" fullWidth />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Autocomplete
              options={[]}
              renderInput={(params) => (
                <TextField {...params} label="Allowed Views" fullWidth />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ float: "right" }}>
              <LoadingButton
                variant="contained"
                startIcon={<Iconify icon="material-symbols:save" />}
              >
                Update
              </LoadingButton>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default GeneralInfo;
