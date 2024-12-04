import { motion } from "framer-motion";
import { PLANS_CONTENT } from "../constants";

const PricingPlans = () => {
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
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
    <section id="pricing" className="bg-gradient-to-b from-black to-indigo-800 pb-8">
      <div className="max-w-7xl mx-auto px-4 mt-20">
        {/* Section Title */}
        <motion.div
          className="text-center mb-12 border-t border-neutral-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl lg:text-5xl mt-20 tracking-tighter bg-gradient-to-t from-neutral-50 via-neutral-300 to-neutral-600 bg-clip-text text-transparent">
            {PLANS_CONTENT.sectionTitle}
          </h2>
          <p className="mt-4 text-neutral-400">{PLANS_CONTENT.sectionDescription}</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial="hidden"
          whileInView="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.5, 
              },
            },
          }}
        >
          {PLANS_CONTENT.plans.map((plan, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              className={`p-8 rounded-xl shadow-lg bg-neutral-950 ${
               "border border-neutral-800 hover:border-neutral-500"
              }`}
            >
              <h3 className="text-lg text-neutral-200 lg:text-xl mb-4 tracking-tighter uppercase">
                {plan.name}
              </h3>
              
              <div className="text-2xl text-neutral-200 lg:text-3xl font-medium mb-6">
                {plan.price}
              </div>
              <p className="text-neutral-400 mb-6">{plan.description}</p>
              <ul className="mb-8 space-y-2 text-neutral-400">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <span className="inline-block w-2 h-2 bg-neutral-600 rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-neutral-200 rounded-lg">
                {PLANS_CONTENT.ctaText}
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PricingPlans;
