/* eslint-disable react/no-children-prop */
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Metatags from "../../components/Metatags";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../../lib/contexts/AuthContext";

interface LoginProps {}

interface ILoginInput {
  email: string;
  password: string;
}

const schema = yup
  .object({
    email: yup
      .string()
      .email("Field must be a valid email")
      .required("Field is required"),
    password: yup
      .string()
      .required("Field is required")
      .min(8, "Must be 8 or more characters"),
  })
  .required();

const Login: NextPage<LoginProps> = () => {
  const router = useRouter();
  const {
    user,
    username,
    loginWithGoogle: [signInWithGoogle],
    loginWithEmailAndPassword: [
      signInWithEmailAndPassword,
      _,
      emailAndPasswordSignInLoading,
      error,
    ],
    sendEmailVerification: [sendEmailVerificationFn],
  } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginInput>({ resolver: yupResolver(schema) });

  const formSubmitHandler: SubmitHandler<ILoginInput> = (data: ILoginInput) => {
    // console.log(data.email);
    // console.log(data.password);
    signInWithEmailAndPassword(data.email, data.password);
  };

  if (user && username) router.push("/");

  return (
    <>
      <Metatags title="Sign in" />
      <VStack
        px={{ base: 4, sm: 8, md: 16, lg: 24 }}
        py={{ base: 2, sm: 4, md: 6, lg: 8 }}
        minH="100vh"
      >
        <VStack justifyContent="center" flexGrow="1" gap={12} w={{ sm: 400 }}>
          <VStack>
            <Heading>Welcome Back!</Heading>
            <Text color="gray.500">Please sign in to your account</Text>
          </VStack>
          <form
            onSubmit={handleSubmit(formSubmitHandler)}
            style={{ width: "100%" }}
          >
            <VStack gap={5}>
              <FormControl isInvalid={!!errors.email}>
                <FormLabel htmlFor="Enter email address">
                  Email address
                </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<Icon as={MdEmail} color="gray.300" />}
                  />
                  <Input
                    placeholder="Enter email address"
                    {...register("email")}
                    type="text"
                    borderColor="gray.300"
                    focusBorderColor="primary.500"
                    variant="filled"
                  />
                </InputGroup>
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.password}>
                <FormLabel htmlFor="Enter your password">Password</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<Icon as={RiLockPasswordFill} color="gray.300" />}
                  />
                  <Input
                    placeholder="Enter your password"
                    {...register("password")}
                    type="password"
                    borderColor="gray.300"
                    focusBorderColor="primary.500"
                    variant="filled"
                  />
                </InputGroup>
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </FormControl>
            </VStack>
            <VStack mt={12}>
              <Button
                colorScheme="secondary"
                type="submit"
                isFullWidth
                isLoading={emailAndPasswordSignInLoading}
                loadingText="Logging in"
              >
                Login
              </Button>
              <Button
                leftIcon={<Icon as={FcGoogle} />}
                variant="outline"
                colorScheme="secondary"
                isFullWidth
                onClick={() => signInWithGoogle()}
              >
                Sign in With Google
              </Button>
              <Text textAlign="center" color="gray.500">
                Don&apos;t have an accout?
                <Link href="/auth/signup" passHref>
                  <Text
                    display="inline-block"
                    color="secondary.500"
                    fontWeight="bold"
                    _hover={{ color: "secondary.700" }}
                    ml={1}
                    as="a"
                  >
                    Register
                  </Text>
                </Link>
              </Text>
            </VStack>
          </form>
        </VStack>
      </VStack>
    </>
  );
};

export default Login;
