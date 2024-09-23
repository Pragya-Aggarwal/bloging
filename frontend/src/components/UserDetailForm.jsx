import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Define Yup schema for validation
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  age: yup
    .number()
    .typeError("Age must be a number")
    .positive("Age must be a positive number")
    .integer("Age must be an integer")
    .required("Age is required"),
});

const UserDetailForm = ({ setFormOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const queryClient = useQueryClient();

  // Define mutation for posting user details
  const addUser = async (userData) => {
    const { data } = await axios.post("http://localhost:3000/users/users", userData);
    return data;
  };

  const mutation = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      toast.success("User Detail saved successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setFormOpen(false);
    },
    onError: () => {
      toast.error("There was an error submitting the user detail");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <Box
    mt={"20px"}
      w={"400px"}
      mx={"auto"}
      p={5}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
      bg="white"
    >
      <Heading textAlign={"center"} as={"h1"} mb={4}>
        Add User Details
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name Field */}
        <FormControl isInvalid={errors.name} mb={4}>
          <FormLabel>Name</FormLabel>
          <Input type="text" {...register("name")} variant="flushed" placeholder="Enter your name" />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>

        {/* Email Field */}
        <FormControl isInvalid={errors.email} mb={4}>
          <FormLabel>Email</FormLabel>
          <Input type="text" {...register("email")} variant="flushed" placeholder="Enter your email" />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        {/* Age Field */}
        <FormControl isInvalid={errors.age} mb={4}>
          <FormLabel>Age</FormLabel>
          <Input type="number" {...register("age")} variant="flushed" placeholder="Enter your age" />
          <FormErrorMessage>{errors.age?.message}</FormErrorMessage>
        </FormControl>

        {/* Submit Button */}
        <Button type="submit" mt={4} colorScheme="blue" width="full">
          Submit Details
        </Button>
      </form>
      <Toaster position="bottom-right" />
    </Box>
  );
};

export default UserDetailForm;
