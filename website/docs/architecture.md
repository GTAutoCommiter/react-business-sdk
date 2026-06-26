# react-business-sdk — SDK 架构设计文档

> **定位**：一个 React + TypeScript 业务 SDK，封装企业通用业务能力（SSO、用户、权限、多租户等），供多个 React 项目复用。

---

## 一、完整目录树

```
react-business-sdk/
├── src/
│   ├── index.ts                          # 统一公共 API 出口
│   │
│   ├── core/                             # SDK 基础设施层（与业务无关）
│   │   ├── provider/
│   │   │   ├── SDKProvider.tsx           # 根 Provider，组合所有 Context
│   │   │   └── index.ts
│   │   ├── context/
│   │   │   ├── SDKContext.ts             # 全局 SDK Context
│   │   │   └── index.ts
│   │   ├── config/
│   │   │   ├── SDKConfig.ts              # SDK 配置类型与默认值
│   │   │   ├── createConfig.ts           # 配置工厂函数
│   │   │   └── index.ts
│   │   ├── http/
│   │   │   ├── client.ts                 # Axios / Fetch 封装，HTTP 客户端实例
│   │   │   ├── interceptors.ts           # 请求/响应拦截器（token注入、错误处理）
│   │   │   ├── types.ts                  # HTTP 相关类型（RequestConfig、Response）
│   │   │   └── index.ts
│   │   ├── init.ts                       # SDK 初始化入口（createSDK）
│   │   └── index.ts                      # core 模块出口
│   │
│   ├── shared/                           # 所有 Feature 共用的基础代码
│   │   ├── hooks/
│   │   │   ├── useAsync.ts               # 通用异步状态管理 Hook
│   │   │   ├── useLocalStorage.ts        # LocalStorage Hook
│   │   │   └── index.ts
│   │   ├── utils/
│   │   │   ├── storage.ts                # 存储工具（localStorage/sessionStorage 封装）
│   │   │   ├── url.ts                    # URL 拼接、参数处理
│   │   │   ├── token.ts                  # Token 解析、过期判断
│   │   │   └── index.ts
│   │   ├── errors/
│   │   │   ├── SDKError.ts               # SDK 基础错误类
│   │   │   ├── HttpError.ts              # HTTP 错误类
│   │   │   ├── AuthError.ts              # 认证错误类
│   │   │   └── index.ts
│   │   ├── constants/
│   │   │   ├── storageKeys.ts            # 存储 key 常量
│   │   │   ├── httpStatus.ts             # HTTP 状态码常量
│   │   │   └── index.ts
│   │   ├── types/
│   │   │   ├── common.ts                 # 公共类型（Nullable、Maybe、Result 等）
│   │   │   ├── pagination.ts             # 分页类型
│   │   │   └── index.ts
│   │   └── index.ts                      # shared 模块出口
│   │
│   └── features/                         # Feature First 业务领域层
│       │
│       ├── auth/                         # 🔐 认证（当前：SSO；未来：OAuth、OIDC、SAML）
│       │   ├── hooks/
│       │   │   ├── useLogin.ts           # 登录 Hook
│       │   │   ├── useLogout.ts          # 登出 Hook
│       │   │   ├── useAuthState.ts       # 认证状态订阅 Hook
│       │   │   └── index.ts
│       │   ├── services/
│       │   │   ├── authService.ts        # 认证 API 调用（login、logout、refresh）
│       │   │   ├── tokenService.ts       # Token 管理（存储、刷新、校验）
│       │   │   └── index.ts
│       │   ├── providers/
│       │   │   ├── AuthProvider.tsx      # 认证 Context Provider
│       │   │   └── index.ts
│       │   ├── strategies/               # 🔑 认证策略（扩展点）
│       │   │   ├── sso/
│       │   │   │   ├── SSOStrategy.ts    # SSO 策略实现
│       │   │   │   └── index.ts
│       │   │   ├── oauth/                # （预留）OAuth 2.0 策略
│       │   │   │   └── .gitkeep
│       │   │   ├── oidc/                 # （预留）OIDC 策略
│       │   │   │   └── .gitkeep
│       │   │   └── saml/                 # （预留）SAML 策略
│       │   │       └── .gitkeep
│       │   ├── utils/
│       │   │   ├── parseToken.ts         # 解析 JWT / SSO Token
│       │   │   └── index.ts
│       │   ├── types.ts                  # auth 领域类型（AuthState、LoginParams 等）
│       │   ├── constants.ts              # auth 常量（TOKEN_KEY、REDIRECT_KEY 等）
│       │   └── index.ts                  # auth 模块公共 API 出口
│       │
│       ├── user/                         # 👤 用户信息
│       │   ├── hooks/
│       │   │   ├── useCurrentUser.ts
│       │   │   ├── useUserProfile.ts
│       │   │   └── index.ts
│       │   ├── services/
│       │   │   ├── userService.ts
│       │   │   └── index.ts
│       │   ├── utils/
│       │   │   └── index.ts
│       │   ├── types.ts
│       │   ├── constants.ts
│       │   └── index.ts
│       │
│       ├── permission/                   # 🛡️ 权限管理
│       │   ├── hooks/
│       │   │   ├── usePermission.ts      # 权限判断 Hook
│       │   │   ├── usePermissions.ts     # 批量权限 Hook
│       │   │   └── index.ts
│       │   ├── components/
│       │   │   ├── PermissionGuard.tsx   # 权限守卫组件（JSX）
│       │   │   └── index.ts
│       │   ├── services/
│       │   │   ├── permissionService.ts
│       │   │   └── index.ts
│       │   ├── types.ts
│       │   ├── constants.ts
│       │   └── index.ts
│       │
│       ├── tenant/                       # 🏢 多租户
│       │   ├── hooks/
│       │   │   ├── useCurrentTenant.ts
│       │   │   └── index.ts
│       │   ├── services/
│       │   │   ├── tenantService.ts
│       │   │   └── index.ts
│       │   ├── types.ts
│       │   ├── constants.ts
│       │   └── index.ts
│       │
│       ├── organization/                 # 🏗️ 组织架构
│       │   ├── hooks/
│       │   ├── services/
│       │   ├── types.ts
│       │   ├── constants.ts
│       │   └── index.ts
│       │
│       ├── feature-flag/                 # 🚩 Feature Flag
│       │   ├── hooks/
│       │   │   ├── useFeatureFlag.ts
│       │   │   └── index.ts
│       │   ├── services/
│       │   │   ├── featureFlagService.ts
│       │   │   └── index.ts
│       │   ├── types.ts
│       │   ├── constants.ts
│       │   └── index.ts
│       │
│       ├── analytics/                    # 📊 数据分析/埋点
│       │   ├── hooks/
│       │   ├── services/
│       │   ├── types.ts
│       │   ├── constants.ts
│       │   └── index.ts
│       │
│       └── notification/                 # 🔔 通知
│           ├── hooks/
│           ├── services/
│           ├── types.ts
│           ├── constants.ts
│           └── index.ts
│
├── tests/                                # 测试（镜像 src 结构）
│   ├── core/
│   ├── shared/
│   └── features/
│       ├── auth/
│       └── user/
│
├── docs/                                 # 文档
│   ├── getting-started.md
│   ├── auth.md
│   └── architecture.md
│
├── .github/
│   └── workflows/
│       └── release.yml
│
├── package.json
├── tsconfig.json
├── tsconfig.build.json
├── vite.config.ts                        # 或 rollup.config.ts（SDK 打包）
├── vitest.config.ts
├── .eslintrc.cjs
├── .prettierrc
└── README.md
```

---

## 二、各层职责详解

### 2.1 `core/` — SDK 基础设施层

> **职责**：与业务领域完全无关，只负责 SDK 运行所需的基础设施。所有 Feature 都依赖它，但它不依赖任何 Feature。

| 文件/目录 | 职责 |
|---|---|
| `provider/SDKProvider.tsx` | SDK 根 Provider，组合所有 Feature 的 Context Provider，消费方只需挂载一个组件 |
| `context/SDKContext.ts` | 全局 SDK Context，存放 config、httpClient 等基础设施引用 |
| `config/SDKConfig.ts` | SDK 配置类型定义（baseURL、timeout、authStrategy 等） |
| `config/createConfig.ts` | 配置工厂函数，合并用户配置与默认值 |
| `http/client.ts` | HTTP 客户端单例（axios/fetch 封装），统一请求入口 |
| `http/interceptors.ts` | 请求拦截器（自动注入 token）、响应拦截器（统一错误处理、token 刷新） |
| `init.ts` | `createSDK(config)` —— SDK 初始化工厂，返回配置好的 Provider 和 hooks |

**设计要点**：`init.ts` 应该返回一个"已绑定配置"的 SDK 实例，类似 React Query 的 `QueryClient`：

```ts
// 消费方使用
const sdk = createSDK({ baseURL: 'https://api.example.com', authStrategy: 'sso' });

function App() {
  return <sdk.Provider>{children}</sdk.Provider>;
}
```

---

### 2.2 `shared/` — 跨 Feature 共用代码

> **职责**：被多个 Feature 共用的纯工具代码，不包含业务逻辑，不依赖任何 Feature，也不依赖 `core`。

| 文件/目录 | 职责 |
|---|---|
| `hooks/useAsync.ts` | 通用异步状态管理（loading/data/error），避免每个 Feature 重复实现 |
| `hooks/useLocalStorage.ts` | 带响应式的 localStorage Hook |
| `utils/storage.ts` | localStorage/sessionStorage 的类型安全封装 |
| `utils/token.ts` | JWT 解析、过期时间判断（不涉及业务，只做字符串处理） |
| `errors/SDKError.ts` | SDK 错误基类，所有自定义错误继承此类 |
| `errors/AuthError.ts` | 认证相关错误，继承 `SDKError` |
| `constants/storageKeys.ts` | 所有 Feature 使用的 storage key 统一管理，避免 key 冲突 |
| `types/common.ts` | 通用 TypeScript 类型：`Nullable<T>`、`Maybe<T>`、`Result<T, E>` 等 |

---

### 2.3 `features/auth/` — 认证领域（核心 Feature）

> **职责**：封装所有与身份认证相关的逻辑，高内聚，对外只暴露 `index.ts` 定义的 API。

| 文件/目录 | 职责 |
|---|---|
| `hooks/useLogin.ts` | 触发登录流程，封装 loading/error 状态 |
| `hooks/useLogout.ts` | 触发登出，清理 token 和状态 |
| `hooks/useAuthState.ts` | 订阅认证状态（isAuthenticated、user、token），组件可响应式使用 |
| `services/authService.ts` | 纯 API 调用层（login、logout、refreshToken），无副作用 |
| `services/tokenService.ts` | Token 生命周期管理：存储、读取、刷新、销毁 |
| `providers/AuthProvider.tsx` | 维护 AuthContext，管理 auth 状态，监听 token 过期 |
| `strategies/` | 策略模式扩展点（见第四节） |
| `types.ts` | `AuthState`、`LoginParams`、`AuthStrategy` 等领域类型 |
| `constants.ts` | `AUTH_TOKEN_KEY`、`REFRESH_TOKEN_KEY`、`LOGIN_REDIRECT_KEY` 等 |

---

### 2.4 其余 Feature 模块

每个 Feature 遵循相同结构，高度一致，降低认知负担：

| Feature | 核心能力 |
|---|---|
| `user/` | 获取当前用户信息，用户 Profile 管理 |
| `permission/` | `usePermission('edit:post')` 权限判断，`<PermissionGuard>` 守卫组件 |
| `tenant/` | 获取当前租户信息，切换租户 |
| `organization/` | 组织架构树查询，当前用户所属部门 |
| `feature-flag/` | `useFeatureFlag('new-ui')` 功能开关 |
| `analytics/` | 埋点事件上报，页面 PV/UV 跟踪 |
| `notification/` | 消息通知查询、未读数、标记已读 |

---

## 三、`src/index.ts` — 统一公共 API

```ts
// core
export { createSDK } from './core/init';
export { SDKProvider } from './core/provider';
export type { SDKConfig } from './core/config';

// auth
export {
  useLogin,
  useLogout,
  useAuthState,
  AuthProvider,
} from './features/auth';
export type { AuthState, LoginParams } from './features/auth';

// user
export { useCurrentUser, useUserProfile } from './features/user';
export type { User, UserProfile } from './features/user';

// permission
export { usePermission, usePermissions, PermissionGuard } from './features/permission';

// tenant
export { useCurrentTenant } from './features/tenant';

// feature-flag
export { useFeatureFlag } from './features/feature-flag';

// shared types & errors
export { SDKError, AuthError, HttpError } from './shared/errors';
export type { Nullable, Maybe, Result } from './shared/types';
```

> **原则**：`src/index.ts` 只做 re-export，不包含任何实现逻辑。

---

## 四、为什么采用 Feature First？

### 4.1 对比：类型驱动 vs Feature First

| 对比维度 | 类型驱动（hooks/utils/services） | Feature First |
|---|---|---|
| 认知模型 | 按"我是什么" | 按"我做什么" |
| 新增业务模块 | 需改动多个顶级目录 | 只在 `features/` 下新增一个目录 |
| 删除业务模块 | 需要在多处查找并清理 | 删除一个目录即可 |
| 代码内聚性 | 低（同一业务散落各处） | 高（相关代码集中在一起） |
| 团队协作 | 容易产生冲突 | 按 Feature 分工，低冲突 |
| 可测试性 | 需要跨目录 mock | 测试边界清晰 |
| 适合 SDK？ | ❌ 不适合（SDK 暴露的是业务能力，不是技术类型） | ✅ 非常适合 |

### 4.2 SDK 特殊性

SDK 与业务系统不同。消费方使用 SDK 时，思维模型是：
- "我要**登录**" → `import { useLogin } from 'react-business-sdk'`
- "我要**判断权限**" → `import { usePermission } from 'react-business-sdk'`

Feature First 与消费方的思维模型完全对齐。如果按类型分，消费方会困惑："我应该从 `hooks` 还是从 `services` 里找我要的功能？"

---

## 五、认证方式扩展：OAuth、OIDC、CAS、SAML

当前使用 **策略模式（Strategy Pattern）** 设计 `auth/strategies/`，扩展时只需：

### Step 1：新增策略目录

```
auth/strategies/
├── sso/
│   ├── SSOStrategy.ts       ✅ 已实现
│   └── index.ts
├── oauth/
│   ├── OAuthStrategy.ts     🆕 新增
│   ├── OAuthCallbackHandler.ts
│   └── index.ts
├── oidc/
│   ├── OIDCStrategy.ts      🆕 新增
│   └── index.ts
└── saml/
    ├── SAMLStrategy.ts      🆕 新增
    └── index.ts
```

### Step 2：定义策略接口

```ts
// auth/types.ts
export interface AuthStrategy {
  login(params: LoginParams): Promise<AuthResult>;
  logout(): Promise<void>;
  refreshToken(): Promise<string>;
  handleCallback?(callbackUrl: string): Promise<AuthResult>; // OAuth/OIDC 专属
}
```

### Step 3：在 SDK 初始化时注入策略

```ts
const sdk = createSDK({
  baseURL: 'https://api.example.com',
  auth: {
    strategy: 'oidc',               // 'sso' | 'oauth' | 'oidc' | 'saml' | 'cas'
    oidc: {
      issuer: 'https://auth.example.com',
      clientId: 'my-app',
    },
  },
});
```

### Step 4：`authService.ts` 委托给策略

```ts
// auth/services/authService.ts
export function createAuthService(strategy: AuthStrategy) {
  return {
    login: (params) => strategy.login(params),
    logout: () => strategy.logout(),
  };
}
```

**优势**：新增认证方式**零改动**现有代码，完全符合开闭原则（OCP）。

---

## 六、现代 TypeScript SDK 推荐补充

### 6.1 推荐的工程配置

```json
// tsconfig.build.json（仅构建出口，不含测试）
{
  "extends": "./tsconfig.json",
  "exclude": ["tests", "**/*.test.ts", "**/*.spec.ts"]
}
```

```ts
// vite.config.ts（SDK Library 模式打包）
export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs'],     // 同时支持 ESM 和 CJS
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],   // peer dependency，不打包进去
    },
  },
});
```

### 6.2 package.json 关键字段

```json
{
  "name": "react-business-sdk",
  "main": "./dist/index.cjs.js",
  "module": "./dist/index.es.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.es.js",
      "require": "./dist/index.cjs.js",
      "types": "./dist/index.d.ts"
    },
    "./auth": {
      "import": "./dist/auth.es.js",
      "types": "./dist/auth.d.ts"
    }
  },
  "sideEffects": false
}
```

> `"sideEffects": false` 允许消费方的 bundler 做 Tree-shaking，只打包实际使用的 Feature。

### 6.3 子路径导出（推荐用于大型 SDK）

支持按需导入，减少 bundle size：

```ts
// 消费方可以只导入 auth 模块
import { useLogin } from 'react-business-sdk/auth';
import { usePermission } from 'react-business-sdk/permission';
```

### 6.4 推荐的测试结构

```
tests/
└── features/
    └── auth/
        ├── useLogin.test.ts      # Hook 测试（使用 renderHook）
        ├── authService.test.ts   # Service 单元测试
        └── AuthProvider.test.tsx # Provider 集成测试
```

---

## 七、设计原则总结

| 原则 | 说明 |
|---|---|
| **Feature First** | 按业务领域组织代码，而不是按技术类型 |
| **高内聚、低耦合** | 每个 Feature 内部完全自包含，通过 `index.ts` 对外暴露最小 API |
| **单向依赖** | `features` → `core` + `shared`，禁止 Feature 之间直接依赖 |
| **策略模式扩展** | 认证方式通过策略扩展，不修改核心代码 |
| **Tree-shakable** | `sideEffects: false`，消费方按需加载 |
| **类型优先** | 所有公共 API 导出对应的 TypeScript 类型 |
| **最小暴露原则** | `index.ts` 只暴露消费方需要的 API，内部实现细节不导出 |

---

## 八、参考的开源 SDK 设计

| 项目 | 借鉴点 |
|---|---|
| **React Query** (`@tanstack/query`) | `QueryClient` 配置注入 + Provider 模式 + 细粒度 Hook 设计 |
| **NextAuth.js** | 策略模式（Provider Strategy）+ 统一 Session Hook |
| **Zustand** | 极简初始化 API（`createStore`），零配置即用 |
| **Auth0 React SDK** | `Auth0Provider` + `useAuth0` 的整体设计，Feature 边界清晰 |
| **Clerk** | 子路径导出 + 组件与 Hook 并存的 Permission 设计 |
