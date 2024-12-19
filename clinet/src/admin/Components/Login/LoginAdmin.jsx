
// import React, { useState } from "react";
// import img from "../Assets/img/Frame 35546.png";
// import Logo from "../Assets/img/Group 37325.png";
// import { useNavigate } from "react-router-dom";
// import "../Assets/Css/Login.css";
// import  {loginVendor}  from "../../../services/apiservices/authService";

// import Cookies from 'js-cookie';

// function LoginAdmin() {
//   const [passwordShown, setPasswordShown] = useState(false);
//   const togglePasswordVisiblity = () => {
//     setPasswordShown(!passwordShown);
//   };

//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { email, password } = formData;
//       const result = await loginVendor(email, password); // Call the login service
// console.log(result)
//       if (result) {
//         navigate("/Admin_Admins"); // Navigate to admin dashboard on success
//       }
//     } catch (error) {
//       console.error('Login failed:', error.message);
//       // You can show an alert or toast message here
//     }
//   };

//   return (
//     <>
//       <div className="login">
//         <div className="row">
//           <div className="col-md-4"></div>
//           <div className="col-md-8">
//             <img src={img} alt="img" />
//           </div>
//         </div>
//         <div className="login-card">
//           <form onSubmit={handleSubmit}>
//             <div className="text-center">
//               <img src={Logo} alt="logo" className="logo" />
//             </div>
//             <h1>Welcome Back</h1>
//             <div className="form-group">
//               <label>Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Enter Your Email"
//                 className="login-email"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="form-group">
//               <label>Password</label>
//               <div className="d-flex align-items-center form-group-password">
//                 <input
//                   name="password"
//                   className="login-password"
//                   placeholder="Enter Your password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   type={passwordShown ? "text" : "password"}
//                 />
//                 <i
//                   onClick={togglePasswordVisiblity}
//                   className={passwordShown ? "fa fa-eye-slash" : "fa fa-eye"}
//                 ></i>
//               </div>
//             </div>
//             <button  type="submit" className="submit">
//               LogIn
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default LoginAdmin;;













// import React, { useState } from "react";
// import img from "../Assets/img/Frame 35546.png";
// import Logo from "../Assets/img/Group 37325.png";
// import { useNavigate } from "react-router-dom";
// import "../Assets/Css/Login.css";
// import { loginAdmin } from "../../../services/apiservices/authService"; // Updated to loginAdmin
// import Cookies from 'js-cookie';
// import {
//   Button,
//   Input,
//   InputGroup,
//   InputRightElement,
//   FormControl,
//   FormLabel,
//   Spinner,
//   useToast,
// } from "@chakra-ui/react";
// import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

// function LoginAdmin() {
//   const [passwordShown, setPasswordShown] = useState(false);
//   const [loading, setLoading] = useState(false); // State to manage loading spinner
//   const navigate = useNavigate();
//   const toast = useToast(); // Chakra UI's useToast hook for notifications
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const togglePasswordVisiblity = () => {
//     setPasswordShown(!passwordShown);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true); // Set loading to true when the request starts
//     try {
//       const { email, password } = formData;
//       const result = await loginAdmin(email, password); // Call the login service
//       if (result) {
//         toast({
//           title: "Login successful!",
//           description: "You are being redirected...",
//           status: "success",
//           duration: 3000,
//           isClosable: true,
//           position: "top-right",
//         });

//         // Redirect after 1.5 seconds
//         setTimeout(() => {
//           navigate("/Admin_Admins"); // Navigate to admin dashboard on success
//         }, 1500);
//       }
//     } catch (error) {
//       toast({
//         title: "Login failed.",
//         description: error.message || "An error occurred, please try again.",
//         status: "error",
//         duration: 3000,
//         isClosable: true,
//         position: "top-right",
//       });
//     } finally {
//       setLoading(false); // Set loading to false when the request completes
//     }
//   };

//   return (
//     <div className="login">
//       <div className="row">
//         <div className="col-md-4"></div>
//         <div className="col-md-8">
//           <img src={img} alt="img" />
//         </div>
//       </div>
//       <div className="login-card">
//         <form onSubmit={handleSubmit}>
//           <div className="text-center">
//             <img src={Logo} alt="logo" className="logo" />
//           </div>
//           <h1>Welcome Back</h1>

//           <FormControl id="email" isRequired>
//             <FormLabel>Email</FormLabel>
//             <Input
//               type="email"
//               name="email"
//               placeholder="Enter Your Email"
//               className="login-email"
//               value={formData.email}
//               onChange={handleChange}
//             />
//           </FormControl>

//           <FormControl id="password" isRequired>
//             <FormLabel>Password</FormLabel>
//             <InputGroup size="md">
//               <Input
//                 name="password"
//                 className="login-password"
//                 placeholder="Enter Your password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 type={passwordShown ? "text" : "password"}
//               />
//               <InputRightElement width="4.5rem">
//                 <Button
//                   h="1.75rem"
//                   size="sm"
//                   onClick={togglePasswordVisiblity}
//                   variant="ghost"
//                 >
//                   {passwordShown ? <ViewOffIcon /> : <ViewIcon />}
//                 </Button>
//               </InputRightElement>
//             </InputGroup>
//           </FormControl>

//           <Button
//             type="submit"
//             colorScheme="blue"
//             isFullWidth
//             mt={4}
//             disabled={loading}
//             rightIcon={loading ? <Spinner size="sm" /> : null}
//           >
//             {loading ? "Logging In..." : "LogIn"}
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default LoginAdmin;












import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import img from "../Assets/img/Frame 35546.png";
import Logo from "../Assets/img/Group 37325.png";
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
import { loginAdmin } from "../../../services/apiservices/authService";

function LoginAdmin() {
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
    const token = Cookies.get("tokenadmin");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);

        // Optionally, you can check the role here (admin/vendor/user)
        if (decodedToken && decodedToken.defaultrole === "admin") {
          // Redirect to the admin dashboard if the user is already logged in
          navigate("/Admin_Admins");
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
      const result = await loginAdmin(email, password); // Call the login service
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
          navigate("/Admin_Admins");
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
    // <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
    //   <VStack spacing={6} width="md">
    //     <form onSubmit={handleSubmit}>
    //       <FormControl id="email" isRequired>
    //         <FormLabel>Email</FormLabel>
    //         <Input
    //           type="email"
    //           name="email"
    //           placeholder="Enter Your Email"
    //           value={formData.email}
    //           onChange={handleChange}
    //         />
    //       </FormControl>

    //       <FormControl id="password" isRequired mt={4}>
    //         <FormLabel>Password</FormLabel>
    //         <InputGroup size="md">
    //           <Input
    //             name="password"
    //             placeholder="Enter Your Password"
    //             value={formData.password}
    //             onChange={handleChange}
    //             type={passwordShown ? "text" : "password"}
    //           />
    //           <InputRightElement width="4.5rem">
    //             <Button h="1.75rem" size="sm" onClick={togglePasswordVisiblity} variant="ghost">
    //               {passwordShown ? <ViewOffIcon /> : <ViewIcon />}
    //             </Button>
    //           </InputRightElement>
    //         </InputGroup>
    //       </FormControl>

    //       <Button
    //         type="submit"
    //         colorScheme="teal"
    //         isFullWidth
    //         mt={4}
    //         isDisabled={loading} // Disable button when loading
    //         rightIcon={loading ? <Spinner size="sm" /> : null}
    //       >
    //         {loading ? "Logging In..." : "Log In"}
    //       </Button>
    //     </form>
    //   </VStack>
    // </Box>

    
      <div className="login">
        <div className="row h-100">
          <div className="col-md-4"></div>
          <div className="col-md-8">
            <img src={img} alt="img" />
          </div>
        </div>
        <div className="login-card">
          <form onSubmit={handleSubmit}>
            <div className="text-center">
              <img src={Logo} alt="logo" className="logo" />
            </div>
            <h1>Welcome Back</h1>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter Your Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <div className="d-flex align-items-center form-group-password">
                <input
                  name="password"
                  placeholder="Enter Your Password"
                  value={formData.password}
                  onChange={handleChange}
                  type={passwordShown ? "text" : "password"}
                />
                <i
                  onClick={togglePasswordVisiblity}
                  className={passwordShown ? "fa fa-eye-slash" : "fa fa-eye"}
                ></i>
              </div>
            </div>
            <button 
              type="submit"
              colorScheme="teal"
              isFullWidth
              mt={4}
              isDisabled={loading} // Disable button when loading
              rightIcon={loading ? <Spinner size="sm" /> : null}
            >
              {loading ? "Logging In..." : "Log In"}
            </button>
          </form>
        </div>
      </div>
  );
}

export default LoginAdmin;
