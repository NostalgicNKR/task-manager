import { Box, LightMode } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const Auth = () => {
  return (
    <>
      <Box
        // bgColor={bgColor}
        // bgImage="linear-gradient(315deg, #b8c6db 0%, #f5f7fa 74%)"
        bg="radial-gradient(circle at 18.7% 37.8%, rgb(250, 250, 250) 0%, rgb(225, 234, 238) 90%)"
        minH="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <LightMode>
          <Outlet />
        </LightMode>
      </Box>
    </>
  );
};

export default Auth;
