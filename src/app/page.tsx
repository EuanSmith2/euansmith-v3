import Hero from "@/components/Hero";
import About from "@/components/About";
import Contributions from "@/components/Contributions";
import Projects from "@/components/Projects";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import Contact from "@/components/Contact";

const JSONLD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Euan Smith",
  url: "https://euansmith.net",
  jobTitle: "Web Developer",
  address: { "@type": "PostalAddress", addressLocality: "Dublin", addressCountry: "IE" },
  sameAs: [
    "https://github.com/EuanSmith2",
    "https://www.tiktok.com/@euan_smith",
  ],
  knowsAbout: ["Web Development", "AI Systems", "Cybersecurity"],
};

export default function Home() {
  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }}
      />
      <Hero />
      <About contributions={<Contributions />} />
      <Marquee />
      <Projects />
      <Services />
      <Contact />
    </main>
  );
}
