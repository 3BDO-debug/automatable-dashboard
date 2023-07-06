// components
import Iconify from "../../../components/Iconify";
import HomeIcon from "@mui/icons-material/Home";

// ----------------------------------------------------------------------

const navConfig = [
  {
    subheader: "Overview",
    items: [
      { title: "Home", path: "/overview/home", icon: <HomeIcon /> },
      {
        title: "Income Sources",
        path: "/overview/income-sources",
        icon: <Iconify icon="carbon:money" />,
      },
      {
        title: "Expenses",
        path: "/overview/expenses",
        icon: <Iconify icon="ph:money" />,
      },
      {
        title: "Earnings",
        path: "/overview/earnings",
        icon: <Iconify icon="game-icons:cash" />,
      },
    ],
  },
  {
    subheader: "Clients Management",
    items: [
      {
        title: "Clients Data",
        path: "/clients-management/clients-data",
        icon: <Iconify icon="mdi:people-group" />,
      },
      {
        title: "Clients Projects",
        path: "/clients-management/clients-projects",
        icon: <Iconify icon="carbon:container-software" />,
      },
    ],
  },
  {
    subheader: "Employees Management",
    items: [
      {
        title: "Employees Data",
        path: "/employees-management/employees-data",
        icon: <Iconify icon="clarity:employee-group-line" />,
      },
    ],
  },
  {
    subheader: "Tasks Management",
    items: [
      {
        title: "Tasks Data",
        path: "/tasks-management/tasks",
        icon: <Iconify icon="fluent:tasks-app-20-filled" />,
      },
      {
        title: "Tasks Submissions",
        path: "/tasks-management/tasks-submissions",
        icon: <Iconify icon="ph:files" />,
      },
      {
        title: "Scheduled Updates",
        path: "/tasks-management/scheduled-updates",
        icon: <Iconify icon="material-symbols:update" />,
      },
    ],
  },
];

export default navConfig;
