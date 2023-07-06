import React, { useCallback, useEffect, useState } from "react";
// material
import {
  Avatar,
  Box,
  Card,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import MUIDataTable from "mui-datatables";
// __apis__
import { fetchTasksSubmissions } from "src/__apis__/employees";
//
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Iconify from "src/components/Iconify";
import Label from "src/components/Label";
import TaskDetailsPopUp from "src/components/__tasksSubmissionsPage/TaskDetailsPopUp";

// -------------------------------------------------------------------------------------------

function TasksSubmissions() {
  const [tasksSubmissions, setTasksSubmissions] = useState([]);
  const [tasksSubmissionsTableData, setTasksSubmissionsTableData] = useState(
    []
  );

  const [taskDetails, triggerTaskDetails] = useState(false);
  const [triggeredTask, setTriggeredTask] = useState(null);

  const tasksSubmissionsFetcher = useCallback(async () => {
    fetchTasksSubmissions()
      .then((response) => {
        setTasksSubmissions(response);
      })
      .catch((error) => {
        console.log("ERROR FETCHING TASKS SUBMISSIONS", error);
      });
  }, []);

  const onTaskClick = useCallback(
    (taskId) => {
      let task = tasksSubmissions.find(
        (task) => task.id === parseInt(taskId, 10)
      );

      setTriggeredTask(task);
      triggerTaskDetails(true);
    },
    [tasksSubmissions, setTriggeredTask, triggerTaskDetails]
  );

  useEffect(() => {
    tasksSubmissionsFetcher();
  }, []);

  useEffect(() => {
    if (tasksSubmissions.length > 0) {
      setTasksSubmissionsTableData(
        tasksSubmissions.map((taskSubmission) => ({
          taskName: taskSubmission.name,
          assignedTo: taskSubmission.assigned_to,
          isProceeded: taskSubmission.is_proceeded,
          action: taskSubmission.id,
        }))
      );
    }
  }, [tasksSubmissions]);

  console.log("aaa", tasksSubmissions);

  return (
    <Box>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <HeaderBreadcrumbs
              heading="Tasks Submissions"
              links={[
                { name: "Home", href: "/overview/home" },
                { name: "Tasks", href: "/tasks-management/tasks" },
                { name: "Submissions" },
              ]}
            />
          </Grid>
          <Grid item xs={12}>
            <Card>
              <MUIDataTable
                columns={[
                  { name: "taskName", label: "Task Name" },
                  {
                    name: "assignedTo",
                    label: "Assigned To",
                    options: {
                      customBodyRender: (value) => (
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Avatar
                            src={value?.profile_pic}
                            alt={value?.fullname}
                            sx={{ mr: 2 }}
                          />
                          <Typography variant="caption">
                            {value?.fullname}
                          </Typography>
                        </Box>
                      ),
                    },
                  },
                  {
                    name: "isProceeded",
                    label: "Is Proceeded",
                    options: {
                      customBodyRender: (value) => (
                        <Label>{value ? "Procceded" : "Not Proceeded"}</Label>
                      ),
                    },
                  },
                  {
                    name: "action",
                    label: "Action",
                    options: {
                      customBodyRender: (value) => {
                        return (
                          <IconButton onClick={() => onTaskClick(value)}>
                            <Iconify icon="mdi:eye" />
                          </IconButton>
                        );
                      },
                    },
                  },
                ]}
                options={{ elevation: 0, selectableRows: false }}
                data={tasksSubmissionsTableData}
              />
            </Card>
          </Grid>
        </Grid>
      </Container>
      {/* Task submission details */}
      <TaskDetailsPopUp
        isTriggered={taskDetails}
        closeHandler={() => triggerTaskDetails(false)}
        data={triggeredTask}
      />
    </Box>
  );
}

export default TasksSubmissions;
