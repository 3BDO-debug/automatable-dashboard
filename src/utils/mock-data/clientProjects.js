import { Box, CircularProgress, IconButton } from "@mui/material";
import Iconify from "src/components/Iconify";
import Label from "src/components/Label";

export const clientProjectsColumns = (
  handleViewClientProject,
  handleDeleteClientProject,
  deletingClientProject
) => {
  return [
    { name: "projectName", label: "Project name" },
    {
      name: "teamMembers",
      label: "Team members",
      options: {
        download: false,
        customBodyRender: (value) => (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {value.map((staffMember) => (
              <Box sx={{ mr: 1, mb: 1 }}>
                <Label color="primary">{staffMember.fullname}</Label>
              </Box>
            ))}
          </Box>
        ),
      },
    },
    { name: "startedAt", label: "Started At" },
    {
      name: "actions",
      label: "Actions",
      options: {
        customBodyRender: (value) => (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="primary"
              onClick={() => handleViewClientProject(value)}
            >
              <Iconify icon="ic:baseline-remove-red-eye" />
            </IconButton>
            {deletingClientProject ? (
              <CircularProgress size={20} />
            ) : (
              <IconButton
                color="error"
                onClick={() => handleDeleteClientProject(value)}
              >
                <Iconify icon="material-symbols:delete-outline-sharp" />
              </IconButton>
            )}
          </Box>
        ),
      },
    },
  ];
};

export const clientProjectsRowsMocker = (data) => {
  return data.map((row) => ({
    projectName: row.project_name,
    teamMembers: row.staff_members,
    startedAt: new Date(row.started_at).toLocaleDateString(),
    actions: row.id,
  }));
};
