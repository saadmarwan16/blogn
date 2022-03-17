import { Avatar, Box, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { FunctionComponent } from "react";
import { useProfileSize } from "../lib/hooks/breakpointSizes";

interface ProfilesProps {}

const Profiles: FunctionComponent<ProfilesProps> = () => {
  const profileSize = useProfileSize();

  return (
    <Flex mb={16} gap={{ base: 2, sm: 3, md: 4 }} py={4} overflowX="auto">
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
        <Link key={num} href="#">
          <a>
            <Box
              display="inline-block"
              border="1px"
              borderColor="primary.600"
              borderRadius={10}
              p={{ base: 1, md: 2 }}
              _hover={{
                borderColor: "primary.800",
              }}
            >
              <Avatar src="/logo.png" borderRadius={10} size={profileSize} />
            </Box>
          </a>
        </Link>
      ))}
    </Flex>
  );
};

export default Profiles;
