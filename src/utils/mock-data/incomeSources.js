import Label from "src/components/Label";

export const incomeSourcesTableColumns = () => [
  {
    name: "name",
    label: "Name",
    options: {
      customBodyRender: (value) => <Label color="primary">{value}</Label>,
    },
  },
  { name: "description", label: "Description" },
];

export const incomeSourcesTableRows = (data) => {
  return data.map((row) => ({
    name: row.name,
    description: row.description,
  }));
};
