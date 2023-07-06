import axiosInstance from "./axios";

export const fetchExpenses = async () =>
  axiosInstance
    .get("/company-resources-management/expenses-handler")
    .then((response) => response.data);

export const addExpenses = async (requestData) =>
  axiosInstance
    .post("/company-resources-management/expenses-handler", requestData)
    .then((response) => response.data);

export const fetchEarning = async () =>
  axiosInstance
    .get("/company-resources-management/earnings-handler")
    .then((response) => response.data);

export const addEarning = async (requestData) =>
  axiosInstance
    .post("/company-resources-management/earnings-handler", requestData)
    .then((response) => response.data);

export const fetchIncomeSources = async () =>
  axiosInstance
    .get("/company-resources-management/income-sources-handler")
    .then((response) => response.data);

export const addIncomeSource = async (requestData) =>
  axiosInstance
    .post("/company-resources-management/income-sources-handler", requestData)
    .then((response) => response.data);


    