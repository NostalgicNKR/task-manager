import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import Sheet from "react-modal-sheet";
import useAddTodo from "../../hooks/useAddTodo";
import useSheetStore from "../../store/sheetStore";

const TaskForm = () => {
  const todoRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const ss = useSheetStore();
  // const ref = useRef<SheetRef>();
  const queryClient = useQueryClient();
  const datas = queryClient.getQueriesData(["todos"]);
  console.log(datas);
  const toast = useToast();
  const addTodo = useAddTodo(
    (message: string) =>
      toast({
        title: "Todo Created",
        description: message,
        status: "success",
        isClosable: true,
      }),
    (message: string) =>
      toast({
        title: message,
        status: "error",
        isClosable: true,
      })
  );
  return (
    <Sheet
      isOpen={ss.isOpen}
      onClose={() => ss.setOpen(false)}
      // snapPoints={[600, 400, 100, 0]}
      // initialSnap={1}
      className={ss.isOpen ? "sheet-background" : ""}
      detent="content-height"
    >
      <Sheet.Container
        style={{ backgroundColor: "#f9fafc" }}
        className="sheetc"
      >
        <Sheet.Header />
        <Sheet.Content>
          <Text mt={-2} fontWeight={600} textAlign={"center"}>
            New Task Todo
          </Text>
          <Box p={5}>
            <Divider my={5} mx="auto" borderColor="blackAlpha.600" />
            <form
              onSubmit={(event) => {
                event.preventDefault();
                if (
                  todoRef.current &&
                  todoRef.current.value &&
                  dateRef.current &&
                  dateRef.current.value
                ) {
                  addTodo.mutate({
                    _id: "first",
                    name: todoRef.current.value,
                    deadline: new Date(dateRef.current.value),
                  });
                  ss.setOpen(false);
                }
              }}
            >
              <FormControl>
                <FormLabel>Task Title</FormLabel>
                <Input
                  ref={todoRef}
                  bg="#eff3f4"
                  borderColor="#eff3f4"
                  borderWidth="1px"
                  _focus={{ borderColor: "#eff3f4" }}
                  placeholder="Enter task title"
                  _placeholder={{ color: "gray.500" }}
                />
              </FormControl>
              <FormControl my={5}>
                <FormLabel>Task Date and Time</FormLabel>
                <Input
                  ref={dateRef}
                  type="datetime-local"
                  bg="#eff3f4"
                  _placeholder={{ color: "gray.500" }}
                />
              </FormControl>
              <HStack mt={10}>
                <Button
                  width="100%"
                  colorScheme="messenger"
                  variant="outline"
                  onClick={() => ss.setOpen(false)}
                >
                  Cancel
                </Button>
                <Button width="100%" colorScheme="messenger" type="submit">
                  Create
                </Button>
              </HStack>
            </form>
          </Box>
          {/* <div style={{ height: 200 }}>Some content</div> */}
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
};

export default TaskForm;
