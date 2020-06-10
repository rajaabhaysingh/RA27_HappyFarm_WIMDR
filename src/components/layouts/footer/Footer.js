import React, { memo } from "react";
import "./Footer.css";
import {
  FacebookOutlined as Facebook,
  InstagramOutlined as Instagram,
  TwitterOutlined as Twitter,
  LinkedinOutlined as LinkedIn,
  YoutubeOutlined as Youtube,
  UpCircleFilled,
  DollarCircleOutlined,
  ShopOutlined,
  AuditOutlined,
  SoundOutlined,
} from "@ant-design/icons";

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
          <UpCircleFilled />
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
                <Facebook />
              </div>
              <div className="footer_social_icon instagram">
                <Instagram />
              </div>
              <div className="footer_social_icon twitter">
                <Twitter />
              </div>
              <div className="footer_social_icon linkedIn">
                <LinkedIn />
              </div>
              <div className="footer_social_icon youtube">
                <Youtube />
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
              <DollarCircleOutlined /> &nbsp; Sell with us
            </div>
            <div className="footer_bottom_cert_item">
              <ShopOutlined /> &nbsp; Advertise
            </div>
            <div className="footer_bottom_cert_item">
              <AuditOutlined /> &nbsp; Legal
            </div>
            <div className="footer_bottom_cert_item">
              <SoundOutlined /> &nbsp; Feedback
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
