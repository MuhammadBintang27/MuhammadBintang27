import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link component for routing
import "./style.css";
import OptimizedImage from "../../Components/Elements/OptimizedImage";

const Projects = () => {
  const [active, setActive] = useState(0);
  const [zIndex, setZIndex] = useState(2);
  const [direction, setDirection] = useState("next"); // Track animation direction
  const items = [
    {
      imgSrc: "/project/gascariProject.png",
      bgColor: "#14B8A6",
      title: "GASCARI SEARCH ENGINE",
      category: "What is GasCari?",
      bgText: "GASCARI",
      details:
        "GasCari is an automotive information search system developed as a final project for the Information Retrieval course. The system utilizes technologies such as TF-IDF, Cosine Similarity, and Jaccard Similarity to match user queries with articles from trusted sources like Autonetmagz, Motorplus, and Oto-Detik. With a responsive React-based interface and features like crawling and scraping, GasCari provides fast, relevant, and user-friendly article searches. 🚗🔍",
      link: "/project-details",
      type: "desktop",
      techStack: [
        "React",
        "TailwindCSS",
        "Flask",
        "Python",
        "TF-IDF",
        "Cosine Similarity",
        "Jaccard Similarity",
        "Web Scraping"
      ],
      githubUrl: "https://github.com/MuhammadBintang27/GasCari.git",
      websiteUrl: "https://gas-cari.vercel.app/",
      screenshots: [
        {
          "title": "Search Section",
          "description": "This section allows users to search for information in the GasCari application. Users can enter keywords, such as 'Jorge Martin'. At the top, there are five navbars representing categories like 'News', 'Motor Race', 'Cars', 'Motorcycles', and 'All'. When a category is selected, search results only display content relevant to that category, and the background image changes accordingly.",
          "imageUrl": "/project/projectdetails/gascarisearch.png"
        },
        {
          "title": "Result Section",
          "description": "This section displays search results based on the entered keywords. Results are presented using two methods: 'Cosine' and 'Jaccard', to compare search relevance. Results are displayed in card format, including images, titles, dates, relevance scores, and links for further reading.",
          "imageUrl": "/project/projectdetails/gascariresult.png"
        },
        {
          "title": "Result Section",
          "description": "This section displays search results based on the entered keywords. Results are presented using two methods: 'Cosine' and 'Jaccard', to compare search relevance. Results are displayed in card format, including images, titles, dates, relevance scores, and links for further reading.",
          "imageUrl": "/project/projectdetails/gas.png"
        }
      ]
    },
    {
      imgSrc: "/project/acerental.png",
      bgColor: "#A855F7",
      title: "AceRental PlayStation",
      category: "Mobile Development",
      bgText: "ACERENTAL",
      details:
        "AceRental PlayStation is a digital cashier application specifically designed to manage PlayStation rental businesses. This application makes it easier for business owners to record rental transactions, food/beverage sales, and operational expenses. Interactive features such as PS unit management with status indicators, play duration selection, and automatic payment systems make this application a complete and efficient solution. Additionally, informative financial dashboards and expense tracking help make business management more transparent.",
      link: "/project-details/",
      type: "mobile",
      techStack: [
        "Kotlin",
        "XML",
        "Material Design",
        "Supabase",
        "DrawerLayout",
        "ViewModel",
        "LiveData",
        "Coroutines"
      ],
      githubUrl: "https://github.com/MuhammadBintang27/ace-rental-playstation-kotlin.git",
      websiteUrl: null,
      screenshots: [
        {
          title: "Financial Dashboard",
          description: "Displays a summary of income from rentals, food, and beverages in the form of a pie chart along with daily transaction history.",
          imageUrl: "/project/projectdetails/sewaPS.png"
        },
        {
          title: "PS Unit Management",
          description: "Interactive display of PS unit status (available/running), with selection of Fixed/Personal play categories and automatic rental cost calculation.",
          imageUrl: "/project/projectdetails/historyPS.png"
        },
        {
          title: "Transaction Recording",
          description: "Records food sales, beverages, and business expenses with complete categories and storage in financial reports.",
          imageUrl: "/project/projectdetails/pesanSnack.png"
        }
      ]
    },
    {
      imgSrc: "/project/ayadesign.png",
      bgColor: "#FB923C",
      title: "AYADESIGN PLATFORM",
      category: "What is AyaDesign?",
      bgText: "AYADESIGN",
      details:
        "AyaDesign is an online platform designed to facilitate the buying and selling of creative designs between designers and customers. The platform was developed as a final project for the Web-Based Programming course, with the aim of creating a practical solution to bridge designer creativity and customer needs. Through AyaDesign, designers can showcase their work, set prices, and reach potential buyers, while customers can easily browse and purchase desired designs. The purchase process is done efficiently, where customers will be directed to the admin's WhatsApp for confirmation and order details.",
      link: "/project-details",
      type: "desktop",
      techStack: [
        "React",
        "TailwindCSS",
        "Express.js",
        "MongoDB",
        "JWT",
        "Node.js",
        "Ant Design"
      ],
      githubUrl: "https://github.com/MuhammadBintang27/ayadesign.git",
      websiteUrl: "https://ayadesign.vercel.app",
      screenshots: [
        {
          "title": "Homepage",
          "description": "The main page displays a message inviting users to discover contemporary design services. The page also includes sample designs and a 'Go Shopping' button to direct users to the showcase page and a 'Get Started' button to direct users who haven't logged in to the login page.",
          "imageUrl": "/project/projectdetails/ayahomepage.png"
        },
        {
          "title": "Login Page",
          "description": "This login page allows users to sign in by entering their email and password. There is a link to register a new account if the user doesn't have one.",
          "imageUrl": "/project/projectdetails/ayalogin.png"
        },
        {
          "title": "Showcase Page",
          "description": "The showcase page displays designs available for purchase, complete with prices. Users can click on any design to view more details on the Design Detail page.",
          "imageUrl": "/project/projectdetails/ayacart.png"
        },
        {
          "title": "Signup Page",
          "description": "Account registration page where users can create a new account by entering their full name, email, password, and password confirmation. If they already have an account, users can use the link to return to the login page.",
          "imageUrl": "/project/projectdetails/ayasignup.png"
        }
      ]
    },
    {
      imgSrc: "/project/agromarfeed.png",
      bgColor: "#3CB371",
      title: "Agro MarFeed",
      category: "Agro-Maritime E-Commerce Platform",
      bgText: "AGROMARFEED",
      details: "AgroMarFeed is an e-commerce platform that connects farmers and fishermen supplying processed agricultural or marine waste with livestock and fish farmers. The platform features a modern, responsive design and leverages AI for smart chat, product description suggestions, and automated image editing. Sellers can manage their stores, products, orders, and finances from a unified dashboard. By utilizing organic waste as animal feed, AgroMarFeed helps reduce costs, increase income for suppliers, and support a circular economy.",
      link: "/project-details",
      type: "desktop",
      techStack: [
        "React",
        "TailwindCSS",
        "Node.js",
        "Express.js",
        "MongoDB",
        "AI ChatBot (GPT-4o-mini)",
        "AI Image Edit (GPT-Image-1)",
        "Midtrans Payment Gateway"
      ],
      githubUrl: "https://github.com/MuhammadBintang27/AgroMarFeed.git",
      websiteUrl: "https://agromarfeed.vercel.app",
      screenshots: [
        {
          title: "Product Catalog",
          description: "Displays a variety of available animal feed products with detailed information, search, and filtering features.",
          imageUrl: "/project/projectdetails/agromarfeed-katalog.png"
        },
        {
          title: "Consultation Menu",
          description: "Direct consultation service with feed experts or veterinarians, including online meeting scheduling.",
          imageUrl: "/project/projectdetails/agromarfeed-konsultasi.png"
        },
        {
          title: "Shopping Cart",
          description: "Shopping cart page for managing selected products and proceeding to checkout.",
          imageUrl: "/project/projectdetails/agromarfeed-cart.png"
        }
      ]
    },
    {
      imgSrc: "/project/darahtanyoe.png",
      bgColor: "#ECA6A6",
      title: "DARAHTANYOE MOBILE APP",
      category: "Hackathon Project",
      bgText: "TANYOE",
      details:
        "DarahTanyoe is an intelligent digital platform for real-time blood request and donation management. Developed by the BEYOND team from FMIPA Universitas Syiah Kuala, the platform integrates mobile applications for patients and donors as well as a web dashboard for hospitals and PMI. This application was created as a solution to the problems of slow blood search and distribution, as well as inaccurate stock information. The project won 2nd place in the Hackathon event at Bandung Institute of Technology (ITB).",
      link: "/project-details/mobile",
      type: "mobile",
      techStack: [
        "Flutter",
        "Next.js",
        "Node.js",
        "Express",
        "Supabase",
        "Redis",
        "Google Maps API",
        "Firebase Cloud Messaging",
        "Twilio WhatsApp API"
      ],
      githubUrl: "https://github.com/MuhammadBintang27/DarahTanyoe_App.git",
      websiteUrl: null,
      screenshots: [
        {
          "title": "Blood Stock Map",
          "description": "Interactive display for viewing real-time blood stock at nearby hospitals/PMI.",
          "imageUrl": "/project/projectdetails/darahtanyoe.png"
        },
        {
          "title": "Donor Request Form",
          "description": "Feature for submitting donor requests based on blood type, location, and urgency level.",
          "imageUrl": "/project/projectdetails/darahtanyoeOTP.png"
        },
        {
          "title": "Donor Notification",
          "description": "Donors receive real-time notifications for blood requests matching their criteria.",
          "imageUrl": "/project/projectdetails/darahtanyoeLogin.png"
        }
      ]
    },
    
  ];

  const handleNext = () => {
    setDirection("next");
    setActive((prev) => (prev + 1) % items.length);
    setZIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setDirection("prev");
    setActive((prev) => (prev - 1 + items.length) % items.length);
    setZIndex((prev) => prev + 1);
  };

  const handleDotClick = (index) => {
    if (index !== active) {
      setDirection(index > active ? "next" : "prev");
      setActive(index);
      setZIndex((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const autoRun = setTimeout(() => {
      handleNext();
    }, 10000);

    return () => clearTimeout(autoRun);
  }, [active]);

  useEffect(() => {
    showSlider(direction);
  }, [active, direction]);

  const showSlider = (type) => {
    const carousel = document.querySelector(".carousel");
    if (!carousel) return;
    
    carousel.style.pointerEvents = "none";

    let itemActiveOld = document.querySelector(".carousel .list .item.active");
    if (itemActiveOld) itemActiveOld.classList.remove("active");

    setZIndex((prev) => prev + 1);
    const items = document.querySelectorAll(".carousel .list .item");
    if (items[active]) {
      items[active].style.zIndex = zIndex;
      items[active].classList.add("active");
    }

    if (type === "next") {
      carousel.style.setProperty("--transform", "300px");
    } else {
      carousel.style.setProperty("--transform", "-300px");
    }
    carousel.classList.add("effect");

    let dotActiveOld = document.querySelector(".dots li.active");
    if (dotActiveOld) dotActiveOld.classList.remove("active");
    const dots = document.querySelectorAll(".dots li");
    if (dots[active]) {
      dots[active].classList.add("active");
    }

    setTimeout(() => {
      carousel.classList.remove("effect");
      carousel.style.pointerEvents = "auto";
    }, 1500);
  };

  return (
    <div className="carousel h-screen">
      <div className="list">
        {items.map((item, index) => (
          <div
            key={index}
            className={`item ${item.type} ${index === active ? "active" : ""} ${direction}`}
            style={{
              "--img-src": `url(${item.imgSrc})`,
              "--bg-color": item.bgColor,
              "--title": `'${item.bgText}'`,
              zIndex: index === active ? zIndex : 1,
            }}
          >
            <div className="content flex-col md:flex-row items-center md:items-stretch justify-center md:justify-between gap-4 md:gap-12">
              {item.type === "desktop" ? (
                <div className="image mx-auto mt-4 md:mt-0" />
              ) : (
                <OptimizedImage
                  src={item.imgSrc}
                  alt={item.title}
                  className="mx-auto my-4 md:my-0 w-[140px] h-[297px] md:w-[280px] md:h-[594px] rounded-xl shadow-lg object-cover bg-transparent"
                />
              )}
              <div className="info">
                <div className="title">{item.title}</div>
                <div className="category">{item.category}</div>
                <div className="des">{item.details}</div>
                <Link
                  to={item.link}
                  state={{
                    projectName: item.title,
                    
                    imgSrc: item.imgSrc,
                    bgColor: item.bgColor,
                    details: item.details,
                    techStack: item.techStack,
                    githubUrl: item.githubUrl,
                    websiteUrl: item.websiteUrl,
                    screenshots: item.screenshots,
                    type: item.type
                  }}
                >
                  See More <span>&#8594;</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="arrows">
        <button id="prev" onClick={handlePrev}>
          &lt;
        </button>
        <button id="next" onClick={handleNext}>
          &gt;
        </button>
      </div>
      <ul className="dots">
        {items.map((_, index) => (
          <li
            key={index}
            className={index === active ? "active" : ""}
            onClick={() => handleDotClick(index)}
          ></li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
