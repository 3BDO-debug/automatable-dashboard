import React from "react";
// material
import { Box, Card, Typography, styled, alpha, useTheme } from "@mui/material";
// components
import Iconify from "../Iconify";
import ReactApexChart from "react-apexcharts";

// --------------------------------------------------------------------------------

const IconWrapperStyle = styled("div")(({ theme }) => ({
  width: 24,
  height: 24,
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.success.main,
  backgroundColor: alpha(theme.palette.success.main, 0.16),
}));

// -------------------------------------------------------------------------------

function InfoCard() {
  const theme = useTheme();

  const chartOptions = {
    colors: [theme.palette.primary.main],
    chart: { sparkline: { enabled: true } },
    plotOptions: { bar: { columnWidth: "68%", borderRadius: 2 } },
  };

  return (
    <Card sx={{ p: 3 }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="subtitle2" color="text.secondary">
          Total active projects
        </Typography>
        {/* Card data */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
          }}
        >
          {/* Left side */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconWrapperStyle>
                <Iconify width={16} height={16} icon={"eva:trending-up-fill"} />
              </IconWrapperStyle>
              <Typography sx={{ ml: 1 }} variant="subtitle2">
                +2.6%
              </Typography>
            </Box>
            <Typography sx={{ mt: 1 }} variant="h3">
              18,5666
            </Typography>
          </Box>
          {/* Right side */}
          <ReactApexChart
            type="bar"
            series={[{ data: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20] }]}
            options={chartOptions}
            width={60}
            height={36}
          />
        </Box>
      </Box>
    </Card>
  );
}

export default InfoCard;
