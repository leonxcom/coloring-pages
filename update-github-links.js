#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const indexPath = './dist/index.html';

console.log('🔧 正在更新图片链接到GitHub...');

if (!fs.existsSync(indexPath)) {
    console.error('❌ 未找到dist/index.html文件');
    process.exit(1);
}

// 读取文件内容
let content = fs.readFileSync(indexPath, 'utf8');

console.log('📊 原始文件大小:', content.length, '字符');

// GitHub仓库信息
const GITHUB_REPO = 'leonxcom/coloring-pages';
const GITHUB_BRANCH = 'main';
const GITHUB_BASE_URL = `https://raw.githubusercontent.com/${GITHUB_REPO}/${GITHUB_BRANCH}/public`;

// 统计原始链接数量
const originalVercelCount = (content.match(/https:\/\/coloringplanet\.vercel\.app/g) || []).length;
const originalExtCount = (content.match(/https:\/\/ext\.same-assets\.com/g) || []).length;

console.log('📋 发现需要替换的链接:');
console.log('  - Vercel域名:', originalVercelCount, '个');
console.log('  - 外链域名:', originalExtCount, '个');

// 替换Hero图片链接 (vercel.app -> GitHub)
content = content.replace(
    /https:\/\/coloringplanet\.vercel\.app\/images\/hero\/ai-coloring-hero\.png/g,
    `${GITHUB_BASE_URL}/images/hero/ai-coloring-hero.png`
);

// 替换涂色页面图片链接 (ext.same-assets.com -> GitHub)
// 从 https://ext.same-assets.com/2742100107/FILENAME.webp 
// 到 https://raw.githubusercontent.com/leonxcom/coloring-pages/main/public/images/coloring-pages/FILENAME.webp
content = content.replace(
    /https:\/\/ext\.same-assets\.com\/\d+\/([^"']*\.webp)/g,
    `${GITHUB_BASE_URL}/images/coloring-pages/$1`
);

// 统计替换后的链接数量
const newGithubCount = (content.match(/https:\/\/raw\.githubusercontent\.com/g) || []).length;
const remainingVercelCount = (content.match(/https:\/\/coloringplanet\.vercel\.app/g) || []).length;
const remainingExtCount = (content.match(/https:\/\/ext\.same-assets\.com/g) || []).length;

console.log('🔄 替换结果:');
console.log('  - 新GitHub链接:', newGithubCount, '个');
console.log('  - 剩余Vercel链接:', remainingVercelCount, '个');
console.log('  - 剩余外链:', remainingExtCount, '个');

// 写入更新后的内容
fs.writeFileSync(indexPath, content, 'utf8');

console.log('✅ 图片链接更新完成!');
console.log('📊 更新后文件大小:', content.length, '字符');

// 生成GitHub版本的HTML文件
const githubIndexPath = './dist/index-github.html';
fs.writeFileSync(githubIndexPath, content, 'utf8');
console.log('📄 已生成GitHub版本:', githubIndexPath);

console.log('🎉 所有图片链接已更新为GitHub链接!'); 