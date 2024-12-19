import React, { useEffect, useState } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Tfoot, Button, useToast, VStack } from '@chakra-ui/react';
import moment from 'moment';
import axios from 'axios';
import api from '../../../services/api'; // Assuming the API service is set up

const NotificationsTable = () => {
  const [notifications, setNotifications] = useState([]);
  const toast = useToast();

  useEffect(() => {
    // Fetch notifications data
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`${api}/api/adminNotifications`); 
        console.log(response)// Adjust the endpoint if needed
        if (response.data.status === 'success') {
          setNotifications(response.data.data);
        } else {
          toast({
            title: 'Error fetching notifications',
            description: 'Unable to retrieve notifications at the moment.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: 'There was a problem fetching notifications.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchNotifications();
  }, []);

  return (
    <VStack spacing={4} align="flex-start" w="100%">
      <Box w="full" p={4} borderWidth={1} borderRadius="lg" boxShadow="md">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Message</Th>
              <Th>Scheduled Time</Th>
              <Th>Seen</Th>
            </Tr>
          </Thead>
          <Tbody>
            {notifications.map((notification) => (
              <Tr key={notification._id}>
                <Td>{notification.title}</Td>
                <Td>{notification.message}</Td>
                <Td>{notification.scheduledTime?moment(notification.scheduledTime).format('YYYY-MM-DD HH:mm:ss'):'Not Scheduled'}</Td>
                <Td>{notification.seen ? 'Yes' : 'No'}</Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Title</Th>
              <Th>Message</Th>
              <Th>Scheduled Time</Th>
              <Th>Seen</Th>
            </Tr>
          </Tfoot>
        </Table>
      </Box>
      <Button colorScheme="blue" onClick={() => window.location.reload()}>
        Refresh Notifications
      </Button>
    </VStack>
  );
};

export default NotificationsTable;
