import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Outilx",
  description: "Modern utility library collection for JavaScript/TypeScript",
  base: "/outilx/",
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/outilx/favicon.svg' }],
  ],
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: "Guide", link: "/guide/" },
      { text: "API", link: "/api/" },
      {
        text: "Packages",
        items: [
          { text: "@outilx/browser", link: "/api/browser/" },
          { text: "@outilx/node", link: "/api/node/" },
          { text: "@outilx/react-hooks", link: "/api/react-hooks/" },
          { text: "@outilx/ai", link: "/api/ai/" },
        ],
      },
    ],
    sidebar: {
      "/guide/": [
        {
          text: "Introduction",
          items: [
            { text: "Getting Started", link: "/guide/" },
            { text: "Installation", link: "/guide/installation" },
          ],
        },
        {
          text: "Packages",
          items: [
            { text: "Browser", link: "/guide/browser" },
            { text: "Node.js", link: "/guide/node" },
            { text: "React Hooks", link: "/guide/react-hooks" },
            { text: "AI", link: "/guide/ai" },
          ],
        },
      ],
      "/api/": [
        {
          text: "Overview",
          items: [{ text: "API Reference", link: "/api/" }],
        },
        {
          text: "@outilx/browser",
          items: [
            { text: "Array", link: "/api/browser/array" },
            { text: "Cache", link: "/api/browser/cache" },
            { text: "JSON", link: "/api/browser/json" },
            { text: "URL", link: "/api/browser/url" },
            { text: "Network", link: "/api/browser/network" },
          ],
        },
        {
          text: "@outilx/node",
          items: [
            { text: "File Operations", link: "/api/node/file-operations" },
            { text: "Directory", link: "/api/node/directory" },
            { text: "Repository", link: "/api/node/repository" },
          ],
        },
        {
          text: "@outilx/react-hooks",
          items: [
            { text: "Overview", link: "/api/react-hooks/" },
            { text: "State Management", link: "/api/react-hooks/state" },
            { text: "Storage", link: "/api/react-hooks/storage" },
            { text: "Performance", link: "/api/react-hooks/performance" },
            { text: "Lifecycle", link: "/api/react-hooks/lifecycle" },
            { text: "Async", link: "/api/react-hooks/async" },
            { text: "Utilities", link: "/api/react-hooks/utilities" },
          ],
        },
        {
          text: "@outilx/ai",
          items: [
            { text: "Overview", link: "/api/ai/" },
            { text: "Code Detection", link: "/api/ai/code-detection" },
            { text: "Streaming", link: "/api/ai/streaming" },
            { text: "SSE", link: "/api/ai/sse" },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/Sunny-117/outilx" },
    ],
    search: {
      provider: "local",
    },
  },
});
