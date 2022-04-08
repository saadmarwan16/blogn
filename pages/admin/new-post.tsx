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
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { NextPage } from "next";
import { ChangeEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ImageUploader from "../../components/ImageUploader";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import { useAuth } from "../../lib/contexts/AuthContext";
import { storage } from "../../lib/firebase";
import { useHeadingSize } from "../../lib/hooks/breakpointSizes";

interface NewPostProps {}

interface IPostInput {
  // id: string;
  title: string;
  content: string;
  // heartCount: number;
  imageUrl: string;
  published: boolean;
}

const NewPost: NextPage<NewPostProps> = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState<string | null>(null);
  const headingSize = useHeadingSize();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPostInput>();
  const { user } = useAuth();

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
    // console.log(data.title);
    // console.log(data.content);
    // console.log(data.published);
    console.log(data.imageUrl);
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

    uploadTask.on("state_changed", (snapshot) => {
      const pct = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgress(pct);

      uploadTask.then((_) =>
        getDownloadURL(imageRef).then((url) => {
          setDownloadURL(url);
          setUploading(false);
        })
      );
    });
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

          <div className="box">
            <Loader show={uploading} />
            {uploading && <h3>{progress}%</h3>}

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
          </div>

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
