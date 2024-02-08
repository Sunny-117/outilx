# treejs

🌱 易上手、高性能、强拓展的 Tree 组件，同时支持 Vuejs 和 React

## Install

```bash
pnpm install @treejs/react
```

## Usage

```tsx
import { Tree, DataNode } from "@treejs/react";

const treeData = [
  {
    title: "parent 1",
    key: "0-0",
    children: [
      {
        title: "parent 1-0",
        key: "0-0-0",
        children: [
          {
            title: "leaf",
            key: "0-0-0-0",
            children: [
              {
                title: "last",
                key: "0-0-0-0-0",
              },
              {
                title: "last",
                key: "0-0-0-1-1",
              },
            ],
          },
          {
            title: "leaf",
            key: "0-0-0-1",
          },
        ],
      },
      {
        title: "parent 1-1",
        key: "0-0-1",
        children: [
          {
            title: <span style={{ color: "#1677ff" }}>sss</span>,
            key: "0-0-1-0",
          },
        ],
      },
    ],
  },
];

const App = () => {
  return <Tree treeData={treeData} />;
};

export default App;
```
