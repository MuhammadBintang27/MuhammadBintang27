import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directories to process
const directories = [
  path.join(__dirname, '../public/galeri'),
  path.join(__dirname, '../public/project'),
  path.join(__dirname, '../public/project/projectdetails'),
  path.join(__dirname, '../public')
];

// Image extensions to convert
const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

// Quality settings for WebP
const webpOptions = {
  quality: 80,
  effort: 6,
  nearLossless: false
};

async function convertToWebP(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .webp(webpOptions)
      .toFile(outputPath);
    
    console.log(`✅ Converted: ${inputPath} → ${outputPath}`);
    
    // Get file sizes for comparison
    const originalSize = fs.statSync(inputPath).size;
    const webpSize = fs.statSync(outputPath).size;
    const savings = ((originalSize - webpSize) / originalSize * 100).toFixed(1);
    
    console.log(`   📊 Size: ${(originalSize / 1024).toFixed(1)}KB → ${(webpSize / 1024).toFixed(1)}KB (${savings}% smaller)`);
    
  } catch (error) {
    console.error(`❌ Error converting ${inputPath}:`, error.message);
  }
}

async function processDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    console.log(`⚠️  Directory not found: ${dirPath}`);
    return;
  }

  const files = fs.readdirSync(dirPath);
  
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Recursively process subdirectories
      await processDirectory(filePath);
    } else {
      const ext = path.extname(file).toLowerCase();
      
      if (imageExtensions.includes(ext)) {
        const webpPath = filePath.replace(ext, '.webp');
        
        // Only convert if WebP version doesn't exist or is older
        if (!fs.existsSync(webpPath) || stat.mtime > fs.statSync(webpPath).mtime) {
          await convertToWebP(filePath, webpPath);
        } else {
          console.log(`⏭️  Skipped (already exists): ${filePath}`);
        }
      }
    }
  }
}

async function main() {
  console.log('🚀 Starting WebP conversion...\n');
  
  for (const dir of directories) {
    console.log(`📁 Processing directory: ${dir}`);
    await processDirectory(dir);
    console.log('');
  }
  
  console.log('✅ WebP conversion completed!');
}

// Run the script
main().catch(console.error); 