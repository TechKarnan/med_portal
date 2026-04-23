import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-left">
          <h2>Minte Space</h2>
          <p>Design. Build. Launch.</p>

          <div className="socials">

            {/* Globe */}
            <a>
              <svg viewBox="0 0 24 24" className="icon">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
              </svg>
            </a>

            {/* Twitter */}
            <a>
              <svg viewBox="0 0 24 24" className="icon">
                <path d="M22 5.8c-.7.3-1.5.5-2.3.6.8-.5 1.4-1.3 1.7-2.2-.8.5-1.7.9-2.6 1.1A4 4 0 0 0 12 8.8c0 .3 0 .6.1.9-3.3-.2-6.3-1.8-8.3-4.3-.4.7-.6 1.5-.6 2.3 0 1.6.8 3 2.1 3.8-.7 0-1.4-.2-2-.5v.1c0 2.2 1.5 4 3.6 4.4-.4.1-.8.2-1.2.2-.3 0-.6 0-.9-.1.6 1.8 2.3 3.2 4.3 3.2A8.1 8.1 0 0 1 2 19.5 11.4 11.4 0 0 0 8.3 21c7.5 0 11.6-6.2 11.6-11.6v-.5c.8-.5 1.5-1.2 2.1-2z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a>
              <svg viewBox="0 0 24 24" className="icon">
                <path d="M4 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM3 8h2v12H3zM9 8h2v2h.1c.3-.6 1.1-1.2 2.3-1.2 2.5 0 3 1.6 3 3.8V20h-2v-6c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1V20H9z" />
              </svg>
            </a>

          </div>
        </div>

        <div className="footer-links">
          <div>
            <h4>Product</h4>
            <p>Features</p>
            <p>Pricing</p>
            <p>Integrations</p>
          </div>

          <div>
            <h4>Company</h4>
            <p>About</p>
            <p>Careers</p>
            <p>Blog</p>
          </div>

          <div>
            <h4>Resources</h4>
            <p>Docs</p>
            <p>Support</p>
            <p>API</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Minte Space. All rights reserved.</p>
      </div>
    </footer>
  );
}