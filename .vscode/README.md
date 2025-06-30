# VS Code 配置说明

## Tailwind CSS 支持

本项目已配置VS Code以完美支持Tailwind CSS开发。

### 已解决的问题

1. **CSS Linter 错误**: 解决了 `@tailwind` 和 `@apply` 指令被标记为"未知规则"的问题
2. **IntelliSense 支持**: 提供Tailwind CSS类名的自动补全和语法提示
3. **文件关联**: 正确识别CSS文件为Tailwind CSS文件

### 配置文件说明

#### `settings.json`
- `css.validate: false` - 禁用内置CSS验证，避免Tailwind指令冲突
- `css.lint.unknownAtRules: "ignore"` - 忽略未知@规则警告
- `tailwindCSS.includeLanguages` - 在不同文件类型中启用Tailwind支持
- `files.associations` - 将CSS文件关联为Tailwind CSS

#### `extensions.json`
推荐安装的VS Code扩展：
- `bradlc.vscode-tailwindcss` - Tailwind CSS IntelliSense
- `esbenp.prettier-vscode` - 代码格式化
- `lokalise.i18n-ally` - 国际化支持

### 使用说明

1. 确保安装推荐的VS Code扩展
2. 重启VS Code以应用配置
3. 在CSS文件中使用 `@tailwind` 和 `@apply` 指令时不再出现错误提示
4. 享受完整的Tailwind CSS开发体验

### 故障排除

如果仍然遇到CSS linter错误：
1. 确保已安装 `bradlc.vscode-tailwindcss` 扩展
2. 重启VS Code
3. 运行 "Developer: Reload Window" 命令 