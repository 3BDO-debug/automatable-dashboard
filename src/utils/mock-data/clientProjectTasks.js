import Label from "src/components/Label";

export const taskTableColumnsMocker = () => {
  return [
    { name: "taskName", label: "Task name" },
    {
      name: "assignedTo",
      label: "Assigned to",
      options: { customBodyRender: (value) => value.fullname },
    },
    { name: "dueDate", label: "Due Date" },
    {
      name: "status",
      label: "Status",
      options: {
        customBodyRender: (value) => (
          <Label color={value ? "success" : "error"}>
            {value ? "Proceeded" : "Not Proceeded"}
          </Label>
        ),
      },
    },
    { name: "createdAt", label: "Created at" },
  ];
};

export const taskTableRowsMocker = (data) => {
  return data.map((row) => ({
    taskName: row.name,
    assignedTo: row.assigned_to,
    dueDate: new Date(row.due_date).toLocaleString(),
    status: row.is_proceeded,
    createdAt: new Date(row.created_at).toLocaleString(),
  }));
};
