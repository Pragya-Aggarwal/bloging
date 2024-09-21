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
import axios from "axios"; // Make sure axios is installed and imported
// Define Yup schema for validation
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
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

  

const onSubmit = (data) => {
  console.log(data);
  setFormOpen(false);

  // Axios POST request
  axios.post("http://localhost:3000/users/users", data)
    .then((response) => {
      console.log(response.data);  // Handle success response
    })
    .catch((error) => {
      console.error("There was an error submitting the form!", error);  // Handle error response
    });
};


  return (
    <Box  w={"700px"} mx={"auto"}>
      <Heading textAlign={"center"} as={"h1"}>Add User Details</Heading>
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Name Field */}
      <FormControl isInvalid={errors.name}>
        <FormLabel>Name</FormLabel>
        <Input type="text" {...register("name")} />
        <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
      </FormControl>

      {/* Email Field */}
      <FormControl isInvalid={errors.email}>
        <FormLabel>Email</FormLabel>
        <Input type="text" {...register("email")} />
        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
      </FormControl>

      {/* Age Field */}
      <FormControl isInvalid={errors.age}>
        <FormLabel>Age</FormLabel>
        <Input type="number" {...register("age")} />
        <FormErrorMessage>{errors.age?.message}</FormErrorMessage>
      </FormControl>

      {/* Submit Button */}
      <Button type="submit" mt={4} colorScheme="blue">
        Submit Details
      </Button>
    </form>
    </Box>
  );
};

export default UserDetailForm;
