// =============================================================================
// react-business-sdk - Public API Surface
// =============================================================================

// 1. Core
export { createSDK } from './core/init';
export { SDKProvider } from './core/provider';
export type { SDKConfig } from './core/config';

// 2. Features
// 2.1 Auth
export {
  useLogin,
  useLogout,
  useAuthState,
  AuthProvider,
} from './features/auth';
export type { AuthState, LoginParams } from './features/auth';

// 2.2 User
export { useCurrentUser, useUserProfile } from './features/user';
export type { User, UserProfile } from './features/user';

// 2.3 Permission
export { usePermission, usePermissions, PermissionGuard } from './features/permission';

// 2.4 Tenant
export { useCurrentTenant } from './features/tenant';

// 2.5 Feature Flag
export { useFeatureFlag } from './features/feature-flag';

// 3. Shared Types & Errors
export { SDKError, AuthError, HttpError } from './shared/errors';
export type { Nullable, Maybe, Result } from './shared/types';
