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
import useDeleteTodo from "../../hooks/useDeleteTodo";
import useTodo from "../../hooks/useTodo";
import useUpdateTodo from "../../hooks/useUpdateTodo";
import useTodoQueryDashboard from "../../store/todoQueryStore-dashboard";
import NoTodos from "../../assets/img/hello.png";
import FilterTodos from "./FilterTodos";
import SingleTask from "./SingleTask";

const TaskList = () => {
  const { todoQuery, setPage } = useTodoQueryDashboard();
  const { data: todos, isLoading, error } = useTodo(todoQuery);
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
        title: "Something Failed",
        description: message,
        status: "error",
        isClosable: true,
      })
  );
  const updateTodo = useUpdateTodo((message: string) =>
    toast({
      title: "Task Completed",
      description: message,
      status: "success",
      isClosable: true,
    })
  );
  const lastPage = Math.ceil(todos?.total! / todoQuery.limit);
  return (
    <Box mb={20}>
      <FilterTodos />
      {error && <Text color="red">{error.message}</Text>}
      {isLoading && <Text>Loading...</Text>}
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
          todo={todo}
          onDelete={() => deleteTodo.mutate(todo._id)}
          onComplete={() => updateTodo.mutate({ ...todo, status: 1 })}
        />
      ))}
      {todos?.total! > 10 && (
        <HStack>
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
    </Box>
  );
};

export default TaskList;
