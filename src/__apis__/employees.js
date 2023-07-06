import axiosInstance from "./axios";

export const fetchStaffSkills = async () =>
  axiosInstance
    .get("/employees/staff-skills-handler")
    .then((response) => response.data);

export const addEmployeeRequest = async (requestData) =>
  axiosInstance
    .post("/employees/employees-handler", requestData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);

export const fetchEmployees = async () =>
  axiosInstance
    .get("/employees/employees-handler")
    .then((response) => response.data);

export const deleteEmployee = async (employeeId) =>
  axiosInstance
    .delete("/employees/employees-handler", {
      params: { employeeId: employeeId },
    })
    .then((response) => response.data);

export const createClientProjectTaskRequest = async (requestData) =>
  axiosInstance
    .post("/employees/tasks-handler", requestData)
    .then((response) => response.data);

export const fetchTasks = async (clientProjectId, employeeId) =>
  axiosInstance
    .get("/employees/tasks-handler", {
      params: { clientProjectId: clientProjectId, employeeId: employeeId },
    })
    .then((response) => response.data);

export const addTaskSubmission = async (requestData) =>
  axiosInstance
    .post("/employees/task-submission-handler", requestData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);

export const fetchTasksSubmissions = async () =>
  axiosInstance
    .get("/employees/tasks-submissions-handler")
    .then((response) => response.data);

export const requestTaskSubmissionAction = async (requestData) =>
  axiosInstance.post("/employees/task-submission-action-handler", requestData);
