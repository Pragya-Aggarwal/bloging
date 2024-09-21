import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    Textarea
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
  
  const schema = yup.object().shape({
    heading: yup.string().required("heading is required"),
    name: yup.string().required("name is required"),
    blog: yup.string().required("Blog is required"),
  });
  
  const BlogsAddForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      name: "",
      heading: "",
      blog: ""
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    // Axios POST request to submit the form data
    axios
      .post("http://localhost:3000/posts", data)
      .then((response) => {
        console.log("Success:", response.data);  // Handle success response
        reset();  // Reset the form to default values
      })
      .catch((error) => {
        console.error("Error submitting the form:", error);  // Handle error response
      });
  };
  
    return (
        <Box  w={"700px"} mx={"auto"}>
            <Heading textAlign={"center"} as={"h1"}>Add Blogs</Heading>
            <form onSubmit={handleSubmit(onSubmit)} id="my-form">
              {/* heading Field */}
              <FormControl isInvalid={errors.heading}>
                <FormLabel>Title</FormLabel>
                <Input type="text" {...register("heading")} />
                <FormErrorMessage>{errors.heading?.message}</FormErrorMessage>
              </FormControl>
  
              {/* name Field */}
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
              <Button type="submit" mt={4} colorScheme="blue">
     Add Blogs
      </Button>
            </form>
          </Box>
    );
  };
  
  export default BlogsAddForm;
  