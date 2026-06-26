---
sidebar_position: 1
---

# Getting Started

Welcome to **React Business SDK**! This SDK provides essential business modules like Authentication, User Information, Permissions, Tenant Management, and Feature Flags for React applications.

## Installation

```bash
npm install react-business-sdk
```

## Initialization

Wrap your application with the `SDKProvider` and initialize it with your configuration:

```tsx
import { createSDK } from 'react-business-sdk';

const sdk = createSDK({
  baseURL: 'https://api.yourdomain.com',
  timeout: 10000,
  auth: {
    type: 'sso',
  },
});

function App() {
  return (
    <sdk.Provider>
      <YourAppComponents />
    </sdk.Provider>
  );
}

export default App;
```

## Next Steps

Explore the individual features in the sidebar to learn how to use hooks like `useLogin`, `usePermission`, `useCurrentTenant`, etc.
