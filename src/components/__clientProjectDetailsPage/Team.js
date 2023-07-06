import React, { useEffect, useState } from "react";
// material
import { Card, CardContent, CardHeader } from "@mui/material";
import MUIDataTable from "mui-datatables";
// utils
import {
  teamTableColumnsMocker,
  teamTableRowsMocker,
} from "src/utils/mock-data/clientProjectTeam";

// -----------------------------------------------------------------------------------------

function Team({ clientProject }) {
  const [team, setTeam] = useState([]);
  const [teamTableRows, setTeamTableRows] = useState([]);

  useEffect(() => {
    if (clientProject) {
      setTeam(clientProject.team);
    }
  }, [clientProject]);

  useEffect(() => {
    setTeamTableRows(teamTableRowsMocker(team));
  }, [team]);

  return (
    <Card>
      <CardHeader title="Project Team Members" />
      <CardContent>
        <MUIDataTable
          columns={teamTableColumnsMocker()}
          data={teamTableRows}
          options={{ elevation: 0, selectableRows: false }}
        />
      </CardContent>
    </Card>
  );
}

export default Team;
