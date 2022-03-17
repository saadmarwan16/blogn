import { useBreakpointValue } from "@chakra-ui/react";

export const useHeadingSize = () =>
  useBreakpointValue({ base: "lg", sm: "xl" });

export const useProfileSize = () =>
  useBreakpointValue({ base: "md", md: "lg", lg: "xl" });
