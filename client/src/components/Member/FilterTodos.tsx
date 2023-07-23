import { Box, HStack, Text, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";
import usePageTitle from "../../hooks/usePageTitle";
import useTodoQueryDashboard from "../../store/todoQueryStore-dashboard";

const FilterTodos = () => {
  const filterMenu = [
    { title: "Overdue Tasks", label: "Overdue", param: "isOverdue" },
    { title: "Today Tasks", label: "Today", param: "isToday" },
    { title: "Tomorrow Tasks", label: "Tomorrow", param: "isTomorrow" },
    { title: "Current Week Tasks", label: "This Week", param: "isThisWeek" },
    { title: "Next Week Tasks", label: "Next Week", param: "isNextWeek" },
    { title: "All Upcoming Tasks", label: "All", param: "all" },
  ];

  const { todoQuery, setDeadline, setPage } = useTodoQueryDashboard();
  const [activeFilter, setFilter] = useState(todoQuery.deadline);
  const textColorMode = useColorModeValue("blackAlpha.500", "whiteAlpha.500");
  const activeFilterCOlor = useColorModeValue(
    "blackAlpha.800",
    "whiteAlpha.900"
  );
  const selectedTitle = filterMenu.find((menu) =>
    menu.param === activeFilter ? menu.title : "Home"
  );
  usePageTitle(selectedTitle?.title!);

  return (
    <Box
      maxW={"800px"}
      overflowX="auto"
      w={["80vw", null, ""]}
      whiteSpace="nowrap"
      minHeight="20px"
    >
      <HStack my="15px" spacing={10}>
        {filterMenu.map((filter, index) => (
          <Text
            cursor="pointer"
            key={index}
            fontSize="10px"
            fontWeight="bold"
            color={
              activeFilter == filter.param ? activeFilterCOlor : textColorMode
            }
            _hover={{
              color: activeFilterCOlor,
            }}
            onClick={() => {
              setDeadline(filter.param);
              setFilter(filter.param);
              setPage(1);
            }}
          >
            {filter.label}
          </Text>
        ))}
      </HStack>
    </Box>
  );
};

export default FilterTodos;
