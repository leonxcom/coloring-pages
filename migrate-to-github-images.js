#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');

console.log('🚀 GitHub图片迁移批量处理开始...\n');

// GitHub配置 - 请根据你的仓库信息修改
const GITHUB_CONFIG = {
    username: 'leonxcom',  // 替换为你的GitHub用户名
    repo: 'coloring-pages',            // 仓库名
    branch: 'main',                    // 分支名
    imagesPath: 'public/images'        // 图片存储路径
};

// 生成GitHub raw链接
function generateGitHubURL(filename) {
    return `https://raw.githubusercontent.com/${GITHUB_CONFIG.username}/${GITHUB_CONFIG.repo}/${GITHUB_CONFIG.branch}/${GITHUB_CONFIG.imagesPath}/${filename}`;
}

// 下载单个文件
function downloadFile(url, filepath) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filepath);
        
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`下载失败: ${response.statusCode} ${url}`));
                return;
            }
            
            response.pipe(file);
            
            file.on('finish', () => {
                file.close();
                resolve();
            });
            
            file.on('error', (err) => {
                fs.unlink(filepath, () => {}); // 删除损坏的文件
                reject(err);
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

// 提取当前所有图片链接
function extractImageLinks() {
    console.log('📋 提取图片链接...');
    
    const htmlContent = fs.readFileSync('dist/index.html', 'utf8');
    const imageRegex = /https:\/\/[^"]*\.(webp|png)/g;
    const links = htmlContent.match(imageRegex) || [];
    
    // 去重
    const uniqueLinks = [...new Set(links)];
    
    console.log(`  ✅ 找到 ${uniqueLinks.length} 个唯一图片链接`);
    return uniqueLinks;
}

// 创建目录结构
function createDirectories() {
    console.log('📁 创建目录结构...');
    
    const dirs = [
        'public',
        'public/images',
        'public/images/coloring-pages',
        'public/images/hero'
    ];
    
    dirs.forEach(dir => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
            console.log(`  ✅ 创建目录: ${dir}`);
        }
    });
}

// 批量下载图片
async function downloadImages(imageLinks) {
    console.log('\n📥 开始批量下载图片...');
    
    const urlMapping = new Map(); // 存储 原链接 -> GitHub链接 的映射
    
    for (let i = 0; i < imageLinks.length; i++) {
        const url = imageLinks[i];
        let filename, localPath, githubURL;
        
        try {
            if (url.includes('ai-coloring-hero.png')) {
                // Hero图片
                filename = 'ai-coloring-hero.png';
                localPath = path.join('public', 'images', 'hero', filename);
                githubURL = generateGitHubURL(`hero/${filename}`);
            } else {
                // 涂色页面图片
                const match = url.match(/(\d+)\.webp$/);
                if (match) {
                    filename = `${match[1]}.webp`;
                    localPath = path.join('public', 'images', 'coloring-pages', filename);
                    githubURL = generateGitHubURL(`coloring-pages/${filename}`);
                } else {
                    console.log(`  ⚠️  跳过无法解析的链接: ${url}`);
                    continue;
                }
            }
            
            console.log(`  [${i + 1}/${imageLinks.length}] 下载: ${filename}`);
            await downloadFile(url, localPath);
            
            // 记录映射
            urlMapping.set(url, githubURL);
            
            console.log(`    ✅ 已保存: ${localPath}`);
            
        } catch (error) {
            console.error(`    ❌ 下载失败 ${url}: ${error.message}`);
        }
    }
    
    console.log(`\n✅ 下载完成! 成功: ${urlMapping.size}/${imageLinks.length}`);
    return urlMapping;
}

// 更新HTML文件
function updateHTMLFiles(urlMapping) {
    console.log('\n📝 更新HTML文件...');
    
    const htmlFiles = ['dist/index.html', 'dist/index-minimal.html'].filter(f => fs.existsSync(f));
    
    htmlFiles.forEach(file => {
        console.log(`  📄 处理: ${file}`);
        let content = fs.readFileSync(file, 'utf8');
        let replacedCount = 0;
        
        // 替换所有映射的链接
        urlMapping.forEach((githubURL, originalURL) => {
            const regex = new RegExp(originalURL.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
            const matches = content.match(regex);
            if (matches) {
                content = content.replace(regex, githubURL);
                replacedCount += matches.length;
            }
        });
        
        fs.writeFileSync(file, content);
        console.log(`    ✅ 替换了 ${replacedCount} 个链接`);
    });
}

// 生成迁移报告
function generateReport(urlMapping, imageLinks) {
    console.log('\n📊 生成迁移报告...');
    
    const report = {
        timestamp: new Date().toISOString(),
        github: GITHUB_CONFIG,
        migration: {
            totalFound: imageLinks.length,
            totalDownloaded: urlMapping.size,
            successRate: Math.round((urlMapping.size / imageLinks.length) * 100),
        },
        mappings: Object.fromEntries(urlMapping),
        nextSteps: [
            "1. 检查 public/images/ 目录中的所有图片",
            "2. 将 public/images/ 目录上传到你的GitHub仓库",
            "3. 确保GitHub仓库是公开的",
            "4. 修改脚本中的 GITHUB_CONFIG",
            "5. 重新运行脚本生成正确的GitHub链接",
            "6. 测试HTML文件中的图片链接"
        ]
    };
    
    fs.writeFileSync('github-migration-report.json', JSON.stringify(report, null, 2));
    console.log('  ✅ 报告已保存: github-migration-report.json');
    
    return report;
}

// 生成上传说明
function generateUploadInstructions() {
    console.log('\n📋 生成上传说明...');
    
    const instructions = `# GitHub图片上传说明

## 🎯 下一步操作

### 1. 检查下载的图片
\`\`\`bash
ls -la public/images/hero/        # Hero图片
ls -la public/images/coloring-pages/  # 涂色页面图片
\`\`\`

### 2. 上传到GitHub
\`\`\`bash
# 添加图片到git
git add public/images/

# 提交
git commit -m "Add images for GitHub hosting"

# 推送到GitHub
git push origin main
\`\`\`

### 3. 更新配置
修改 \`migrate-to-github-images.js\` 中的配置:
\`\`\`javascript
const GITHUB_CONFIG = {
    username: 'YOUR_ACTUAL_USERNAME',  // 你的GitHub用户名
    repo: 'coloring-pages',
    branch: 'main',
    imagesPath: 'public/images'
};
\`\`\`

### 4. 重新生成链接
\`\`\`bash
node migrate-to-github-images.js
\`\`\`

### 5. 测试验证
打开更新后的HTML文件，确认所有图片都能正常加载。

## 📋 图片清单
- Hero图片: public/images/hero/ai-coloring-hero.png
- 涂色页面: public/images/coloring-pages/*.webp (30张)

## 🔗 GitHub链接格式
\`https://raw.githubusercontent.com/[用户名]/coloring-pages/main/public/images/[分类]/[文件名]\`
`;

    fs.writeFileSync('GITHUB_UPLOAD_INSTRUCTIONS.md', instructions);
    console.log('  ✅ 说明已保存: GITHUB_UPLOAD_INSTRUCTIONS.md');
}

// 主函数
async function main() {
    try {
        // 检查配置
        if (GITHUB_CONFIG.username === 'leonxcom') {
            console.log('⚠️  请先在脚本中配置你的GitHub信息!');
            console.log('   修改 GITHUB_CONFIG 中的 username');
            console.log('\n继续执行图片下载...\n');
        }
        
        // 创建目录
        createDirectories();
        
        // 提取图片链接
        const imageLinks = extractImageLinks();
        
        // 下载图片
        const urlMapping = await downloadImages(imageLinks);
        
        // 生成报告
        const report = generateReport(urlMapping, imageLinks);
        
        // 生成说明
        generateUploadInstructions();
        
        // 显示摘要
        console.log('\n🎉 迁移准备完成!');
        console.log(`📊 统计: ${report.migration.totalDownloaded}/${report.migration.totalFound} 图片已下载 (${report.migration.successRate}%)`);
        console.log('\n📋 下一步:');
        console.log('1. 检查 public/images/ 目录');
        console.log('2. 配置你的GitHub用户名');
        console.log('3. 上传图片到GitHub');
        console.log('4. 重新运行脚本生成正确链接');
        console.log('\n📄 详见: GITHUB_UPLOAD_INSTRUCTIONS.md');
        
    } catch (error) {
        console.error('❌ 迁移失败:', error);
        process.exit(1);
    }
}

main(); 