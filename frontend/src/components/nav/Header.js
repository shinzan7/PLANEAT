/*
상단 헤더
@author 여예원
@since 2022.09.16
*/

import * as React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Button,
  MenuItem,
  Container,
} from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import longlogo from "assets/longlogo.png";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

const pages = ["식사 기록", "영양제 검색", "내 영양분석", "MY"];

const ResponsiveAppBar = () => {
  const location = useLocation();

  // const mounted = useRef(false);
  // useEffect(() => {
  //   if (!mounted.current) {
  //     mounted.current = true;
  //   } else {
  //   console.log(location.pathname);
  //   }
  // }, [location.pathname]);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const StyledLink = styled(Link)`
    text-decoration: none;
    font-weight: ${(props) => (props.current ? "bold" : " ")};
    color: ${(props) => (props.current ? "#9da6f8" : "black")};

    &:hover {
      font-weight: bold;
      color: #9da6f8;
    }
  `;

  return (
    <AppBar
      style={{
        position: "fixed",
        backgroundColor: "white",
        boxShadow: "none",
        borderBottom: "2px solid rgb(228, 225, 225)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* 좌측 로고 (기본 사이즈) */}
          <StyledLink to="/main">
            <Box
              component="img"
              src={longlogo}
              sx={{ display: { xs: "none", md: "flex" }, width: "200px" }}
            ></Box>
          </StyledLink>
          {/* 좌특 메뉴 아이콘 (모바일 사이즈)*/}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    {page == "식사 기록" && (
                      <StyledLink to="/main">{page}</StyledLink>
                    )}
                    {page == "영양제 검색" && (
                      <StyledLink to="/searchtag">{page}</StyledLink>
                    )}
                    {page == "내 영양분석" && (
                      <StyledLink to="/analysis">{page}</StyledLink>
                    )}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* 중앙 PLANEAT 글씨 (모바일 사이즈) */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: ".3rem",
              textDecoration: "none",
              color: "#9DA6F8",
            }}
          >
            PLANEAT
          </Typography>
          {/* 중앙 메뉴 영역 (기본 사이즈) */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              ml: "200px",
            }}
          >
            {pages.map((page) => (
              <Typography
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, ml: "10%", color: "black", display: "block" }}
                color="inherit"
              >
                {page == "식사 기록" && (
                  <StyledLink to="/main" current={location.pathname == "/main"}>
                    {page}
                  </StyledLink>
                )}
                {page == "영양제 검색" && (
                  <StyledLink
                    to="/searchtag"
                    current={
                      location.pathname == "/search" ||
                      location.pathname == "/searchtag" ||
                      location.pathname == "/searchnutrient" ||
                      location.pathname.includes("/searchdetail") ||
                      location.pathname.includes("/tagresult") ||
                      location.pathname.includes("/result") ||
                      location.pathname.includes("/nutrientresult")
                    }
                  >
                    {page}
                  </StyledLink>
                )}
                {page == "내 영양분석" && (
                  <StyledLink
                    to="/analysis"
                    current={location.pathname == "/analysis"}
                  >
                    {page}
                  </StyledLink>
                )}
                {page == "MY" && (
                  <StyledLink
                    to="/myPage"
                    current={location.pathname == "/myPage"}
                  >
                    {page}
                  </StyledLink>
                )}
              </Typography>
            ))}
          </Box>
          {/* 우측 아이콘 영역(기본 사이즈) */}
          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <AccountCircleRoundedIcon />
            </IconButton>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              color="inherit"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {/* 우측 아이콘 클릭시 나오는 메뉴 */}
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography
                  textAlign="center"
                  onClick={() => {
                    localStorage.clear();
                    window.location.replace("/");
                    console.log("로그아웃");
                  }}
                >
                  로그아웃
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
