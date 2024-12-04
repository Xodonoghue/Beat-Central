import { motion } from "framer-motion";
import { HOW_IT_WORKS_CONTENT } from "../constants/index.jsx";

const HowItWorks = () => {
  const stepVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section id="works">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-12 border-t border-neutral-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl lg:text-5xl mt-20 tracking-tighter bg-gradient-to-t from-neutral-50 via-neutral-300 to-neutral-600 bg-clip-text text-transparent">
            {HOW_IT_WORKS_CONTENT.sectionTitle}
          </h2>
          <p className="mt-4 text-neutral-400 max-w-xl mx-auto">
            {HOW_IT_WORKS_CONTENT.sectionDescription}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {HOW_IT_WORKS_CONTENT.steps.map((step, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={stepVariants}
              className="bg-neutral-900 p-6 rounded-xl shadow-lg flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-neutral-400 mb-4">{step.description}</p>
              </div>
              <div className="flex justify-center">
                <img
                  src={step.imageSrc}
                  alt={step.imageAlt}
                  className="rounded-lg"
                />
              </div>

              {step.users && (
                <div className="flex justify-between items-center mt-4">
                  <div className="flex -space-x-2">
                    {step.users.map((user, userIndex) => (
                      <img
                        key={userIndex}
                        className="h-8 w-8 rounded-full border-2 border-black"
                        src={user}
                        alt={`Person ${userIndex + 1}`}
                      />
                    ))}
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg">
                    Connect
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
