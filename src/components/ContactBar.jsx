import { Link } from "react-router-dom";
export default function ContactBar() {
  return (
    <footer className="site-footer">
      <div className="container contact">
        <nav className="footer-links">
          <Link className="cta-link" to="/contact">Contact Here</Link>
          <a href="mailto:dramos@enterprisesllc.net">Email: dramos@enterprisesllc.net</a>
          <a href="tel:+18132970747">Office Phone / Fax: (813) 754-0496</a>
        </nav>
        <p className="credits">© {new Date().getFullYear()} D. Ramos Enterprises. All rights reserved.</p>
       <p className="me">
  Design & Code by{" "}
  <a
    className="me-link"
    href="https://dylanashmore.com"
    target="_blank"
    rel="noopener noreferrer"
  >
    Dylan Ashmore
  </a>
</p>

      </div>
    </footer>
  );
}
