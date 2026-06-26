---
sidebar_position: 3
---

# Permission (权限模块)

权限模块帮助你在客户端进行细粒度的权限管控，包含对特定功能点（如：按钮、菜单）的拦截与验证。

## API Reference

- `usePermission`: 检查单个权限点。
- `usePermissions`: 批量检查多个权限点。
- `PermissionGuard`: 声明式的权限控制组件（类似 `v-if` 或 `v-show` 机制）。

---

## 1. PermissionGuard

这是最常用的权限控制方式。你可以在业务代码中通过包裹需要拦截的 DOM，来实现无侵入的权限控制。

```tsx
import { PermissionGuard } from 'react-business-sdk';

function Dashboard() {
  return (
    <div>
      <h1>运营控制台</h1>
      
      {/* 只有拥有 `user:create` 权限的用户才能看到此按钮 */}
      <PermissionGuard require="user:create">
        <button>新建用户</button>
      </PermissionGuard>

      {/* 支持 fallback UI */}
      <PermissionGuard 
        require="data:export" 
        fallback={<button disabled>无导出权限</button>}
      >
        <button>导出报表</button>
      </PermissionGuard>
    </div>
  );
}
```

---

## 2. usePermission

当你需要在事件处理函数（JS 逻辑层面）进行权限判断时，可以使用此 Hook。

```tsx
import { usePermission } from 'react-business-sdk';

function ReportAction() {
  const hasDeletePerm = usePermission('report:delete');

  const handleDelete = () => {
    if (!hasDeletePerm) {
      alert('您没有删除报表的权限！');
      return;
    }
    // 执行删除逻辑
  };

  return <button onClick={handleDelete}>删除</button>;
}
```

---

## 3. usePermissions

用于一次性判断当前用户是否拥有多个权限的组合。

```tsx
import { usePermissions } from 'react-business-sdk';

function AdvancedPanel() {
  const { hasAll, hasAny } = usePermissions(['admin:view', 'admin:edit']);

  if (!hasAny) {
    return null; // 如果没有任何一个权限，则不渲染
  }

  return (
    <div className="panel">
      <h3>高级管理</h3>
      {hasAll && <p>您拥有完整的读写权限。</p>}
    </div>
  );
}
```
