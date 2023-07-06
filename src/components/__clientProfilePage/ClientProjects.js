import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
// material
import { Card, CardContent, CardHeader } from "@mui/material";
import MUIDataTable from "mui-datatables";
// __apis__
import {
  fetchClientProjectsData,
  deleteClientProjectRequest,
} from "src/__apis__/clients";
// utils
import {
  clientProjectsColumns,
  clientProjectsRowsMocker,
} from "src/utils/mock-data/clientProjects";
// components

// -------------------------------------------------------------------------------

function ClientProjects({ refreshValue }) {
  const [clientProjects, setClientProjects] = useState([]);
  const [clientProjectsRows, setClientsProjectsRows] = useState([]);

  const [deletingClientProject, setDeletingClientProject] = useState(false);

  const navigate = useNavigate();

  const clientProjectsFetcher = useCallback(async () => {
    fetchClientProjectsData()
      .then((response) => {
        setClientProjects(response);
      })
      .catch((error) => {
        console.log("Error fetching client projects", error);
      });
  }, []);

  const handleDeleteClientProject = useCallback(async (clientProjectId) => {
    setDeletingClientProject(true);
    await deleteClientProjectRequest(clientProjectId)
      .then(() => {
        clientProjectsFetcher();
      })
      .catch((error) => {
        console.log("Error deleting client project", error);
      });
    setDeletingClientProject(false);
  }, []);

  const handleViewClientProject = useCallback((clientProjectId) => {
    navigate(`/clients-management/client-project-details/${clientProjectId}`);
  }, []);

  useEffect(() => {
    clientProjectsFetcher();
  }, [refreshValue]);

  useEffect(() => {
    setClientsProjectsRows(clientProjectsRowsMocker(clientProjects));
  }, [clientProjects]);

  return (
    <Card>
      <CardHeader title="Client Projects" />
      <CardContent>
        <MUIDataTable
          columns={clientProjectsColumns(
            handleViewClientProject,
            handleDeleteClientProject,
            deletingClientProject
          )}
          options={{ elevation: 0, selectableRows: false }}
          data={clientProjectsRows}
        />
      </CardContent>
    </Card>
  );
}

export default ClientProjects;
