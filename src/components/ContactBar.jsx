export default function ContactBar() {
  return (
    <footer className="site-footer">
      <div className="container contact">
        <nav className="footer-links">
          <a className="cta-link" href="/contact">Contact Here</a>
          <a href="mailto:dramos@enterprisesllc.net">Email: dramos@enterprisesllc.net</a>
          <a href="tel:+18132970747">Phone: (813) 297-0747</a>
          <a href="tel:+18137540496">Fax: (813) 754-0496</a>
        </nav>
        <p className="credits">© {new Date().getFullYear()} D. Ramos Enterprises. All rights reserved.</p>
      </div>
    </footer>
  );
}
