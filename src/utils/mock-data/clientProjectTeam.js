import { Box } from "@mui/material";
import Label from "src/components/Label";

export const teamTableColumnsMocker = () => [
  { name: "fullname", label: "Full name" },
  {
    name: "skills",
    label: "Skills",
    options: {
      download: false,
      customBodyRender: (value) => (
        <Box sx={{ display: "flex", alignItems: "center", flexWrap: "Wrap" }}>
          {value.map((skill) => (
            <Box sx={{ mr: 1, mb: 1 }}>
              <Label color="primary">{skill}</Label>
            </Box>
          ))}
        </Box>
      ),
    },
  },
];

export const teamTableRowsMocker = (data) => {
  return data.map((row) => ({ fullname: row.fullname, skills: row.skills }));
};
