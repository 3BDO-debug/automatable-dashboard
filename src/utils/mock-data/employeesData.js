import { Box, CircularProgress, IconButton } from "@mui/material";
import Iconify from "src/components/Iconify";
import Label from "src/components/Label";

export const employeesDataColumns = (
  handleViewEmployeeData,
  handleDeleteEmployee,
  deletingEmployee
) => {
  return [
    { name: "fullName", label: "Full name" },
    { name: "email", label: "Email" },
    {
      name: "skills",
      label: "Skills",
      options: {
        download: false,
        customBodyRender: (value) => (
          <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
            {value?.map((skill) => (
              <Box sx={{ mr: 1, mb: 1 }}>
                <Label color="primary">{skill}</Label>
              </Box>
            ))}
          </Box>
        ),
      },
    },
    {
      name: "allowedViews",
      label: "Allowed views",
      options: {
        download: false,
        customBodyRender: (value) => (
          <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
            {value?.map((allowedView) => (
              <Box sx={{ mr: 1, mb: 1 }}>
                <Label color="info">{allowedView}</Label>
              </Box>
            ))}
          </Box>
        ),
      },
    },
    {
      name: "actions",
      label: "Actions",
      options: {
        download: false,
        print: false,
        customBodyRender: (value) => (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {deletingEmployee ? (
              <CircularProgress size={20} />
            ) : (
              <IconButton onClick={() => handleViewEmployeeData(value)}>
                <Iconify icon="ic:baseline-remove-red-eye" />
              </IconButton>
            )}
            <IconButton
              color="error"
              onClick={() => handleDeleteEmployee(value)}
            >
              <Iconify icon="material-symbols:delete-outline-sharp" />
            </IconButton>
          </Box>
        ),
      },
    },
  ];
};

export const employeesDataRows = (data) => {
  return data.map((row) => ({
    fullName: row.fullname,
    email: row.email,
    skills: row.skills,
    allowedViews: row.allowed_views,
    actions: row.id,
  }));
};
