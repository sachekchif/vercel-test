// utils/permissions.js
import { useState, useEffect } from 'react';

// Complete permission constants
const PERMISSIONS = {
  ACCESS_TRANSACTIONS: 'canAccessTransactions',
  DELETE_USER: 'canDeleteUser',
  BLOCK_USER: 'canBlockUser',
  RESTORE_USER: 'canRestoreUser',
  ADD_STAFF: 'canAddStaff',
  UPDATE_STAFF_ROLE: 'canUpdateStaffRole',
  BLOCK_STAFF: 'canBlockStaff',
  RESTORE_STAFF: 'canRestoreStaff',
  // Add any other permissions your app needs
};

/**
 * Safely gets current permissions from sessionStorage
 * @returns {Object} Current permissions object
 */
const getCurrentPermissions = () => {
  try {
    const userInfo = JSON.parse(sessionStorage.getItem('userInformation')) || {};
    return userInfo?.profile?.permissions || {};
  } catch (error) {
    console.error('Error reading permissions:', error);
    return {};
  }
};

/**
 * Checks if a specific permission is granted
 * @param {string} permissionKey - The permission key to check
 * @returns {boolean} Whether the permission is granted
 */
export const checkPermission = (permissionKey) => {
  if (!Object.values(PERMISSIONS).includes(permissionKey)) {
    console.warn(`Checking unknown permission: ${permissionKey}`);
  }
  const permissions = getCurrentPermissions();
  return !!permissions[permissionKey];
};

// Individual permission checkers
export const canAccessTransactions = () => checkPermission(PERMISSIONS.ACCESS_TRANSACTIONS);
export const canDeleteUser = () => checkPermission(PERMISSIONS.DELETE_USER);
export const canBlockUser = () => checkPermission(PERMISSIONS.BLOCK_USER);
export const canRestoreUser = () => checkPermission(PERMISSIONS.RESTORE_USER);
export const canAddStaff = () => checkPermission(PERMISSIONS.ADD_STAFF);
export const canUpdateStaffRole = () => checkPermission(PERMISSIONS.UPDATE_STAFF_ROLE);
export const canBlockStaff = () => checkPermission(PERMISSIONS.BLOCK_STAFF);
export const canRestoreStaff = () => checkPermission(PERMISSIONS.RESTORE_STAFF);

/**
 * React hook for reactive permission checking
 * @returns {{
 *   canAccessTransactions: boolean,
 *   canDeleteUser: boolean,
 *   canBlockUser: boolean,
 *   canRestoreUser: boolean,
 *   canAddStaff: boolean,
 *   canUpdateStaffRole: boolean,
 *   canBlockStaff: boolean,
 *   canRestoreStaff: boolean,
 *   checkPermission: (key: string) => boolean
 * }}
 */
export const usePermissions = () => {
  const [permissions, setPermissions] = useState(getCurrentPermissions());

  useEffect(() => {
    const handleStorageChange = () => {
      setPermissions(getCurrentPermissions());
    };

    // Listen for storage changes
    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom permission update events
    window.addEventListener('permissionsUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('permissionsUpdated', handleStorageChange);
    };
  }, []);

  return {
    canAccessTransactions: !!permissions.canAccessTransactions,
    canDeleteUser: !!permissions.canDeleteUser,
    canBlockUser: !!permissions.canBlockUser,
    canRestoreUser: !!permissions.canRestoreUser,
    canAddStaff: !!permissions.canAddStaff,
    canUpdateStaffRole: !!permissions.canUpdateStaffRole,
    canBlockStaff: !!permissions.canBlockStaff,
    canRestoreStaff: !!permissions.canRestoreStaff,
    checkPermission: (key) => !!permissions[key]
  };
};

/**
 * Updates permissions in sessionStorage and notifies listeners
 * @param {Object} newPermissions - Updated permissions object
 */
export const updatePermissions = (newPermissions) => {
  try {
    const userInfo = JSON.parse(sessionStorage.getItem('userInformation')) || {};
    userInfo.profile = userInfo.profile || {};
    userInfo.profile.permissions = {
      ...userInfo.profile.permissions,
      ...newPermissions
    };
    sessionStorage.setItem('userInformation', JSON.stringify(userInfo));
    
    // Trigger both storage and custom events
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('permissionsUpdated'));
  } catch (error) {
    console.error('Error updating permissions:', error);
  }
};

export default {
  PERMISSIONS,
  checkPermission,
  canAccessTransactions,
  canDeleteUser,
  canBlockUser,
  canRestoreUser,
  canAddStaff,
  canUpdateStaffRole,
  canBlockStaff,
  canRestoreStaff,
  usePermissions,
  updatePermissions
};