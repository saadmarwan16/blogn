import { AspectRatio, Box } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import Image from "next/image";

interface CustomImageProps {
  ratio: number;
  width: string | number;
  borderRadius: string | number;
  src: string;
}

const CustomImage: FunctionComponent<CustomImageProps> = ({
  borderRadius,
  ratio,
  src,
  width,
}) => {
  return (
    <AspectRatio ratio={ratio} width={width}>
      <Box borderRadius={borderRadius}>
        <Image src={src} layout="fill" alt="Profile" />
      </Box>
    </AspectRatio>
  );
};

export default CustomImage;
