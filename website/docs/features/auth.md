---
sidebar_position: 1
---

# Auth (鉴权模块)

鉴权模块是 SDK 的核心部分，提供了基于 SSO/OAuth 等策略的登录、登出以及状态管理。

## API Reference

SDK 通过 `react-business-sdk` 导出了以下主要成员：

- `AuthProvider`: React Context Provider，用于包裹需要鉴权的组件层级。
- `useLogin`: 执行登录操作的 Hook。
- `useLogout`: 执行登出操作的 Hook。
- `useAuthState`: 获取当前用户登录状态的 Hook。

---

## 1. AuthProvider

`AuthProvider` 必须被放置在组件树中（通常在 `SDKProvider` 的内层），以便为其子组件提供统一的认证上下文。

```tsx
import { createSDK, AuthProvider } from 'react-business-sdk';

const sdk = createSDK({
  baseURL: 'https://api.example.com',
  auth: { type: 'sso' }
});

function App() {
  return (
    <sdk.Provider>
      <AuthProvider>
        <YourApp />
      </AuthProvider>
    </sdk.Provider>
  );
}
```

---

## 2. useLogin

执行用户登录，内部会调用当前配置的 `AuthStrategy` 进行认证。

```tsx
import { useLogin } from 'react-business-sdk';

function LoginForm() {
  const { execute, status, error } = useLogin();

  const handleLogin = async () => {
    try {
      await execute({
        username: 'admin',
        password: 'password'
      });
      console.log('登录成功');
    } catch (err) {
      console.error('登录失败', err);
    }
  };

  return (
    <button onClick={handleLogin} disabled={status === 'pending'}>
      {status === 'pending' ? '登录中...' : '登录'}
    </button>
  );
}
```

---

## 3. useLogout

执行安全登出，清除本地存储的 Token 等鉴权信息。

```tsx
import { useLogout } from 'react-business-sdk';

function LogoutButton() {
  const { execute, status } = useLogout();

  return (
    <button onClick={() => execute()} disabled={status === 'pending'}>
      注销登录
    </button>
  );
}
```

---

## 4. useAuthState

用于获取当前应用的鉴权状态，例如判断是否已登录、当前登录的用户简单信息等。

```tsx
import { useAuthState } from 'react-business-sdk';

function ProfileHeader() {
  const { isAuthenticated, user, token } = useAuthState();

  if (!isAuthenticated) {
    return <div>尚未登录</div>;
  }

  return <div>欢迎回来, {user?.name || '用户'}</div>;
}
```
