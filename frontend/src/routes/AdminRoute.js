import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';




const AdminRoute = ({ element: Component }) => {
  const { userAuth } = useAuth(); // Destructure userRole from context

  // Check if the user is authenticated and has an Admin role
  return userAuth === 'Admin' ? (
    Component
  ) : (
    <Navigate to="/login" replace /> // Redirect to login if not an admin
  );
};

export default AdminRoute;



// import { Route, Navigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext'; // Assuming you have an AuthContext
// import AdminDashboard from '../components/AdminDashboard';

// const AdminRoute = ({ element: Component, ...rest }) => {
//   const { authState } = useAuth();

//   return authState.user && authState.user.role === 'Admin' ? (
//     <Route {...rest} element={<AdminDashboard />} />
//   ) : (
//     <Navigate to="/login" replace />
//   );
// };

// export default AdminRoute;



