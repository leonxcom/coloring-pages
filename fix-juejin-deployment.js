#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 修复掘金部署后端错误...\n');

// 方案1: 重命名CSS文件为普通名称
function renameCSSFile() {
    console.log('📝 方案1: 重命名CSS文件...');
    
    const oldName = 'dist/bfb3d4d5cbb4d488.css';
    const newName = 'dist/styles.css';
    
    if (fs.existsSync(oldName)) {
        // 重命名文件
        fs.renameSync(oldName, newName);
        console.log(`  ✅ 已重命名: ${oldName} → ${newName}`);
        
        // 更新HTML引用
        const htmlFile = 'dist/index.html';
        let content = fs.readFileSync(htmlFile, 'utf8');
        content = content.replace('bfb3d4d5cbb4d488.css', 'styles.css');
        fs.writeFileSync(htmlFile, content);
        console.log('  ✅ 已更新HTML引用');
    }
}

// 方案2: 减少外链数量（移除部分外链）
function reduceExternalLinks() {
    console.log('\n📝 方案2: 分析外链使用...');
    
    const htmlFile = 'dist/index.html';
    const content = fs.readFileSync(htmlFile, 'utf8');
    
    // 统计外链
    const extAssets = (content.match(/https:\/\/ext\.same-assets\.com/g) || []).length;
    const vercelAssets = (content.match(/https:\/\/coloringplanet\.vercel\.app/g) || []).length;
    const totalLinks = (content.match(/https:\/\//g) || []).length;
    
    console.log(`  📊 外链统计:`);
    console.log(`    - ext.same-assets.com: ${extAssets}个`);
    console.log(`    - coloringplanet.vercel.app: ${vercelAssets}个`);
    console.log(`    - 总外链: ${totalLinks}个`);
    
    if (totalLinks > 20) {
        console.log(`  ⚠️  外链过多可能导致掘金限制`);
        console.log(`  💡 建议: 考虑下载关键图片到本地`);
    }
}

// 方案3: 创建最小版本（仅保留核心功能）
function createMinimalVersion() {
    console.log('\n📝 方案3: 创建最小版本...');
    
    const htmlFile = 'dist/index.html';
    let content = fs.readFileSync(htmlFile, 'utf8');
    
    // 移除preload外链
    content = content.replace(/<link[^>]*preload[^>]*https:\/\/[^>]*>/g, '');
    
    // 创建简化版本
    const minimalFile = 'dist/index-minimal.html';
    fs.writeFileSync(minimalFile, content);
    console.log(`  ✅ 已创建最小版本: ${minimalFile}`);
}

// 方案4: 生成调试信息
function generateDebugInfo() {
    console.log('\n📝 方案4: 生成调试信息...');
    
    const distFiles = fs.readdirSync('dist/');
    const debugInfo = {
        timestamp: new Date().toISOString(),
        files: [],
        totalSize: 0,
        externalLinks: {
            total: 0,
            domains: {}
        }
    };
    
    // 收集文件信息
    distFiles.forEach(file => {
        const filePath = path.join('dist', file);
        const stats = fs.statSync(filePath);
        debugInfo.files.push({
            name: file,
            size: stats.size,
            sizeKB: Math.round(stats.size / 1024)
        });
        debugInfo.totalSize += stats.size;
    });
    
    // 分析HTML中的外链
    const htmlFile = 'dist/index.html';
    if (fs.existsSync(htmlFile)) {
        const content = fs.readFileSync(htmlFile, 'utf8');
        const links = content.match(/https:\/\/[^\s"'<>]+/g) || [];
        
        debugInfo.externalLinks.total = links.length;
        
        links.forEach(link => {
            const domain = link.match(/https:\/\/([^\/]+)/)[1];
            debugInfo.externalLinks.domains[domain] = (debugInfo.externalLinks.domains[domain] || 0) + 1;
        });
    }
    
    // 保存调试信息
    fs.writeFileSync('debug-info.json', JSON.stringify(debugInfo, null, 2));
    console.log('  ✅ 调试信息已保存: debug-info.json');
    
    // 输出摘要
    console.log(`\n📊 项目摘要:`);
    console.log(`  - 文件数: ${debugInfo.files.length}个`);
    console.log(`  - 总大小: ${Math.round(debugInfo.totalSize/1024)}KB`);
    console.log(`  - 外链数: ${debugInfo.externalLinks.total}个`);
    console.log(`  - 外链域名: ${Object.keys(debugInfo.externalLinks.domains).length}个`);
}

// 主要解决方案建议
function printSolutions() {
    console.log('\n🚀 掘金部署问题解决方案:\n');
    
    console.log('方案A: 立即重试 (推荐)');
    console.log('  - 掘金后端可能临时故障');
    console.log('  - 等待5-10分钟后重新部署');
    console.log('');
    
    console.log('方案B: 使用重命名版本');
    console.log('  - CSS文件名已改为普通名称');
    console.log('  - 避免哈希文件名被误判');
    console.log('');
    
    console.log('方案C: 联系掘金客服');
    console.log('  - 提供错误信息: "internal error: 1:后端内部错误"');
    console.log('  - 说明项目特点: 108KB静态站点');
    console.log('');
    
    console.log('方案D: 外链本地化 (最后手段)');
    console.log('  - 下载关键图片到本地');
    console.log('  - 减少外链依赖');
}

// 执行修复
async function main() {
    try {
        renameCSSFile();
        reduceExternalLinks();
        createMinimalVersion();
        generateDebugInfo();
        printSolutions();
        
        console.log('\n✅ 修复完成!');
        console.log('📄 检查 debug-info.json 获取详细信息');
        
    } catch (error) {
        console.error('❌ 修复失败:', error);
    }
}

main(); 