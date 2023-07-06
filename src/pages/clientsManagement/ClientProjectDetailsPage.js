import React, { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router";
// material
import { Box, Container, Grid, Skeleton, Tab, Tabs } from "@mui/material";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
// __apis__
import { fetchClientProject } from "src/__apis__/clients";
//
import Iconify from "src/components/Iconify";
import GeneralInfo from "src/components/__clientProjectDetailsPage/GeneralInfo";
import ProjectMilestones from "src/components/__clientProjectDetailsPage/ProjectMilestones";
import ProjectTasks from "src/components/__clientProjectDetailsPage/ProjectTasks";
import Team from "src/components/__clientProjectDetailsPage/Team";
import ClientMeetingsData from "src/components/__clientProjectDetailsPage/ClientMeetingsData";

// ------------------------------------------------------------------------------------------------------------

function ClientProjectDetailsPage() {
  const [currentTab, setCurrentTab] = useState("general-info");

  const { id } = useParams();

  const [fetching, setFetching] = useState(false);

  const [clientProjectData, setClientProjectData] = useState(null);

  const clientProjectDataFetcher = useCallback(async () => {
    setFetching(true);
    fetchClientProject(id)
      .then((response) => {
        setClientProjectData(response);
        setFetching(false);
      })
      .catch((error) => {
        console.log("Error fetching client project", error);
      });
  }, [id]);

  useEffect(() => {
    clientProjectDataFetcher();
  }, [id]);

  const TABS = [
    {
      value: "general-info",
      label: "General Info",
      icon: (
        <Iconify
          sx={{ width: 20, height: 20 }}
          icon="solar:info-square-broken"
        />
      ),
      component: <GeneralInfo clientProject={clientProjectData} />,
    },
    {
      value: "project-milestones",
      label: "Project Milestones",
      icon: <Iconify sx={{ width: 20, height: 20 }} icon="mdi:milestone" />,
      component: <ProjectMilestones />,
    },
    {
      value: "project-tasks",
      label: "Project Tasks",
      icon: <Iconify sx={{ width: 20, height: 20 }} icon="ri:task-line" />,
      component: <ProjectTasks />,
    },
    {
      value: "team",
      label: "Team",
      icon: (
        <Iconify
          sx={{ width: 20, height: 20 }}
          icon="fluent:people-team-16-regular"
        />
      ),
      component: <Team clientProject={clientProjectData} />,
    },
    {
      value: "meetings",
      label: "Meetings",
      icon: <Iconify sx={{ width: 20, height: 20 }} icon="ri:emotion-line" />,
      component: <ClientMeetingsData />,
    },
  ];

  return (
    <Container>
      {fetching ? (
        <Skeleton sx={{ width: "100%", height: 500 }} />
      ) : (
        <Grid container rowSpacing={0}>
          <Grid item xs={12}>
            <HeaderBreadcrumbs
              heading={clientProjectData?.project_name}
              links={[
                { name: "Home", href: "/overview/Home" },
                {
                  name: "Clients Projects",
                  href: "/clients-management/clients-projects",
                },
                { name: clientProjectData?.project_name },
              ]}
            />
          </Grid>
          <Grid item xs={12}>
            <Tabs
              allowScrollButtonsMobile
              variant="scrollable"
              scrollButtons="auto"
              value={currentTab}
              onChange={(event, newValue) => setCurrentTab(newValue)}
            >
              {TABS.map((tab) => (
                <Tab
                  key={tab.value}
                  label={tab.label}
                  value={tab.value}
                  disableRipple
                  icon={tab.icon}
                />
              ))}
            </Tabs>
          </Grid>
          {/* Tab content */}
          <Grid item xs={12} marginTop={4}>
            {TABS.map(
              (tab) =>
                tab.value === currentTab && (
                  <Box key={tab.value}>{tab.component}</Box>
                )
            )}
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default ClientProjectDetailsPage;
