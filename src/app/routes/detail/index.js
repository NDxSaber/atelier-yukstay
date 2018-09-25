import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { frontloadConnect } from "react-frontload";
import Page from "../../components/page";
import styled from "styled-components";
import breakpoint from "styled-components-breakpoint";
import Grid from "styled-components-grid";
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import { clearFix, lighten } from "polished";
import { Carousel } from "react-responsive-carousel";
import { buildProtocolUrl, createWhatsAppLinkUrl, formatPrice } from "../../helper";
import ga from "react-ga";

import config from "../../config";

import { pxToRem } from "../../../styles/utils";
import Navigation from "../../components/navigation";

import Roommap from "../../components/roommap";
import { getSvgIcon, ICON } from "../../helper/icon";

import calendar from "../../assets/icon_calender.png";
import card from "../../assets/icon_card.png";
import deposit from "../../assets/icon_deposit.png";
import floormapdefault from "../../assets/images/floormapdefault.jpg";
import stockPlaceholder from "../../assets/coming-soon.jpg";
import { getFacilityAsset, getFacilityName } from "../../helper/facilities";
import Spinner from "../../components/spinner";


import { getBuildings } from "../../../modules/building";

import { getUnit } from "../../../modules/unit";

import { getListing, removeListing } from "../../../modules/listing";
import Tabs from "../../components/tabs";

require("react-responsive-carousel/lib/styles/carousel.min.css");


const NAVBAR_OPTIONS = [
  {
    section: "overview",
    label: "Overview"
  },
  {
    section: "price",
    label: "Pricing"
  },
  {
    section: "amenities",
    label: "Amenities"
  },
  {
    section: "rules",
    label: "House Rules"
  },
  {
    section: "map",
    label: "Map & Neighborhood"
  }
]

const frontload = async props => {
  await
    Promise.all([
      props.getBuildings(),
      props.getListing(props.match.params.roomid)
    ]).then(([buildings, listing]) => {
      return props.getUnit(listing.fields.unit.id);
    });
};

class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navbarFixed: false
    };
  }

  componentDidMount() {
    document.addEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    this.setState({
      navbarFixed: window.scrollY > (this.refs.navbar ? this.refs.navbar.offsetTop : 0)
    });
  };

  componentWillUnmount() {
    this.props.removeListing();
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.match.params.roomid !== this.props.match.params.roomid ||
      nextProps.match.params.id !== this.props.match.params.id
    ) {
      this.props.getListing(nextProps.match.params.roomid);
    }

    return true;
  }

  scheduleClicked = obj => {
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

  renderNavbarList() {
    return NAVBAR_OPTIONS.map((data, i) => {
      let hash = "#" + data.section;
      return (
        <li key={i}>
          <HashHighlightLink
            smooth
            key={i}
            isActive={this.props.location.hash === hash}
            to={hash}
          >
            {data.label}
          </HashHighlightLink>
        </li>
      );
    });
  }

  render() {
    let bldg = this.props.bldgStubIdx ? this.props.bldgStubIdx[this.props.match.params.id] : null;
    let room = this.props.room;
    let unit = this.props.unit;

    if (!bldg || !room || !unit) {
      return (
        <Page id="detail">
          <Spinner/>
        </Page>
      );
    }

    let unitSlug = this.props.match.params.id;
    let unitListing = unit.fields.listings || [];

    let unitLayoutMap = unit.fields.layout ? unit.fields.layout[0].thumbnails.large.url : null;

    let price = formatPrice(room ? room.fields.pricePerMonth : 0);
    let images =
      room && room.fields.photos
        ? room.fields.photos
          .map(obj => obj.url)
          .concat(
            room.fields.unit.fields.photos
              ? room.fields.unit.fields.photos.map(p => p.url)
              : []
          )
        : [stockPlaceholder];
    let destination = "/b/" + this.props.match.params.id;
    let waDestination =
      "/b/" + this.props.match.params.id + "/" + this.props.match.params.roomid;

    let waLink = createWhatsAppLinkUrl(
      config.whatsapp.PHONE_NUMBER,
      "Hi YukStay, saya tertarik dengan unit Co-Living ini " +
      buildProtocolUrl(config.site.URL + waDestination)
    );

    let buildingAmenities = bldg.fields.facilities || [];
    let inventory = unit.fields.inventory || [];

    let roomNumber = room && room.fields.roomNo ? room.fields.roomNo : "";
    let roomType;
    if (room ? room.fields.unit.fields.unitType == "co-living" : "whole unit") {
      roomType = room
        ? "Kamar di dalam unit " +
        room.fields.unit.fields.numberOfRooms +
        "BR lantai " +
        room.fields.unit.fields.floor
        : "Kamar yang nyaman dan harga terjangkau";
    } else {
      roomType = room
        ? "Whole Unit " +
        room.fields.unit.fields.numberOfRooms +
        "BR lantai " +
        room.fields.unit.fields.floor
        : "Apartemen yang nyaman dan harga terjangkau";
    }

    return (
      <Page id="detail">
        <Nav id="nav">
          <Navigation/>
          <MenuLeft>
            <nav
              id="navbar"
              ref="navbar"
              className={this.state.navbarFixed ? "navbar-active" : ""}
            >
              <ul>{this.renderNavbarList()} </ul>
            </nav>
          </MenuLeft>
        </Nav>
        <Container>
          <Leftside>
            <div>
              <Breadcrumb>
                <Link to="/">Home</Link> &gt;
                <a>Detail</a>
              </Breadcrumb>
              <Carousel
                showArrows={true}
                showThumbs={false}
                showIndicators={true}
                showStatus={false}
                autoPlay={true}
                infiniteLoop={true}
              >
                {images.map((url, i) => {
                  return (
                    <div key={i}>
                      <img alt={"Room pic" + i} src={url}/>
                    </div>
                  );
                })}
              </Carousel>
              <h2>
                {roomType} di {bldg ? bldg.fields.name : "Apartemen di Jakarta"}
              </h2>
              <p>{bldg ? bldg.fields.address : "di pusat kota Jakarta"}</p>
              <Overview>
                <div id="overview" ref="overview">
                  <Descriptions>
                    <h3>Overview</h3>
                    <p>
                      {room ? room.fields.unit.fields.summary : "Coming soon"}
                    </p>
                  </Descriptions>
                </div>
              </Overview>

              <Room className={"room"}>
                <div id="price" ref="price">
                  <RoomTop>
                    <h3>Floor plan and Pricing</h3>
                    <RoomTwoCols>
                      <Info>
                        <img src={card} alt="payment"/>
                        <p>
                          Rent Payment<span>
                            Sebelum tanggal 10 setiap bulan
                          </span>
                        </p>
                      </Info>
                    </RoomTwoCols>
                    <RoomTwoCols>
                      <Info>
                        <img src={deposit} alt="deposit"/>
                        <p>
                          Security Deposit<span>1 bulan per kamar</span>
                        </p>
                      </Info>
                    </RoomTwoCols>
                  </RoomTop>
                  <RoomBottom>
                    <RoomTwoCols>
                      <Floormap>
                        <div className="floormap-inner">
                          <img
                            src={unitLayoutMap ? unitLayoutMap : floormapdefault}
                            alt="floor map"
                          />
                        </div>
                      </Floormap>
                    </RoomTwoCols>

                    <RoomTwoCols>
                      <Bedroom>
                        <div className="floormap-inner">
                          {unitListing.map((data, i) => {
                            return (
                              <Card
                                key={data.id}
                                isCurrent={data.id === this.props.match.params.roomid}
                                isOccupied={data.fields.occupied}
                              >
                                <Link to={"/b/" + unitSlug + "/" + data.id}>
                                  {data.fields.roomNo ? (
                                    <CardBullet className="card-bullet">
                                      {data.fields.roomNo}
                                    </CardBullet>
                                  ) : (
                                    ""
                                  )}
                                  <p className="font-bold">
                                    {formatPrice(data.fields.pricePerMonth)}
                                  </p>
                                  <span>
                                    Bedroom {data.fields.roomNo} ({
                                    data.fields.roomSize
                                  }{" "}
                                    m)
                                  </span>
                                  <p>
                                    1 queen bed<br/>
                                    {data.fields.bathroomType} bathroom
                                  </p>
                                  <div className="font-bold">
                                    {data.fields.occupied ? (
                                      <Occupied>Tersewa</Occupied>
                                    ) : (
                                      <Available>Tersedia</Available>
                                    )}
                                  </div>
                                </Link>
                              </Card>
                            );
                          })}
                        </div>
                      </Bedroom>
                    </RoomTwoCols>
                  </RoomBottom>
                </div>
              </Room>
            </div>

            <div>
              <div id="amenities" ref="amenities">
                <Amenities>
                  <h3>Amenities</h3>

                  <AmenitiesList>
                    <Tabs>
                      <div label="Building">
                        <Grid>
                          {buildingAmenities.map(facility => {
                            return (
                              <Grid.Unit
                                size={{ zero: 1 / 2, md: 1 / 4 }}
                                key={facility}
                              >
                                <span>
                                  <img
                                    src={getFacilityAsset(facility)}
                                    alt={getFacilityName(facility)}
                                  />
                                  {getFacilityName(facility)}
                                </span>
                              </Grid.Unit>
                            );
                          })}
                        </Grid>
                      </div>
                      <div label="Unit">
                        <Grid>
                          {inventory.map(facility => {
                            return (
                              <Grid.Unit
                                size={{ zero: 1 / 2, md: 1 / 4 }}
                                key={facility}
                              >
                                <span>
                                  <img
                                    src={getFacilityAsset(facility)}
                                    alt={getFacilityName(facility)}
                                  />
                                  {getFacilityName(facility)}
                                </span>
                              </Grid.Unit>
                            );
                          })}
                        </Grid>
                      </div>
                    </Tabs>
                  </AmenitiesList>
                </Amenities>
              </div>

              <Rules>
                <div id="rules" ref="rules">
                  <h3>House Rules</h3>
                  <p>
                    1. You shall take care of the home as your own<br/>
                    2. You shall look after you roommates like a family<br/>
                    3. You shall be good to neighbours &amp; not wake them up
                    midnight<br/>
                    4. You shall invite us on your birthday<br/>
                    5. You shall party hard but clean up afterwards<br/>
                    6. You shall introduce your roommates to The Big Bang Theory
                  </p>
                </div>
              </Rules>
              <Map>
                <div id="map" ref="map">
                  <h3>Map and Neighborhood</h3>
                  <Roommap data={bldg}/>
                  <NeighborHood>
                    <ul>
                      <li>
                        <img
                          className="neighborhood-ico"
                          alt={ICON.SHOPPING}
                          src={getSvgIcon(ICON.SHOPPING)}
                        />{" "}
                        Mall & Shopping Center{" "}
                        <img
                          className="chevron-ico"
                          alt={ICON.CHEVRON}
                          src={getSvgIcon(ICON.CHEVRON)}
                        />
                      </li>
                      <li>
                        <img
                          className="neighborhood-ico"
                          alt={ICON.RESTAURANT}
                          src={getSvgIcon(ICON.RESTAURANT)}
                        />{" "}
                        Restaurant & Food Center{" "}
                        <img
                          className="chevron-ico"
                          alt={ICON.CHEVRON}
                          src={getSvgIcon(ICON.CHEVRON)}
                        />
                      </li>
                      <li>
                        <img
                          className="neighborhood-ico"
                          alt={ICON.HEALT}
                          src={getSvgIcon(ICON.HEALT)}
                        />{" "}
                        Health Care{" "}
                        <img
                          className="chevron-ico"
                          alt={ICON.CHEVRON}
                          src={getSvgIcon(ICON.CHEVRON)}
                        />
                      </li>
                    </ul>
                  </NeighborHood>
                </div>
              </Map>
            </div>
          </Leftside>

          <Rightside className={this.state.navbarFixed ? "navbar-active" : ""}>
            <p>
              {room && room.fields.roomNumber
                ? "Co-living bedroom" + room.fields.roomNumber
                : "Bedroom " + roomNumber}
              <br/>
              <span>{price}</span>/bulan
            </p>
            <Form>
              <span>Pilih waktu berkunjung</span>
              <br/>
              {/*<label>Name*/}
              {/*<Input placeholder="Nama kamu"/>*/}
              {/*</label>*/}
              {/*<label>Phone*/}
              {/*<Input placeholder="081233455767"/>*/}
              {/*</label>*/}
              {/*<table>*/}
              {/*<tbody>*/}
              {/*<tr><td>Pilih hari</td>*/}
              {/*<td><label>*/}
              {/*<input type="radio" name="date" value="today"/>Hari ini*/}
              {/*</label></td>*/}
              {/*<td><label>*/}
              {/*<input type="radio" name="date" value="tomorrow"/>Besok*/}
              {/*</label>*/}
              {/*</td>*/}
              {/*</tr>*/}
              {/*<tr><td>Pilih waktu</td>*/}
              {/*<td><label>*/}
              {/*<input type="radio" name="date" value="morning"/>Pagi*/}
              {/*</label></td>*/}
              {/*<td><label>*/}
              {/*<input type="radio" name="date" value="noon"/>Siang*/}
              {/*</label>*/}
              {/*</td>*/}
              {/*</tr>*/}
              {/*</tbody>*/}
              {/*</table>*/}
              {/*<Book>*/}
              {/**/}
              {/*</Book>*/}
              <a
                onClick={e => { this.scheduleClicked(room) }}
                href={waLink}
              >
                <Button>Hubungi Whatsapp</Button>
              </a>
              {/*<Button>Jadwalkan kunjungan</Button>*/}
              {/*<a>Hubungi Whatsapp</a>*/}
              <Info>
                <img src={calendar} alt="schedule"/>
                <p>
                  <span>Book now to avoid missing out.</span>
                </p>
              </Info>
            </Form>
          </Rightside>
        </Container>
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    bldgStubIdx: state.building.stubIndex,
    room: state.listing.current,
    unit: state.unit.current
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { getBuildings, getListing, removeListing, getUnit },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  frontloadConnect(frontload, {
    onMount: true,
    onUpdate: false
  })(Detail)
);

const Container = styled.div`
  background-color: ${props => props.theme.palette.header.fgBold};
  position: relative;
  padding: 0 1rem;
  scroll-behavior: smooth;
  ${clearFix()} h3 {
    margin-bottom: 0.5rem;
    letter-spacing: normal;
  }

  p {
    margin: 0 0 1rem 0;
    line-height: 1.75rem;
  }

  ${breakpoint("sm")`
      padding: 0 2rem;
    `};
`;

const HashHighlightLink = styled(({ isActive, children, ...rest }) => (
  <HashLink {...rest}>{children}</HashLink>
))`
  text-align: left;
  border-bottom: 2px solid transparent;
  padding-bottom: ${pxToRem("14px")};
  padding-top: ${pxToRem("14px")};
  display: block;
  
  &:hover,
  &:active {
    color: ${props => props.theme.palette.primary};
    border-bottom: 2px solid ${props => props.theme.palette.primary};
  }
        
  ${(props) => props.isActive && `
    color: ${props.theme.palette.primary};
    border-bottom: 2px solid ${props.theme.palette.primary};
  `}
`

const Nav = styled.div`
  ${clearFix()} padding: 1rem 2rem 0 2rem;
  border-bottom: solid 1px #ededed;

  > div {
    border-bottom: solid 1px transparent;

    .navbar-active {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      z-index: 1;
      background: ${props => props.theme.palette.header.fgBold};
      border-bottom: solid 1px #ededed;
      ul {
        padding-left: 2rem;
      }
      ul li a {
        color: ${props => props.theme.palette.textColor};
      }
    }
  }

  img {
    width: 7rem;
  }

  > div {
    ul {
      ${clearFix()} position : relative;
      top: 1px;
    }

    ul li {
      line-height: normal;

      ${breakpoint("sm")`
        padding-right: 1rem;
      `} 
    }
  }
  ${breakpoint("md")`
    box-shadow: 5px 10px #888888;
  `} ${breakpoint("sm")`
    justify-content: flex-end;
  `};
`;

const MenuLeft = styled.div`
  ul li {
    float: left;

    ${breakpoint("md")`
      margin-right: 2rem;
    `} a {
      color: ${props => props.theme.palette.textColor};
    }
  }

  nav {
    display: none;
  }

  ${breakpoint("md")`
    width: 70%;
    
    nav {
      display: block;
    }
  `};
`;

const Breadcrumb = styled.div`
  a{
    padding: 0 0.5rem;
    font-size: 0.8rem;
    color: ${props => props.theme.palette.textColor}
    &:first-child{
      padding-left: 0;
    }
    &:hover{
      text-decoration: underline;
    }
  }
`;

const Leftside = styled.div`
  float: left;
  padding: 1rem 0;

  .carousel.carousel-slider {
    border-radius: 4px;
  }

  h1 {
    letter-spacing: normal;
    margin: 1rem 0;
  }

  h2 {
    margin: 1rem 0;
    letter-spacing: normal;
  }

  ${breakpoint("md")`
    width: 68%;
  `};
`;

const Descriptions = styled.div`
  h3 {
    margin-bottom: 0.5rem;
    letter-spacing: normal;
  }

  p {
    line-height: 1.75rem;
  }

  ${breakpoint("md")`
    padding: 1rem;
  `};
`;

const Button = styled.button`
  width: 100%;
  border-radius: 24px;
  background-color: ${props => props.theme.palette.primary};
  padding: 0.75rem;
  border: none;
  box-shadow: none;
  color: ${props => props.theme.palette.header.fgBold};
  font-size: 1rem;
`;

const RoomTop = styled.div`
  ${clearFix()};
`;

const RoomTwoCols = styled.div`
  width: 100%;

  ${breakpoint("md")`
    width : 50%;
    float: left;
  `};
`;

const RoomBottom = styled.div`
  ${clearFix()};
`;

const Floormap = styled.div`
  float: left;

  img {
    display: block;
    max-width: 100%;
  }
`;

const Info = styled.div`
  ${clearFix()} margin-top: 1rem;

  img {
    float: left;
    width: 2rem;
  }

  p {
    float: left;
    margin: 0 0 0 1rem;

    span {
      display: block;
      opacity: 0.7;
    }
  }
`;

const Bedroom = styled.div`
  float: left;
  width: 100% h3 {
    margin-bottom: 0.5rem;
    letter-spacing: normal;
  }
`;

const Occupied = styled.p`
  color: ${props => props.theme.palette.red};
`;

const Available = styled.p`
  color: ${props => props.theme.palette.green};
`;

const CardBullet = styled.div`
  width: 40px;
  height: 40px;
  line-height: 40px;
  font-weight: 600;
  border-radius: 20px;
  background-color: ${props => props.theme.palette.primaryBg};
  text-align: center;
  color: ${props => props.theme.palette.primary};
  margin-bottom: 0.5rem;
`;

const Card = styled.div`
  float: left;
  padding: 0.5rem;
  border: 1px solid ${lighten(0.1, "#ededed")};
  border-radius: 4px;
  margin-bottom: 4px;
  line-height: 2rem;
    
  ${(props) => props.isCurrent && `
    border-color: ${props.theme.palette.primary};
    background-color: ${props.theme.palette.primaryBg};
    .card-bullet {
      background-color: ${props.theme.palette.header.fgBold};
    }
  `}
  
  ${(props) => props.isOccupied && `
    background-color: rgba(237, 237, 237, 0.5);
    .card-bullet {
      background-color: ${lighten(0.1, "#ededed")};
    }
  `}

  &:nth-child(odd) {
    margin-right: 4px;
  }

  a,
  a:link {
    color: inherit;
  }

  img {
    width: 2rem;
  }

  p {
    margin: 0;
    line-height: 1.5rem;
    font-size: 1rem;
    opacity: 0.7;
  }
  span {
    font-size: 1rem;
    display: block;
  }

  ${breakpoint("md")`
     margin: 0 2% 2% 0;
    
  `};
`;

const Map = styled.div`
  position: relative;

  h3 {
    color: #707070;
    margin-bottom: 0.5rem;
    letter-spacing: normal;
  }

  > div p {
    width: 250px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: normal;

    ${breakpoint("md")`
      width: 100%;
      white-space: normal;
    `};
  }
`;

const Form = styled.div`
  background-color: ${props => props.theme.palette.header.fgBold};
  table {
    width: 100%;
    margin: 1rem 0 0 0;

    tr {
      td {
        padding: 0.2rem;

        label {
          border: 1px solid #ccc;
          padding: 0.2rem 1rem;
          display: block;
          border-radius: 24px;
          text-align: center;
        }
      }
      td:first-child {
        font-size: 0.8rem;
        opacity: 0.9;
      }
    }
  }
`;

const Book = styled.div`
  ${clearFix()} margin-bottom: 1rem;

  > div {
    width: 45%;
    float: left;
  }

  div:first-child {
    margin-right: 5%;
  }

  input {
    dispay: block;
  }
`;

const Wrapper = styled.section`
  ${clearFix()}
  background: ${props => props.theme.palette.header.fgBold};
  top: 62px;
  transition: all ease .4s;
  margin-top: 1rem;

  &.navbar-active{
    ${breakpoint("md")`
      position : fixed;
      top: 62px
    `}    
  }

  ${breakpoint("md")`
    padding: 1rem;
    margin-bottom: 2rem;
    box-shadow: 0 3px 6px 0 rgba(119, 119, 119, 0.1);
  `}
`;

const Overview = styled(Wrapper)`
  margin-bottom: 1rem;

  ${breakpoint("md")`
    margin-bottom: 4rem;
  `};
`;

const Room = styled(Wrapper)`
  .floormap-inner {
    ${clearFix()};
    padding: 0;

    > div {
      border: 1px solid #efefef;
      width: 45%;
      margin: 2%;
    }

    ${breakpoint("md")`
      padding-top: 10px;
      padding-right: 10px;
    `};
  }
`;

const Rightside = styled(Wrapper)`
  float: right;
  line-height: 1rem;
  width: 100 %;
  position: fixed;
  top: auto;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  z-index: 100000;
  border-radius: 4px;
  background-color: ${props => props.theme.palette.header.fgBold};
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);

  p {
    border-bottom: 1px solid #efefef;
    padding-bottom: 0.5rem;
    margin: 0;
    &:last-child {
      border: none;
    }

    span {
      font-size: 1.2rem;
      font-weight: 600;
      line-height: 2rem;
      color: #707070;
    }
  }
  span {
    font-weight: 600;
    opacity: 0.9;
    line-height: 3rem;
  }

  label {
    font-size: 0.8rem;
  }

  ${breakpoint("md")`
      width: 30%;
      top: 10rem;
      bottom: auto;
      left: auto;
      right: 2rem;
      z-index: auto;
      line-height: 2rem;
  `};
`;

const Rules = styled(Wrapper)`
  h3 {
    color: #707070;
    margin-bottom: 0.5rem;
    letter-spacing: normal;
  }
`;

const Amenities = styled(Wrapper)`
  h3{
    margin-bottom: 0.5rem;
    letter-spacing: normal;
  }

  ul{
    ${clearFix()}
    display: block;
    border-bottom: 1px solid #efefef;
    margin: 1rem 0;
  }

  ul li{
    float: Left;
    line-height: normal;
    padding-bottom: 1rem;
    cursor: pointer
      &.tab-active {
      color: ${props => props.theme.palette.primary}
    }

    a{
      color: ${props => props.theme.palette.textColor}
      text-align: left;
    }

    ${breakpoint("md")`
        margin-right: 2rem;
      `}

  }
`;

const AmenitiesList = styled.div`
  span {
    display: -moz-flex;
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    align-items: center;
    font-size: 0.9rem;

    img {
      width: 1.5rem;
      height: 1.5rem;
      margin-right: 0.5rem;
    }
  }
`;

const NeighborHood = styled.div`
  display: none;
  width: 40%;
  left: 100%;
  position: absolute;
  top: 0;
  font-size: 1rem;
  ul {
    padding-left: 1rem;
    margin-top: 2rem;
  }

  li {
    line-height: 56px;
    border-radius: 4px;
    border: solid 1px rgba(119, 119, 119, 0.2);
    margin-bottom: 8px;
    padding-left: 50px;
    padding-right: 30px;
    position: relative;
  }

  .neighborhood-ico {
    position: absolute;
    width: 46px;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  .chevron-ico {
    position: absolute;
    right: 10px;
    width: 24px;
    top: 50%;
    transform: translateY(-50%);
  }

  ${breakpoint("md")`
          display: block;
        `};
`;
