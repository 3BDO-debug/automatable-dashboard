import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSetRecoilState } from "recoil";
// material
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import MUIDataTable from "mui-datatables";
// __apis__
import { fetchClientProjectMeetings } from "src/__apis__/clients";
// atoms
import alertAtom from "src/recoil/atoms/alertAtom";
//
import Iconify from "../Iconify";
import RegisterClientMeetingPopUp from "./RegisterClientMeetingPopUp";
import Label from "../Label";

// -------------------------------------------------------------------

function ClientMeetingsData() {
  const [registerClientMeeting, triggerRegisterClientMeeting] = useState(false);
  const [meetings, setMeetings] = useState([]);
  const [meetingsTableData, setMeetingsTableData] = useState([]);

  const triggerAlert = useSetRecoilState(alertAtom);

  const { id } = useParams();

  const clientProjectMeetingsFetcher = useCallback(async () => {
    fetchClientProjectMeetings(id)
      .then((response) => {
        setMeetings(response);
      })
      .catch((error) => {
        console.log("Error fetching client meetings", error);
        triggerAlert({
          triggered: true,
          type: "error",
          message: "Error fetching client meetings",
        });
      });
  }, [id, setMeetings]);

  useEffect(() => {
    clientProjectMeetingsFetcher();
  }, []);

  useEffect(() => {
    setMeetingsTableData(
      meetings.map((meeting) => ({
        supervisor: meeting.supervisor_data,
        description: meeting.description,
        state: meeting.client_state,
      }))
    );
  }, [meetings]);

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title="Client Meetings"
              action={
                <Button
                  onClick={() => triggerRegisterClientMeeting(true)}
                  startIcon={<Iconify icon="simple-icons:aiohttp" />}
                  variant="contained"
                >
                  Record Meeting
                </Button>
              }
            />
            <CardContent>
              <MUIDataTable
                columns={[
                  {
                    name: "supervisor",
                    label: "Supervisor",
                    options: {
                      customBodyRender: (value) => (
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                            src={value?.profile_pic}
                            alt={value?.fullname}
                          />
                          <Typography sx={{ ml: 2 }} variant="caption">
                            {value?.fullname}
                          </Typography>
                        </Box>
                      ),
                    },
                  },
                  { name: "description", label: "Description" },
                  {
                    name: "state",
                    label: "State",
                    options: {
                      customBodyRender: (value) => (
                        <Label color="info">{value}</Label>
                      ),
                    },
                  },
                ]}
                data={meetingsTableData}
                options={{ elevation: 0, selectableRows: false }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {/* Register client meeting pop up */}
      <RegisterClientMeetingPopUp
        isTriggered={registerClientMeeting}
        closeHander={() => triggerRegisterClientMeeting(false)}
      />
    </Box>
  );
}

export default ClientMeetingsData;
