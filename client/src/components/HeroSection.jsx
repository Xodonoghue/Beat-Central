import { motion } from "framer-motion";
import heroImage from "../assets/hero.jpg";
import { BRAND_LOGOS, HERO_CONTENT } from "../constants/index.jsx";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

const HeroSection = () => {
  return (
    <motion.section
      className="pt-28 lg:pt-36"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center bg-gradient-to-b from-indigo-800 to-black">

        <motion.h1
          className="text-5xl lg:text-8xl mt-8 mb-4 font-semibold tracking-tighter bg-gradient-to-b from-neutral-50 via-neutral-300 to-neutral-700 bg-clip-text text-transparent"
          variants={fadeInUp}
        >
          {HERO_CONTENT.mainHeading.split("\n").map((text, index) => (
            <span key={index}>
              {text}
              <br />
            </span>
          ))}
        </motion.h1>

        <motion.p
          className="mt-6 text-neutral-400 max-w-xl"
          variants={fadeInUp}
        >
          {HERO_CONTENT.subHeading}
        </motion.p>

        <motion.div className="mt-6 space-x-4" variants={fadeInUp}>
          <a
            href="/signup"
            className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white py-3 px-6 rounded-lg font-medium"
          >
            {HERO_CONTENT.callToAction.primary}
          </a>
          <a
            href="#pricing"
            className="inline-block border border-gray-500 hover:border-gray-400 text-white py-3 px-6 rounded-lg font-medium"
          >
            {HERO_CONTENT.callToAction.secondary}
          </a>
        </motion.div>

      </div>
    </motion.section>
  );
};

export default HeroSection;
