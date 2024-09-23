import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Button,
  Heading,
  useToast,
  Divider,
} from "@chakra-ui/react";
import UserDetailForm from "./UserDetailForm";
import axios from "axios";

const fetchUsers = async () => {
  const { data } = await axios.get("http://localhost:3000/users/users");
  return data;
};

function UsersTable() {
  const [formOpen, setFormOpen] = useState(false);
  const toast = useToast();

  const { data: users = [], isError } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (isError) {
    toast({
      title: "Error fetching users.",
      description: "Something went wrong while fetching users.",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  }

  return (
    <Box w={"90%"} maxW="700px" mx={"auto"} mt={"20px"} p={5} borderWidth={1} borderRadius="md" boxShadow="lg">
      <Heading textAlign={"center"} as={"h1"} mb={4}>
        User List
      </Heading>
      <Divider mb={4} />
      {formOpen ? (
        <UserDetailForm setFormOpen={setFormOpen} />
      ) : (
        <>
          <TableContainer>
            <Table variant="striped" colorScheme="gray">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th isNumeric>Age</Th>
                </Tr>
              </Thead>
              <Tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <Tr key={user.id}>
                      <Td>{user.name}</Td>
                      <Td>{user.email}</Td>
                      <Td isNumeric>{user.age}</Td>
                    </Tr>
                  ))
                ) : (
                  <Tr>
                    <Td colSpan={3} textAlign="center">No users found</Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </TableContainer>
          <Box mt={"20px"} textAlign="center">
            <Button
              colorScheme="blue"
              onClick={() => setFormOpen(true)}
              size="lg"
              borderRadius="md"
              boxShadow="md"
              _hover={{ boxShadow: "lg" }}
            >
              Add New User
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}

export default UsersTable;
