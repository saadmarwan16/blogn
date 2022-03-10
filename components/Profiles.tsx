import {
  Avatar,
  Box,
  VStack,
  Text,
  useBreakpointValue,
  HStack,
  Flex,
} from "@chakra-ui/react";
import Link from "next/link";
import { FunctionComponent } from "react";

interface ProfilesProps {}

const Profiles: FunctionComponent<ProfilesProps> = () => {
  const profileSize = useBreakpointValue({ base: "md", md: "lg", lg: "xl" });

  return (
    <Flex
      mb={16}
      gap={2}
      p={4}
      scrollSnapType="inline"
      scrollBehavior={"auto"}
      overflowX="scroll"
    >
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
        <Link key={num} href="#">
          <a>
            <Box display="inline-block">
              <VStack
                borderColor="primary.600"
                _hover={{
                  borderColor: "primary.800",
                  textColor: "primary.600",
                }}
              >
                <Box
                  border="1px"
                  borderColor="inherit"
                  borderRadius={10}
                  p={{ base: 1, md: 2 }}
                >
                  <Avatar
                    src="/logo.png"
                    borderRadius={10}
                    size={profileSize}
                  />
                </Box>
                <Text lineHeight={0.5} color="inherit" noOfLines={1} pb={2}>
                  Marwan
                  {/* Marwanfjkajfa */}
                </Text>
              </VStack>
            </Box>
          </a>
        </Link>
      ))}
    </Flex>
  );
};

export default Profiles;
