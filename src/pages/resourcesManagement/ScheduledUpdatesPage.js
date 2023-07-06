import React, { useState, useEffect, useCallback } from "react";
import { Box, Button, Card, Container, Grid, IconButton } from "@mui/material";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import MUIDataTable from "mui-datatables";
import Iconify from "src/components/Iconify";
import ScheduleUpdatePopUp from "src/components/__scheduledUpdatesPage/ScheduleUpdatePopUp";
import { fetchScheduledUpdates } from "src/__apis__/clients";
import Label from "src/components/Label";

function ScheduledUpdatesPage() {
  const [scheduleUpdate, triggerScheduleUpdate] = useState(false);
  const [scheduledUpdates, setScheduledUpdates] = useState([]); // to store the fetched data

  const scheduledUpdatesFetcher = useCallback(async () => {
    const data = await fetchScheduledUpdates();
    setScheduledUpdates(data);
  }, []);

  // Call the fetcher function when the component mounts
  useEffect(() => {
    scheduledUpdatesFetcher();
  }, [scheduledUpdatesFetcher]);

  return (
    <Box>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <HeaderBreadcrumbs
              heading="Scheduled Updates Overview"
              links={[
                { name: "Home", href: "/overview/home" },
                { name: "Scheduled Updates" },
              ]}
              action={
                <Button
                  onClick={() => triggerScheduleUpdate(true)}
                  variant="contained"
                  startIcon={<Iconify icon="zondicons:calendar" />}
                >
                  Schedule Update
                </Button>
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Card>
              <MUIDataTable
                columns={[
                  { name: "update_name", label: "Update Name" },
                  { name: "release_description", label: "Release Description" },
                  {
                    name: "major_update",
                    label: "Major Update",
                    options: {
                      customBodyRender: (value) => (
                        <IconButton color={value ? "success" : "error"}>
                          <Iconify
                            icon={
                              value
                                ? "carbon:checkmark-outline"
                                : "fluent-mdl2:error-badge"
                            }
                          />
                        </IconButton>
                      ),
                    },
                  },
                  { name: "release_date", label: "Release Date" },
                  {
                    name: "is_released",
                    label: "Is Released",
                    options: {
                      customBodyRender: (value) => (
                        <Label color={value ? "success" : "error"}>
                          {value ? "Released" : "Not Released"}
                        </Label>
                      ),
                    },
                  },
                ]}
                data={scheduledUpdates} // pass the fetched data
                options={{ elevation: 0, selectableRows: "none" }}
              />
            </Card>
          </Grid>
        </Grid>
      </Container>
      {/*  Schedule update pop up */}
      <ScheduleUpdatePopUp
        isTriggered={scheduleUpdate}
        closeHandler={() => triggerScheduleUpdate(false)}
        fetchHandler={scheduledUpdatesFetcher}
      />
    </Box>
  );
}

export default ScheduledUpdatesPage;
