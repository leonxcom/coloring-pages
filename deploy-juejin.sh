#!/bin/bash

# 清理历史部署
rm -rf dist/juejin-deploy

# 构建生产版本
npm run build -- --output-path=dist/juejin-deploy

# 创建部署专用入口
cat > dist/juejin-deploy/juejin.html <<EOF
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="refresh" content="0; url=./zh-CN/index.html">
</head>
</html>
EOF

# 优化图片资源
npm exec --yes --package=@squoosh/cli -- squoosh-cli --webp 'dist/juejin-deploy/images/**/*.{png,jpg}' -d 'dist/juejin-deploy/images'

# 生成压缩版本
find dist/juejin-deploy -type f \( -name '*.js' -o -name '*.css' -o -name '*.html' \) -exec brotli -Zkf {} \;

# 显示最终体积
du -sh dist/juejin-deploy