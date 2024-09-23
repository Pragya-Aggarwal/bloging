import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiLike, BiShare, BiChat } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Function to fetch blogs
const fetchBlogs = async () => {
  const { data } = await axios.get("http://localhost:3000/posts/allposts");
  return data;
};

// Function to delete a blog
const deleteBlog = async (id) => {
  await axios.delete(`http://localhost:3000/posts/deletePosts/${id}`);
};

const Blogs = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedBlog, setSelectedBlog] = useState(null);
  const queryClient = useQueryClient();

  // Use React Query to fetch blogs
  const { data: blogs, isLoading, isError } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });

  // Use React Query for deleting a blog
  const mutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast.success("Blog deleted successfully");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const handleEditClick = (blog) => {
    setSelectedBlog(blog);
    onOpen();
  };

  const handleDeleteClick = (id) => {
    mutation.mutate(id);
  };

  if (isLoading) return <Text textAlign="center">Loading...</Text>;
  if (isError) return <Text textAlign="center">Something went wrong...</Text>;

  return (
    <Box>
      {isOpen && (
        <EditBlogs isOpen={isOpen} onClose={onClose} blog={selectedBlog} />
      )}
      <Box mt={"20px"}>
        <Heading textAlign={"center"} as="h2" mb={6}>
          Blogs
        </Heading>
        <SimpleGrid columns={[1, 2, 3]} spacing="20px" mt="20px" px="20px">
          {blogs?.map((item, index) => (
            <Card key={index} maxW="md" borderWidth={1} borderRadius="lg" boxShadow="lg">
              <CardHeader>
                <Flex spacing="4" alignItems="center">
                  <Flex flex="2" gap="4" alignItems="center">
                    <IconButton
                      variant="ghost"
                      colorScheme="gray"
                      fontSize={"45px"}
                      aria-label="user"
                      icon={<FaUserCircle />}
                    />
                    <Box>
                      <Heading size="sm">{item?.heading}</Heading>
                      <Text fontSize="sm" color="gray.600">{item?.name}</Text>
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
                <Button flex="1" variant="ghost" leftIcon={<BiLike />} colorScheme="teal">
                  Like
                </Button>
                <Button flex="1" variant="ghost" leftIcon={<BiChat />} colorScheme="teal">
                  Comment
                </Button>
                <Button flex="1" variant="ghost" leftIcon={<BiShare />} colorScheme="teal">
                  Share
                </Button>
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      </Box>
      <Toaster position="bottom-right" />
    </Box>
  );
};

export default Blogs;
