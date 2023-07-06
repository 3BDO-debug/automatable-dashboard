import { Avatar, Box, Typography } from "@mui/material";

export const expensesTableColumns = () => [
  {
    name: "createdBy",
    label: "Created By",
    options: {
      download: false,
      customBodyRender: (value) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar src={value.profile_pic} alt={value.fullname} />
          <Typography sx={{ ml: 1 }} variant="subtitle2">
            {value.fullname}
          </Typography>
        </Box>
      ),
    },
  },
  { name: "paidTo", label: "Paid to" },
  { name: "amountDue", label: "Amount Due" },
  {
    name: "invoiceDescription",
    label: "Invoice Description",
    options: {
      customBodyRender: (value) => (
        <Typography variant="body2" sx={{ width: "60%" }}>
          {value}
        </Typography>
      ),
    },
  },
  { name: "dateIssued", label: "Date Issued" },
];

export const expensesTableRows = (data) => {
  return data.map((row) => ({
    createdBy: row.created_by,
    paidTo: row.paid_to,
    amountDue: row.price,
    invoiceDescription: row.invoice_description,
    dateIssued: new Date(row.date_issued).toLocaleString(),
  }));
};
