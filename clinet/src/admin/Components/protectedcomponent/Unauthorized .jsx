import React from 'react';
import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgGradient="linear(to-r, teal.400, blue.500)" // Gradient background
      color="white"
      textAlign="center"
    >
      <VStack spacing={6}>
        <Heading as="h1" size="2xl">
          403 - Unauthorized Access
        </Heading>
        <Text fontSize="lg" maxW="md">
          You do not have permission to view this page.
        </Text>
        <Button
          colorScheme="teal"
          size="lg"
          onClick={() => navigate('/')} // Redirect to login page
        >
          Go to Home
        </Button>
      </VStack>
    </Box>
  );
};

export default Unauthorized;
