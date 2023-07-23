import {
  Box,
  HStack,
  Icon,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { RxCross2 } from "react-icons/rx";
import CheckBoxGreen from "../../assets/img/checkbox-green.png";
import CheckBoxRed from "../../assets/img/checkbox-red.png";
import { Todo } from "../../hooks/useTodo";

interface Props {
  todo: Todo;
  onDelete: () => void;
  onComplete?: () => void;
}

const SingleTask = ({ todo, onDelete, onComplete }: Props) => {
  const taskBgColor = useColorModeValue("#fff", "gray.700");
  return (
    <Box
      bgColor={taskBgColor}
      px={3}
      py={5}
      borderRadius="25px"
      my={5}
      boxShadow="-3px 9px 17px 3px rgba(0,0,0,0.1);"
    >
      <HStack justifyContent="space-between">
        <HStack>
          <Box position="relative" display="inline-block">
            {!todo.status && (
              <Box
                boxSize="20px"
                cursor={"pointer"}
                onClick={() => onComplete?.()}
              >
                <Image
                  filter="drop-shadow(0px 0px 7px #FF217F)"
                  src={CheckBoxRed}
                />
              </Box>
            )}
            {todo.status == 1 && (
              <Box boxSize="26px" cursor={"pointer"}>
                <Image
                  filter="drop-shadow(0px 0px 5px #1fff1f)"
                  src={CheckBoxGreen}
                />
              </Box>
            )}
          </Box>
          <Box
            ms={1}
            width="2px"
            minW="2px"
            height="35px"
            borderRadius="5px"
            className={
              todo.status ? "status-bar-completed" : "status-bar-pending"
            }
          >
            &#8203;
          </Box>
          <Box py={2} px={3}>
            <Text mt={-3}>{todo.name}</Text>
            <Text mb={-3} fontSize="12px">
              {new Date(todo.deadline!)
                .toLocaleDateString("en-in", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })
                .toString()}
            </Text>
          </Box>
        </HStack>
        <Icon onClick={() => onDelete()} as={RxCross2} opacity="0.7" />
      </HStack>
    </Box>
  );
};

export default SingleTask;
