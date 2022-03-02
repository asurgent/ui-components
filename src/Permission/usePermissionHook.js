import { useContext } from 'react';
import { PermissionContext } from './Permission';
import { hasPermission } from './helpers';

const usePermissionHook = () => {
  const permissions = useContext(PermissionContext);
  const validPermissions = typeof permissions === 'object' && permissions !== null;

  return {
    withFeatures: (features) => {
      if (validPermissions) {
        if (Array.isArray(features)) {
          return hasPermission(permissions, [], features);
        }
        if (typeof features === 'string') {
          return hasPermission(permissions, [], [features]);
        }
      }
      return false;
    },
    withRoles: (roles) => {
      if (validPermissions) {
        if (Array.isArray(roles)) {
          return hasPermission(permissions, roles, []);
        }
        if (typeof roles === 'string') {
          return hasPermission(permissions, [roles], []);
        }
      }
      return false;
    },
    isGlobalAdmin: () => {
      if (validPermissions) {
        const { globalAdminKey, ...rolesAndFeatures } = permissions;
        const roles = Object.keys(rolesAndFeatures);

        const hasGlobalAdminRole = roles.some((role) => role === globalAdminKey);
        return hasGlobalAdminRole;
      }
      return false;
    },
    getPermissions: () => permissions,
  };
};

export default usePermissionHook;
