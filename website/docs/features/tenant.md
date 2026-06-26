---
sidebar_position: 4
---

# Tenant (多租户模块)

多租户模块用于在 SaaS 架构中管理当前用户的租户（Tenant）上下文，帮助前端在不同租户间隔离数据请求。

## API Reference

- `useCurrentTenant`: 获取当前激活的租户信息。

---

## 1. useCurrentTenant

这个 Hook 能够返回用户当前处于的租户上下文。在企业级应用中，用户可能属于多个组织或租户，你需要在 UI 上展示当前租户的名称或执行租户切换。

```tsx
import { useCurrentTenant } from 'react-business-sdk';

function TenantSwitcher() {
  const { execute, value: tenant, status, error } = useCurrentTenant();

  if (status === 'pending') {
    return <header>正在加载组织信息...</header>;
  }

  if (!tenant) {
    return <header>未加入任何组织</header>;
  }

  return (
    <header className="tenant-header">
      <div className="current-tenant">
        <span className="tenant-name">{tenant.name}</span>
        <span className="tenant-id">ID: {tenant.id}</span>
      </div>
      <button onClick={() => alert('展示切换租户的弹窗')}>切换组织</button>
    </header>
  );
}
```

> **提示**：在使用 `HttpClient` (SDK 内部封装的 axios) 时，通常会由 Request Interceptor 自动在 HTTP Headers 中附带上当前租户的 ID（如 `X-Tenant-ID`），这样你就不需要在每次发请求时手动拼接租户 ID 了。
