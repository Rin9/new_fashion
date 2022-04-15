import React from "react";
import {
  Flex,
  Image,
  Heading,
  Text,
  NumberInput,
  NumberInputStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  useControllableState,
} from "@chakra-ui/react";

const CartItem = ({ item, handleRemove, toggleAmount }) => {
  // const [value, setValue] = useControllableState({
  //   defaultValue: item?.number,
  // });
  // const [value, setValue] = React.useState(item.number);

  return (
    <Flex direction="row" columnGap="5">
      <Image
        src={item.image}
        boxSize="150px"
        objectFit="cover"
        alt={item.name}
        rounded="lg"
      />
      <Flex direction="column" rowGap="5">
        <Heading variant="hero_h3">{item.name}</Heading>
        <Text variant="text_normal">Size: {item.size}</Text>
        <NumberInput defaultValue={item.number} min={1} max={item.max}>
          <NumberInputField
            onChange={(e) =>
              toggleAmount(item.id, item.size, "change", e.target.value)
            }
          />
          <NumberInputStepper>
            <NumberIncrementStepper
              onClick={() => {
                // setValue((prev) => prev + 1);
                toggleAmount(item.id, item.size, "inc");
              }}
            />
            <NumberDecrementStepper
              onClick={() => {
                // setValue((prev) => prev - 1);
                toggleAmount(item.id, item.size, "dec");
              }}
            />
          </NumberInputStepper>
        </NumberInput>
        <Button onClick={() => handleRemove(item.id, item.size)}>Remove</Button>
      </Flex>
    </Flex>
  );
};

export default CartItem;
