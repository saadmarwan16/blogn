import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { SubmitHandler, useForm } from "react-hook-form";
import Layout from "../../components/Layout";
import { useHeadingSize } from "../../lib/hooks/breakpointSizes";

interface NewPostProps {}

interface IPostInput {
  // id: string;
  title: string;
  content: string;
  heartCount: number;
  published: boolean;
  // imageUrl: string;
}

const NewPost: NextPage<NewPostProps> = () => {
  const headingSize = useHeadingSize();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPostInput>();

  // id: string;
  // imageUrl: string;
  // userImageUrl: string;
  // userDisplayName: string;
  // content: string;
  // createdAt: any;
  // heartCount: number;
  // published: boolean;
  // slug: string;
  // title: string;
  // uid: string;
  // updatedAt: any;
  // username: string;

  const formSubmitHandler: SubmitHandler<IPostInput> = (data: IPostInput) => {};

  return (
    <Layout>
      <Heading mb={{ base: 3, md: 6 }} size={headingSize}>
        New post
      </Heading>

      <form onSubmit={handleSubmit(formSubmitHandler)}>
        <FormControl isInvalid={!!errors.title}>
          <FormLabel htmlFor="Enter password again">Title</FormLabel>
          <Input
            placeholder="Enter post title"
            {...register("title")}
            type="text"
            borderColor="gray.300"
            focusBorderColor="primary.500"
            variant="filled"
          />
          <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
        </FormControl>
      </form>
    </Layout>
  );
};

export default NewPost;
