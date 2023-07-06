import React from "react";
// material
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import InfoCard from "src/components/__homePage/InfoCard";
import ReactApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import userAtom from "src/recoil/atoms/userAtom";

// ---------------------------------------------------------------------------------------------------

function HomePage() {
  const theme = useTheme();

  const user = useRecoilValue(userAtom);

  const chartOptions = {
    colors: [theme.palette.primary.main],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: "Product Trends by Month",
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
        ],
      },
    },
  };

  return (
    <Container>
      <Grid container spacing={2}>
        {/* Welcome */}
        <Grid item xs={12}>
          <Typography variant="h3" gutterBottom>
            Welcome {user?.first_name} {user?.last_name}
          </Typography>
          <Typography color="text.secondary" variant="subtitle1">
            Progress is impossible without change, and those who cannot change
            their minds cannot change anything.
          </Typography>
        </Grid>

        {/* Projects Overview */}
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Projects Overview
          </Typography>
        </Grid>

        <Grid item xs={12} md={4}>
          <InfoCard title="Total Projects" value={/*totalProjects*/ "50"} />
        </Grid>
        <Grid item xs={12} md={4}>
          <InfoCard title="Ongoing Projects" value={/*ongoingProjects*/ "25"} />
        </Grid>
        <Grid item xs={12} md={4}>
          <InfoCard
            title="Completed Projects"
            value={/*completedProjects*/ "15"}
          />
        </Grid>

        {/* Projects Chart */}
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Projects Statistics" />
            <CardContent>
              <ReactApexChart
                type="bar"
                series={[
                  {
                    name: "Projects",
                    data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
                  },
                ]}
                options={chartOptions}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Staff Performance Overview */}
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Staff Performance
          </Typography>
        </Grid>

        <Grid item xs={12} md={4}>
          <InfoCard title="Total Staff" value={/*totalStaff*/ "30"} />
        </Grid>
        <Grid item xs={12} md={4}>
          <InfoCard title="Avg. Performance" value={/*avgPerformance*/ "75%"} />
        </Grid>
        <Grid item xs={12} md={4}>
          <InfoCard title="Top Performer" value={/*topPerformer*/ "John Doe"} />
        </Grid>

        {/* Staff Performance Chart */}
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Staff Performance Statistics" />
            <CardContent>
              <ReactApexChart
                type="line"
                series={[
                  {
                    name: "Performance",
                    data: [70, 90, 60, 78, 88, 96, 72, 85, 92],
                  },
                ]}
                options={chartOptions}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Finance Overview */}
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Finance Overview
          </Typography>
        </Grid>

        <Grid item xs={12} md={4}>
          <InfoCard title="Total Earnings" value={/*totalEarnings*/ "$12000"} />
        </Grid>
        <Grid item xs={12} md={4}>
          <InfoCard title="Total Expenses" value={/*totalExpenses*/ "$4000"} />
        </Grid>
        <Grid item xs={12} md={4}>
          <InfoCard title="Net Profit" value={/*netProfit*/ "$8000"} />
        </Grid>

        {/* Finance Chart */}
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Earnings and Expenses" />
            <CardContent>
              <ReactApexChart
                type="area"
                series={[
                  {
                    name: "Earnings",
                    data: [
                      1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000,
                    ],
                  },
                  {
                    name: "Expenses",
                    data: [500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500],
                  },
                ]}
                options={chartOptions}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default HomePage;
