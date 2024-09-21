import React from 'react';
import UsersTable from './components/UsersTable';
import { Box, ChakraProvider, Heading } from '@chakra-ui/react'
import Blogs from './components/Blogs';
import AppRoutes from './route/Route';
import Navbar from './components/NavBar';
function App() {
  return (
    // <div>
    //   <h1>User List</h1>
    //   <UsersTable />
    // </div>
    <ChakraProvider>
      <Box  >
<Navbar/>
      <AppRoutes />
      </Box>
      
    </ChakraProvider>
  );
}

export default App;
