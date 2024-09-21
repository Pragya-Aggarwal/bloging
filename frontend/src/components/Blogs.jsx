import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiLike, BiShare, BiChat } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  useDisclosure,
  SimpleGrid,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import EditBlogs from "./EditBlogs";
import axios from "axios";

const Blogs = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/posts/allposts")
      .then((response) => setBlogs(response.data))
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

  const handleEditClick = (blog) => {
    setSelectedBlog(blog);
    onOpen();
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/posts/deletePosts/${id}`);
      setBlogs(blogs.filter(blog => blog.id !== id)); // Update state after deletion
      console.log("Blog deleted successfully");
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <Box>
      {isOpen && (
        <EditBlogs
          isOpen={isOpen}
          onClose={onClose}
          blog={selectedBlog}
        />
      )}
      <Box mt={"20px"}>
        <Heading textAlign={"center"} as="h2">
          Blogs
        </Heading>
        <SimpleGrid columns={[1, 2, 3]} spacing="20px" mt="20px" px="20px">
          {blogs?.map((item, index) => (
            <Card key={index} maxW="md">
              <CardHeader>
                <Flex spacing="4">
                  <Flex flex="2" gap="4" alignItems="center" flexWrap="wrap">
                    <IconButton
                      variant="ghost"
                      colorScheme="gray"
                      fontSize={"45px"}
                      aria-label="user"
                      icon={<FaUserCircle />}
                    />
                    <Box>
                      <Heading size="sm">{item?.heading}</Heading>
                      <Text>{item?.name}</Text>
                    </Box>
                  </Flex>
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      variant="ghost"
                      colorScheme="gray"
                      aria-label="See menu"
                      icon={<BsThreeDotsVertical />}
                    />
                    <MenuList>
                      <MenuItem onClick={() => handleEditClick(item)}>Edit Blog</MenuItem>
                      <MenuDivider />
                      <MenuItem onClick={() => handleDeleteClick(item._id)}>Delete Blog</MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>
              </CardHeader>
              <CardBody>
                <Text>{item?.blog}</Text>
              </CardBody>
              <CardFooter
                justify="space-between"
                flexWrap="wrap"
                sx={{
                  "& > button": {
                    minW: "36px",
                  },
                }}
              >
                <Button flex="1" variant="ghost" leftIcon={<BiLike />}>
                  Like
                </Button>
                <Button flex="1" variant="ghost" leftIcon={<BiChat />}>
                  Comment
                </Button>
                <Button flex="1" variant="ghost" leftIcon={<BiShare />}>
                  Share
                </Button>
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Blogs;
