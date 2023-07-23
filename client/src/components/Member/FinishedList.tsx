import {
  Box,
  Button,
  HStack,
  Icon,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import NoTodos from "../../assets/img/hello.png";
import useDeleteTodo from "../../hooks/useDeleteTodo";
import usePageTitle from "../../hooks/usePageTitle";
import useTodo from "../../hooks/useTodo";
import useTodoQueryStore from "../../store/todoQueryStore";
import SingleTask from "./SingleTask";

const FinishedList = () => {
  usePageTitle("Finished Tasks");
  const { todoQuery, setPage } = useTodoQueryStore();
  const { data: todos } = useTodo(todoQuery);
  const toast = useToast();
  const deleteTodo = useDeleteTodo(
    (message: string) =>
      toast({
        title: "Todo Deleted",
        description: message,
        status: "error",
        isClosable: true,
      }),
    (message: string) =>
      toast({
        title: "Somethig failed",
        description: message,
        status: "error",
        isClosable: true,
      })
  );
  const lastPage = Math.ceil(todos?.total! / todoQuery.limit);
  return (
    <>
      {!todos?.total && (
        <Box
          display="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
        >
          <Text
            mt={5}
            mb={-5}
            fontSize="18px"
            fontWeight="medium"
            color="gray.600"
          >
            No Tasks To Do
          </Text>
          <Image w="70vw" maxW="600px" src={NoTodos} />
        </Box>
      )}
      {todos?.results.map((todo) => (
        <SingleTask
          key={todo._id}
          todo={todo}
          onDelete={() => deleteTodo.mutate(todo._id)}
        />
      ))}
      {todos?.total! > 10 && (
        <HStack mb={20}>
          <Button
            bgColor="white"
            onClick={() => setPage(todoQuery.page - 1)}
            isDisabled={todoQuery.page === 1}
          >
            <Icon as={FaCaretLeft} />
          </Button>
          <Text fontWeight={600} color="gray.600" mx={2}>
            {todos?.page}
          </Text>
          <Button
            bgColor="white"
            onClick={() => setPage(todoQuery.page + 1)}
            isDisabled={todoQuery.page === lastPage}
          >
            <Icon as={FaCaretRight} />
          </Button>
        </HStack>
      )}
    </>
  );
};

export default FinishedList;
