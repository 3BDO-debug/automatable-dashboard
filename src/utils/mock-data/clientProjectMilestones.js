import { Box, IconButton, Tooltip } from "@mui/material";
import Iconify from "src/components/Iconify";

export const milestonesTableColumnsMocker = () => [
  { name: "name", label: "Name" },
  { name: "description", label: "Description" },
  { name: "price", label: "Price" },
  { name: "dueDate", label: "Due date" },
  {
    name: "actions",
    label: "Actions",
    options: {
      customBodyRender: (value) => (
        <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
          <Tooltip title="Mark completed">
            <IconButton color="success">
              <Iconify icon="material-symbols:check-circle-outline" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  },
];

export const milestonesTableRowsMocker = (data) => {
  return data.map((row) => ({
    name: row.milestone_name,
    description: row.description,
    price: row.milestone_price,
    dueDate: new Date(row.delivery_date).toLocaleString(),
    actions: row.id,
  }));
};
