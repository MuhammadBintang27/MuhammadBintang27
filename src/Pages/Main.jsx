import { motion } from "framer-motion";
import LayoutWeb from "../Components/Layouts/Layout";
import Gallery from "./GaleriPage/Galeri";
import Home from "./Home";
import ProjectDetails from "./ProjectsPage/ProjectDetails";
import Projects from "./ProjectsPage/Projects";
import SkillCloud from "./SkillPage/SkillCloud";

const Main = () => {
    return (
        <LayoutWeb bgColor="bg-blue-900">
            {/* Home Section with Fade-In and Slide-Up */}
            <motion.section
                id="home"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: false, amount: 0.5 }}
            >
                <Home />
            </motion.section>

            {/* SkillCloud Section with Zoom-In */}
            <motion.section
                id="about"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: false, amount: 0.5 }}
            >
                <SkillCloud />
            </motion.section>

            {/* Projects Section with Slide-In from Left */}
            <motion.section
                id="project"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: false, amount: 0.5 }}
            >
                <Projects />
            </motion.section>

            {/* Gallery Section with Slide-Right */}
            <motion.section
                id="contact"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: false, amount: 0.5 }}
            >
                <Gallery />
            </motion.section>
        </LayoutWeb>
    );
};

export default Main;
