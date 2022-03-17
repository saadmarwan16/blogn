import {
  Avatar,
  Flex,
  VStack,
  Text,
  ButtonGroup,
  Button,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { VscAdd } from "react-icons/vsc";
import { FunctionComponent } from "react";
import { user } from "../lib/types";

interface UserProfileProps {
  user: user;
}

const UserProfile: FunctionComponent<UserProfileProps> = ({ user }) => {
  return (
    <>
      <Flex
        alignItems="center"
        justifyContent="center"
        flexDirection={{ base: "column", sm: "row" }}
        gap={4}
      >
        <Avatar src={user?.photoURL ?? "/person.png"} size="xl" />
        <VStack lineHeight="0.85" alignItems={{ base: "center", sm: "start" }}>
          <Text color="primary.700" lineHeight="inherit">
            @marisky
          </Text>
          <Text fontSize="xl" fontWeight="bold">
            Marwan Sa-ad
          </Text>
          <Text fontSize="sm">Joined on Mar 16, 2021</Text>
        </VStack>
      </Flex>
      <VStack alignItems="center" mb={{ base: 20, sm: 28 }}>
        <ButtonGroup colorScheme="secondary" spacing={0} p={6}>
          <Button borderRadius={0} borderLeftRadius="2xl" h={20}>
            <VStack>
              <Text fontSize="3xl">52</Text>
              <Text>Posts</Text>
            </VStack>
          </Button>
          <Button borderRadius={0} h={20}>
            <VStack>
              <Text fontSize="3xl">250</Text>
              <Text>Following</Text>
            </VStack>
          </Button>
          <Button borderRadius={0} h={20} borderRightRadius="2xl">
            <VStack>
              <Text fontSize="3xl">4.5K</Text>
              <Text>Followers</Text>
            </VStack>
          </Button>
        </ButtonGroup>
        <Button
          colorScheme="secondary"
          leftIcon={<Icon as={VscAdd} fontSize={20} w="full" />}
        >
          Follow
        </Button>
      </VStack>
    </>
    // <div className="box-center">
    //   <img
    //     alt="profile"
    //     src={ user?.photoURL ?? "/person.png"}
    //     className="card-img-center"
    //   />
    //   <p>
    //     <i>@{user?.username}</i>
    //   </p>
    //   <h1>{user?.displayName}</h1>
    // </div>
  );
};

export default UserProfile;
