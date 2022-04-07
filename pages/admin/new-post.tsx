import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Checkbox,
  Button,
  Stack,
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
  // heartCount: number;
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

  const formSubmitHandler: SubmitHandler<IPostInput> = (data: IPostInput) => {
    console.log(data.title);
    console.log(data.content);
    console.log(data.published);
  };

  return (
    <Layout>
      <Heading mb={{ base: 3, md: 6 }} size={headingSize}>
        New post
      </Heading>

      <form onSubmit={handleSubmit(formSubmitHandler)}>
        <Stack gap={4}>
          <FormControl isInvalid={!!errors.title}>
            <FormLabel htmlFor="Enter post title">Title</FormLabel>
            <Input
              placeholder="Enter post title"
              {...register("title", {
                maxLength: { value: 160, message: "Title is too long" },
                minLength: { value: 3, message: "Title is too short" },
                required: { value: true, message: "Title is required" },
              })}
              type="text"
              borderColor="gray.300"
              focusBorderColor="primary.500"
              variant="filled"
            />
            <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.content}>
            <FormLabel htmlFor="Enter post content">Content</FormLabel>
            <Input
              placeholder="Enter post content"
              {...register("content", {
                maxLength: { value: 20000, message: "Content is too long" },
                minLength: { value: 10, message: "Content is too short" },
                required: { value: true, message: "Content is required" },
              })}
              type="text"
              borderColor="gray.300"
              focusBorderColor="primary.500"
              variant="filled"
            />
            <FormErrorMessage>{errors.content?.message}</FormErrorMessage>
          </FormControl>
          <Checkbox defaultChecked {...register("published")}>
            Publish
          </Checkbox>
          <Button type="submit" variant="solid" colorScheme="secondary">
            Create Post
          </Button>
        </Stack>
      </form>
    </Layout>
  );
};

export default NewPost;
