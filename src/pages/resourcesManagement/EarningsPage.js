import React, { useCallback, useEffect, useState } from "react";
// material
import { Box, Button, Container, Grid } from "@mui/material";
import MUIDataTable from "mui-datatables";
// utils
import {
  earningsTableColumns,
  earningsTableRows,
} from "src/utils/mock-data/earnings";
// __apis__
import { fetchEarning } from "src/__apis__/resourcesManagement";
// components
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Iconify from "src/components/Iconify";
import AddEarningsPopUp from "src/components/__earningsPage/AddEarningsPopUp";

// -----------------------------------------------------------------------

function EarningsPage() {
  const [addEarnings, triggerAddEarnings] = useState(false);
  const [earnings, setEarnings] = useState([]);
  const [earningsTableData, setEarningsTableData] = useState([]);

  const earningsFetcher = useCallback(async () => {
    fetchEarning().then((response) => {
      setEarnings(response);
    });
  }, [setEarningsTableData, earningsTableRows]);

  useEffect(() => {
    earningsFetcher();
  }, []);

  useEffect(() => {
    setEarningsTableData(earningsTableRows(earnings));
  }, [earnings]);

  return (
    <Box>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <HeaderBreadcrumbs
              heading="Earnings overview"
              links={[
                { name: "Home", href: "/overview/home" },
                { name: "Earnings" },
              ]}
              action={
                <Button
                  onClick={() => triggerAddEarnings(true)}
                  variant="contained"
                  startIcon={<Iconify icon="material-symbols:add" />}
                >
                  Add Earnings
                </Button>
              }
            />
          </Grid>
          <Grid item xs={12}>
            <MUIDataTable
              columns={earningsTableColumns()}
              data={earningsTableData}
              options={{ selectableRows: false, elevation: 0 }}
            />
          </Grid>
        </Grid>
      </Container>
      {/* Add earning pop up */}
      <AddEarningsPopUp
        isTriggered={addEarnings}
        closeHandler={() => triggerAddEarnings(false)}
      />
    </Box>
  );
}

export default EarningsPage;
