import { ChangeEvent, FormEvent, FunctionComponent } from "react";
import { useState } from "react";
import { auth, storage } from "../lib/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";

interface ImageUploaderProps {}

const ImageUploader: FunctionComponent<ImageUploaderProps> = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState<string | null>(null);

  const uploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = Array.from(e.target.files!)[0];
    const extension = file.type.split("/")[1];

    const imageRef = ref(
      storage,
      `uploads/${auth.currentUser?.uid!}/${Date.now()}.${extension}`
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
    <div className="box">
      {uploading && <div>Loading...</div>}
      {uploading && <h3>{progress}%</h3>}

      {!uploading && (
        <>
          <FormControl>
            {/* <FormControl isInvalid={!!errors.content}> */}
            <FormLabel htmlFor="Upload image">Upload Image</FormLabel>
            <Input
              placeholder="Upload image"
              // {...register("imageUrl", {
              //   required: { value: true, message: "Content is required" },
              // })}
              type="file"
              accept="image/x-png,image/gif,image/jpeg"
              borderColor="gray.300"
              focusBorderColor="primary.500"
              variant="filled"
              onChange={uploadFile}
            />
            {/* <FormErrorMessage>{errors.content?.message}</FormErrorMessage> */}
          </FormControl>
        </>
      )}

      {downloadURL && (
        <code className="upload-snippet">{`![alt](${downloadURL})`}</code>
      )}
    </div>
  );
};

export default ImageUploader;
