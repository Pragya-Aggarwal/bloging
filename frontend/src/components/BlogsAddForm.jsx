import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Textarea,
} from "@chakra-ui/react";
import toast, { Toaster } from "react-hot-toast";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Define Yup schema for validation
const schema = yup.object().shape({
  heading: yup.string().required("Heading is required"),
  name: yup.string().required("Name is required"),
  blog: yup.string().required("Blog is required"),
});

const BlogsAddForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      heading: "",
      blog: "",
    },
    resolver: yupResolver(schema),
  });

  const queryClient = useQueryClient();

  // Define mutation for posting the blog
  const addBlog = async (newBlog) => {
    const { data } = await axios.post("http://localhost:3000/posts", newBlog);
    return data;
  };

  const mutation = useMutation({
    mutationFn: addBlog,
    onSuccess: () => {
      toast.success("Blog is successfully added");
      reset(); // Reset the form after successful submission
      queryClient.invalidateQueries({ queryKey: ["blogs"] }); // Optionally refetch blog list
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data); // Trigger the mutation
  };

  return (
    <Box
      w={"400px"}
      mx={"auto"}
      p={5}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
      bg="white"
      mt={10}
    >
      <Heading textAlign={"center"} as={"h1"} mb={4}>
        Add Blogs
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)} id="my-form">
        {/* Heading Field */}
        <FormControl isInvalid={errors.heading} mb={4}>
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            {...register("heading")}
            variant="flushed"
            placeholder="Enter blog title"
          />
          <FormErrorMessage>{errors.heading?.message}</FormErrorMessage>
        </FormControl>

        {/* Name Field */}
        <FormControl isInvalid={errors.name} mb={4}>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            {...register("name")}
            variant="flushed"
            placeholder="Enter your name"
          />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>

        {/* Blog Field */}
        <FormControl isInvalid={errors.blog} mb={4}>
          <FormLabel>Blog</FormLabel>
          <Textarea
            {...register("blog")}
            placeholder="Write your blog content here..."
            resize="none" // Prevent resizing
          />
          <FormErrorMessage>{errors.blog?.message}</FormErrorMessage>
        </FormControl>

        <Button type="submit" mt={4} colorScheme="blue" width="full">
          Add Blog
        </Button>
      </form>
      <Toaster position="bottom-right" />
    </Box>
  );
};

export default BlogsAddForm;
