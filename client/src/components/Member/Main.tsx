import {
  Box,
  Button,
  HStack,
  Icon,
  Show,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { RiMoonLine, RiSunLine } from "react-icons/ri";
import BottomMenu from "./BottomMenu";
import useTitleStore from "../../store/titleStore";
import TaskForm from "./TaskForm";

interface Props {
  Component: React.FC;
}

const Main = ({ Component }: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { title } = useTitleStore();
  return (
    <Box height="100%" p={7}>
      <HStack justifyContent={"space-between"}>
        <Box>
          <Text fontSize="10px" letterSpacing="1px">
            {new Date().toDateString()}
          </Text>
          <Text fontSize="20px">{title}</Text>
        </Box>
        <Button
          boxShadow="-7px 9px 18px -10px rgba(48, 133, 254, 1)"
          bgColor="#3085fe"
          color="whiteAlpha.900"
          width="40px"
          borderRadius="50%"
          _hover={{
            bgColor: "#3085fe",
          }}
          onClick={() => toggleColorMode()}
        >
          <Icon
            boxSize="20px"
            as={colorMode === "light" ? RiSunLine : RiMoonLine}
          />
        </Button>
      </HStack>
      <Component />
      <Show below="lg">
        <BottomMenu />
      </Show>
      <TaskForm />
    </Box>
  );
};

export default Main;
