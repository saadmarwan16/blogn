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
import { FaUserAlt } from "react-icons/fa";
import debounce from "lodash.debounce";
import { doc, getDoc, writeBatch } from "firebase/firestore";
import { firestore } from "../../lib/firebase";

interface SignUpProps {}

interface ISignUpInput {
  email: string;
  username: string;
  password: string;
  confirm: string;
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
    confirm: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  })
  .required();

const usernameSchema = yup
  .object({
    username: yup
      .string()
      .required("Field is required")
      .min(3, "Must be 3 or more characters")
      .matches(
        /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
        "Must consist of only alphanumeric characters with at most 15 characters"
      )
      .test(
        "Check username availability",
        "This username is taken",
        async (username) => {
          return false;
        }
        // debounce(async (username) => {
        //   if (!username) return;

        //   // return getDoc(doc(firestore, `usernames/${username}`)).then((ref) => !ref.exists()).catch((e) => {return;})

        //   try {
        //     const ref = await getDoc(doc(firestore, `usernames/${username}`));
        //     console.log("doesUsernameExist:", ref.exists());
        //     return !ref.exists();
        //   } catch (e) {
        //     console.log('error')
        //     return;
        //   }
        // }, 500)() ?? false;
        // async (username) => {

        //   console.log(await checkIsUsernameValid)
        //   return await checkIsUsernameValid ?? false;
        //   // const isUsernameValid =
        //   //   await debounce(async () => {
        //   //     if (!username) return;

        //   //     return getDoc(doc(firestore, `usernames/${username}`)).then((ref) => !ref.exists()).catch((e) => {return;})

        //   //     // try {
        //   //     //   const ref = await getDoc(doc(firestore, `usernames/${username}`));
        //   //     //   console.log('doesUsernameExist:', ref.exists());
        //   //     //   return !ref.exists();
        //   //     // } catch (e) {
        //   //     //   return;
        //   //     // }
        //   //   }, 500)() ?? false;

        //   // console.log("isUsernameValid:", isUsernameValid);
        //   // return isUsernameValid;
        // }
      ),
  })
  .required();

const SignUp: NextPage<SignUpProps> = () => {
  const router = useRouter();
  const {
    user,
    username,
    loginWithGoogle: [registerWithGoogle],
    registerWithEmailAndPassword: [signUpWithEmailAndPassword, _, loading],
    sendEmailVerification: [sendEmailVerificationFn],
  } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpInput>({
    resolver: yupResolver(user ? usernameSchema : schema),
  });

  const formSubmitHandler: SubmitHandler<ISignUpInput> = (
    data: ISignUpInput
  ) => {
    signUpWithEmailAndPassword(data.email, data.password)
      // .then((_) => {
      //   sendEmailVerificationFn()
      //     .then((_) => console.log("Resolved"))
      //     .catch((e) => console.log(e.message));
      // })
      .catch((e) => {});
  };

  const usernameFormSubmitHandler: SubmitHandler<ISignUpInput> = async (
    data: ISignUpInput
  ) => {
    const userDoc = doc(firestore, `users/${user?.uid}`);
    const usernameDoc = doc(firestore, `usernames/${data.username}`);
    const batch = writeBatch(firestore);
    batch.set(userDoc, {
      username: data.username,
      photoUrl: user?.photoURL,
      displayName: user?.displayName,
    });
    batch.set(usernameDoc, { uid: user?.uid });
    await batch.commit();
  };

  if (user && username) router.push("/");

  return (
    <>
      <Metatags title="Sign up" />
      <VStack
        px={{ base: 4, sm: 8, md: 16, lg: 24 }}
        py={{ base: 2, sm: 4, md: 6, lg: 8 }}
        minH="100vh"
      >
        <VStack justifyContent="center" flexGrow="1" gap={12} w={{ sm: 400 }}>
          <VStack>
            <Heading>Create new account</Heading>
            <Text color="gray.500">Please fill in the form to continue</Text>
          </VStack>
          {!user && !username ? (
            <form
              onSubmit={handleSubmit(formSubmitHandler)}
              style={{ width: "100%" }}
            >
              <VStack gap={5}>
                <FormControl isInvalid={!!errors.email}>
                  <FormLabel htmlFor="Enter your email address">
                    Email address
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<Icon as={MdEmail} color="gray.300" />}
                    />
                    <Input
                      placeholder="Enter your email address"
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
                  <FormLabel htmlFor="Choose your password">Password</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={
                        <Icon as={RiLockPasswordFill} color="gray.300" />
                      }
                    />
                    <Input
                      placeholder="Choose your password"
                      {...register("password")}
                      type="password"
                      borderColor="gray.300"
                      focusBorderColor="primary.500"
                      variant="filled"
                    />
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.password?.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.confirm}>
                  <FormLabel htmlFor="Enter password again">
                    Confirm password
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={
                        <Icon as={RiLockPasswordFill} color="gray.300" />
                      }
                    />
                    <Input
                      placeholder="Enter password again"
                      {...register("confirm")}
                      type="password"
                      borderColor="gray.300"
                      focusBorderColor="primary.500"
                      variant="filled"
                    />
                  </InputGroup>
                  <FormErrorMessage>{errors.confirm?.message}</FormErrorMessage>
                </FormControl>
              </VStack>
              <VStack mt={12}>
                <Button
                  colorScheme="secondary"
                  type="submit"
                  isFullWidth
                  isLoading={loading}
                  loadingText="Registering user"
                >
                  Register
                </Button>
                <Button
                  leftIcon={<Icon as={FcGoogle} />}
                  variant="outline"
                  colorScheme="secondary"
                  isFullWidth
                  onClick={() => registerWithGoogle()}
                >
                  Sign up With Google
                </Button>
                <Text textAlign="center" color="gray.500">
                  Have an accout?
                  <Link href="/auth/login" passHref>
                    <Text
                      display="inline-block"
                      color="secondary.500"
                      fontWeight="bold"
                      _hover={{ color: "secondary.700" }}
                      ml={1}
                      as="a"
                    >
                      Login
                    </Text>
                  </Link>
                </Text>
              </VStack>
            </form>
          ) : (
            <form
              style={{ width: "100%" }}
              onSubmit={handleSubmit(usernameFormSubmitHandler)}
            >
              <FormControl isInvalid={!!errors.username}>
                <FormLabel htmlFor="Choose your username">Username</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<Icon as={FaUserAlt} color="gray.300" />}
                  />
                  <Input
                    placeholder="Choose your username"
                    {...register("username")}
                    borderColor="gray.300"
                    focusBorderColor="primary.500"
                    variant="filled"
                  />
                </InputGroup>
                <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
              </FormControl>
              <Button
                colorScheme="secondary"
                type="submit"
                isFullWidth
                isLoading={loading}
                loadingText="Creating user"
                // disabled={!!errors.username}
                mt={12}
              >
                Choose
              </Button>
            </form>
          )}
        </VStack>
      </VStack>
    </>
  );
};

export default SignUp;
