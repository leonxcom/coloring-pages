const fs = require('fs');
const path = require('path');

console.log('🔧 创建本地测试版本...');

const indexPath = './dist/index.html';
const localIndexPath = './dist/index-local.html';

if (!fs.existsSync(indexPath)) {
    console.error('❌ 未找到dist/index.html文件');
    process.exit(1);
}

// 读取原始HTML内容
let content = fs.readFileSync(indexPath, 'utf8');

console.log('📊 原始文件大小:', content.length, '字符');

// 统计原始GitHub链接
const githubHeroCount = (content.match(/https:\/\/raw\.githubusercontent\.com\/leonxcom\/coloring-pages\/main\/public\/images\/hero/g) || []).length;
const githubColoringCount = (content.match(/https:\/\/raw\.githubusercontent\.com\/leonxcom\/coloring-pages\/main\/public\/images\/coloring-pages/g) || []).length;

console.log('📋 发现GitHub链接:');
console.log('  - Hero图片:', githubHeroCount, '个');
console.log('  - 涂色页面:', githubColoringCount, '个');

// 替换GitHub链接为相对路径
// Hero图片: https://raw.githubusercontent.com/leonxcom/coloring-pages/main/public/images/hero/ai-coloring-hero.png -> ./images/hero/ai-coloring-hero.png
content = content.replace(
    /https:\/\/raw\.githubusercontent\.com\/leonxcom\/coloring-pages\/main\/public\/images\/hero\/ai-coloring-hero\.png/g,
    './images/hero/ai-coloring-hero.png'
);

// 涂色页面图片: https://raw.githubusercontent.com/leonxcom/coloring-pages/main/public/images/coloring-pages/FILENAME.webp -> ./images/coloring-pages/FILENAME.webp
content = content.replace(
    /https:\/\/raw\.githubusercontent\.com\/leonxcom\/coloring-pages\/main\/public\/images\/coloring-pages\/([^"']*\.webp)/g,
    './images/coloring-pages/$1'
);

// 统计替换后的情况
const localHeroCount = (content.match(/\.\/images\/hero/g) || []).length;
const localColoringCount = (content.match(/\.\/images\/coloring-pages/g) || []).length;
const remainingGithubCount = (content.match(/https:\/\/raw\.githubusercontent\.com/g) || []).length;

console.log('🔄 替换结果:');
console.log('  - 本地Hero图片:', localHeroCount, '个');
console.log('  - 本地涂色页面:', localColoringCount, '个');
console.log('  - 剩余GitHub链接:', remainingGithubCount, '个');

// 写入本地版本
fs.writeFileSync(localIndexPath, content, 'utf8');

console.log('✅ 本地版本创建完成!');
console.log('📄 文件位置:', localIndexPath);
console.log('📊 文件大小:', content.length, '字符');

// 验证图片文件存在
console.log('🔍 验证图片文件:');
const heroPath = './dist/images/hero/ai-coloring-hero.png';
const coloringDir = './dist/images/coloring-pages/';

if (fs.existsSync(heroPath)) {
    const heroStats = fs.statSync(heroPath);
    console.log('  ✅ Hero图片:', Math.round(heroStats.size / 1024), 'KB');
} else {
    console.log('  ❌ Hero图片缺失');
}

if (fs.existsSync(coloringDir)) {
    const coloringFiles = fs.readdirSync(coloringDir).filter(f => f.endsWith('.webp'));
    console.log('  ✅ 涂色页面:', coloringFiles.length, '个文件');
} else {
    console.log('  ❌ 涂色页面目录缺失');
}

console.log('🎯 使用说明:');
console.log('1. 双击打开:', localIndexPath);
console.log('2. 或用浏览器打开该文件测试所有功能');
console.log('3. 所有图片现在使用相对路径，可以离线查看'); 