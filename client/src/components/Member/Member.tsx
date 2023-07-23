import { Grid, GridItem, Show, useColorModeValue } from "@chakra-ui/react";
import SideNavBar from "./SideNavBar";
import Main from "./Main";
import { Outlet } from "react-router-dom";

const Member = () => {
  const mainBgColor = useColorModeValue("#e8ebf3", "#1a202c");
  return (
    <Grid
      templateAreas={{
        base: `"main"`,
        lg: `"aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "280px 1fr",
      }}
      bgColor={mainBgColor}
      h="100h"
      minH="100vh"
    >
      <GridItem area="aside">
        <Show above="lg">
          <SideNavBar />
        </Show>
      </GridItem>
      <GridItem area="main">
        <Main Component={Outlet} />
      </GridItem>
    </Grid>
  );
};

export default Member;
