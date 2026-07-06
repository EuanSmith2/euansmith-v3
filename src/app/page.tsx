import Hero from "@/components/Hero";
import About from "@/components/About";
import Contributions from "@/components/Contributions";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const JSONLD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Euan Smith",
  url: "https://euansmith.net",
  jobTitle: "Web Developer",
  address: { "@type": "PostalAddress", addressLocality: "Dublin", addressCountry: "IE" },
  sameAs: [
    "https://github.com/EuanSmith2",
    "https://www.linkedin.com/in/euan-smith-4295123a6/",
    "https://www.tiktok.com/@euan_smith",
  ],
  knowsAbout: ["Web Development", "AI Systems", "Cybersecurity"],
};

export default function Home() {
  return (
    <main id="main">
      <script
        type="application/ld+json"
        // escape < so a value can never break out of the script element
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(JSONLD).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />
      <About contributions={<Contributions />} />
      <Projects />
      <Services />
      <Contact />
      <Footer />
    </main>
  );
}
