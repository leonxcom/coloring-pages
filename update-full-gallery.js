#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 外链基础URL
const EXTERNAL_BASE_URL = 'https://ext.same-assets.com/2742100107/';

// 完整的30张图片数据（包含标题）
const allImages = [
  { id: '2449589214.webp', alt: 'Aesthetic Coloring Pages', title: 'Aesthetic Coloring Pages' },
  { id: '3661199039.webp', alt: 'Alien Coloring Pages', title: 'Alien Coloring Pages' },
  { id: '3621435478.webp', alt: 'Architecture Coloring Pages', title: 'Architecture Coloring Pages' },
  { id: '1220896302.webp', alt: 'Ballerina Coloring Pages', title: 'Ballerina Coloring Pages' },
  { id: '596536247.webp', alt: 'Beach Coloring Pages', title: 'Beach Coloring Pages' },
  { id: '3004900862.webp', alt: 'Boba Coloring Pages', title: 'Boba Coloring Pages' },
  { id: '930033431.webp', alt: 'Bunny Coloring Pages', title: 'Bunny Coloring Pages' },
  { id: '1094903095.webp', alt: 'Capybara Coloring Pages', title: 'Capybara Coloring Pages' },
  { id: '1286000515.webp', alt: 'Cat Coloring Pages', title: 'Cat Coloring Pages' },
  { id: '3407757796.webp', alt: 'Christmas Tree Coloring Pages', title: 'Christmas Tree Coloring Pages' },
  { id: '4109091522.webp', alt: 'Construction Coloring Pages', title: 'Construction Coloring Pages' },
  { id: '2237175773.webp', alt: 'Cow Coloring Pages', title: 'Cow Coloring Pages' },
  { id: '2216799269.webp', alt: 'Dinosaur Coloring Pages', title: 'Dinosaur Coloring Pages' },
  { id: '1931439364.webp', alt: 'Dinosaur: Brachiosaurus Coloring Pages', title: 'Dinosaur: Brachiosaurus Coloring Pages' },
  { id: '1224725554.webp', alt: 'Dinosaur: Stegosaurus Coloring Pages', title: 'Dinosaur: Stegosaurus Coloring Pages' },
  { id: '2814148537.webp', alt: 'Dinosaur: T-Rex Coloring Pages', title: 'Dinosaur: T-Rex Coloring Pages' },
  { id: '1404643698.webp', alt: 'Dinosaur: Triceratops Coloring Pages', title: 'Dinosaur: Triceratops Coloring Pages' },
  { id: '3422297540.webp', alt: 'Dinosaur: Velociraptor Coloring Pages', title: 'Dinosaur: Velociraptor Coloring Pages' },
  { id: '2720882725.webp', alt: 'Dog Coloring Pages', title: 'Dog Coloring Pages' },
  { id: '4188607691.webp', alt: 'Realistic Dog Coloring Pages', title: 'Realistic Dog Coloring Pages' },
  { id: '2481990420.webp', alt: 'Dragon Coloring Pages', title: 'Dragon Coloring Pages' },
  { id: '3996295941.webp', alt: 'Earth Day Coloring Pages', title: 'Earth Day Coloring Pages' },
  { id: '1066963183.webp', alt: 'Easter Coloring Pages', title: 'Easter Coloring Pages' },
  { id: '1588406660.webp', alt: 'Easter Bunny Coloring Pages', title: 'Easter Bunny Coloring Pages' },
  { id: '1370122994.webp', alt: 'Easter Egg Coloring Pages', title: 'Easter Egg Coloring Pages' },
  { id: '2800571658.webp', alt: 'Fairy Coloring Pages', title: 'Fairy Coloring Pages' },
  { id: '1831182055.webp', alt: 'Father\'s Day Coloring Pages', title: 'Father\'s Day Coloring Pages' },
  { id: '2771972323.webp', alt: 'Fire Truck Coloring Pages', title: 'Fire Truck Coloring Pages' },
  { id: '1211563995.webp', alt: 'Flower Coloring Pages', title: 'Flower Coloring Pages' },
  { id: '1679282424.webp', alt: 'Fourth of July Coloring Pages', title: 'Fourth of July Coloring Pages' }
];

// 生成单个图片卡片的HTML
function generateImageCard(image) {
  return `          <div class="relative group block p-2 h-full w-full cursor-pointer">
            <div class="rounded-2xl h-full w-full p-4 overflow-hidden bg-white dark:bg-gray-900 border border-transparent group-hover:border-purple-300 relative shadow-lg group-hover:shadow-xl transition-all duration-300">
              <div class="space-y-4">
                <div class="aspect-square relative overflow-hidden bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <img alt="${image.alt}" loading="lazy" class="object-contain group-hover:scale-105 transition-transform duration-300 w-full h-full" src="${EXTERNAL_BASE_URL}${image.id}"/>
                </div>
                <h4 class="text-center text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-purple-600 transition-colors tracking-wide">${image.title}</h4>
              </div>
            </div>
          </div>`;
}

function updateFullGallery() {
  console.log('🔄 开始更新HTML文件，添加完整的30张图片画廊...\n');
  
  const htmlFile = path.join(__dirname, 'dist/index.html');
  
  if (!fs.existsSync(htmlFile)) {
    console.error('❌ 找不到 dist/index.html 文件');
    return;
  }
  
  let content = fs.readFileSync(htmlFile, 'utf8');
  
  // 生成所有图片卡片的HTML
  const allCardsHtml = allImages.map(image => generateImageCard(image)).join('\n          \n');
  
  // 查找并替换图片画廊部分
  const galleryStartPattern = /<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">/;
  const galleryEndPattern = /<\/div>\s*<div class="text-center">/;
  
  const startMatch = content.match(galleryStartPattern);
  const endMatch = content.match(galleryEndPattern);
  
  if (startMatch && endMatch) {
    const startIndex = startMatch.index + startMatch[0].length;
    const endIndex = endMatch.index;
    
    // 替换画廊内容
    const newContent = content.substring(0, startIndex) + '\n' + allCardsHtml + '\n        ' + content.substring(endIndex);
    
    // 写回文件
    fs.writeFileSync(htmlFile, newContent);
    
    console.log(`✅ 成功更新HTML文件，现在包含所有 ${allImages.length} 张涂色页面`);
    console.log('🌐 所有图片都使用外链格式：https://ext.same-assets.com/2742100107/');
  } else {
    console.error('❌ 无法找到图片画廊部分');
  }
}

// 显示最终文件大小
function showFinalSize() {
  const { execSync } = require('child_process');
  try {
    const size = execSync('du -sh dist/', { encoding: 'utf8' }).trim();
    console.log(`\n📊 最终 dist 文件夹大小: ${size.split('\t')[0]}`);
    
    const htmlSize = execSync('ls -lah dist/index.html', { encoding: 'utf8' });
    const htmlSizeMatch = htmlSize.match(/\s+(\d+[KMG]?\s+)/);
    if (htmlSizeMatch) {
      console.log(`📄 index.html 文件大小: ${htmlSizeMatch[1].trim()}`);
    }
  } catch (error) {
    console.log('\n📊 无法获取文件大小信息');
  }
}

// 执行脚本
if (require.main === module) {
  updateFullGallery();
  showFinalSize();
} 