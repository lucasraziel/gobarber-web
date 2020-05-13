import React from 'react';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();
  return (
    <button type="button" onClick={() => signOut()}>
      Logout
    </button>
  );
};

export default Dashboard;
