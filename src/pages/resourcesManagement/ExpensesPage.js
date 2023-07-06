import React, { useCallback, useEffect, useState } from "react";
// material
import { Box, Button, Card, Container, Grid } from "@mui/material";
// utils
import {
  expensesTableColumns,
  expensesTableRows,
} from "src/utils/mock-data/expenses";
// __apis__
import { fetchExpenses } from "src/__apis__/resourcesManagement";
// components
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import MUIDataTable from "mui-datatables";
import Iconify from "src/components/Iconify";
import AddExpensePopUp from "src/components/__expensesPage/AddExpensePopUp";

// -----------------------------------------------------------------------------

function ExpensesPage() {
  const [addExpensePopUp, triggerExpensePopUp] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [expensesTableData, setExpensesTableData] = useState([]);

  const expensesFetcher = useCallback(async () => {
    fetchExpenses().then((response) => {
      setExpenses(response);
    });
  }, [fetchExpenses]);

  useEffect(() => {
    expensesFetcher();
  }, []);

  useEffect(() => {
    if (expenses.length > 0) {
      setExpensesTableData(expensesTableRows(expenses));
    }
  }, [expenses]);

  return (
    <Box>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <HeaderBreadcrumbs
              heading="Expenses Overview"
              links={[
                { name: "Home", href: "/overview/home" },
                { name: "Expenses" },
              ]}
              action={
                <Button
                  variant="contained"
                  startIcon={<Iconify icon="material-symbols:add" />}
                  onClick={() => triggerExpensePopUp(true)}
                >
                  Add Expense
                </Button>
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Card>
              <MUIDataTable
                columns={expensesTableColumns()}
                data={expensesTableData}
                options={{ elevation: 0, selectableRows: false }}
              />
            </Card>
          </Grid>
        </Grid>
      </Container>
      {/* Add expense */}
      <AddExpensePopUp
        isTriggered={addExpensePopUp}
        closeHandler={() => triggerExpensePopUp(false)}
        refreshHandler={expensesFetcher}
      />
    </Box>
  );
}

export default ExpensesPage;
