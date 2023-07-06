import React from "react";
// material
import { Container, Grid } from "@mui/material";
//
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import GeneralInfo from "src/components/__employeeProfilePage/GeneralInfo";
import AssignedTasks from "src/components/__employeeProfilePage/AssignedTasks";

// ---------------------------------------------------------------------

function EmployeeProfilePage() {
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <HeaderBreadcrumbs
            heading="Employee Profile"
            links={[
              { name: "Home", href: "/overview/home" },
              { name: "Employee Name" },
            ]}
          />
        </Grid>
        <Grid item xs={12}>
          <GeneralInfo />
        </Grid>
        <Grid item xs={12}>
          <AssignedTasks />
        </Grid>
      </Grid>
    </Container>
  );
}

export default EmployeeProfilePage;
