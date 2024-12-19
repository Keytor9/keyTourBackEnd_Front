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
import BlogService from '../../../services/apiservices/BlogService';
import BASE_URL from '../../../services/api';

const BlogComponent = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  // Fetch all blog entries
  const { data, isLoading, error } = useQuery('blogs', BlogService.getAllBlogs);

  // State for the new blog
  const [newBlog, setNewBlog] = useState({
    titleEn: '',
    titleAr: 'test',
    descriptionEn: '',
    descriptionAr: 'test',
    image: null,
    imagesThumbnails: null,
  });

  const [isCreating, setIsCreating] = useState(false);

  // Mutation to delete a blog entry
  const deleteMutation = useMutation(BlogService.deleteBlog, {
    onSuccess: () => {
      toast({
        title: 'Blog Deleted Successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      queryClient.invalidateQueries('blogs');
    },
    onError: () => {
      toast({
        title: 'Error Deleting Blog',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBlog((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    setNewBlog((prev) => ({
      ...prev,
      [name]: file,
    }));
  };

  const handleCreate = async () => {
    const myHeaders = new Headers();
    // If your backend requires authentication, include the necessary headers
    // For example:
    // myHeaders.append("Authorization", "Bearer your-token-here");

    const formdata = new FormData();
    formdata.append("title[en]", newBlog.titleEn);
    formdata.append("title[ar]", newBlog.titleAr);
    formdata.append("description[en]", newBlog.descriptionEn);
    formdata.append("description[ar]", newBlog.descriptionAr);
    if (newBlog.image) {
      formdata.append("image", newBlog.image);
    }
    if (newBlog.imagesThumbnails) {
      formdata.append("imagesThumbnails", newBlog.imagesThumbnails);
    }

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    setIsCreating(true);
    try {
      const response = await fetch('http://185.170.198.81/api/blogs', requestOptions);
      const result = await response.json();

      if (response.ok) {
        toast({
          title: 'Blog Created Successfully',
          description: result.message || 'Blog has been posted',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        setNewBlog({
          titleEn: '',
          titleAr: '',
          descriptionEn: '',
          descriptionAr: '',
          image: null,
          imagesThumbnails: null,
        });
        queryClient.invalidateQueries('blogs');
      } else {
        throw new Error(result.message || 'Failed to create blog');
      }
    } catch (error) {
      toast({
        title: 'Error Creating Blog',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsCreating(false);
    }
  };

  if (isLoading) return <Spinner />;
  if (error) return <Text>Error fetching blog entries</Text>;

  return (
    <VStack spacing={4} align="stretch">
      {data?.data?.data?.map((blog) => (
        <Box key={blog._id} p={5} shadow="md" borderWidth="1px" borderRadius="md">
          <HStack justify="space-between" alignItems="center">
            <VStack align="start">
              <Text fontWeight="bold">{blog.title.en}</Text> {/* Access the English title */}
              <Text>{blog.description?.en}</Text> {/* Access the English description */}
              {blog.image && (
                <Image boxSize="150px" objectFit="cover" src={`${BASE_URL}/${blog.image}`} alt={blog.title.en} />
              )}
            </VStack>
            <HStack>
              {/* Uncomment and implement updateMutation if needed */}
              {/* <Button
                colorScheme="blue"
                onClick={() => updateMutation.mutate({ id: blog._id, data: { title: 'Updated Title' } })}
              >
                Update
              </Button> */}
              <Button
                colorScheme="red"
                onClick={() => deleteMutation.mutate(blog._id)}
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
              placeholder="Title in English"
              name="titleEn"
              value={newBlog.titleEn}
              onChange={handleInputChange}
            />
          </FormControl>
          {/* <FormControl>
            <FormLabel>Title (Arabic)</FormLabel>
            <Input
              placeholder="Title in Arabic"
              name="titleAr"
              value={newBlog.titleAr}
              onChange={handleInputChange}
            />
          </FormControl> */}
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder="Description in English"
              name="descriptionEn"
              value={newBlog.descriptionEn}
              onChange={handleInputChange}
            />
          </FormControl>
          {/* <FormControl>
            <FormLabel>Description (Arabic)</FormLabel>
            <Textarea
              placeholder="Description in Arabic"
              name="descriptionAr"
              value={newBlog.descriptionAr}
              onChange={handleInputChange}
            />
          </FormControl> */}
          <FormControl>
            <FormLabel>Image</FormLabel>
            <Input
              type="file"
              name="image"
              onChange={handleFileChange}
            />
          </FormControl>
          {/* <FormControl>
            <FormLabel>Image Thumbnails</FormLabel>
            <Input
              type="file"
              name="imagesThumbnails"
              onChange={handleFileChange}
            />
          </FormControl> */}
          <Button
            colorScheme="green"
            onClick={handleCreate}
            isLoading={isCreating}
          >
            Create Blog
          </Button>
        </VStack>
      </Box>
    </VStack>
  );
};

export default BlogComponent;
