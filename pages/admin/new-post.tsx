import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Checkbox,
  Button,
  Stack,
  Progress,
  VStack,
  Text,
} from "@chakra-ui/react";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Layout from "../../components/Layout";
import Metatags from "../../components/Metatags";
import { useAuth } from "../../lib/contexts/AuthContext";
import { firestore, serverTimestamp, storage } from "../../lib/firebase";
import { useHeadingSize } from "../../lib/hooks/breakpointSizes";

interface NewPostProps {}

interface IPostInput {
  title: string;
  content: string;
  published: boolean;
}

const NewPost: NextPage<NewPostProps> = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [postId, setPostId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const headingSize = useHeadingSize();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IPostInput>();
  const { user, username } = useAuth();
  const router = useRouter();

  const formSubmitHandler: SubmitHandler<IPostInput> = (data: IPostInput) => {
    setIsLoading(true);
    const ref = doc(firestore, `users/${user?.uid}/posts/${postId}`);
    updateDoc(ref, {
      id: postId,
      title: data.title,
      content: data.content,
      published: data.published,
      updatedAt: serverTimestamp(),
    }).then((_) => {
      setIsLoading(false);
      reset();
      router.push("/");
    });
  };

  const uploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = Array.from(e.target.files!)[0];
    const extension = file.type.split("/")[1];

    const imageRef = ref(
      storage,
      `uploads/${user?.uid!}/${Date.now()}.${extension}`
    );
    setUploading(true);

    const uploadTask = uploadBytesResumable(imageRef, file);

    uploadTask.on("state_changed", {
      next: (snapshot) => {
        const pct = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(pct);
      },
      complete: () => {
        getDownloadURL(imageRef).then((url) => {
          const ref = collection(firestore, `users/${user?.uid}/posts`);
          addDoc(ref, {
            imageUrl: url,
            userImageUrl: user?.photoURL,
            userDisplayName: user?.displayName,
            createdAt: serverTimestamp(),
            heartCount: 0,
            uid: user?.uid,
            username,
          }).then((docRef) => setPostId(docRef.id));
          setUploading(false);
        });
      },
    });
  };

  return (
    <>
      <Metatags title="New Post" />
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

            <Stack spacing={4}>
              <FormControl>
                <FormLabel htmlFor="Upload image">Upload Image</FormLabel>
                <Input
                  placeholder="Upload image"
                  type="file"
                  accept="image/x-png,image/gif,image/jpeg"
                  borderColor="gray.300"
                  focusBorderColor="primary.500"
                  variant="filled"
                  onChange={uploadFile}
                />
              </FormControl>

              {uploading && (
                <VStack alignItems="end">
                  <Text fontWeight="bold">{progress}%</Text>
                  <Progress
                    colorScheme="primary"
                    size="sm"
                    borderRadius={4}
                    value={progress}
                    hasStripe
                    w="full"
                  />
                </VStack>
              )}
            </Stack>

            <Checkbox defaultChecked {...register("published")}>
              Publish
            </Checkbox>
            <Button
              type="submit"
              variant="solid"
              colorScheme="secondary"
              loadingText="Creating post"
              isLoading={isLoading}
            >
              Create Post
            </Button>
          </Stack>
        </form>
      </Layout>
    </>
  );
};

export default NewPost;
