import React, { useCallback, useEffect, useState } from "react";
// material
import { Box, Button, Card, Container, Grid } from "@mui/material";
import MUIDataTable from "mui-datatables";
// utils
import {
  incomeSourcesTableColumns,
  incomeSourcesTableRows,
} from "src/utils/mock-data/incomeSources";
// __apis__
import { fetchIncomeSources } from "src/__apis__/resourcesManagement";
// components
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Iconify from "src/components/Iconify";
import AddIncomeSourcePopUp from "src/components/__incomesSourcePage/AddIncomeSourcePopUp";

// ---------------------------------------------------------------------------

function IncomeSourcesPage() {
  const [addIncomeSource, triggerAddIncomeSource] = useState(false);
  const [incomeSourcesTableData, setIncomeSourcesTableData] = useState([]);

  const incomeSourcesFetcher = useCallback(async () => {
    fetchIncomeSources().then((response) => {
      setIncomeSourcesTableData(incomeSourcesTableRows(response));
    });
  }, [setIncomeSourcesTableData, incomeSourcesTableRows]);

  useEffect(() => {
    incomeSourcesFetcher();
  }, []);

  return (
    <Box>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <HeaderBreadcrumbs
              heading="Income Sources"
              links={[
                { name: "Home", href: "/overview/home" },
                { name: "Income Sources" },
              ]}
              action={
                <Button
                  onClick={() => triggerAddIncomeSource(true)}
                  variant="contained"
                  startIcon={<Iconify icon="material-symbols:add" />}
                >
                  Add Income Source
                </Button>
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Card>
              <MUIDataTable
                columns={incomeSourcesTableColumns()}
                data={incomeSourcesTableData}
                options={{ elevation: 0, selectableRows: false }}
              />
            </Card>
          </Grid>
        </Grid>
      </Container>
      {/* Add income source pop up */}
      <AddIncomeSourcePopUp
        isTriggered={addIncomeSource}
        closeHandler={() => triggerAddIncomeSource(false)}
      />
    </Box>
  );
}

export default IncomeSourcesPage;
