import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSetRecoilState } from "recoil";
// material
import { Button, Card, CardContent, CardHeader, Grid } from "@mui/material";
import MUIDataTable from "mui-datatables";
// atoms
import alertAtom from "src/recoil/atoms/alertAtom";
// __apis__
import { fetchClientProjectMilestones } from "src/__apis__/clients";
// utils
import {
  milestonesTableColumnsMocker,
  milestonesTableRowsMocker,
} from "src/utils/mock-data/clientProjectMilestones";
//
import Iconify from "../Iconify";
import CreateMilestonePopUp from "./CreateMilestonePopUp";

// -----------------------------------------------------------------------------------

function ProjectMilestones() {
  const [createMilestonePopUp, triggerCreateMilestonePopUp] = useState(false);

  const triggerAlert = useSetRecoilState(alertAtom);

  const [milestones, setMilestones] = useState([]);
  const [milestonesTableRows, setMilestonesTableRows] = useState([]);

  const [fetching, setFetching] = useState(false);

  const { id } = useParams();

  const milestonesFetcher = useCallback(async () => {
    setFetching(true);
    fetchClientProjectMilestones(id)
      .then((response) => {
        setMilestones(response);
        setFetching(false);
      })
      .catch((error) => {
        console.log("Error fetching milestones", error);
      });
  }, [id, setMilestones]);

  useEffect(() => {
    milestonesFetcher();
  }, [id]);

  useEffect(() => {
    setMilestonesTableRows(milestonesTableRowsMocker(milestones));
  }, [milestones]);

  return (
    <Card>
      <CardHeader
        title="Project Milestones"
        action={
          <Button
            endIcon={<Iconify icon="material-symbols:edit-outline-rounded" />}
            variant="contained"
            onClick={() => triggerCreateMilestonePopUp(true)}
          >
            Create Milestone
          </Button>
        }
      />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MUIDataTable
              columns={milestonesTableColumnsMocker()}
              data={milestonesTableRows}
              options={{
                elevation: 0,
                selectableRows: false,
                textLabels: {
                  body: {
                    noMatch: fetching ? "Loading..." : "No records found",
                  },
                },
              }}
            />
          </Grid>
        </Grid>
      </CardContent>
      {/* Create milestone pop up */}
      <CreateMilestonePopUp
        isTriggered={createMilestonePopUp}
        closeHandler={() => triggerCreateMilestonePopUp(false)}
      />
    </Card>
  );
}

export default ProjectMilestones;
