import { defineSidebarConfig } from "vuepress-theme-hope";

export default defineSidebarConfig([
  "",
  "home",
  "slide",
  {
    text: "如何使用",
    icon: "creative",
    prefix: "guide/",
    link: "guide/",
    children: "structure",
  },
  {
    text: "文章",
    icon: "note",
    prefix: "posts/",
    children: [
      {
        text: "文章1",
        icon: "note",
        collapsable: true,
        prefix: "article/",
        children: ["Overview", "ReflowRedraw", "BrowserSupplement"],
      },
      {
        text: "文章2",
        icon: "note",
        children: [
          {
            text: "js",
            icon: "note",
            collapsable: true,
            prefix: "article/",
            children: ["object", "throttle", "es6"],
          },
        ],
      },
    ],
  },
]);
