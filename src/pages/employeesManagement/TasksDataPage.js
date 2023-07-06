import React, { useCallback, useEffect, useState } from "react";
// material
import { Avatar, Box, Card, Container, Grid, Typography } from "@mui/material";
import MUIDataTable from "mui-datatables";
// __apis__
import { fetchTasks } from "src/__apis__/employees";
//
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Label from "src/components/Label";

// --------------------------------------------------------------------

function TasksDataPage() {
  const [tasks, setTasks] = useState([]);

  const [tasksTableData, setTasksTableData] = useState([]);

  const tasksFetcher = useCallback(async () => {
    fetchTasks()
      .then((response) => {
        setTasks(response);
      })
      .catch((error) => {
        console.log("Error fetching tasks", error);
      });
  }, []);

  useEffect(() => {
    tasksFetcher();
  }, []);

  useEffect(() => {
    setTasksTableData(
      tasks.map((task) => ({
        project: task.client_project_name,
        taskName: task.name,
        assignedTo: task.assigned_to,
        dueDate: task.due_date,
        issuedBy: task.issued_by_name,
        description: task.description,
        isProceeded: task.is_proceeded,
      }))
    );
  }, [tasks]);

  console.log("aa", tasks);

  return (
    <Box>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <HeaderBreadcrumbs
              heading="Tasks Overview"
              links={[
                { name: "Home", href: "/overview/home" },
                { name: "Tasks" },
              ]}
            />
          </Grid>
          <Grid item xs={12}>
            <Card>
              <MUIDataTable
                data={tasksTableData}
                columns={[
                  { name: "project", label: "Project" },
                  { name: "taskName", label: "Task Name" },
                  {
                    name: "assignedTo",
                    label: "Assigned to",
                    options: {
                      customBodyRender: (value) => (
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                            sx={{ mr: 2 }}
                            src={value.profile_pic}
                            alt={value.fullname}
                          />
                          <Typography variant="caption">
                            {value.fullname}
                          </Typography>
                        </Box>
                      ),
                    },
                  },
                  { name: "dueDate", label: "Due Date" },
                  {
                    name: "issuedBy",
                    label: "Issued By",
                    options: {
                      customBodyRender: (value) => (
                        <Label color="info">{value}</Label>
                      ),
                    },
                  },
                  { name: "description", label: "Task Description" },
                  {
                    name: "isProceeded",
                    label: "Proceeded",
                    options: {
                      customBodyRender: (value) => (
                        <Label color={value ? "success" : "error"}>
                          {value ? "Proceeded" : "Not Proceeded"}
                        </Label>
                      ),
                    },
                  },
                ]}
                options={{ elevation: 0, selectableRows: false }}
              />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default TasksDataPage;
