# React 业务 SDK (React Business SDK)

一个面向业务的 React 组件和工具库 SDK，旨在为企业级应用封装常见的业务逻辑、组件和工具。

## 📦 安装

```bash
# 使用 npm
npm install react-business-sdk

# 使用 yarn
yarn add react-business-sdk

# 使用 pnpm
pnpm add react-business-sdk
```

## 🚀 特性

- **业务组件**: 为企业需求量身定制的可复用 React 组件（例如：高级表格、表单、数据看板）。
- **Hooks 与工具函数**: 提取到自定义 React Hooks 和工具函数中的通用业务逻辑。
- **服务层 (Service Layer)**: 预置的 API 服务接口和 HTTP 客户端封装。
- **TypeScript**: 针对业务实体和数据模型提供完善的 TypeScript 类型定义。

## 💻 使用示例

```tsx
import { BusinessComponent } from 'react-business-sdk';

function App() {
  return (
    <BusinessComponent 
      data={data} 
      onAction={(action) => console.log(action)} 
    />
  );
}
```

## 🛠️ 本地开发

### 环境准备

```bash
git clone <repository-url>
cd react-business-sdk
npm install
```

### 常用命令

- `npm run dev`: 启动本地开发环境 / Storybook。
- `npm run build`: 构建 SDK 生产包。
- `npm run test`: 运行单元测试。
- `npm run lint`: 运行 ESLint 和 Prettier 检查。

## 🤝 参与贡献

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的修改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到该分支 (`git push origin feature/AmazingFeature`)
5. 提交一个 Pull Request (PR)

## 📄 开源协议

本项目基于 MIT 协议开源 - 请查看 [LICENSE](LICENSE) 文件了解更多细节。
