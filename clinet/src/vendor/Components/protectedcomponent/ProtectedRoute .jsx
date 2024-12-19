import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import Navbar_Vendor from '../Navbar/Navbar';

const ProtectedRoute = ({ children, requiredRoles }) => {
  // Retrieve token from cookies
  let token;
  let user;
  if(requiredRoles.includes('admin')){
    token = Cookies.get('tokenadmin');
    user = Cookies.get('useradmin');
  }
  if(requiredRoles.includes('vendor')){
    token = Cookies.get('tokenvendor');
    user = Cookies.get('tokenvendor');
  }
  // If no token exists, redirect to login page
  if (!token) {
    return <Navigate to="/" />;
  }
  if (user) {
     <Navbar_Vendor user={user}/>;
  }
  try {
    // Decode the token to get the user details
    const decodedToken = jwtDecode(token);
    // Check if the token contains the defaultrole

    const { defaultrole } = decodedToken;


    // Check if the user's role is in the requiredRoles array
    if (requiredRoles.includes(defaultrole)) {
      // If the role matches, render the protected component
      return children;
    } else {
      // If the role doesn't match, redirect to unauthorized page
      return <Navigate to="/unauthorized" />;
    }
  } catch (error) {
    // If there is any error decoding the token, redirect to login
    console.error("Token decoding failed:", error);
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;












// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import Cookies from 'js-cookie';
// import {jwtDecode} from 'jwt-decode'; // Correct import for jwtDecode
// import Navbar from '../Navbar/Navbar';

// const ProtectedRoute = ({ children, requiredRoles }) => {
//   const renderProtectedContent = () => {
//     try {
//       // Decode the token to get the user details
//       const decodedToken = jwtDecode(token);
//       const { defaultrole } = decodedToken;

//       // Check if the user's role is in the requiredRoles array
//       if (requiredRoles.includes(defaultrole)) {
//         // If the role matches, render the protected component
//         return children;
//       } else {
//         // If the role doesn't match, redirect to unauthorized page
//         return <Navigate to="/unauthorized" />;
//       }
//     } catch (error) {
//       // If there is any error decoding the token, redirect to login
//       console.error("Token decoding failed:", error);
//       return <Navigate to="/" />;
//     }
//   };
//   // Retrieve token and user from cookies
//   const token = Cookies.get('token');
//   const userCookie = Cookies.get('user');

//   // Parse the user cookie (if exists)
//   const user = userCookie ? JSON.parse(userCookie) : null;

//   // If no token exists, redirect to login page
//   if (!token) {
//     return <Navigate to="/" />;
//   }

//   // If the user exists, render the Navbar
//   if (user) {
//     return (
//       <>
//         <Navbar user={user} />
//         {renderProtectedContent()}
//       </>
//     );
//   }

//   // Function to handle rendering of the protected component or redirection


//   // Default return statement (if the user does not exist)
//   return renderProtectedContent();
// };

// export default ProtectedRoute;
