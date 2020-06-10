import React, { memo } from "react";
import "./Footer.css";

import FacebookOutlined from "@ant-design/icons/FacebookOutlined";
import InstagramOutlined from "@ant-design/icons/InstagramOutlined";
import TwitterOutlined from "@ant-design/icons/TwitterOutlined";
import LinkedinOutlined from "@ant-design/icons/LinkedinOutlined";
import YoutubeOutlined from "@ant-design/icons/YoutubeOutlined";
import UpCircleFilled from "@ant-design/icons/UpCircleFilled";
import DollarCircleOutlined from "@ant-design/icons/DollarCircleOutlined";
import ShopOutlined from "@ant-design/icons/ShopOutlined";
import AuditOutlined from "@ant-design/icons/AuditOutlined";
import SoundOutlined from "@ant-design/icons/SoundOutlined";

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
                <FacebookOutlined />
              </div>
              <div className="footer_social_icon instagram">
                <InstagramOutlined />
              </div>
              <div className="footer_social_icon twitter">
                <TwitterOutlined />
              </div>
              <div className="footer_social_icon linkedIn">
                <LinkedinOutlined />
              </div>
              <div className="footer_social_icon youtube">
                <YoutubeOutlined />
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
