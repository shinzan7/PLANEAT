/*
내 영양분석 페이지
@author 조혜안
@since 2022.09.22
*/
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Paper, Grid } from "@mui/material";

import Header from "components/nav/Header";
import Footer from "components/nav/Footer";
import FoodStat from "./FoodStat";
import NutrientState from "./NutrientStat";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Analysis() {
  // 0일 때 최근 7일, 1일 때 최근 30일, 2일 때 전체 기간
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Header />
      <Box sx={{ width: "100%", marginTop: "100px" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            textColor="secondary"
            indicatorColor="secondary"
          >
            <Tab label="최근 7일" {...a11yProps(0)} />
            <Tab label="최근 30일" {...a11yProps(1)} />
            <Tab label="전체 기간" {...a11yProps(2)} />
          </Tabs>
        </Box>
        {/* 최근 7일 */}
        <TabPanel value={value} index={0}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FoodStat value={value}></FoodStat>
            </Grid>
            <Grid item xs={12} md={6}>
              <NutrientState value={value}></NutrientState>
            </Grid>
          </Grid>
        </TabPanel>
        {/* 최근 30일 */}
        <TabPanel value={value} index={1}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FoodStat value={value}></FoodStat>
            </Grid>
            <Grid item xs={12} md={6}>
              <NutrientState value={value}></NutrientState>
            </Grid>
          </Grid>
        </TabPanel>
        {/* 전체 기간 */}
        <TabPanel value={value} index={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FoodStat value={value}></FoodStat>
            </Grid>
            <Grid item xs={12} md={6}>
              <NutrientState value={value}></NutrientState>
            </Grid>
          </Grid>
        </TabPanel>
      </Box>
      <Footer />
    </div>
  );
}

export default Analysis;
