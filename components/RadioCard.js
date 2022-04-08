//this is a radio card component

// chakra ui
import { useRadio, Box, Input } from "@chakra-ui/react";
import React from "react";

const RadioCard = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);
  const input = getInputProps();
  const checkbox = getCheckboxProps();
  return (
    <Box as="label">
      <Input {...input} />
      <Box
        {...checkbox}
        cursor={input["aria-disabled"] ? "not-allowed" : "pointer"}
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        backgroundColor={input["aria-disabled"] ? "#C0C0C0" : "white"}
        _checked={{
          bg: "black",
          color: "white",
          borderColor: "teal.600",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
};

export default RadioCard;
