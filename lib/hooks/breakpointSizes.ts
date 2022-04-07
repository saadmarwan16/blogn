import { useBreakpointValue } from "@chakra-ui/react";

export const useHeadingSize = () =>
  useBreakpointValue({ base: "md", sm: "lg" });

export const useProfileSize = () =>
  useBreakpointValue({ base: "md", md: "lg", lg: "xl" });
