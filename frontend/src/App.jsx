import React from "react";
import { Box, ChakraProvider, Heading } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRoutes from "./route/Route";
import Navbar from "./components/NavBar";
function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Box>
          <Navbar />
          <AppRoutes />
        </Box>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
