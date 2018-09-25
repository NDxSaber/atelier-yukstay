import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { frontloadConnect } from "react-frontload";
import Page from "../../components/page";
import styled from "styled-components";
import { Link } from "react-router-dom";
import config from "../../config";
import ga from "react-ga";
import { createWhatsAppLinkUrl, formatPrice } from "../../helper";
import Spinner from "../../components/spinner";
import breakpoint from 'styled-components-breakpoint';
import FontAwesome  from "react-fontawesome"
import {buildProtocolUrl} from "../../helper"

import logo from "../../assets/yukstayweb-logo.png";
import mapsPlaceHolder from "../../assets/maps-placeholder.png"
import jakartaPlaceHolder from "../../assets/jakarta-placeholder.jpg"
import comingSoonPlaceHolder from "../../assets/coming-soon.jpg"


import {
  getBuildings
} from "../../../modules/building";

import {
  getListings
} from "../../../modules/listing";

const frontload = async props =>
  await Promise.all([props.getLocations(), props.getListings(props.match.params.id)]);
;

class Building extends Component {

  shouldComponentUpdate(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.props.getListings(nextProps.match.params.id);
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
    console.log(this);
    let obj = this.props.buildingStubIndex[this.props.match.params.id];
    let unitRoomMap = obj ? this.props.byUnitList[obj.id] : null;
    let pageTitle = "Stay at " + !obj ? "YukStay" : obj.fields.name  + " - amazing facility for an affordable price";

    let list = (!obj || !unitRoomMap) ? <Spinner/> :
      (
        <List>
          <h3>Available Co-Living Rooms</h3>
          {
            Object.entries(unitRoomMap).map(([key, list], i) => {
              return (
                <div key={i}>
                  <h2>Co-living on Floor {list[0].fields.unit.fields.floor}</h2>
                  {
                    list.map((obj, j) => {
                      let images = obj.fields.photos;
                      let product_url = images && images.length ? images[0].thumbnails.full.url : comingSoonPlaceHolder;

                      let destination = "/b/" + this.props.match.params.id + "/" + obj.id;

                      return (
                        <Room key={j}>
                              <span>
                                <Link to={destination}>
                                  <img alt={"Room " + j} src={product_url}/></Link>
                              </span>

                          <div>
                            <h6>Harga per bulan</h6>
                            {obj.fields.occupied ? (<PriceStrike>{formatPrice(obj.fields.pricePerMonth)}</PriceStrike>) :
                              (<h2>{formatPrice(obj.fields.pricePerMonth)}</h2>)}

                            {obj.fields.occupied && <SoldOut>Tersewa</SoldOut>}
                            <a onClick={() => {
                              this.scheduleClicked(obj);
                              
                            }} href={createWhatsAppLinkUrl(config.whatsapp.PHONE_NUMBER,
                              "Hi YukStay, saya tertarik dengan unit Co-Living ini " + buildProtocolUrl(config.site.URL + destination))}>
                              <button>{obj.fields.occupied ? "Cari Kamar Lain" : "Hubungi WhatsApp"}</button>
                            </a>
                          </div>

                          <h4>Co-living Bedroom #{obj.fields.roomNo}</h4>
                          
                        </Room>
                      );
                    })
                  }
                </div>
              );
            })
          }
        </List>
       
      );

    return (
      <Page id="location"
            title={pageTitle}
            image={obj ? obj.fields.photos[0].thumbnails.large.url : jakartaPlaceHolder}
      >
        <Header bgImg={obj ? obj.fields.photos[0].thumbnails.full.url : jakartaPlaceHolder} >
          <nav>
            <ul><Link to="/"><FontAwesome name="angle-left"/></Link></ul>
            <ul></ul>
          </nav>

          <div>
            <Link to="/"><img alt="YukStay!" src={logo}/></Link>
            <h2>{!obj ? "co-live in your new home" : obj.fields.name}</h2>
            <h5>by YukStay</h5>
          </div>
        </Header>

        <Bg bgImg={obj ? obj.fields.photos[0].thumbnails.full.url : jakartaPlaceHolder} />

        <Content>
          <Container>
            <a target="_blank" href={ obj ?
              "https://www.google.com/maps/search/?api=1&query="
              + encodeURIComponent(obj.fields.address) : mapsPlaceHolder}>
            
            <Map bgImg={ obj ?
              "https://maps.googleapis.com/maps/api/staticmap?center=&zoom=13&scale=2&size=600x300&maptype=roadmap&format=png&visual_refresh=true&markers=size:mid%7Ccolor:0x3da3ff%7Clabel:%7C"
              + encodeURIComponent(obj.fields.address)
              + "&key="
              + config.google.STATIC_MAP_API_KEY : mapsPlaceHolder}/>
            </a>
            {list}
          </Container>
        </Content>
      </Page>
    );
  }
}


const mapStateToProps = state => ({
  buildingStubIndex: state.building.stubIndex,
  byUnitList: state.listing.byUnitList
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getLocations: getBuildings, getListings: getListings }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  frontloadConnect(frontload, {
    onMount: true,
    onUpdate: false
  })(Building)
);


const SoldOut = styled.h6`
`

const PriceStrike = styled.h2`
  text-decoration: line-through;
  margin-bottom: 0;
`;

const Map = styled.section`
  width: 100%;
  min-height: 30vh;
   
  background-image: url(${props => props.bgImg });
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: scroll;
`;

const Room = styled.div`
  width: 100%;
  padding: 0 0rem 1rem 0;
  overflow: hidden;
  
  span {
    display: block;
    margin-right: 0;
    float: left;
    width: 100%;
    min-width: 100%;    
    
    a {
      text-decoration: none;
      border: none;
    }
    
    img {
      width: 100%;
      border: 0 none;
      text-decoration: none;
    }
    
    ${breakpoint('sm')`
      margin-right: 15px;
      min-width: 250px;
      width: 28vw;
    `}
  }
  
  > div {
    float: right;
    text-align: right;
    color: ${props => props.theme.palette.accent1.fgBold }
  }
  
  a {
    button {
      background-color: ${props => props.theme.palette.accent1.fgBold }
      border: none;
      color: white;
      padding: 1rem 1.5rem;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 1rem;
      cursor: pointer;
      min-width: 12em;
    }
    
    button:hover {
      background-color: ${props => props.theme.palette.accent1.fgLight }
    }
  }
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
    }
  }
`;

const Content = styled.div`
`;

const Container = styled.div`
  margin: 0 auto;
  background-color: #ffffff;
  max-width: 997px;

  overflow: hidden;
  
  ${breakpoint('md')`
    border-top-left-radius: 1.5rem;
    border-top-right-radius: 1.5rem;
  `}
`;

const List = styled.section`
  padding-top: 1rem;
  padding-right: 1rem;
  padding-left: 1rem;
  min-height: 100vh;
  
  div span{
   -webkit-transition: .3s ease-in-out;
    transition: .3s ease-in-out;
    opacity: 0.85
    

    &:hover {
      opacity: 1
    }
  } 

  ${breakpoint('md')`
    padding-right: 1.5rem;
    padding-left: 1.5rem;
  `}
`;
