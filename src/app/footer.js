import React from "react";
import styled from "styled-components";
import FontAwesome  from "react-fontawesome"
import { Wrapper }  from "../styles/collections";
import { pxToRem, pxToPercent }  from "../styles/utils";
import breakpoint from "styled-components-breakpoint";
import { clearFix } from "polished";
import logo from "./assets/logo_yukstay.svg";
import { Link } from "react-router-dom";
import { SOCIAL, getSocialAsset } from "./helper/social";

const Footer = styled.section`
  background-color: ${props => props.theme.palette.footer.bg }
  text-align: left;
  font-size : ${pxToRem("14px")};
  margin-top: 2rem;
  padding-top: 2rem;
  color: ${props => props.theme.palette.footer.fg }
  font-family: ${props => props.theme.font.family }
  ${clearFix()}

  .first-column{
    ${breakpoint("md")`
      width : ${pxToPercent("180px")}
    `}
    img{
      max-width: 160px;
    }
  }
  
  .second-column{
    ${breakpoint("md")`
      width : ${pxToPercent("160px")}
    `}
  }

  .third-column{
    ${breakpoint("md")`
      width : ${pxToPercent("160px")}
    `}
  }

  .fourth-column{
    ${breakpoint("md")`
      width : ${pxToPercent("175px")}
    `}
  }

  .fifth-column{
    ${breakpoint("md")`
      width : ${pxToPercent("165px")}
    `}
  }

  a {
    color: inherit
  }
  
  h4 {
    font-weight: ${props => props.theme.font.weightBold };
    margin-bottom: 0.4rem;
    font-family: ${props => props.theme.font.family }
    font-size : ${pxToRem("14px")};
  }
  
  p {
    line-height: 1.2rem;
    margin-bottom: 1rem;
    font-size: 0.8rem;
  }
`;

const Clearfix = styled.div`
  ${clearFix()}
`;

const Columns = styled.div`
  margin-bottom : 2rem;
  ${breakpoint("md")`
   margin-bottom : 0;
    float: left;
  `}
`;

const WebCopy = styled.p`
  float: left;
`;

const FollowUs = styled.div`
  ${breakpoint("md")`
    margin-top: 2rem;
  `}
  a{
    width : 40px;
    display : inline-block;
    ${breakpoint("md")`
      float: left;
    `}
  }
  img{
    max-width: 40px;
    display : block;
  }
  .title{
    display : block;
    ${breakpoint("md")`
      display : inline;
      float : left;
    `}
  }
`;

const SocialIco = styled.div`
  ${breakpoint("md")`
    float: right;
  `}
`;

export default () => (
  <Footer>
    <Wrapper className="wrapper">
      <Columns className="first-column">
        <Link to="/"><img alt="YukStay" src={logo} /></Link>
      </Columns>
      <Columns className="second-column">
        <h4>Discover</h4>
        <ul>
          <li><Link to="/">FAQ</Link></li>
          <li><Link to="/">Referral Programs</Link></li>
          <li><Link to="/">Careers at Yukstay</Link></li>
          <li><Link to="/">Blog</Link></li>
        </ul>
      </Columns>

      <Columns className="third-column">
        <h4>Company</h4>
        <ul>
          <li><Link to="/">About the Company</Link></li>
          <li><Link to="/">Become a Partners</Link></li>
          <li><Link to="/">Terms and Conditions</Link></li>
          <li><Link to="/">Privacy Policy</Link></li>
        </ul>
      </Columns>

      <Columns className="fourth-column">
        <h4>Contact Us</h4>
        <ul>
          <li><span className="font-bold">Email:</span> <a href="mailto:commercial@yukstay.com">commercial@yukstay.com</a></li>
          <li><span className="font-bold">Phone: </span><a href="tel:+6287881000012">+62 878 8100 0012</a></li>
        </ul>
        <FollowUs>
          <span className="font-bold title">Follow Us</span>
          <SocialIco>
            <Link to=""><img alt={ SOCIAL.FACEBOOK } src={ getSocialAsset(SOCIAL.FACEBOOK) } /> </Link>
            <Link to=""><img alt={ SOCIAL.INSTAGRAM } src={ getSocialAsset(SOCIAL.INSTAGRAM) } /></Link>
            <Link to=""><img alt={ SOCIAL.WHATSAPP } src={ getSocialAsset(SOCIAL.WHATSAPP) }/> </Link>
          </SocialIco>
        </FollowUs>
      </Columns>

      <Columns className="fifth-column">
        <h4>Select Language</h4>
        <ul>
          <li><a href="#Bahasa">Bahasa Indonesia</a></li>
          <li><a href="#English">English</a></li>
        </ul>
      </Columns>

      <Clearfix/>

      <WebCopy>&copy; 2018 by Yukstay</WebCopy>

    </Wrapper>
  </Footer>
);
