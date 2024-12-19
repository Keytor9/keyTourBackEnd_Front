import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  Box,
  Text,
  Button,
  Spinner,
  useToast,
  VStack,
  HStack,
  Image,
  Input,
  Textarea,
  FormControl,
  FormLabel
} from '@chakra-ui/react';
import AboutUsService from '../../../services/apiservices/AboutUsService';
import BASE_URL from '../../../services/api'

const AboutUsComponent = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const [newEntry, setNewEntry] = useState({ title: '', description: '', image: null });

  // Fetch all About Us entries
  const { data, isLoading, error } = useQuery('aboutUs', AboutUsService.getAllAboutUs);

  // Mutation to delete an About Us entry
  const deleteMutation = useMutation(AboutUsService.deleteAboutUs, {
    onSuccess: () => {
      toast({
        title: 'Deleted Successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      queryClient.invalidateQueries('aboutUs');
    },
    onError: () => {
      toast({
        title: 'Error Deleting',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
  });

  // Mutation to update an About Us entry
  const updateMutation = useMutation(AboutUsService.updateAboutUs, {
    onSuccess: () => {
      toast({
        title: 'Updated Successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      queryClient.invalidateQueries('aboutUs');
    },
    onError: () => {
      toast({
        title: 'Error Updating',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
  });

  // Mutation to create a new About Us entry
  const createMutation = useMutation(AboutUsService.createAboutUs, {
    onSuccess: () => {
      toast({
        title: 'Created Successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      queryClient.invalidateQueries('aboutUs');
      setNewEntry({ title: '', description: '', image: null });
    },
    onError: () => {
      toast({
        title: 'Error Creating',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
  });

  if (isLoading) return <Spinner />;
  if (error) return <Text>Error fetching About Us entries</Text>;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntry((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setNewEntry((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleCreate = () => {
    createMutation.mutate(newEntry);
  };

  return (
    <VStack spacing={4} align="stretch">
      {data?.data?.data?.map((aboutUs) => (
        <Box key={aboutUs._id} p={5} shadow="md" borderWidth="1px" borderRadius="md">
          <HStack justify="space-between" alignItems="center">
            <VStack align="start">
              <Text fontWeight="bold">{aboutUs.title.en}</Text>
              <Text>{aboutUs.description.en}</Text>
              {aboutUs.image && (
                <Image boxSize="150px" objectFit="cover" src={`${BASE_URL}/${aboutUs.image}`} alt={aboutUs.title.en} />
              )}
            </VStack>
            <HStack>
              {/* <Button
                colorScheme="blue"
                onClick={() =>
                  updateMutation.mutate({ id: aboutUs._id, data: { title: { en: 'Updated Title' } } })
                }
              >
                Update
              </Button> */}
              <Button
                colorScheme="red"
                onClick={() => deleteMutation.mutate(aboutUs._id)}
              >
                Delete
              </Button>
            </HStack>
          </HStack>
        </Box>
      ))}

      <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
        <VStack spacing={4} align="stretch">
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              placeholder="Title"
              name="title"
              value={newEntry.title}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder="Description"
              name="description"
              value={newEntry.description}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Image</FormLabel>
            <Input
              type="file"
              name="image"
              onChange={handleFileChange}
            />
          </FormControl>
          <Button colorScheme="green" onClick={handleCreate}>Create</Button>
        </VStack>
      </Box>
    </VStack>
  );
};

export default AboutUsComponent;
