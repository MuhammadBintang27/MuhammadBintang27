/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      scale: {
        '50': '0.5',  // Menambahkan custom scale 0.5
      },
      colors: {
        darkBackground: '#121212', // Latar belakang gelap
        textDark: '#e0e0e0', // Teks terang untuk mode gelap
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        fluidWave: 'fluidWave 2s ease-in-out infinite', // Nama animasi untuk ombak
        'move-up-down': 'moveUpDown 2s ease-in-out infinite', // Animasi bergerak ke atas dan bawah
        'bubble-effect': 'bubbleEffect 1s ease-in-out', // Nama animasi bubble effect
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        fluidWave: {
          '0%': {
            clipPath: 'ellipse(120% 100% at 50% 100%)', // Posisi awal
          },
          '25%': {
            clipPath: 'ellipse(130% 110% at 50% 100%)', // Sedikit lebih besar
          },
          '50%': {
            clipPath: 'ellipse(150% 120% at 50% 100%)', // Gelombang terbesar
          },
          '75%': {
            clipPath: 'ellipse(130% 110% at 50% 100%)', // Kembali sedikit lebih kecil
          },
          '100%': {
            clipPath: 'ellipse(120% 100% at 50% 100%)', // Kembali ke posisi awal
          },
        },
        moveUpDown: {
          '0%': {
            transform: 'translateY(0)', // Starting position
          },
          '50%': {
            transform: 'translateY(-10px)', // Move up
          },
          '100%': {
            transform: 'translateY(0)', // Return to starting position
          },
        },
        bubbleEffect: {
          '0%': {
            transform: 'scale(1)',
            opacity: '1',
          },
          '50%': {
            transform: 'scale(1.2)',
            opacity: '0.8',
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '1',
          },
        },
      },
    },
  },
  darkMode: 'class', // Mengaktifkan dark mode menggunakan kelas 'dark'
  plugins: [],
}
