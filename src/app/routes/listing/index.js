import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { frontloadConnect } from "react-frontload";
import Page from "../../components/page";
import styled from "styled-components";
import config from "../../config";
import { Carousel } from 'react-responsive-carousel';
import breakpoint from "styled-components-breakpoint";
import { rgba, mix } from "polished";
import ga from "react-ga";

import logo from "../../assets/yukstayweb-logo.png";
import stockPlaceholder from "../../assets/coming-soon.jpg";
import jakartaPlaceHolder from "../../assets/jakarta-placeholder.jpg"
import { createWhatsAppLinkUrl, formatPrice } from "../../helper"
import FontAwesome  from "react-fontawesome"
import { Link } from "react-router-dom";
import Spinner from "../../components/spinner"
import { buildProtocolUrl } from '../../helper'

import {
  getBuildings
} from "../../../modules/building";

import {
  getListing,
  removeListing
} from "../../../modules/listing";

require('react-responsive-carousel/lib/styles/carousel.min.css');

const frontload = async props =>
  await Promise.all([props.getLocations(), props.getListing(props.match.params.roomid)]);
;

class Room extends Component {
  componentWillUnmount() {
    this.props.removeListing();
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.match.params.roomid !== this.props.match.params.roomid ||
      nextProps.match.params.id !== this.props.match.params.id
    ) {
      this.props.getListing(+this.nextProps.match.params.id, +this.nextProps.match.params.roomid);
    }

    return true;
  }

  scheduleClicked = (obj) => {
    ga.event({
      category: "user",
      action: "schedule clicked",
      label: JSON.stringify({
        page: this.props.location.pathname,
        location: this.props.match.params.id,
        room: obj.id
      })
    });
  };

  render() {
    let obj = this.props.buildingStubIndex[this.props.match.params.id];
    let room = this.props.room;

    let price = formatPrice(room ? room.fields.pricePerMonth : 0);
    let pageTitle = "Co-living listing at " + !obj ? "YukStay" : obj.name  + " for just " + price;
    let images = (room && room.fields.photos) ?
      room.fields.photos.map((obj) => obj.url).concat(room.fields.unit.fields.photos ? room.fields.unit.fields.photos.map((p) => p.url): [])
      : [stockPlaceholder];
    let destination = "/b/" + this.props.match.params.id + "/" + this.props.match.params.roomid;

    let content = (!obj || !room) ? <Spinner/> :
      (
        <Content>
          <Container>

            <RoomInfo>
              <h2>{price} / mo.</h2>
             
              <div>
                <FontAwesome name="bolt"/>
                <FontAwesome name="wifi"/>
                <FontAwesome name="tint"/>
                <FontAwesome name="wrench"/>
              </div>
            </RoomInfo>
          
            <Carousel showArrows={true}
                      showThumbs={false}
                      showIndicators={true}
                      showStatus={false}
                      autoPlay={true}
                      infiniteLoop={true}
            >
              {
                images.map((url, i) => {
                  return (
                    <div key={i}>
                      <img alt={"Room pic" + i} src={url} />
                    </div>
                  );
                })
              }
            </Carousel>
            <a target="_blank" href={
              "https://maps.google.com/?q="
              + encodeURIComponent(obj.fields.address)}>
            <Map bgImg={
              "https://maps.googleapis.com/maps/api/staticmap?center=&zoom=13&scale=2&size=600x300&maptype=roadmap&format=png&visual_refresh=true&markers=size:mid%7Ccolor:0x3da3ff%7Clabel:%7C"
              + encodeURIComponent(obj.fields.address)
              + "&key="
              + config.google.STATIC_MAP_API_KEY}/>
            </a>
          </Container>
        </Content>
      );

    return (
      <Page id="room"
            title={pageTitle}
            image={images[0]}>
        <Header>
          <nav>
            <ul><Link to={"/b/" + this.props.match.params.id}><FontAwesome name="angle-left"/></Link></ul>
            <ul></ul>
          </nav>

          <div>
            <Link to="/"><img alt="YukStay!" src={logo}/></Link>
            <h2>{room ? room.fields.unit.fields.numberOfRooms + " Bed co-living on Floor " + room.fields.unit.fields.floor : "amazing views"}</h2>
            <h5>@ {obj ? obj.fields.name : "in Jakarta"}</h5>
          </div>
        </Header>

        <Bg bgImg={obj ? obj.fields.photos[0].thumbnails.full.url : jakartaPlaceHolder} />

        <CallToAction onClick={() => { this.scheduleClicked(room); }} href={createWhatsAppLinkUrl(config.whatsapp.PHONE_NUMBER,
          "Hi YukStay, saya tertarik dengan unit Co-Living ini " + buildProtocolUrl(config.site.URL + destination))}>
          <FontAwesome name="whatsapp" /> Hubungi WhatsApp
        </CallToAction>

        {content}
      </Page>
    );
  }
}


const mapStateToProps = state => {
  return {
    buildingStubIndex: state.building.stubIndex,
    room: state.listing.current
  }
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getLocations: getBuildings, getListing, removeListing }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  frontloadConnect(frontload, {
    onMount: true,
    onUpdate: false
  })(Room)
);

const CallToAction = styled.a`
  position: fixed;
  z-index: 1000;
  width: 100%;
  left: 0;
  bottom: 0;
  right: 0;
  color: white;
  font-size: 1.5rem;
  background-color: ${props => props.theme.palette.accent1.bg}
  padding: 1rem 0;
  
  :hover {
  
  }
  ${breakpoint('zero')`
    text-align: center;
  `}
  
  ${breakpoint('sm')`
    right: 1rem;
    top: auto;
    left: auto;
    bottom: 1rem;
    width: auto;
    padding: 0 1.5rem;
    border-radius: 1.5rem;
    font-size: 1.2rem;
  `}
`

const RoomInfo = styled.section`
  padding: 2rem;
  text-align: center;
  min-height: 30vh;
  color: ${mix(0.25, "#fff", "#000")};
  background-color: ${rgba(240, 240, 240, 0.6)};
  
  ${breakpoint('md')`
    background-color: ${rgba(255, 255, 255, 0.6)};
  `}
  
  div {
    font-size: 1.5rem;
    
    span {
      border-radius: 50%;
      margin: 0 1rem 0 1rem;

      line-height: 3.5rem;
      width: 3.5rem;
      height: 3.5rem;
      background: ${rgba(50, 50, 50, 0.6)};
      color: #fff;
      text-align: center;
    }
  }
`

const Map = styled.section`
  width: 100%;
  min-height: 40vh;
   
  background-image: url("${props => props.bgImg }");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: scroll;
`;

const Bg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.1)), url("${props => props.bgImg }");
  background-size: auto,														cover;
  background-position: center,														top center;
  background-repeat: no-repeat,													no-repeat;
  background-attachment: scroll,														scroll;
  z-index: -1;
  
  position: fixed;
  width: 100vw;
  height: 50vh;
  
  ${breakpoint('md')`
    min-height: 90vh;
  `}
`;


const Header = styled.div`
  color: #ffffff;
  width: 100%;
  position: relative;
  text-align: center;
  overflow: hidden; 
  min-height: 50vh;
  
  ${breakpoint('md')`
    min-height: 60vh;
  `}
  
  > span {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  
  nav {
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    width: 100%;
    
    ul {
      > a {
        text-decoration: none;
        color: white;
      }
    }
    
    ul:first-child {
      font-size: 2rem;
      padding-left: 1.5rem;
      float: left;
    }
    
    ul:last-child {
      padding-right: 2rem;
      float: right;
    }
  }
  
  > div {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
    padding: 0 2rem 1rem 2rem;
    
    a > img {
      width: 4rem;
    }
    
    h2 {
      margin-bottom: 0.5rem;
      max-width: 900px;
      margin: 0 auto;
    }
  }
`;

const Content = styled.div`
`;

const Container = styled.div`
  margin: 0 auto;
  max-width: 997px;

  overflow: hidden;
  
  ${breakpoint('md')`
    border-top-left-radius: 1.5rem;
    border-top-right-radius: 1.5rem;
  `}
`;
