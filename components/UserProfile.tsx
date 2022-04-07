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
import { FunctionComponent, useContext } from "react";
import { TUser } from "../lib/types";
import { useAuth } from "../lib/contexts/AuthContext";
import { IUserDoc } from "../lib/interfaces";
import { MdLogout } from "react-icons/md";

interface UserProfileProps {
  user: TUser;
  userDoc: IUserDoc;
}

const UserProfile: FunctionComponent<UserProfileProps> = ({
  user,
  userDoc,
}) => {
  const { username: currentUsername, signOut } = useAuth();

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
          <Text color="primary.700" fontStyle="italic" lineHeight="inherit">
            @{userDoc.username}
          </Text>
          <Text fontSize="xl" fontWeight="bold">
            {userDoc.displayName}
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
        {userDoc.username === currentUsername ? (
          <Button
            colorScheme="secondary"
            leftIcon={<Icon as={MdLogout} fontSize={20} w="full" />}
            onClick={() => signOut()}
          >
            Logout
          </Button>
        ) : (
          <Button
            colorScheme="secondary"
            leftIcon={<Icon as={VscAdd} fontSize={20} w="full" />}
          >
            Follow
          </Button>
        )}
      </VStack>
    </>
  );
};

export default UserProfile;
