import { Icon, VStack, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { MdModeEditOutline } from "react-icons/md";

interface SinglePostLargeEditProps {}

export const SinglePostLargeEdit: FunctionComponent<
  SinglePostLargeEditProps
> = () => {
  return (
    <Icon
      as={MdModeEditOutline}
      color="primary.500"
      w={8}
      h={8}
      _hover={{ cursor: "pointer", color: "primary.700" }}
    />
  );
};
