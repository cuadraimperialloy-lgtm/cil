const fs = require('fs');
const path = require('path');

const srcBase = path.join(__dirname, '..', 'raw_assets', 'Cuadra Imperial Loy', 'Imagenes Caballos');
const destBase = path.join(__dirname, '..', 'public', 'images', 'horses');

if (!fs.existsSync(destBase)) {
  fs.mkdirSync(destBase, { recursive: true });
}

const map = {
  'yente': 'Yente',
  'wilco': 'Wilco',
  'yde': 'Yde',
  'xavi': 'Xavi 3 años',
  'aylan': 'Aylan',
  'ykpe': 'Ykpe',
  'theo': 'Theo 4 años',
  'tebbe': 'Tebbe',
  'ulke': 'Ulke'
};

const results = {};

for (const [slug, folderName] of Object.entries(map)) {
  const horseSrc = path.join(srcBase, folderName);
  const horseDest = path.join(destBase, slug);
  if (!fs.existsSync(horseDest)) {
    fs.mkdirSync(horseDest, { recursive: true });
  }

  const files = fs.readdirSync(horseSrc).filter(f => f.toLowerCase().endsWith('.jpeg') || f.toLowerCase().endsWith('.jpg'));
  results[slug] = [];

  files.forEach((file, idx) => {
    const srcFile = path.join(horseSrc, file);
    const fileName = `photo_${idx + 1}.jpg`;
    const destFile = path.join(horseDest, fileName);
    fs.copyFileSync(srcFile, destFile);
    results[slug].push(`/images/horses/${slug}/${fileName}`);
  });
  console.log(`Copied ${files.length} images for ${slug}`);
}

fs.writeFileSync(path.join(__dirname, 'image_manifest.json'), JSON.stringify(results, null, 2));
console.log('Manifest written successfully!');
