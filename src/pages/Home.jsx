import { Link } from "react-router-dom";
import ContactBar from "../components/ContactBar";
import "../App.css";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section id="home" className="section hero">
        <div className="container center">
          <h1 className="headline">D. RAMOS ENTERPRISES: Fencing You Can Trust</h1>
          <p className="sub">
            As a locally owned and operated company, we pride ourselves in serving Florida’s 
            communities with fences and gates that balance durability, aesthetics, and affordability.
             Our team works closely with you to design a solution that protects what matters most while
              enhancing the look of your space.
          </p>
          <Link className="btn" to="/contact">
            Connect With Us
          </Link>
        </div>
      </section>

      <section className="ghost-separator">
        <h2 className="ghost-text">Why Choose Ramos?</h2>
      </section>

      {/* FEATURES STRIP */}
      <section className="flexing">
        <div className="features">
          <div className="item">
            <div className="icon" aria-hidden="true"></div>
            <div>
              <h2>Quality Craftsmanship</h2>
              <p>
                Every fence is built with care using durable, weather-resistant
                materials to ensure long-term strength and style.
              </p>
            </div>
          </div>
          <div className="item">
            <div className="icon" aria-hidden="true"></div>
            <div>
              <h2>Local Experience</h2>
              <p>
                With years of experience in Central Florida, we understand the
                climate, permitting process, and what works best for Tampa homes
                and businesses.
              </p>
            </div>
          </div>
          <div className="item">
            <div className="icon" aria-hidden="true"></div>
            <div>
              <h2>Personalized Service</h2>
              <p>
                From the first call to the final post, we work with
                you to design a fence that fits your needs and your property.
              </p>
            </div>
          </div>
        </div>

       <img src="/flex.jpg" alt="Fence installation example" className="pill-vertical" />

        <div className="features">
          <div className="item">
            <div className="icon" aria-hidden="true"></div>
            <div>
              <h2>Affordable Options</h2>
              <p>
                We offer a wide range of fencing materials and styles to fit
                nearly every budget without sacrificing quality.
              </p>
            </div>
          </div>
          <div className="item">
            <div className="icon" aria-hidden="true"></div>
            <div>
              <h2>Licensed & Insured</h2>
              <p>
                Rest easy knowing your project is handled by professionals who are
                fully licensed, insured, and committed to safety.
              </p>
            </div>
          </div>
          <div className="item">
            <div className="icon" aria-hidden="true"></div>
            <div>
              <h2>Guaranteed Work</h2>
              <p>
                We stand behind our fences. Your satisfaction is our priority,
                backed by warranties you can count on.
              </p>
            </div>
          </div>
        </div>
      </section>

      <hr className="divider accent" role="separator" />

      {/* ABOUT */}
      <section id="fences">
        <div className="container about-wrap">
          <div className="about">
            <h2>
              <span className="brand-accent">Ramos Fencing:</span>{" "}
            </h2>
            <h3>Top Choice In Florida</h3>

            <p>
              At Ramos Fencing, we believe a fence should do more than mark a
              boundary. It should provide peace of mind, enhance curb appeal, and
              add value to your property. That’s why we combine top-tier
              materials with hands-on expertise to deliver fences that look great
              and last for years.
            </p>

            <p>
              Whether you’re securing a backyard, upgrading a business, or adding
              privacy to your home, we have the tools and knowledge to make it
              happen — all with clear communication and dependable service.
            </p>

            <Link className="btn-cta" to="/portfolio">
              See Our Work
            </Link>
          </div>

          <div className="about-media">
            <img
              className="about-main"
              src="/about1.jpg"
              alt="Ramos Fencing team at work"
            />
          </div>
        </div>
      </section>

      {/* HELP */}
      <section id="help" className="help-section">
        <div className="container">
          <div className="help">
            <h2>
              <span className="brand-accent">How Can We Help You?</span>
            </h2>

            <p>
              Every property is unique — and so are your goals. Need privacy for
              your backyard? Security for your business? Or just a fence that
              looks as good as it performs? We’ve got you covered.
            </p>

            <p>
              Our team will walk you through material choices, design options,
              and installation timelines so you can make the right decision with
              confidence.
            </p>

                        <Link className="btn-cta" to="/contact">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <section id="gates" className="gates">
  <div className="container gates-wrap">
    <header className="gates-header">
  <h2 className="section-title"><span className="brand-accent">Gates &amp; Motors</span></h2>
  <h3 className="section-subtitle">Automatic Gate Systems</h3>
</header>

    <div className="gates-media">
      <img src="/gate.jpg" alt="Automatic gate installation" />
    </div>

    <div className="gates-copy">
      <p>
        We design and install gates for every property type from elegant driveway
        entrances to heavy-duty commercial security systems. Our options include
        wood, aluminum, steel, and all custom-built gates tailored to your space.
      </p>
      <p>
        Pair your gate with a reliable motorized system for seamless access. We
        handle everything from sliding and swing gate operators to advanced access
        control, ensuring convenience, safety, and durability with every installation.
      </p>

                 <Link className="btn-cta" to="/services">
              Explore Services
            </Link>
    </div>
  </div>
</section>

      
      <hr className="divider accent" role="separator" />

      <section id="fences">
        <div className="container about-wrap">
          <div className="about">
            <h2>
              <span className="brand-accent">Fences For Any Need</span>{" "}
            </h2>
            <h3>Residential & Commercial</h3>

            <p>
              From charming wood privacy fences to durable chain link for
              businesses, Ramos Fencing offers solutions tailored to your exact
              needs. Our catalog includes wood, vinyl (PVC), aluminum, steel, and
              chain link — each installed with precision and care.
            </p>

            <p>
              No matter the size of your project, we’ll deliver a fence that
              protects what matters most and enhances the look of your property.
            </p>

            <Link className="btn-cta" to="/services">
              See Our Services
            </Link>
          </div>

          <div className="about-media">
            <img
              className="about-main"
              src="/about2.jpg"
              alt="Different fencing options"
            />
          </div>
        </div>
      </section>

    </>
  );
}

