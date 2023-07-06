import { useCallback, useState } from "react";
// material
import { Container, Grid, Button } from "@mui/material";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import ClientInfo from "src/components/__clientProfilePage/ClientInfo";
//
import Iconify from "src/components/Iconify";
import RegisterClientProject from "src/components/__clientProfilePage/RegisterClientProject";
import ClientProjects from "src/components/__clientProfilePage/ClientProjects";

// -------------------------------------------------------------------------------------------------------

function ClientProfilePage() {
  const [registerClientProject, triggerRegisterClientProject] = useState(false);

  const [refreshData, setRefreshData] = useState(false);

  const refreshHandler = useCallback(() => {
    setRefreshData(!refreshData);
  }, [setRefreshData]);

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <HeaderBreadcrumbs
            heading="Client Profile"
            links={[
              { name: "Home", href: "/overview/home" },
              { name: "Client name goes here" },
            ]}
            action={
              <Button
                startIcon={<Iconify icon="ic:outline-create" />}
                onClick={() => triggerRegisterClientProject(true)}
                variant="contained"
              >
                Register Project
              </Button>
            }
          />
        </Grid>
        <Grid item xs={12}>
          <ClientInfo />
        </Grid>
        <Grid item xs={12}>
          <ClientProjects refreshValue={refreshData} />
        </Grid>
      </Grid>
      {/* Register client project */}
      <RegisterClientProject
        isTriggered={registerClientProject}
        closeHandler={() => triggerRegisterClientProject(false)}
        refreshHandler={refreshHandler}
      />
    </Container>
  );
}

export default ClientProfilePage;
