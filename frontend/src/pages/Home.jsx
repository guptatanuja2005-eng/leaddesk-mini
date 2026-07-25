import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import LeadForm from "../components/LeadForm";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />

      <div id="contact">
        <LeadForm />
      </div>

      <Footer />
    </>
  );
}

export default Home;