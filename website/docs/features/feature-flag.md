---
sidebar_position: 5
---

# Feature Flag (特性开关)

特性开关（Feature Flag / Toggle）是实现功能灰度发布、A/B 测试和动态配置的核心能力。通过该模块，你可以安全地在生产环境中隐藏未完成的功能，或向特定用户群体开放新特性。

## API Reference

- `useFeatureFlag`: 获取单个开关状态的 Hook。

---

## 1. useFeatureFlag

该 Hook 接受一个开关的 `key`（字符串类型），并返回当前开关的布尔值状态。网络请求通常会被缓存以保证性能。

```tsx
import { useFeatureFlag } from 'react-business-sdk';

function BetaFeature() {
  // 查询名为 "new_dashboard_ui" 的特性开关
  const { execute, value: isEnabled, status } = useFeatureFlag('new_dashboard_ui');

  // 对于特性开关，我们一般在加载期间可以静默，或者展示 fallback UI
  if (status === 'pending') {
    return null; 
  }

  if (isEnabled) {
    return (
      <div className="beta-notice">
        🎉 你正在体验全新的 Dashboard UI！
      </div>
    );
  }

  return (
    <div>这是旧版的经典 UI。</div>
  );
}
```
