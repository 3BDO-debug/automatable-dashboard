import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
// material
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Container,
  Grid,
  IconButton,
} from "@mui/material";
import MUIDataTable from "mui-datatables";
import AddIcon from "@mui/icons-material/Add";
// components
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import AddClientPopUp from "src/components/__clientsDataPage/AddClientPopUp";
import { deleteClientRequest, fetchClientsData } from "src/__apis__/clients";
import Iconify from "src/components/Iconify";
import { useSetRecoilState } from "recoil";
import alertAtom from "src/recoil/atoms/alertAtom";

// ---------------------------------------------------------------------------------

function ClientsDataPage() {
  const [addClient, triggerAddClient] = useState(false);
  const [clients, setClients] = useState([]);
  const [clientsTableRows, setClientsTableRows] = useState([]);

  const [deleting, setIsDeleting] = useState(false);
  const [triggeredClient, setTriggeredClient] = useState(null);

  const navigate = useNavigate();

  const triggerAlert = useSetRecoilState(alertAtom);

  const clientsDataFetcher = useCallback(async () => {
    await fetchClientsData().then((response) => {
      setClients(response);
    });
  }, [setClients]);

  const clientDeleter = useCallback(async (clientId) => {
    setTriggeredClient(clientId);
    setIsDeleting(true);

    await deleteClientRequest(clientId)
      .then(() => {
        triggerAlert({
          triggered: true,
          type: "success",
          message: "Client Deleted successfully",
        });
        clientsDataFetcher();
      })
      .catch((error) => {
        console.log("Error deleting client", error);
        triggerAlert({
          triggered: true,
          type: "error",
          message: "Error deleting client",
        });
      });

    setTriggeredClient(null);

    setIsDeleting(false);
  }, []);

  useEffect(() => {
    clientsDataFetcher();
  }, []);

  useEffect(() => {
    setClientsTableRows(
      clients.map((client) => ({
        fullName: `${client.account_data.first_name} ${client.account_data.last_name}`,
        phoneNumber: client.account_data.phone_number,
        govId: client.account_data.gov_id,
        createdAt: new Date(client.created_at).toLocaleString(),
        action: client.id,
      }))
    );
  }, [clients]);

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <HeaderBreadcrumbs
            heading="Clients Data"
            links={[
              { name: "Home", href: "/dashboard/home" },
              { name: "Clients Data" },
            ]}
            action={
              <Button
                onClick={() => triggerAddClient(true)}
                variant="contained"
                startIcon={<AddIcon />}
              >
                Add Client
              </Button>
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Clients Data" />
            <CardContent>
              <MUIDataTable
                options={{ selectableRows: false, elevation: 0 }}
                columns={[
                  { name: "fullName", label: "full name" },
                  { name: "phoneNumber", label: "phone number" },
                  { name: "govId", label: "gov id" },
                  { name: "createdAt", label: "Created at" },
                  {
                    name: "action",
                    label: "Action",
                    options: {
                      customBodyRender: (value) => (
                        <Box sx={{ display: "Flex" }}>
                          <IconButton
                            color="primary"
                            onClick={() =>
                              navigate(
                                `/clients-management/client-profile/${value}`
                              )
                            }
                          >
                            <Iconify icon="ic:baseline-remove-red-eye" />
                          </IconButton>
                          {deleting && triggeredClient === value ? (
                            <CircularProgress />
                          ) : (
                            <IconButton
                              onClick={() => clientDeleter(value)}
                              color="error"
                            >
                              <Iconify icon="ic:baseline-delete" />
                            </IconButton>
                          )}
                        </Box>
                      ),
                    },
                  },
                ]}
                data={clientsTableRows}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {/* Add client pop up */}
      <AddClientPopUp
        isTriggered={addClient}
        closeHandler={() => triggerAddClient(false)}
        refreshHandler={clientsDataFetcher}
      />
    </Container>
  );
}

export default ClientsDataPage;
