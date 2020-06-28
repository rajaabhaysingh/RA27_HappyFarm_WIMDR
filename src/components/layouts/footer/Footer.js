import React, { memo } from "react";
import "./Footer.css";

import FooterCert from "../../../res/footer/footer_cert.svg";

function Footer({ details }) {
  const handleScrollToTop = () => {
    if (
      document.body.scrollTop !== 0 ||
      document.documentElement.scrollTop !== 0
    ) {
      window.scrollBy(0, -200);
      requestAnimationFrame(handleScrollToTop);
    }
  };

  return (
    <div className="footer_main_div">
      <div className="footer_back_to_top" onClick={handleScrollToTop}>
        Back to top
        <div className="footer_arrow_top">
          <i className="fas fa-arrow-circle-up"></i>
        </div>
      </div>
      <div className="footer_inner_div">
        <div className="footer_contact">
          <div className="footer_contact_info">
            <div className="footer_contact_info_heading">CONTACT INFO</div>
            <div className="footer_contact_info_details">
              {details.contactDetails.map((contactItem) => (
                <div key={contactItem} className="footer_contact_info_item">
                  {contactItem}
                </div>
              ))}
            </div>
          </div>
          <div className="footer_contact_social">
            <div className="footer_contact_social_heading">FOLLOW US</div>
            <div className="footer_contact_social_icons">
              <div className="footer_social_icon facebook">
                <i className="fab fa-facebook"></i>
              </div>
              <div className="footer_social_icon instagram">
                <i className="fab fa-instagram"></i>
              </div>
              <div className="footer_social_icon twitter">
                <i className="fab fa-twitter"></i>
              </div>
              <div className="footer_social_icon linkedIn">
                <i className="fab fa-linkedin-in"></i>
              </div>
              <div className="footer_social_icon youtube">
                <i className="fab fa-youtube"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="footer_info_container">
          <div className="footer_info_services">
            <div className="footer_info_services_heading">SERVICES</div>
            <div className="footer_info_services_options">
              {details.services.map((serviceItem) => (
                <div key={serviceItem.name} className="footer_services_item">
                  {serviceItem.name}
                </div>
              ))}
            </div>
          </div>
          <div className="footer_info_policies">
            <div className="footer_info_policies_heading">INFORMATION</div>
            <div className="footer_info_policies_options">
              {details.info.map((infoItem) => (
                <div key={infoItem.name} className="footer_policies_item">
                  {infoItem.name}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="footer_newsletter">
          <div className="footer_newsletter_heading">
            Subscribe to happyfarm newsletter
          </div>
          <div className="footer_newsletter_details">{details.newsletter}:</div>
          <div className="footer_newsletter_form">
            <form>
              <input
                placeholder="Enter your email"
                type="text"
                className="footer_newsletter_form_email"
              />
              <input
                type="submit"
                value="SUBSCRIBE"
                className="footer_newsletter_form_btn"
              />
            </form>
          </div>
        </div>
      </div>
      <div className="footer_ref_and_cert">
        <div className="footer_bottom_cert">
          <div className="footer_bottom_cert_info">
            <div className="footer_bottom_cert_item">
              <i className="fas fa-coins"></i> &nbsp; Sell with us
            </div>
            <div className="footer_bottom_cert_item">
              <i className="fas fa-ad"></i> &nbsp; Advertise
            </div>
            <div className="footer_bottom_cert_item">
              <i className="fas fa-stamp"></i> &nbsp; Legal
            </div>
            <div className="footer_bottom_cert_item">
              <i className="fas fa-comment-alt"></i> &nbsp; Feedback
            </div>
          </div>
          <div className="footer_bottom_copyright">
            © 2020-2021 Happyfarm.com
          </div>
          <img src={FooterCert} alt="secure-payment-services" />
        </div>
      </div>
    </div>
  );
}

export default memo(Footer);
