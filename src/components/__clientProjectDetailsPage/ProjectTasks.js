import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
// material
import { Button, Card, CardContent, CardHeader } from "@mui/material";
import MUIDataTable from "mui-datatables";
// __apis__
import { fetchTasks } from "src/__apis__/employees";
// utils
import {
  taskTableColumnsMocker,
  taskTableRowsMocker,
} from "src/utils/mock-data/clientProjectTasks";
//
import Iconify from "../Iconify";
import CreateTaskPopUp from "./CreateTaskPopUp";

// ---------------------------------------------------------------------------------------

function ProjectTasks() {
  const [createTaskPopUp, triggerCreateTaskPopUp] = useState(false);

  const { id } = useParams();

  const [tasks, setTasks] = useState([]);
  const [tasksTableRows, setTasksTableRows] = useState([]);

  const tasksFetcher = useCallback(async () => {
    fetchTasks(id)
      .then((response) => {
        setTasks(response);
      })
      .catch((error) => {
        console.log("Error fetching tasks", error);
      });
  }, [id]);

  useEffect(() => {
    tasksFetcher();
  }, [id]);

  useEffect(() => {
    setTasksTableRows(taskTableRowsMocker(tasks));
  }, [tasks]);

  return (
    <Card>
      <CardHeader
        title="Project Tasks"
        action={
          <Button
            variant="contained"
            startIcon={<Iconify icon="mdi:create-outline" />}
            onClick={() => triggerCreateTaskPopUp(true)}
          >
            Create Task
          </Button>
        }
      />
      <CardContent>
        <MUIDataTable
          columns={taskTableColumnsMocker()}
          data={tasksTableRows}
          options={{ elevation: 0, selectableRows: false }}
        />
      </CardContent>
      {/* Create task pop up */}
      <CreateTaskPopUp
        isTriggered={createTaskPopUp}
        closeHandler={() => triggerCreateTaskPopUp(false)}
      />
    </Card>
  );
}

export default ProjectTasks;
