import Navbar from '@/components/Navbar';
import Hero from '@/sections/Hero';
import Courses from '@/sections/Courses';
import WhyInfinity from '@/sections/WhyInfinity';
import ResultsGallery from '@/sections/ResultsGallery';
import Faculty from '@/sections/Faculty';
import Gallery from '@/sections/Gallery';
import Testimonials from '@/sections/Testimonials';
import Enquiry from '@/sections/Enquiry';
import Contact from '@/sections/Contact';
import Footer from '@/sections/Footer';

function App() {

  return (
    <div className="relative">
      <Navbar />
      <main>
        <Hero />
        <Courses />
        <WhyInfinity />
        {/* <ResultsGallery /> */}
         <Gallery />
        <Faculty />
        <Testimonials />
        <Enquiry />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
