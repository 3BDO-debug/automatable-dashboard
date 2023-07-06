import axiosInstance from "./axios";

export const fetchAllowedViews = async () =>
  axiosInstance
    .get("/accounts/allowed-views-handler")
    .then((response) => response.data);

export const fetchUserDetails = async () =>
  axiosInstance.get("/accounts/user-details").then((response) => response.data);
