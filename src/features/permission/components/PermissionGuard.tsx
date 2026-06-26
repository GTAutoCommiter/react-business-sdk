import React from 'react';
import { usePermission } from '../hooks';

export interface PermissionGuardProps {
  permission: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const PermissionGuard: React.FC<PermissionGuardProps> = ({ 
  permission, 
  children, 
  fallback = null 
}) => {
  const { hasPermission, loading } = usePermission(permission);

  if (loading) return null; // or a loading spinner

  if (!hasPermission) return <>{fallback}</>;

  return <>{children}</>;
};
