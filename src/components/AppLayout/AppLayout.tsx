import React, { useState } from "react";
import { Box, Container, styled, useTheme } from "@mui/material";
import { Header, ProtectedPage, Sidebar } from "@/components";
import type { PropsWithChildren } from "react";
import { MINI_SIDEBAR_WIDTH } from "../Sidebar";

const MainWrapper = styled("main")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "60px",
  flexDirection: "column",
  zIndex: 1,
  width: "100%",
  backgroundColor: "transparent",
}));

export type AppLayoutProps = PropsWithChildren;

export function AppLayout(props: AppLayoutProps) {
  const { children } = props;
  const theme = useTheme();
  const [isCollapse, setToggleSidebar] = useState(false);
  const [isMobileSidebar, setToggleMobileSidebar] = useState(false);

  const handleToggleSidebar = () => {
    setToggleSidebar(!isCollapse);
  };

  const handleToggleMobileSidebar = () => {
    setToggleMobileSidebar(!isMobileSidebar);
  };

  return (
    <ProtectedPage>
      <MainWrapper>
        <Sidebar
          isCollapse={isCollapse}
          isMobileSidebar={isMobileSidebar}
          onToggleMobileSidebar={handleToggleMobileSidebar}
        />
        <PageWrapper
          className="page-wrapper"
          sx={{
            ...(isCollapse && {
              [theme.breakpoints.up("lg")]: { ml: `${MINI_SIDEBAR_WIDTH}px` },
            }),
          }}
        >
          <Header onToggleSidebar={handleToggleSidebar} onToggleMobileSidebar={handleToggleMobileSidebar}/>
          <Container>
            <Box sx={{ minHeight: "calc(100vh - 170px)" }}>{children}</Box>
          </Container>
        </PageWrapper>
      </MainWrapper>
    </ProtectedPage>
  );
}
