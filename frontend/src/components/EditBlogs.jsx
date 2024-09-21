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
  
    const onSubmit = (data) => {
      console.log(data);
      axios
        .put(`http://localhost:3000/posts/updatePosts/${blog._id}`, data) // Use the blog ID to update
        .then((response) => {
          console.log("Blog updated:", response.data);
          onClose(); // Close the drawer after successful update
        })
        .catch((error) => {
          console.error("Error updating blog:", error);
        });
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
      </Drawer>
    );
  };
  
  export default EditBlogs;
  