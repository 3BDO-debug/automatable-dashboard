import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
// material
import { Box, Card, Grid, IconButton, Tooltip } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { fetchTasks } from "src/__apis__/employees";
import Label from "../Label";
import Iconify from "../Iconify";
import TaskDetailsPopUp from "./TaskDetailsPopUp";

// -----------------------------------------------------------------------

function AssignedTasks() {
  const [tasks, setTasks] = useState([]);
  const [tasksTableData, setTasksTableData] = useState([]);

  const [taskDetailsPopUp, triggerTaskDetailsPopUp] = useState(false);
  const [triggeredTask, setTriggeredTask] = useState(null);

  const { id } = useParams();

  const tasksFetcher = useCallback(async () => {
    fetchTasks(null, id)
      .then((response) => {
        setTasks(response);
      })
      .catch((error) => {
        console.log("Error fetching tasks", error);
      });
  }, [id, setTasks]);

  useEffect(() => {
    if (id) {
      tasksFetcher();
    }
  }, [id]);

  const onTaskClick = useCallback(
    (taskId) => {
      let task = tasks.find((task) => task.id === parseInt(taskId, 10));
      setTriggeredTask(task);
      triggerTaskDetailsPopUp(true);
    },
    [tasks, setTriggeredTask, triggerTaskDetailsPopUp]
  );

  useEffect(() => {
    setTasksTableData(
      tasks.map((task) => ({
        taskName: task.name,
        issuedBy: task.issued_by_name,
        dueDate: task.due_date,
        status: task.status,
        action: task.id,
      }))
    );
  }, [tasks]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <MUIDataTable
            title="Assigned Tasks"
            columns={[
              { name: "taskName", label: "Task Name" },
              { name: "issuedBy", label: "Issued By" },
              { name: "dueDate", label: "Due Date" },
              {
                name: "status",
                label: "Status",
                options: {
                  customBodyRender: (value) => (
                    <Label color="info">{value}</Label>
                  ),
                },
              },
              {
                name: "action",
                label: "Action",
                options: {
                  customBodyRender: (value) => (
                    <Tooltip title="View Details">
                      <IconButton onClick={() => onTaskClick(value)}>
                        <Iconify icon="mdi:eye" />
                      </IconButton>
                    </Tooltip>
                  ),
                },
              },
            ]}
            data={tasksTableData}
            options={{ selectableRows: false, elevation: 0 }}
          />
        </Card>
      </Grid>
      {/* Client details pop up */}
      <TaskDetailsPopUp
        isTriggered={taskDetailsPopUp}
        data={triggeredTask}
        closeHandler={() => triggerTaskDetailsPopUp(false)}
      />
    </Grid>
  );
}

export default AssignedTasks;
