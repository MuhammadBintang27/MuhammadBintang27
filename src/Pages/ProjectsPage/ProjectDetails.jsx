import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5"; // Tambahkan ikon panah kembali
import StarsCanvas from "../../Components/Elements/StarBackground";
import { motion } from "framer-motion";

// Data proyek
const projectsData = [
  {
    name: "AyaDesign",
    features: [
      "Autentikasi: Pengguna bisa mendaftar, masuk, dan keluar dari platform.",
      "Halaman Showcase: Menampilkan desain yang tersedia untuk dibeli.",
      "Sistem Keranjang: Pengguna bisa menambah, melihat, atau menghapus desain dari keranjang.",
      "Detail Pesanan: Menampilkan rincian pesanan, termasuk harga dan jumlah.",
      "Update Profil: Pengguna bisa memperbarui foto dan informasi akun.",
      "Checkout ke WhatsApp: Pengguna diarahkan ke WhatsApp dengan pesan draft yang berisi rincian pesanan.",
    ],
    technologies: [
      "React, Vite, Tailwind CSS, Ant Design: Frontend development.",
      "Express.js: Backend framework.",
      "MongoDB & Mongoose: Database NoSQL.",
      "JWT: Autentikasi pengguna.",
    ],
    color: "blue-900", // Biru yang lebih terang
    challenges:
      "Tantangan 1: Implementasi pembaruan real-time. Menggunakan WebSocket untuk memastikan pembaruan tugas terlihat secara real-time bagi semua pengguna.",
    screenshots: [
      
        {
          "title": "Login Page",
          "description": "Halaman login ini memungkinkan pengguna untuk masuk dengan memasukkan email dan password. Terdapat link untuk mendaftar akun baru jika pengguna belum memiliki akun.",
          "imageUrl": "./../project/projectdetails/ayalogin.png"
        },
        {
          "title": "Signup Page",
          "description": "Halaman pendaftaran akun di mana pengguna dapat membuat akun baru dengan memasukkan nama lengkap, email, password, dan konfirmasi password. Jika sudah memiliki akun, pengguna dapat menggunakan link untuk kembali ke halaman login.",
          "imageUrl": "./../project/projectdetails/ayasignup.png"
        },
        {
          "title": "Homepage",
          "description": "Halaman utama ini menampilkan pesan yang mengundang pengguna untuk menemukan jasa desain kekinian. Halaman ini juga menyertakan contoh desain dan tombol 'Go Shopping' untuk mengarahkan pengguna ke halaman showcase dan tombol 'Get Started' untuk mengarahkan pengguna yang belum login ke halaman login.",
          "imageUrl": "./../project/projectdetails/ayahomepage.png"
        },
        {
          "title": "About Page",
          "description": "Halaman tentang ini memberikan penjelasan mengenai Ayadesign, termasuk informasi mengenai sosial media Ayadesign dan hal-hal terkait lainnya yang dapat membantu pengguna memahami lebih lanjut tentang layanan yang ditawarkan.",
          "imageUrl": "./../project/projectdetails/ayaabout.png"
        },
        {
          "title": "Showcase Page",
          "description": "Halaman showcase menampilkan desain-desain yang tersedia untuk dijual, lengkap dengan harga. Pengguna dapat mengklik salah satu desain untuk melihat detail lebih lanjut di halaman Design Detail.",
          "imageUrl": "./../project/projectdetails/ayashowcase.png"
        },
        {
          "title": "Design Detail Page",
          "description": "Di halaman ini, pengguna dapat melihat detail lebih mendalam tentang desain yang dipilih dan diminta untuk mengisi beberapa detail tambahan sebelum menambahkannya ke keranjang belanja.",
          "imageUrl": "./../project/projectdetails/ayadesigndetail.png"
        },
        {
          "title": "Cart Page",
          "description": "Halaman keranjang ini menampilkan desain-desain yang telah dimasukkan ke dalam keranjang, lengkap dengan harga masing-masing dan total harga. Setiap item di keranjang dilengkapi dengan tombol yang mengarah ke halaman order details.Di halaman ini juga ada tombol 'Checkout' yang akan mengarahkan pengguna ke WhatsApp admin dengan pesan pesanan yang sudah otomatis terisi.",
          "imageUrl": "./../project/projectdetails/ayacart.png"
        },
        {
          "title": "Order Details Page",
          "description": "Halaman ini memungkinkan pengguna untuk melihat kembali detail pesanan yang telah dimasukkan ke keranjang. Di halaman ini juga ada tombol 'Checkout' yang akan mengarahkan pengguna ke WhatsApp admin dengan pesan pesanan yang sudah otomatis terisi.",
          "imageUrl": "./../project/projectdetails/ayadetail.png"
        }
      
      
    ],
  },
  {
    name: "GasCari",
    features: [
      "Crawling: Mengumpulkan URL artikel.",
      "Scraping: Mengekstrak konten artikel.",
      "Preprocessing: Pembersihan dan stemming teks.",
      "TF-IDF: Pembobotan kata.",
      "Similarity: Membandingkan query dengan Cosine dan Jaccard.",
      "UI: Antarmuka pengguna yang ramah dengan React dan Tailwind.",
      "Categories: Semua, Motor, Mobil, Balap Motor, Berita.",
    ],
    technologies: [
      "React: UI",
      "Tailwind CSS: Framework desain",
      "Flask: Backend processing",
      "Selenium & BeautifulSoup: Web scraping",
      "Scikit-learn: Perhitungan kesamaan",
      "MongoDB: Penyimpanan NoSQL",
    ],
    color: "orange-300",
    challenges:
      "Tantangan 2: Menyinkronkan data antar perangkat dengan Firebase dan mengoptimalkan struktur data serta API calls.",
    screenshots: [
      {
        "title": "Search Section",
        "description": "Section ini memungkinkan pengguna mencari informasi di aplikasi GasCari. Pengguna dapat memasukkan kata kunci, seperti 'Jorge Martin'. Di bagian atas terdapat lima navbar yang mewakili kategori, seperti 'News', 'Motor Race', 'Cars', 'Motorcycles', dan 'All'. Saat kategori dipilih, hasil pencarian hanya menampilkan konten relevan dengan kategori tersebut, dan gambar latar belakang akan berubah sesuai kategori.",
        "imageUrl": "./../project/projectdetails/gascarisearch.png"
      },
      {
        "title": "Result Section",
        "description": "Section ini menampilkan hasil pencarian berdasarkan kata kunci yang dimasukkan. Hasilnya disajikan menggunakan dua metode, yaitu 'Cosine' dan 'Jaccard', untuk membandingkan relevansi hasil pencarian. Hasil ditampilkan dalam bentuk kartu yang mencakup gambar, judul, tanggal, skor relevansi, dan tautan untuk membaca lebih lanjut.",
        "imageUrl": "./../project/projectdetails/gascariresult.png"
      }
    ],
  },
];

const ProjectDetails = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Hook untuk navigasi
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  // Check if state is present
  if (!location.state) {
    return <p>Project not found.</p>;
  }

  const { projectName, description, imgSrc, bgColor, details } = location.state;

  // Cari proyek berdasarkan projectName
  const project = projectsData.find((p) => p.name === projectName);

  // Jika proyek tidak ditemukan, tampilkan pesan error
  if (!project) {
    return <div>Project not found</div>;
  }

  // Fungsi untuk memeriksa apakah nilai `bgColor` adalah hex
  const isHexColor = (color) =>
    /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);

  // Tentukan style berdasarkan tipe `bgColor`
  const backgroundStyle = isHexColor(bgColor)
    ? { backgroundColor: bgColor } // Gunakan inline style untuk hex
    : {}; // Kosongkan jika bukan hex
    const pageVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };
  
    const sectionVariants = {
      hidden: { opacity: 0, scale: 0.9 },
      visible: (i) => ({
        opacity: 1,
        scale: 1,
        transition: { delay: i * 0.2 },
      }),
    };
    
    return (
      <motion.div
        className={`relative w-full min-h-screen ${
          isHexColor(bgColor) ? "" : bgColor
        } text-textDark`}
        style={backgroundStyle}
        variants={pageVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute inset-0 z-0 w-full h-full">
          <StarsCanvas />
        </div>
        <div className="text-white p-8 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto relative">
          <button
            onClick={() => navigate("/")}
            className={`absolute top-5 left-5 bg-white p-2 rounded-full text-${project.color} hover:text-gray-500 flex items-center justify-center`}
            title="Back"
          >
            <IoArrowBack size={24} />
          </button>
  
          <motion.div
            className="mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
          >
            <h1 className="mt-10 text-3xl md:text-5xl font-bold leading-tight text-center mb-10">
              Project <span className={`text-${project.color}`}>Overview</span>
              <br /> {project.name}
            </h1>
            <p className="text-lg text-gray-200 leading-relaxed mb-6 mx-auto max-w-3xl text-justify">
              {details}
            </p>
          </motion.div>
  
          <div className="flex justify-between mb-[100px] w-full max-w-7xl px-5 md:px-10 lg:px-16 gap-4 md:gap-8 lg:gap-16">
            <motion.div
              className="w-full md:w-1/2 flex justify-center"
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={sectionVariants}
            >
              <div>
                <h3 className={`text-2xl font-bold text-${project.color} mb-4`}>
                  Technologies Used
                </h3>
                <ul className="space-y-2 text-gray-200">
                  {project.technologies.map((tech, idx) => (
                    <li key={idx}>
                      <span className="font-bold">{tech.split(":")[0]}:</span>
                      {tech.split(":")[1]}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
  
            <motion.div
              className="w-full md:w-1/2 flex justify-center"
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={sectionVariants}
            >
              <div>
                <h3 className={`text-2xl font-bold text-${project.color} mb-4`}>
                  Features
                </h3>
                <ul className="space-y-2 text-gray-200">
                  {project.features.map((feature, idx) => (
                    <li key={idx}>
                      <span className="font-bold">
                        {feature.split(":")[0]}:
                      </span>
                      {feature.split(":")[1]}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
  
          <motion.div
            className="w-full max-w-7xl px-5 md:px-10 lg:px-16 mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
            custom={3}
          >
            <h1 className="text-3xl md:text-5xl font-bold leading-tight text-center mb-10">
              Project <span className={`text-${project.color}`}>Screenshots</span>
            </h1>
  
            {project.screenshots.map((screenshot, idx) => (
              <div
                key={idx}
                className="flex flex-col md:flex-row items-start justify-between mb-12 gap-9"
              >
                <motion.div
                  className="w-full md:w-1/2 mb-4 md:mb-0"
                  custom={idx + 1}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={sectionVariants}
                >
                  <h4 className="text-xl font-semibold text-white mb-2">
                    {screenshot.title}
                  </h4>
                  <p className="text-lg text-gray-200 text-justify">
                    {screenshot.description}
                  </p>
                </motion.div>
  
                <motion.div
                  className="w-full md:w-1/2 border-2 border-gray-300 rounded-xl overflow-hidden"
                  custom={idx + 1}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={sectionVariants}
                >
                  <img
                    src={screenshot.imageUrl}
                    alt={`Screenshot ${idx + 1}`}
                    className="w-full h-auto object-cover cursor-pointer"
                    onClick={() => setModalImage(screenshot.imageUrl)}
                  />
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    );
};

export default ProjectDetails;
