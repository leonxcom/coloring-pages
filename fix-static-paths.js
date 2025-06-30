#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 修复HTML文件中的路径
function fixHtmlPaths(filePath, relativePath = '') {
  console.log(`修复文件: ${filePath}`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // 将绝对路径转换为相对路径
  // /_next/static/ -> ../relative/_next/static/
  content = content.replace(/\/_next\/static\//g, `${relativePath}_next/static/`);
  
  // /images/ -> ../relative/images/
  content = content.replace(/\/images\//g, `${relativePath}images/`);
  
  // 修复favicon路径 /favicon.ico -> ../favicon.ico
  content = content.replace(/\/favicon\.ico/g, `${relativePath}favicon.ico`);
  
  // 修复链接路径 href="/zh-CN/" -> href="./"
  content = content.replace(/href="\/zh-CN\/"/g, 'href="./"');
  content = content.replace(/href="\/en\/"/g, 'href="../en/"');
  content = content.replace(/href="\/zh-TW\/"/g, 'href="../zh-TW/"');
  
  // 修复其他内部链接
  content = content.replace(/href="\/zh-CN\//g, 'href="./');
  content = content.replace(/href="\/en\//g, 'href="../en/');
  content = content.replace(/href="\/zh-TW\//g, 'href="../zh-TW/');
  
  // 修复语言选择器 - 将JavaScript驱动的选择器替换为静态链接
  content = fixLanguageSelector(content, filePath);
  
  fs.writeFileSync(filePath, content);
  console.log(`✅ 修复完成: ${filePath}`);
}

// 修复语言选择器
function fixLanguageSelector(content, filePath) {
  // 确定当前语言和目标路径
  let currentLang, zhPath, enPath, twPath;
  
  if (filePath.includes('/zh-CN/')) {
    currentLang = 'zh-CN';
    zhPath = './';
    enPath = '../en/';
    twPath = '../zh-TW/';
  } else if (filePath.includes('/en/')) {
    currentLang = 'en';
    zhPath = '../zh-CN/';
    enPath = './';
    twPath = '../zh-TW/';
  } else if (filePath.includes('/zh-TW/')) {
    currentLang = 'zh-TW';
    zhPath = '../zh-CN/';
    enPath = '../en/';
    twPath = './';
  } else {
    return content; // 不是语言目录中的文件
  }
  
  // 创建语言选择器的HTML
  const languageSelector = `
    <div class="relative">
      <div class="flex h-9 items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm w-[140px]">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe h-4 w-4 mr-2">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
          <path d="M2 12h20"></path>
        </svg>
        <span class="text-sm">${currentLang === 'zh-CN' ? '简体中文' : currentLang === 'en' ? 'English' : '繁體中文'}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down h-4 w-4 opacity-50">
          <path d="m6 9 6 6 6-6"></path>
        </svg>
      </div>
      <div class="absolute top-full left-0 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 opacity-0 hover:opacity-100 focus-within:opacity-100 transition-opacity group-hover:opacity-100" style="pointer-events: none;">
        <div class="py-1" style="pointer-events: auto;">
          <a href="${zhPath}" class="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 ${currentLang === 'zh-CN' ? 'bg-gray-100 dark:bg-gray-700' : ''}">简体中文</a>
          <a href="${enPath}" class="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 ${currentLang === 'en' ? 'bg-gray-100 dark:bg-gray-700' : ''}">English</a>
          <a href="${twPath}" class="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 ${currentLang === 'zh-TW' ? 'bg-gray-100 dark:bg-gray-700' : ''}">繁體中文</a>
        </div>
      </div>
    </div>`;

  // 使用CSS hover来显示下拉菜单
  const cssStyles = `
    <style>
      .lang-selector:hover .lang-dropdown,
      .lang-selector:focus-within .lang-dropdown {
        opacity: 1 !important;
        pointer-events: auto !important;
      }
    </style>`;

  // 替换JavaScript驱动的选择器
  // 先找到选择器的大致位置并替换
  const selectorPattern = /<button[^>]*role="combobox"[^>]*>[\s\S]*?<\/select>/g;
  content = content.replace(selectorPattern, `<div class="lang-selector group">${languageSelector}</div>`);
  
  // 添加CSS样式到head中
  if (!content.includes('lang-selector:hover')) {
    content = content.replace('</head>', `${cssStyles}</head>`);
  }
  
  // 处理移动端的语言选择器（在Sheet中）
  content = fixMobileLanguageSelector(content, zhPath, enPath, twPath, currentLang);
  
  return content;
}

// 修复移动端语言选择器
function fixMobileLanguageSelector(content, zhPath, enPath, twPath, currentLang) {
  // 在移动端菜单中添加语言链接
  const mobileLanguageLinks = `
    <div class="space-y-2">
      <div class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">语言 / Language</div>
      <a href="${zhPath}" class="block text-sm text-gray-600 hover:text-primary transition-colors dark:text-gray-400 dark:hover:text-primary ${currentLang === 'zh-CN' ? 'text-primary' : ''}">简体中文</a>
      <a href="${enPath}" class="block text-sm text-gray-600 hover:text-primary transition-colors dark:text-gray-400 dark:hover:text-primary ${currentLang === 'en' ? 'text-primary' : ''}">English</a>
      <a href="${twPath}" class="block text-sm text-gray-600 hover:text-primary transition-colors dark:text-gray-400 dark:hover:text-primary ${currentLang === 'zh-TW' ? 'text-primary' : ''}">繁體中文</a>
    </div>`;
  
  // 找到移动端菜单中的语言选择器并替换
  // 这个模式可能需要根据实际的HTML结构调整
  const mobileSelectorPattern = /<div class="flex items-center justify-between">[^<]*<span[^>]*>切换主题<\/span>[\s\S]*?<\/div>/g;
  
  // 替换移动端的主题切换部分，添加语言选择
  content = content.replace(
    /(<div class="flex items-center justify-between">\s*<span[^>]*>切换主题<\/span>[\s\S]*?<\/div>)/,
    `$1${mobileLanguageLinks}`
  );
  
  return content;
}

// 递归处理目录
function processDirectory(dirPath, baseDepth = 0) {
  const items = fs.readdirSync(dirPath);
  
  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // 递归处理子目录
      processDirectory(fullPath, baseDepth + 1);
    } else if (item.endsWith('.html')) {
      // 计算相对路径深度
      const relativePath = '../'.repeat(baseDepth);
      fixHtmlPaths(fullPath, relativePath);
    }
  }
}

// 主函数
function main() {
  const distPath = path.join(__dirname, 'dist');
  
  if (!fs.existsSync(distPath)) {
    console.error('❌ dist 目录不存在，请先运行 pnpm run build:static');
    process.exit(1);
  }
  
  console.log('🔧 开始修复静态文件路径...');
  
  // 处理根目录的HTML文件
  const rootHtmlFiles = fs.readdirSync(distPath).filter(file => file.endsWith('.html'));
  for (const file of rootHtmlFiles) {
    fixHtmlPaths(path.join(distPath, file), './');
  }
  
  // 处理语言目录
  const languageDirs = ['zh-CN', 'en', 'zh-TW'];
  for (const lang of languageDirs) {
    const langPath = path.join(distPath, lang);
    if (fs.existsSync(langPath)) {
      console.log(`\n📁 处理 ${lang} 目录...`);
      processDirectory(langPath, 1); // 深度为1，因为在子目录中
    }
  }
  
  // 处理404目录
  const notFoundPath = path.join(distPath, '404');
  if (fs.existsSync(notFoundPath)) {
    console.log('\n📁 处理 404 目录...');
    processDirectory(notFoundPath, 1);
  }
  
  // 复制favicon到各个目录
  const faviconSource = path.join(distPath, 'favicon.ico');
  if (fs.existsSync(faviconSource)) {
    console.log('📁 复制favicon到子目录...');
    
    // 创建favicon的副本到每个语言目录
    languageDirs.forEach(locale => {
      const localeDir = path.join(distPath, locale);
      if (fs.existsSync(localeDir)) {
        const faviconTarget = path.join(localeDir, 'favicon.ico');
        fs.copyFileSync(faviconSource, faviconTarget);
        console.log(`✅ 复制完成: ${locale}/favicon.ico`);
      }
    });
  }
  
  console.log('\n🎉 所有路径修复完成！');
  console.log('💡 现在您可以直接双击 dist/zh-CN/index.html 文件打开网站了！');
}

main(); 