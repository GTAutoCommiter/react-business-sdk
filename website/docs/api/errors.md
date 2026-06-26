---
sidebar_position: 1
---

# Errors (错误处理)

SDK 内部统一封装了各种场景下的错误类型。你可以通过 `instanceof` 操作符捕获并精细化处理这些错误。

## API Reference

SDK 导出了以下 Error 类：

- `SDKError`: 所有 SDK 错误的基类。
- `HttpError`: 继承自 `SDKError`，代表 HTTP 网络请求失败（如 500/404 等）。
- `AuthError`: 继承自 `SDKError`，代表鉴权失败（如 Token 过期、登录密码错误等）。

---

## 错误捕获示例

通常在业务侧的全局错误拦截器，或是具体的请求 `try...catch` 中进行类型的判定：

```tsx
import { SDKError, HttpError, AuthError } from 'react-business-sdk';

async function fetchBusinessData() {
  try {
    const data = await api.getData();
    return data;
  } catch (err) {
    if (err instanceof AuthError) {
      console.error('鉴权失败，需要重新登录:', err.message);
      // 跳转到登录页
      window.location.href = '/login';
    } else if (err instanceof HttpError) {
      console.error(`HTTP 异常 (状态码: ${err.status}):`, err.message);
      alert(`请求失败: ${err.message}`);
    } else if (err instanceof SDKError) {
      console.error(`SDK 内部错误 (错误码: ${err.code}):`, err.message);
    } else {
      console.error('未知错误:', err);
    }
  }
}
```

### SDKError 属性

所有继承自 `SDKError` 的实例都拥有如下属性：
- `message`: (string) 错误描述文本。
- `code`: (string | number) 标识错误的代号（如 `'AUTH_EXPIRED'`）。
- `details`: (any) 任何附带的详细调试信息（可选）。
