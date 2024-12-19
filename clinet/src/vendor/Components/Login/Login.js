import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  FormControl,
  FormLabel,
  Spinner,
  useToast,
  VStack,
  Box,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { loginVendor } from "../../../services/apiservices/authService";

function LoginVendor() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [loading, setLoading] = useState(false); // State to manage loading spinner
  const navigate = useNavigate();
  const toast = useToast(); // Chakra UI's useToast hook for notifications
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Function to toggle password visibility
  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };

  // Check if the user is already authenticated on component mount
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);

        // Optionally, you can check the role here (admin/vendor/user)
        if (decodedToken && decodedToken.defaultrole === "vendor") {
          // Redirect to the admin dashboard if the user is already logged in
          navigate("/Vendor_Dashboard");
        }
      } catch (error) {
        // Handle token decoding error, like an expired or invalid token
        console.error("Invalid token:", error);
      }
    }
  }, [navigate]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading spinner when the request starts
    try {
      const { email, password } = formData;
      const result = await loginVendor(email, password); // Call the login service
      if (result) {
        toast({
          title: "Login successful!",
          description: "You are being redirected...",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });

        // Redirect to the admin dashboard on successful login
        setTimeout(() => {
          navigate("/Vendor_Dashboard");
        }, 1500);
      }
    } catch (error) {
      toast({
        title: "Login failed.",
        description: error.message || "An error occurred, please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setLoading(false); // Hide the loading spinner
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <VStack spacing={6} width="md">
        <form onSubmit={handleSubmit}>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              value={formData.email}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="password" isRequired mt={4}>
            <FormLabel>Password</FormLabel>
            <InputGroup size="md">
              <Input
                name="password"
                placeholder="Enter Your Password"
                value={formData.password}
                onChange={handleChange}
                type={passwordShown ? "text" : "password"}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={togglePasswordVisiblity} variant="ghost">
                  {passwordShown ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Button
            type="submit"
            colorScheme="teal"
            isFullWidth
            mt={4}
            isDisabled={loading} // Disable button when loading
            rightIcon={loading ? <Spinner size="sm" /> : null}
          >
            {loading ? "Logging In..." : "Log In"}
          </Button>
        </form>
      </VStack>
    </Box>
  );
}

export default LoginVendor;
