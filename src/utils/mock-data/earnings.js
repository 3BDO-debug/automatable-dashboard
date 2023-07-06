import { Avatar, Box, Typography } from "@mui/material";
import Label from "src/components/Label";

export const earningsTableColumns = () => [
  {
    name: "incomeSource",
    label: "Income Source",
    options: {
      customBodyRender: (value) => <Label color="primary">{value}</Label>,
    },
  },
  {
    name: "createdBy",
    label: "Created by",
    options: {
      customBodyRender: (value) => (
        <Box sx={{ display: "Flex", alignItems: "center" }}>
          <Avatar sx={{ mr: 2 }} src={value.profile_pic} alt={value.fullname} />
          <Typography variant="subtitle2">{value.fullname}</Typography>
        </Box>
      ),
    },
  },
  {
    name: "price",
    label: "Price",
  },
  {
    name: "dateRecieved",
    label: "Date recieved",
  },
];

export const earningsTableRows = (data) => {
  return data.map((row) => ({
    incomeSource: row.income_source,
    createdBy: row.created_by,
    price: row.price,
    dateRecieved: new Date(row.date_recieved).toLocaleString(),
  }));
};
