export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-sm-4">
                <div className="footer-contact-info">
                  <h4 className="foot-title">Contact Info</h4>
                  <ul>
                    <li><i className="fa fa-map-marker"></i> Sushmit Bhawan -2nd Floor, House No 166/40467<br /> Subidhanagar - 35<br /> Kathmandu, Nepal</li>
                    <li><i className="fa fa-phone"></i> +977-15199027<br />+977-5199454</li>
                    <li><i className="fa fa-envelope"></i> info@sushmitenergy.com</li>
                  </ul>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="useful-links">
                  <h4 className="foot-title">Quick Link</h4>
                  <div className="row">
                    <div className="col-md-6">
                      <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/about-us/">Company</a></li>
                        <li><a href="/projects/">Projects</a></li>
                        <li><a href="#">Media</a></li>
                        <li><a href="#">Job Board</a></li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <ul>
                        <li><a href="/policy/">Policy</a></li>
                        <li><a href="/reports/">Reports</a></li>
                        <li><a href="/gallery/">Gallery</a></li>
                        <li><a href="/contact-us/">Contact us</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="subscribe">
                  <h4 className="foot-title">Newsletter</h4>
                  <p>Subscribe our newsletter &amp; get the updates.</p>
                  <div className="form">
                    <div className="form-group">
                      <input type="email" className="form-control" placeholder="Your Email Address" />
                    </div>
                    <button type="submit" className="btn btn-green2">Subscribe</button>
                  </div>
                  <div className="social-media">
                    <a href="https://www.facebook.com/SushmitEnergy/"><i className="fa fa-facebook"></i></a>
                    <a href="#"><i className="fa fa-twitter"></i></a>
                    <a href="https://www.linkedin.com/company/sushmitcleanenergy/"><i className="fa fa-linkedin"></i></a>
                    <a href="#"><i className="fa fa-google-plus"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-info">
            <div className="logo">
              <img src="/images/logo.png" alt="Sushmit Energy" />
            </div>
            <div className="copyright">
              <p>&copy;2017 Sushmit Energy. All rights reserved. Developed by Upasarga Technology.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}