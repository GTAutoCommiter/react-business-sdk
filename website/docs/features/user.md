---
sidebar_position: 2
---

# User (用户模块)

用户模块主要负责获取和管理当前登录用户的详细档案和业务属性。

## API Reference

- `useCurrentUser`: 快速获取当前用户的核心信息（同步缓存）。
- `useUserProfile`: 发起异步网络请求，拉取最新的用户档案（Profile）。

---

## 1. useCurrentUser

`useCurrentUser` 返回用户的基本信息，适合在 Navbar 等需要快速展示用户头像、昵称的场景。内部直接读取 `AuthContext` 的状态。

```tsx
import { useCurrentUser } from 'react-business-sdk';

function UserAvatar() {
  const user = useCurrentUser();

  if (!user) return null;

  return (
    <div className="avatar-wrapper">
      <img src={user.avatar} alt={user.name} />
      <span>{user.name} ({user.email})</span>
    </div>
  );
}
```

---

## 2. useUserProfile

`useUserProfile` 提供了异步获取完整用户资料的能力。

```tsx
import { useUserProfile } from 'react-business-sdk';
import { useEffect } from 'react';

function UserProfileSettings() {
  const { execute, value: profile, status, error } = useUserProfile();

  useEffect(() => {
    // 组件挂载时自动拉取
    execute();
  }, [execute]);

  if (status === 'pending') return <div>加载中...</div>;
  if (status === 'error') return <div>加载失败: {error?.message}</div>;

  return (
    <div>
      <h2>个人资料</h2>
      <ul>
        <li>用户 ID: {profile?.id}</li>
        <li>用户名: {profile?.name}</li>
        <li>手机号: {profile?.phone || '未绑定'}</li>
        <li>角色: {profile?.roles.join(', ')}</li>
      </ul>
    </div>
  );
}
```
