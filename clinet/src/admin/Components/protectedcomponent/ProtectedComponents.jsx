import React from 'react';
import ProtectedRoute from './ProtectedRoute ';
// import AdminDashboard from './AdminDashboard';
// import VendorDashboard from './VendorDashboard';
// import CommonDashboard from './CommonDashboard';
import Admin_Admins from '../Pages/Admin_Admins';
import Admin_Dashboard from '../Pages/Admin_dashboard';

// Example for Admin and Vendor roles protection
// const AdminVendorRoute = () => (
//   <ProtectedRoute requiredRoles={['admin', 'vendor']}>
//     <CommonDashboard />  {/* This component can be accessed by both admins and vendors */}
//   </ProtectedRoute>
// );

// Example for Admin-only route
const AdminRoute = () => (
  <ProtectedRoute requiredRoles={['admin']}>
    <Admin_Admins />
  </ProtectedRoute>
);

// Example for Vendor-only route
// const VendorRoute = () => (
//   <ProtectedRoute requiredRoles={['vendor']}>
//     <VendorDashboard />
//   </ProtectedRoute>
// );

export { AdminRoute };
