import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Outilx",
  description: "Modern utility libraries for Node.js and Browser",
  base: "/outilx/",
  themeConfig: {
    nav: [
      { text: "Guide", link: "/guide/" },
      { text: "API", link: "/api/" },
      {
        text: "Packages",
        items: [
          { text: "@outilx/browser", link: "/api/browser/" },
          { text: "@outilx/node", link: "/api/node/" },
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
      ],
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/yourusername/outilx" },
    ],
    search: {
      provider: "local",
    },
  },
});
