import { Box, Icon } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaRegCircle } from "react-icons/fa";
import Checking from "../assets/videos/checking.mp4";

const CheckboxVideo: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxClick = () => {
    setIsChecked(!isChecked);
  };

  return (
    <Box position="relative" display="inline-block">
      {!isChecked && (
        <Icon
          as={FaRegCircle}
          onClick={handleCheckboxClick}
          cursor={"pointer"}
          width="24px"
        />
        // <Box boxSize="24px" onClick={handleCheckboxClick} cursor={"pointer"}>
        //   <video src={Unchecking} autoPlay muted />
        // </Box>
      )}
      {isChecked && (
        <Box boxSize="24px" onClick={handleCheckboxClick} cursor={"pointer"}>
          <video src={Checking} autoPlay muted />
        </Box>
      )}
    </Box>
  );
};

export default CheckboxVideo;
