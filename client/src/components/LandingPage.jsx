import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import KeyFeatures from "./KeyFeatures";
import Navbar from "./Navbar";
import PricingPlans from "./PricingPlans"
import Footer from "./Footer";

function LandingPage() {
    return (
        <main className="bg-black min-h-screen">
            <Navbar/>
            <HeroSection/>
            <KeyFeatures/>
            <PricingPlans/>
            <Footer/>
        </main>
    )
}
export default LandingPage