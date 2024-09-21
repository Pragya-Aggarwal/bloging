import React from "react";
import {
  Box,
  Flex,
  HStack,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4} >
      <Flex h={16} alignItems={"center"} justifyContent={"end"}>
        <HStack spacing={8} alignItems={"center"}>
          {/* Links for larger screens */}
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            <Link
              px={2}
              py={1}
              rounded={"md"}
              _hover={{
                textDecoration: "none",
                bg: useColorModeValue("gray.200", "gray.700"),
              }}
              href={"/"}
            >
              Blog
            </Link>
            <Link
              px={2}
              py={1}
              rounded={"md"}
              _hover={{
                textDecoration: "none",
                bg: useColorModeValue("gray.200", "gray.700"),
              }}
              href={"/addBlogs"}
            >
              Add Blogs
            </Link>
            <Link
              px={2}
              py={1}
              rounded={"md"}
              _hover={{
                textDecoration: "none",
                bg: useColorModeValue("gray.200", "gray.700"),
              }}
              href={"/user"}
            >
              User
            </Link>
          </HStack>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
