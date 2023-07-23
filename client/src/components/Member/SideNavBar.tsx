import {
  Box,
  Button,
  HStack,
  Icon,
  Image,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { FiArchive, FiHome, FiLogOut, FiPlus, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useState } from "react";
import useLogout from "../../hooks/useLogout";
import useSheetStore from "../../store/sheetStore";

const SideNavBar = () => {
  const { setOpen } = useSheetStore();
  const menuList = [
    { label: "Home", link: "/member", icon: FiHome },
    { label: "Completed", link: "/member/finished", icon: FiArchive },
    { label: "Profile", link: "/member/profile", icon: FiUser },
  ];
  const logoutUser = useLogout();
  const toast = useToast();

  const bottomMenuColor = useColorModeValue("white", "gray.700");
  const navTextColor = useColorModeValue('"#5F6F81"', "gray.400");

  const [activeNav, setActiveNav] = useState("Home");

  return (
    <Box height="100%">
      <Box
        bgColor={bottomMenuColor}
        height="94vh"
        pos="sticky"
        ms={3}
        top={5}
        bottom={5}
        borderRadius="20px"
        p="12px"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box>
          <HStack spacing={0} ms={-5}>
            <Image
              m={3}
              ms={5}
              src="https://img.icons8.com/external-vitaliy-gorbachev-flat-vitaly-gorbachev/58/external-user-internet-security-vitaliy-gorbachev-flat-vitaly-gorbachev.png"
              boxSize="42px"
            />
            <Box>
              <Text fontSize="16px" fontWeight={600}>
                Neela Kanta Reddy
              </Text>
              <Text fontSize="12px" fontWeight={600}>
                trexnkr@gmail.com
              </Text>
            </Box>
          </HStack>
          <Button
            onClick={() => setOpen(true)}
            leftIcon={<FiPlus />}
            mt={3}
            w="100%"
            colorScheme="messenger"
          >
            Create Todo
          </Button>
        </Box>

        <Box mt={-20}>
          {menuList.map((menu, index) => (
            <HStack
              key={index}
              my={5}
              spacing={5}
              color={activeNav === menu.label ? "#3085fe" : navTextColor}
              onClick={() => setActiveNav(menu.label)}
              _hover={{
                color: "#3085fe",
              }}
            >
              <Icon boxSize="25px" as={menu.icon} />
              <Link to={menu.link}>
                <Text fontWeight={"medium"}>{menu.label}</Text>
              </Link>
            </HStack>
          ))}
        </Box>
        <HStack
          my={3}
          spacing={5}
          color={"#5F6F81"}
          p={3}
          bgColor={"gray.200"}
          borderRadius="10px"
          cursor="pointer"
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
          <Icon boxSize="25px" as={FiLogOut} />
          <Text fontWeight={"medium"}>Logout</Text>
        </HStack>
      </Box>
    </Box>
  );
};

export default SideNavBar;
