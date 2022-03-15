import { Box } from "@chakra-ui/react";
import { FunctionComponent } from "react";

interface LayoutProps {}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <Box
      px={{ base: 4, sm: 8, md: 16, lg: 24 }}
      py={{ base: 2, sm: 4, md: 6, lg: 8 }}
    >
      {children}
    </Box>
  );
};

export default Layout;
