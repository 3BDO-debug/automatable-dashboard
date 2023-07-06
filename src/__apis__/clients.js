import axiosInstance from "./axios";

export const fetchClientsData = async () =>
  axiosInstance.get("/clients/clients-data").then((response) => response.data);

export const addClientRequest = async (requestData) =>
  axiosInstance
    .post("/clients/clients-data", requestData)
    .then((response) => response.data);

export const fetchClientDetails = async (clientId) =>
  axiosInstance
    .get("/clients/client-details", {
      params: {
        clientId: clientId,
      },
    })
    .then((response) => response.data);

export const updateClientDetails = async (requestData) =>
  axiosInstance
    .put("/clients/client-details", requestData)
    .then((response) => response.data);

export const deleteClientRequest = async (requestData) =>
  axiosInstance
    .delete(`/clients/clients-data?clientId=${requestData}`)
    .then((response) => response.data);

export const addClientProject = async (requestData) =>
  axiosInstance
    .post("/clients/clients-projects", requestData)
    .then((response) => response.data);

export const fetchClientProjectsData = async () =>
  axiosInstance
    .get("/clients/clients-projects")
    .then((response) => response.data);

export const deleteClientProjectRequest = async (clientProjectId) =>
  axiosInstance
    .delete("/clients/clients-projects", {
      params: {
        clientProjectId: clientProjectId,
      },
    })
    .then((response) => response.data);

export const fetchClientProject = async (clientProjectId) =>
  axiosInstance
    .get("/clients/client-project", {
      params: {
        clientProjectId: clientProjectId,
      },
    })
    .then((response) => response.data);

export const createClientProjectMilestoneRequest = async (requestData) =>
  axiosInstance
    .post("/clients/client-project-milestones", requestData)
    .then((response) => response.data);

export const fetchClientProjectMilestones = async (clientProjectId) =>
  axiosInstance
    .get("/clients/client-project-milestones", {
      params: {
        clientProjectId: clientProjectId,
      },
    })
    .then((response) => response.data);

export const addClientMeeting = async (requestData) =>
  axiosInstance.post("/clients/client-meetings-handler", requestData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const fetchClientProjectMeetings = async (clientProjectId) =>
  axiosInstance
    .get("/clients/client-meetings-handler", {
      params: {
        clientProjectId: clientProjectId,
      },
    })
    .then((response) => response.data);

export const fetchScheduledUpdates = async () =>
  axiosInstance
    .get("/clients/scheduled-updates-handler")
    .then((response) => response.data);

export const addScheduledUpdate = async (requestData) =>
  axiosInstance
    .post("/clients/scheduled-updates-handler", requestData)
    .then((response) => response.data);
