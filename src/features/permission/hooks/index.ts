import { useState, useEffect } from 'react';
import { useSDKContext } from '../../../core/context/SDKContext';
import { PermissionService } from '../services/permissionService';

// Note: In a real implementation, you'd likely want a PermissionProvider 
// to avoid fetching permissions on every hook call. For simplicity, we fetch it here.
export function usePermission(permissionCode: string) {
  const { httpClient } = useSDKContext();
  const [hasPermission, setHasPermission] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkPermission = async () => {
      setLoading(true);
      try {
        const service = new PermissionService(httpClient);
        const permissions = await service.getUserPermissions();
        setHasPermission(permissions.some(p => p.code === permissionCode));
      } catch {
        setHasPermission(false);
      } finally {
        setLoading(false);
      }
    };
    checkPermission();
  }, [httpClient, permissionCode]);

  return { hasPermission, loading };
}

export function usePermissions(permissionCodes: string[]) {
  const { httpClient } = useSDKContext();
  const [permissionsMap, setPermissionsMap] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkPermissions = async () => {
      setLoading(true);
      try {
        const service = new PermissionService(httpClient);
        const permissions = await service.getUserPermissions();
        const map: Record<string, boolean> = {};
        permissionCodes.forEach(code => {
          map[code] = permissions.some(p => p.code === code);
        });
        setPermissionsMap(map);
      } catch {
        const map: Record<string, boolean> = {};
        permissionCodes.forEach(code => map[code] = false);
        setPermissionsMap(map);
      } finally {
        setLoading(false);
      }
    };
    checkPermissions();
  }, [httpClient, JSON.stringify(permissionCodes)]);

  return { permissions: permissionsMap, loading };
}
