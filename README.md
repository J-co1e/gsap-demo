# GSAP TypeScript Demo

这是一个使用 GSAP 和 TypeScript 的演示项目，提供完整的类型提示支持。

## 功能特性

- ✅ 完整的 TypeScript 类型提示
- ✅ Vite 构建工具（快速热重载）
- ✅ GSAP 核心动画
- ✅ ScrollTrigger 滚动动画插件
- ✅ 示例代码和演示

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

开发服务器会自动在浏览器中打开（通常是 http://localhost:3000）

### 3. 构建生产版本

```bash
npm run build
```

构建后的文件会在 `dist` 目录中。

### 4. 预览生产版本

```bash
npm run preview
```

## 项目结构

```
gsap-ts-demo/
├── index.html          # HTML 入口文件
├── package.json        # 项目配置和依赖
├── tsconfig.json       # TypeScript 配置
├── vite.config.ts      # Vite 配置
├── src/
│   ├── main.ts         # TypeScript 入口文件（在这里编写 GSAP 代码）
│   └── style.css       # 样式文件
└── README.md           # 说明文档
```

## 编写代码

在 `src/main.ts` 文件中编写你的 GSAP 动画代码。由于安装了 `gsap` 包，你会获得完整的 TypeScript 类型提示和自动补全。

### 示例代码

```typescript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 基础动画
gsap.to('.element', {
  x: 100,
  rotation: 360,
  duration: 2,
  ease: 'power2.inOut'
});

// 时间轴动画
const tl = gsap.timeline();
tl.to('.element1', { x: 100, duration: 1 })
  .to('.element2', { y: 100, duration: 1 }, '<');

// 滚动触发动画
gsap.to('.element', {
  scrollTrigger: {
    trigger: '.element',
    start: 'top center',
    scrub: true
  },
  x: 500
});
```

## 可用的 GSAP 插件

项目已配置支持以下插件（需要时导入）：

- `gsap/ScrollTrigger` - 滚动触发动画
- `gsap/TextPlugin` - 文本动画
- `gsap/MotionPathPlugin` - 路径动画
- `gsap/Draggable` - 拖拽功能
- 更多插件请查看 [GSAP 文档](https://greensock.com/docs/)

## 开发提示

- 修改 `src/main.ts` 后，Vite 会自动重新编译并刷新浏览器
- 所有 TypeScript 类型错误会在终端和浏览器控制台中显示
- 使用 `console.log()` 调试时，确保类型正确以获得更好的开发体验

## 技术栈

- **GSAP 3.13.0** - 强大的动画库
- **TypeScript 5.3.0** - 类型安全的 JavaScript
- **Vite 5.0** - 快速的构建工具

## 更多资源

- [GSAP 官方文档](https://greensock.com/docs/)
- [GSAP 学习中心](https://greensock.com/learning/)
- [TypeScript 文档](https://www.typescriptlang.org/docs/)


