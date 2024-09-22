import React from 'react';
import withAdminProtection from '../withAdminProtection';

// Defina o componente Admin primeiro
const Admin = () => {
  return (
    <div>
      <h1>Admin Settings Page</h1>
      <p>Only accessible to users with admin privileges.</p>
    </div>
  );
};

// Depois passe o componente Admin para o HOC
const AdminWithProtection = withAdminProtection(Admin);

export default AdminWithProtection;
