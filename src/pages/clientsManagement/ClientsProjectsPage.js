import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
// material
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Container,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import MUIDataTable from "mui-datatables";
// __apis__
import { fetchClientProjectsData } from "src/__apis__/clients";
// components
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Iconify from "src/components/Iconify";
import Label from "src/components/Label";

// --------------------------------------------------------------------------------------------------------------------

function ClientsProjectsPage() {
  const [clientsProjects, setClientsProjects] = useState([]);
  const [clientsProjectsTableData, setClientsProjectsTableData] = useState([]);

  const navigate = useNavigate();

  const clientsProjectsFetcher = useCallback(async () => {
    fetchClientProjectsData()
      .then((response) => {
        setClientsProjects(response);
      })
      .catch((error) => {
        console.log("Error fetching clients projects data", error);
      });
  }, [setClientsProjects]);

  useEffect(() => {
    clientsProjectsFetcher();
  }, []);

  useEffect(() => {
    if (clientsProjects.length > 0) {
      setClientsProjectsTableData(
        clientsProjects.map((clientProject) => ({
          projectName: clientProject.project_name,
          client: clientProject.client_name,
          supervisor: clientProject.supervisor,
          staffMembers: clientProject.staff_members,
          startedAt: new Date(clientProject.started_at).toLocaleString(),
          proceeded: clientProject.proceeded,
          action: clientProject.client,
        }))
      );
    }
  }, [clientsProjects]);

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <HeaderBreadcrumbs
            heading="Clients Projects"
            links={[{ name: "Home", href: "/" }, { name: "Clients Projects" }]}
          />
        </Grid>
        <Grid item xs={12}>
          <Card>
            <MUIDataTable
              columns={[
                { name: "projectName", label: "Project Name" },
                { name: "client", label: "Client" },
                { name: "supervisor", label: "Supervisor" },
                {
                  name: "staffMembers",
                  label: "Staff Members",
                  options: {
                    customBodyRender: (value) => (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          flexWrap: "wrap",
                        }}
                      >
                        {value.map((staffMember) => (
                          <Box key={staffMember.id}>
                            <Label color="primary">
                              {staffMember.fullname}
                            </Label>
                          </Box>
                        ))}
                      </Box>
                    ),
                  },
                },
                { name: "startedAt", label: "Started At" },
                {
                  name: "proceeded",
                  label: "Proceeded",
                  options: {
                    customBodyRender: (value) => (
                      <Label color={value ? "success" : "error"}>
                        {value ? "Proceeded" : "Not Proceeded"}
                      </Label>
                    ),
                  },
                },
                {
                  name: "action",
                  label: "Action",
                  options: {
                    customBodyRender: (value) => (
                      <Tooltip title="View Profile">
                        <IconButton
                          onClick={() =>
                            navigate(
                              `/clients-management/client-profile/${value}`
                            )
                          }
                        >
                          <Iconify icon="mdi:eye" />
                        </IconButton>
                      </Tooltip>
                    ),
                  },
                },
              ]}
              data={clientsProjectsTableData}
              options={{ elevation: 0, selectableRows: false }}
            />
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ClientsProjectsPage;
