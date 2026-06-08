# 🖼️ Image Optimization Guide

Panduan optimasi gambar untuk portofolio menggunakan WebP dan lazy loading.

## 🚀 Fitur Optimasi

### ✅ WebP Support
- Konversi otomatis gambar ke format WebP
- Fallback ke format asli jika WebP tidak didukung
- Pengurangan ukuran file hingga 30-50%

### ✅ Lazy Loading
- Loading gambar hanya saat diperlukan
- Placeholder skeleton saat loading
- Smooth transition saat gambar muncul

### ✅ Responsive Images
- Optimasi untuk berbagai ukuran layar
- Progressive loading
- Error handling dengan fallback

## 📦 Instalasi

1. Install dependencies:
```bash
npm install
```

2. Konversi gambar ke WebP:
```bash
npm run convert-images
```

## 🛠️ Penggunaan

### Komponen OptimizedImage

```jsx
import OptimizedImage from '../Components/Elements/OptimizedImage';

// Penggunaan dasar
<OptimizedImage 
  src="/path/to/image.jpg" 
  alt="Description" 
/>

// Dengan fallback
<OptimizedImage 
  src="/path/to/image.jpg" 
  alt="Description"
  fallbackSrc="/path/to/fallback.jpg"
  className="custom-class"
/>
```

### Props yang Tersedia

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | string | - | Path gambar utama |
| `alt` | string | - | Alt text untuk accessibility |
| `fallbackSrc` | string | - | Gambar fallback jika utama gagal |
| `className` | string | "" | CSS classes tambahan |
| `placeholder` | string | Loading SVG | Placeholder saat loading |

## 🔧 Script Konversi

### Menjalankan Konversi
```bash
npm run convert-images
```

### Direktori yang Diproses
- `public/galeri/`
- `public/project/`
- `public/project/projectdetails/`
- `public/`

### Format yang Didukung
- JPG/JPEG
- PNG
- GIF

### Pengaturan WebP
- Quality: 80%
- Effort: 6 (kompresi optimal)
- Near Lossless: false

## 📊 Monitoring Performa

Script konversi akan menampilkan:
- ✅ Status konversi
- 📊 Perbandingan ukuran file
- 💾 Persentase penghematan

Contoh output:
```
✅ Converted: public/galeri/photo1.jpg → public/galeri/photo1.webp
   📊 Size: 245.3KB → 156.7KB (36.1% smaller)
```

## 🌐 Browser Support

### WebP Support
- ✅ Chrome 23+
- ✅ Firefox 65+
- ✅ Safari 14+
- ✅ Edge 18+

### Fallback Strategy
1. Coba load WebP
2. Jika gagal, load format asli
3. Jika masih gagal, load fallback image

## 🎯 Best Practices

### 1. Optimasi Sebelum Upload
- Kompres gambar sebelum upload
- Gunakan resolusi yang sesuai
- Pilih format yang tepat

### 2. Naming Convention
- Gunakan nama deskriptif
- Hindari spasi, gunakan underscore
- Konsisten dengan ekstensi

### 3. Alt Text
- Selalu berikan alt text yang deskriptif
- Gunakan bahasa yang sesuai dengan konten

### 4. Lazy Loading
- Gunakan untuk gambar di bawah fold
- Prioritaskan gambar penting

## 🔍 Troubleshooting

### Gambar Tidak Muncul
1. Periksa path file
2. Pastikan file ada di direktori public
3. Cek console untuk error

### WebP Tidak Berfungsi
1. Periksa browser support
2. Pastikan file WebP sudah dibuat
3. Cek network tab untuk request

### Performa Lambat
1. Jalankan konversi WebP
2. Periksa ukuran file asli
3. Optimasi resolusi gambar

## 📈 Metrics

Setelah optimasi, Anda dapat melihat peningkatan:
- ⚡ Loading time berkurang 30-50%
- 📱 Bandwidth usage berkurang
- 🎯 Core Web Vitals membaik
- 🌍 SEO score meningkat

## 🔄 Maintenance

### Regular Tasks
1. Jalankan konversi setelah upload gambar baru
2. Monitor ukuran file
3. Update dependencies secara berkala

### Monitoring
- Gunakan Lighthouse untuk audit performa
- Monitor Core Web Vitals
- Track loading time di production

---

**Note**: Pastikan untuk menjalankan `npm run convert-images` setiap kali menambahkan gambar baru ke proyek. 