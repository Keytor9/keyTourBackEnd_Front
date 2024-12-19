
import React, { useState } from 'react';
import { Button, FormControl, FormLabel, Input, FormErrorMessage, VStack, Box, useToast } from '@chakra-ui/react';
import Datetime from 'react-datetime'; // React datetime picker
import moment from 'moment';
import axios from 'axios';
import NotificationsTable from './NotificationsTable '; // You can use axios directly if API setup is necessary
 // You can use axios directly if API setup is necessary
import api from '../../../services/api'; // Assuming api is set up for your backend service
import 'react-datetime/css/react-datetime.css'; // Import CSS for the datetime picker

const NotificationScheduler = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [scheduledTime, setScheduledTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const toast = useToast();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !message) {
      toast({
        title: 'Error',
        description: 'Title and message are required.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Check if the scheduled time is valid (in the future)
    if (scheduledTime && moment(scheduledTime).isBefore(moment())) {
      toast({
        title: 'Error',
        description: 'Scheduled time must be in the future.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    setError('');

    try {
      const payload = {
        title,
        message,
        scheduledTime: scheduledTime ? moment(scheduledTime).toISOString() : null, // If no scheduled time, send immediately
      };

      const response = await axios.post(`${api}/api/adminNotifications/create`, payload); // Replace with your actual endpoint
      toast({
        title: 'Success',
        description: 'Notification has been scheduled or sent.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      // Reset form
      setTitle('');
      setMessage('');
      setScheduledTime(null);
    } catch (err) {
      setError('Failed to send the notification.');
      toast({
        title: 'Error',
        description: 'There was an issue sending the notification.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Box p={4}>
      <VStack spacing={4} align="stretch">
        <FormControl isRequired isInvalid={error}>
          <FormLabel htmlFor="title">Title</FormLabel>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter notification title"
          />
        </FormControl>

        <FormControl isRequired isInvalid={error}>
          <FormLabel htmlFor="message">Message</FormLabel>
          <Input
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter notification message"
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="scheduledTime">Scheduled Time</FormLabel>
          <Datetime
            value={scheduledTime}
            onChange={setScheduledTime}
            inputProps={{ placeholder: 'Select a date and time to schedule (optional)' }}
            isValidDate={(current) => current.isAfter(moment().subtract(1, 'day'))} // Ensures the selected date is in the future
          />
        </FormControl>

        <Button
          colorScheme="blue"
          onClick={handleSubmit}
          isLoading={loading}
          loadingText="Sending"
        >
          {scheduledTime ? 'Schedule Notification' : 'Send Now'}
        </Button>

        {error && <FormErrorMessage>{error}</FormErrorMessage>}
      </VStack>
    </Box>
    <Box>
      <NotificationsTable/>
    </Box>
</>
  );
};

export default NotificationScheduler;







