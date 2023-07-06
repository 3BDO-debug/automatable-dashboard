// @mui
import { Stack, Button, Typography } from "@mui/material";
// routes
import { PATH_DOCS } from "../../../routes/paths";
// assets
import { DocIllustration } from "../../../assets";

// ----------------------------------------------------------------------

export default function NavbarDocs() {
  const { user } = { user: {} };

  return (
    <Stack
      spacing={3}
      sx={{
        px: 5,
        pb: 5,
        mt: 10,
        width: 1,
        textAlign: "center",
        display: "block",
      }}
    >
      <DocIllustration sx={{ width: 1 }} />

      <div>
        <Typography gutterBottom variant="subtitle1">
          {"title"}, {"Abdelrahman"}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", whiteSpace: "pre-line" }}
        >
          descr
        </Typography>
      </div>

      <Button
        href={"www.basedontech.com"}
        target="_blank"
        rel="noopener"
        variant="contained"
      >
        View more
      </Button>
    </Stack>
  );
}
