import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
// material
import { Box, Button, Container, Grid } from "@mui/material";
import MUIDataTable from "mui-datatables";
import AddIcon from "@mui/icons-material/Add";
// __apis__
import { fetchEmployees, deleteEmployee } from "src/__apis__/employees";
// utils
import {
  employeesDataColumns,
  employeesDataRows,
} from "src/utils/mock-data/employeesData";
// components
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import AddEmployeePopUp from "src/components/__employeesDataPage/AddEmployeePopUp";

// ------------------------------------------------------------------------------------------------------------

function EmployeesDataPage() {
  const [addEmployees, triggerAddEmployees] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [employeesRows, setEmployeesRows] = useState([]);
  const [deletingEmployee, setDeletingEmployee] = useState(false);

  const navigate = useNavigate();

  const employeesDataFetcher = useCallback(async () => {
    fetchEmployees()
      .then((response) => {
        console.log("iam here", response);
        setEmployees(response);
      })
      .catch((error) => {
        console.log("Error fetching employees", error);
      });
  }, []);

  const handleViewEmployeeData = useCallback(
    (id) => {
      navigate(`/employees-management/employee-profile/${id}`);
    },
    [navigate]
  );

  const handleDeleteEmployee = useCallback(
    async (id) => {
      setDeletingEmployee(true);
      await deleteEmployee(id)
        .then(() => {
          employeesDataFetcher();
        })
        .catch((error) => {
          console.log("Employee Deleted successfully", error);
        });
      setDeletingEmployee(false);
    },
    [setDeletingEmployee, employeesDataFetcher]
  );

  useEffect(() => {
    employeesDataFetcher();
  }, []);

  useEffect(() => {
    setEmployeesRows(employeesDataRows(employees));
  }, [employees]);

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <HeaderBreadcrumbs
            heading="Employees Data"
            links={[
              { name: "Home", href: "/dashboard/home" },
              { name: "Employees Data" },
            ]}
            action={
              <Button
                onClick={() => triggerAddEmployees(true)}
                variant="contained"
                startIcon={<AddIcon />}
              >
                Add Employees
              </Button>
            }
          />
        </Grid>
        <Grid item xs={12}>
          <MUIDataTable
            title="Employees data"
            options={{ elevation: 0, selectableRows: false }}
            columns={employeesDataColumns(
              handleViewEmployeeData,
              handleDeleteEmployee,
              deletingEmployee
            )}
            data={employeesRows}
          />
        </Grid>
      </Grid>
      {/* Add Employee pop up */}
      <AddEmployeePopUp
        isTriggered={addEmployees}
        closeHandler={() => triggerAddEmployees(false)}
        refreshHandler={employeesDataFetcher}
      />
    </Container>
  );
}

export default EmployeesDataPage;
