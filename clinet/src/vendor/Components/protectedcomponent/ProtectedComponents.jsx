import React from 'react';
import ProtectedRoute from './ProtectedRoute ';
// import AdminDashboard from './AdminDashboard';
// import VendorDashboard from './VendorDashboard';
// import CommonDashboard from './CommonDashboard';
import Add_Tour from '../Pages/Add_Tour';
import Vendor_Dashboard from '../Pages/Vendor_dashboard';
// import Admin_Dashboard from '../Pages/Admin_dashboard';

// Example for Admin and Vendor roles protection
// const AdminVendorRoute = () => (
//   <ProtectedRoute requiredRoles={['admin', 'vendor']}>
//     <CommonDashboard />  {/* This component can be accessed by both admins and vendors */}
//   </ProtectedRoute>
// );

// Example for Admin-only route
const VendorAddtour = () => (
  <ProtectedRoute requiredRoles={['vendor']}>
    <Add_Tour />
  </ProtectedRoute>
);
const VendorDashboard = () => (
  <ProtectedRoute requiredRoles={['vendor']}>
    <Vendor_Dashboard />
  </ProtectedRoute>
);
// Example for Vendor-only route
// const VendorRoute = () => (
//   <ProtectedRoute requiredRoles={['vendor']}>
//     <VendorDashboard />
//   </ProtectedRoute>
// );

export { VendorAddtour, VendorDashboard};
