import { Suspense, lazy } from "react";
import { Navigate, useRoutes, useLocation } from "react-router-dom";
import LayoutGenerator from "src/layouts";
import DashboardLayout from "src/layouts/dashboard";
import LogoOnlyLayout from "src/layouts/LogoOnlyLayout";
// layouts

// components
import LoadingScreen from "../components/LoadingScreen";

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense
      fallback={<LoadingScreen isDashboard={pathname.includes("/dashboard")} />}
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "/overview",
      element: <LayoutGenerator />,
      children: [
        { path: "home", element: <HomePage /> },
        { path: "expenses", element: <ExpensesPage /> },
        { path: "earnings", element: <EarningsPage /> },
        { path: "income-sources", element: <IncomeSourcesPage /> },
      ],
    },
    {
      path: "/clients-management",
      element: <LayoutGenerator />,
      children: [
        { path: "clients-data", element: <ClientsDataPage /> },
        { path: "client-profile/:id", element: <ClientProfilePage /> },
        { path: "clients-projects", element: <ClientsProjectsPage /> },
        {
          path: "client-project-details/:id",
          element: <ClientProjectDetailsPage />,
        },
      ],
    },
    {
      path: "/employees-management",
      element: <LayoutGenerator />,
      children: [
        { path: "employees-data", element: <EmployeesDataPage /> },
        { path: "employee-profile/:id", element: <EmployeeProfilePage /> },
      ],
    },
    {
      path: "/tasks-management",
      element: <LayoutGenerator />,
      children: [
        { path: "tasks", element: <TasksDataPage /> },
        { path: "tasks-submissions", element: <TasksSubmissions /> },
        { path: "scheduled-updates", element: <ScheduledUpdatesPage /> },
      ],
    },
    {
      path: "/auth",
      element: <LogoOnlyLayout />,
      children: [
        { path: "signin", element: <SignInPage /> },
        {
          path: "forgetpassword",
          element: <ForgetPassword />,
        },
        /* dd */
      ],
    },
    {
      path: "*",
      element: <LogoOnlyLayout />,
      children: [
        { path: "404", element: <NotFound /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
    { path: "/", element: <Navigate to="/overview/home" replace /> },
  ]);
}

// Overview
const HomePage = Loadable(lazy(() => import("../pages/HomePage")));
// Clients Management
const ClientsDataPage = Loadable(
  lazy(() => import("../pages/clientsManagement/ClientsDataPage"))
);
const ClientProfilePage = Loadable(
  lazy(() => import("../pages/clientsManagement/ClientProfilePage"))
);
const ClientsProjectsPage = Loadable(
  lazy(() => import("../pages/clientsManagement/ClientsProjectsPage"))
);
const ClientProjectDetailsPage = Loadable(
  lazy(() => import("../pages/clientsManagement/ClientProjectDetailsPage"))
);
// Employees Management
const EmployeesDataPage = Loadable(
  lazy(() => import("../pages/employeesManagement/EmployeesDataPage"))
);
const EmployeeProfilePage = Loadable(
  lazy(() => import("../pages/employeesManagement/EmployeeProfilePage"))
);
// Tasks Management
const TasksDataPage = Loadable(
  lazy(() => import("../pages/employeesManagement/TasksDataPage"))
);
const TasksSubmissions = Loadable(
  lazy(() => import("../pages/employeesManagement/TasksSubmissions"))
);
// Resources Management
const ExpensesPage = Loadable(
  lazy(() => import("../pages/resourcesManagement/ExpensesPage"))
);
const EarningsPage = Loadable(
  lazy(() => import("../pages/resourcesManagement/EarningsPage"))
);
const IncomeSourcesPage = Loadable(
  lazy(() => import("../pages/resourcesManagement/IncomeSourcesPage"))
);
const ScheduledUpdatesPage = Loadable(
  lazy(() => import("../pages/resourcesManagement/ScheduledUpdatesPage"))
);
// Authentication
const SignInPage = Loadable(lazy(() => import("../pages/authPages/SignIn")));
const ForgetPassword = Loadable(
  lazy(() => import("../pages/authPages/ForgetPassword"))
);
const NotFound = Loadable(lazy(() => import("../pages/Page404")));
