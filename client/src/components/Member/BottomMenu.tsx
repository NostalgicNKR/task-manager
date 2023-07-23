import { Box, Icon, Text, useColorModeValue, useToast } from "@chakra-ui/react";
import { FiHome, FiPlus, FiUser, FiLogOut, FiArchive } from "react-icons/fi";
import useSheetStore from "../../store/sheetStore";
import { Link } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import { useState } from "react";

const BottomBar = () => {
  const { setOpen } = useSheetStore();
  const logoutUser = useLogout();
  const toast = useToast();
  const bottomMenuColor = useColorModeValue("white", "gray.700");

  const [activeNav, setActiveNav] = useState("Home");

  return (
    <Box className="mybutton">
      <Box
        mb={2}
        mx={2}
        height="60px"
        bg={bottomMenuColor}
        boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1)"
        display="flex"
        justifyContent="space-evenly"
        alignItems="center"
        padding="0 10px"
        borderRadius="15px"
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          color={activeNav === "Home" ? "#3085fe" : "gray.500"}
          onClick={() => setActiveNav("Home")}
          _hover={{
            color: "#3085fe",
          }}
        >
          <Link to="/member">
            <Icon my={-1} ms="5px" as={FiHome} boxSize={"20px"} />
            <Text fontSize="12px">Home</Text>
          </Link>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          color={activeNav === "Archives" ? "#3085fe" : "gray.500"}
          onClick={() => setActiveNav("Archives")}
          _hover={{
            color: "#3085fe",
          }}
        >
          <Link to="/member/finished">
            <Icon my={-1} mx="10px" as={FiArchive} boxSize={"20px"} />
            <Text fontSize="12px">Archives</Text>
          </Link>
        </Box>
        <Box
          mx="12px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          position="relative"
        >
          <Box
            position="absolute"
            top="-45px"
            left="50%"
            transform="translateX(-50%)"
            bg="#3085fe"
            width="50px"
            height="50px"
            borderRadius="50%"
            boxShadow="-9px 11px 17px -9px rgba(48, 133, 254, 1)"
            display="flex"
            justifyContent="center"
            alignItems="center"
            cursor="pointer"
            transition="box-shadow 0.5s ease-in"
            _hover={{
              boxShadow: "-5px 5px 20px 5px rgba(48, 133, 254, 0.5)",
            }}
            _before={{
              content: '""',
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              boxShadow: "-9px 11px 17px -9px rgba(48, 133, 254, 1)",
              opacity: 0.5,
              zIndex: -1,
            }}
            onClick={() => setOpen(true)}
          >
            <FiPlus size={25} color="white" />
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          color={activeNav === "Profile" ? "#3085fe" : "gray.500"}
          onClick={() => setActiveNav("Profile")}
          _hover={{
            color: "#3085fe",
          }}
        >
          <Link to="/member/profile">
            <Icon my={-1} ms="5px" as={FiUser} boxSize={"20px"} />
            <Text fontSize="12px">Profile</Text>
          </Link>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          color="gray.500"
          cursor="pointer"
          _hover={{
            color: "#3085fe",
          }}
          onClick={() =>
            logoutUser(() =>
              toast({
                title: "User Logged Out",
                description: "Come Back Soon ;)",
                status: "info",
                isClosable: true,
              })
            )
          }
        >
          <FiLogOut size={20} />
          <Text fontSize="12px">Logout</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default BottomBar;
