import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  Spacer,
  Divider,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const schema = yup.object().shape({
  heading: yup.string().required("Heading is required"),
  name: yup.string().required("Name is required"),
  blog: yup.string().required("Blog is required"),
});

const EditBlogs = ({ isOpen, onClose, blog }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      heading: blog?.heading || "",
      name: blog?.name || "",
      blog: blog?.blog || "",
    },
  });

  const queryClient = useQueryClient();

  // Define the mutation for updating the blog
  const updateBlog = async (updatedData) => {
    const { data } = await axios.put(
      `http://localhost:3000/posts/updatePosts/${blog._id}`,
      updatedData
    );
    return data;
  };

  const mutation = useMutation({
    mutationFn: updateBlog,
    onSuccess: () => {
      // Invalidate and refetch the blog data after successful update
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast.success("Blog updated successfully");
      onClose(); // Close the drawer after successful update
    },
    onError: () => {
      toast.error("Error updating blog");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data); // Trigger the update mutation
  };

  return (
    <Drawer placement={"right"} onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">Edit Blog</DrawerHeader>
        <DrawerBody>
          {blog && (
            <form onSubmit={handleSubmit(onSubmit)} id="my-form">
              {/* Heading Field */}
              <FormControl isInvalid={errors.heading}>
                <FormLabel>Title</FormLabel>
                <Input type="text" {...register("heading")} />
                <FormErrorMessage>{errors.heading?.message}</FormErrorMessage>
              </FormControl>

              {/* Name Field */}
              <FormControl isInvalid={errors.name}>
                <FormLabel>Name</FormLabel>
                <Input type="text" {...register("name")} />
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
              </FormControl>

              {/* Blog Field */}
              <FormControl isInvalid={errors.blog}>
                <FormLabel>Blog</FormLabel>
                <Textarea {...register("blog")} />
                <FormErrorMessage>{errors.blog?.message}</FormErrorMessage>
              </FormControl>
            </form>
          )}
        </DrawerBody>
        <Divider />
        <DrawerFooter>
          <Box w="100%" display="flex" justifyContent="space-between">
            <Button onClick={onClose}>Cancel</Button>
            <Spacer />
            <Button type="submit" form="my-form" colorScheme="blue">
              Save
            </Button>
          </Box>
        </DrawerFooter>
      </DrawerContent>
      <Toaster position="bottom-right" />
    </Drawer>
  );
};

export default EditBlogs;
