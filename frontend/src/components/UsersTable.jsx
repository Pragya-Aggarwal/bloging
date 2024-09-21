import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  Button,
  Heading,
} from "@chakra-ui/react";
import UserDetailForm from "./UserDetailForm";

function UsersTable() {
  const [users, setUsers] = useState([]);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
      axios
      .get("http://localhost:3000/users/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, [formOpen]);

  return (
    <Box>
      {formOpen ? (
        <UserDetailForm setFormOpen={setFormOpen} />
      ) : (
        <Box w={"700px"} mx={"auto"}>
                <Heading textAlign={"center"} as={"h1"}>User List</Heading>
          <TableContainer mt="20px">
            <Table variant="striped" colorScheme="grey">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th isNumeric>Age</Th>
                </Tr>
              </Thead>
              <Tbody>
                {users?.length > 0 && users?.map((user, index) => (
                  <Tr key={index}>
                    <Td>{user.name}</Td>
                    <Td>{user.email}</Td>
                    <Td>{user.age}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Box mt={"20px"}>
            <Button
            colorScheme="blue"
              onClick={() => {
                setFormOpen(true);
              }}
            >
              Add New
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default UsersTable;
