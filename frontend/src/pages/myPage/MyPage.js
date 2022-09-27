/*
마이 페이지
@author 조혜안
@since 2022.09.27
*/

import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import Header from "components/nav/Header";
import Footer from "components/nav/Footer";
import UserInfo from "./UserInfo";
import MyNutrient from "./MyNutrient";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function MyPage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <Header />
      <Box sx={{ width: "100%", marginLeft: "40px", marginTop: "100px", marginBottom: "20px" }}>
        <Box sx={{ flexGrow: 1, bgcolor: "background.paper", display: "flex" }}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            textColor="secondary"
            indicatorColor="secondary"
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            <Tab label="회원 정보 수정" {...a11yProps(0)} />
            <Tab label="영양제 등록" {...a11yProps(1)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <UserInfo></UserInfo>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <MyNutrient></MyNutrient>
          </TabPanel>
        </Box>
      </Box>
      <Footer />
    </React.Fragment>
  );
}

export default MyPage;
