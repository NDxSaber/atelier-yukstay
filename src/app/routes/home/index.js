import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { frontloadConnect } from "react-frontload";
import Page from "../../components/page";
import styled from "styled-components";
import breakpoint from "styled-components-breakpoint";
import Grid from "styled-components-grid";
import { Link } from "react-router-dom";
import { clearFix, lighten } from "polished";
import Navigation from "../../components/navigation";
import SideScrollNav from "../../components/side-scroll-nav";
import { ListingCard, BuildingCard } from "../../helper/cards";
import Spinner from "../../components/spinner";


import { formatPrice } from "../../helper";

import { FACILITIES, getFacilityAsset, getFacilityName } from "../../helper/facilities";
import wholeLivingIcon from "../../assets/roomtype/icon_whole.svg";
import coLivingIcon from "../../assets/roomtype/icon_private.svg";
import imgBg from "../../assets/main_backgorund.png";
import grayImgBg from "../../assets/secondary_image.jpg";
import rachelImg from "../../assets/testimonial/testimonial-1.jpg";
import radenImg from "../../assets/testimonial/testimonial-3.jpg";

import {
  getBuildings
} from "../../../modules/building";

import {
  getAllListing
} from "../../../modules/listing";
import { ACCOMOCATIONTYPE } from "../../helper/types";

const frontload = async props =>
  await Promise.all([props.getBuildings(), props.getAllListing()]);

class HomePage extends Component {

  render() {
    let bldgIdx = this.props.bldgIdIndex;

    if(!bldgIdx) {
      return ( <Spinner/> );
    }

    return (
      <Page id="homepage">
        <Intro>
          <Navigation/>
          <Splash>
            <div>
              <h1>Co-living is the new way to rent in cities</h1>
              <p>Combining apartment rooms with beautiful shared spaces and all access to facilities. All for just
                Rp3.000.000/ bulan</p>
              <Link to='/search'><CTAButton>Cari Kamar Kamu</CTAButton></Link>
            </div>
          </Splash>
        </Intro>

        <Content>
          <ColivingCont>
            <h3>Why Co-living?</h3>
            <Coliving>
              <p>With 1 monthly bill, you can enjoy city center living in a fully furnished room. Enjoy all the apartment facilities and also join the community events. Rates start at 1/3 to 1/2 of the average 1 bedroom rent. </p>
              <p>We also provide on-demand services for your daily needs. So you can do the living and leave the rest to us.</p>
              <p><Link to='/faq/tenant'>Learn more about co-living.</Link></p>
              <p>City living at only a fraction of the cost. Rates start at 1/3 to 1/2 of the average 1BR rent. <a
                href="#">Learn more about co-living.</a></p>
            </Coliving>
            <CoLivingServices>
              <h5>What’s included:</h5>
              <Grid>
                {
                  [FACILITIES.ELECTRICITY, FACILITIES.FURNISHED, FACILITIES.POOL,
                    FACILITIES.GYM, FACILITIES.WIFI, FACILITIES.SECURITY,
                    FACILITIES.AC, FACILITIES.WATER].map((facility) => {
                    return (
                      <Grid.Unit size={{ zero: 1 / 2, md: 1 / 2 }} key={facility}>
                        <span>
                          <img src={getFacilityAsset(facility)} alt={getFacilityName(facility)}/>
                          {getFacilityName(facility)}
                        </span>
                      </Grid.Unit>
                    );
                  })
                }
              </Grid>
            </CoLivingServices>
            <CoLivingServices>
              <h5>Available Services:</h5>
              <Grid>
                {
                  [FACILITIES.GROCERIES, FACILITIES.LAUNDRY, FACILITIES.PARKING,
                    FACILITIES.FURNITURE_RENT, FACILITIES.CLEANING,
                    FACILITIES.STORAGE, FACILITIES.MAINTENANCE, FACILITIES.MOVING].map((facility) => {
                    return (
                      <Grid.Unit size={{ zero: 1 / 2, md: 1 / 2 }} key={facility}>
                        <span>
                          <img src={getFacilityAsset(facility)} alt={getFacilityName(facility)}/>
                          {getFacilityName(facility)}
                        </span>
                      </Grid.Unit>
                    );
                  })
                }
              </Grid>
            </CoLivingServices>
          </ColivingCont>

          <ExploreCont>
            <h3>Explore our regions</h3>
            <p>Close to work or close to home. Our buildings are located for maximum convenience</p>
            <RegionCont>
              {this.props.regionList
                .filter((region) => region.fields.activeListingCount > 0)
                .map((region) => (
                <Link to={"/r/" + region.fields.stub} key={region.id}><RegionButton>{region.fields.name}</RegionButton></Link>
              ))}
            </RegionCont>
          </ExploreCont>

          <BudgetCont>
            <h3>Design for every budget</h3>
            <p>We believe everyone deserves a great place to stay. Our choices can match your budget</p>

            <RoomTypeCont>
              <RoomType>
                <img src={coLivingIcon}/>
                <div>
                  <h4>Co-living</h4>
                  <span>
                    <p>Starting at only <b>{formatPrice(2000000)}</b>/mo</p>
                    <p>Rent a single fully furnished room with shared kitchen and common area.</p>
                  </span>
                  <Link to={"/search?type=" + ACCOMOCATIONTYPE.COLIVING}>Explore Private Rooms</Link>
                </div>
              </RoomType>

              <RoomType>
                <img src={wholeLivingIcon}/>

                <div>
                  <h4>Whole Unit</h4>
                  <span>
                    <p>Starting at <b>{formatPrice(10000000)}</b>/mo</p>
                    <p>Rent as usual, a fully furnished apartment only for you.</p>
                  </span>
                  <Link to={"/search?type=" + ACCOMOCATIONTYPE.WHOLELIVING}>Explore Whole Unit</Link>
                </div>
              </RoomType>
            </RoomTypeCont>
          </BudgetCont>

          <RecommendCont>
            <h3>Recommended Listings for you</h3>
            <p>Here are some rooms listing worth to pay! Grab them while they last.</p>

            <SideScrollNav>
              {
                this.props.listingList
                  .filter((obj) => obj.fields.active)
                  .map((obj, i) => {
                    return (<CardWrapper key={obj.id}><ListingCard obj={obj} /></CardWrapper>);
                  })
              }
            </SideScrollNav>
          </RecommendCont>

          <RecommendCont>
            <h3>Most Desireable Buildings</h3>
            <p>These buildings are popular and convenient!</p>
            <SideScrollNav>
              {
                this.props.buildingList
                  .filter((obj) => obj.fields.active)
                  .slice(0, 10)
                  .map((obj, i) => {
                    return (<CardWrapper key={obj.id}><BuildingCard obj={obj}/></CardWrapper>);
                  })
              }
            </SideScrollNav>
          </RecommendCont>


          <QACont>
            <h3>Want to know more? </h3>
            <p>Let’s us help you get more infomation.</p>
            <Grid>
              <Grid.Unit size={{ zero: 1 / 1, md: 1 / 2 }}>
                <a href='/faq/tenant/recnfUpuDJwPDXxoe'>
                  <p>What is the length of stay?</p>
                </a>
              </Grid.Unit>
              <Grid.Unit size={{ zero: 1 / 1, md: 1 / 2 }}>
                <a href='/faq/tenant/reccCviQIZPONwnbf'>
                <p>What is provided in my room?</p>
                </a>
              </Grid.Unit>
              <Grid.Unit size={{ zero: 1 / 1, md: 1 / 2 }}>
                <a href='/faq/tenant/recMtlmOIGeBmyY7j'>
                <p>What is included in the price?</p>
                </a>
              </Grid.Unit>
              <Grid.Unit size={{ zero: 1 / 1, md: 1 / 2 }}>
                <a href='/faq/tenant/reckh3hDo8EkYITaF'>
                <p>Can payment be made on a monthly basis?</p>
                </a>
              </Grid.Unit>
            </Grid>
          </QACont>

          <TestimonialCont>
            <h3>See What Our Members Said </h3>
            <p>Hear directly with they said about us.</p>
            <Grid>
              <Grid.Unit size={{ zero: 1 / 1, md: 1 / 2 }}>
                <Testimonial>
                  <div><img src={rachelImg}/></div>
                  <div>
                    <b>&quot;</b>Puas banget dengan Yukstay, benar-benar bantuin untuk nyari tempat tinggal yang cozy dan affordable.
                    Sekarang mau ke kantor udah ga pakai macet, dan mau cari makan dan nongkrong tinggal turun dari
                    apartemen udah ada mall. Semua all in one sama fasilitas apartemen dan ga berat di kantong karena
                    bayarnya bisa bulanan gak kayak sewa apartemen lainnya yang bayar depan.<b>&quot;</b>
                    <br/><i>-Rachel</i>
                  </div>
                </Testimonial>
              </Grid.Unit>
              <Grid.Unit size={{ zero: 1 / 1, md: 1 / 2 }}>
                <Testimonial>
                  <div><img src={radenImg}/></div>
                  <div>
                    <b>&quot;</b>Seneng banget bisa tinggal di lokasi strategis di Jakarta dengan harga yang terjangkau banget! Dan
                    yang paling penting kamarnya nyaman juga aman. Yukstay terbaik deh!<b>&quot;</b>
                    <br/><i>-Raden</i>
                  </div>
                </Testimonial>
              </Grid.Unit>
            </Grid>
          </TestimonialCont>

          <FindYourRoomCont>
            <div>
              <h2>So, what are you waiting for?</h2>
              <p>Join us and explore our rooms now! or if you feel cannot find your desired room, you can send us your
                preferred location and budget, we will handle the rest to help you find suitable place for you.</p>
              <Link to='/search'><CTAButtonGray>Find Your Room</CTAButtonGray></Link>
            </div>
          </FindYourRoomCont>

          <OwnerCont>
            <div>
              <h3>Own a vacant apartment? Let us fill it up!</h3>
              <p>Why not make your place as a source of income? With us, we will help to arrange it and you can sit and
                get the money.</p>
              <Link to='/faq/owner'><CTAButton>Learn more</CTAButton></Link>
            </div>

          </OwnerCont>
        </Content>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  bldgIdIndex: state.building.idIndex,
  buildingList: state.building.list,
  listingList: state.listing.list,
  regionList: state.region.list
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getBuildings, getAllListing }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  frontloadConnect(frontload, {
    onMount: true,
    onUpdate: false
  })(HomePage)
);

const CardWrapper = styled.div`
  min-width: 70%;
  padding-right: 0.5rem;
  
  ${breakpoint("sm")`
    min-width: 40%;
  `}
  
  ${breakpoint("md")`
    min-width: 33%;
  `}
  
  ${breakpoint("lg")`
    min-width: 25%;
  `}
  
  ${breakpoint("xl")`
    min-width: 20%;
  `}
`

const RegionCont = styled.div`
  line-height: 2.7rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  
  &:after {
    content: "";
    flex: auto;
  }
`;

const RegionButton = styled.button`
  margin: 0 0.1rem;
  border-radius: 1.2rem;
  border: solid 1px ${props => props.theme.palette.primary};
  background-color: white;

  padding: 0.5rem 1.1rem;
  font-size: 0.9rem;
  
  :hover {
    background-color: ${props => props.theme.palette.primary};
    color: white;
  }
`;

const Content = styled.div`
  `;

const Wrapper = styled.div`
  ${clearFix()}
  padding: 3rem 1.5rem 0 1.5rem;
  
  h3 {
    margin-bottom: 0.4rem;
  }
  
  p {
    margin-bottom: 0.8rem;
  }

  ${breakpoint("md")`
    padding: 4rem 5rem 0 5rem;
  `}
`;

const Testimonial = styled.div`
  margin-top: 1rem;
  margin-bottom: 2.0rem;
  font-size: 0.9rem;
  line-height: 1.2rem;
  height: 100%;
  
  img {
    min-width: 80px;
    height: 80px;
    border-radius:40px;
    overflow: hidden;
    flex: 0 0 80px;
  }
  
  div:first-child {
    float: left;
    width:80px;
    height: 100%;
    margin-right: 1rem;
  }
  
  div:last-child {
    padding-right: 1rem;
  }
 
`;

const TestimonialCont = styled(Wrapper)`
  margin-bottom: 4rem;
  
  ${breakpoint("md")`
    margin-bottom: 0;
  `}
`;

const RecommendCont = styled(Wrapper)``;

const ExploreCont = styled(Wrapper)``;

const BudgetCont = styled(Wrapper)``;

const QACont = styled(Wrapper)`
  > div {
    p{
      border-radius: 4px;
      border: solid 1px rgba(119, 119, 119, 0.2);
      padding: 1rem;
      margin: 0 1rem 1rem 0;
      color: #717171;
      cursor:pointer;
    }
    
    p:hover {
      border: solid 1px rgba(119, 119, 119, 0.6);
    }
  }
`;

const OwnerCont = styled(Wrapper)`
  padding-bottom: 4rem;
  
  div {
    position: relative;
    
    ${breakpoint("lg")`
      a {
        float: right;
        position: absolute;
        bottom: 0
        right: 2rem;
      }
    `}
  }
`;

const ColivingCont = styled(Wrapper)`
 h3{
  margin-bottom: 0.6rem;
 }
`;

const FindYourRoomCont = styled(Wrapper)`
  padding: 0;
  
  div {
    padding: 12% 1.5rem;
    background-image: url(${grayImgBg});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-color: rgba(0, 0, 0, 0.46);
    color: white;
    
    h2, h3 {
      color: white;
    }
  }
  
  ${breakpoint("md")`
    padding: 4rem 5rem 0 5rem;
    
    div {
      padding: 10% 3rem;
    }
  `}
`;

const CoLivingServices = styled.div`
  ${clearFix()}

  padding-top: 1rem;

  p{
    font-weight: normal;
    margin-bottom: 1rem;
  }
  
  span{
    display: -moz-flex;
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    align-items: center;
    font-size: 0.9rem;

    img{
      width: 2rem;
      height: 2rem;
      margin-right: 0.5rem;
    }
  }

  div > div{
    margin: 0.2rem 0;
  }
  
  ${breakpoint("xs")`
    float:left;
    width: 50%;
  `}
  
  ${breakpoint("md")`
    padding-top: 0;
    float:left;
    width: 33.33%;
  `}
`;

const CTAButton = styled.button`
  border-radius: 2rem;
  background-color: ${props => props.theme.palette.primary};
  border: none;
  color: #ffffff;
  font-size: 1rem;
  font-weight: normal;
  padding: 0.8rem 1.2rem;
  
  &:hover {
    background-color: ${props => props.theme.palette.primaryLight};
  }
`;

const CTAButtonGray = styled(CTAButton)`
  background-color: #ededed;
  color: ${props => props.theme.palette.textColor}
  
  &:hover {
    background-color: ${lighten(0.1, "#ededed")}
  }
`;

const Splash = styled.div`
  display: flex;
  align-items: center;
  flex: 1 1 auto;
  
  div {
    padding-bottom: 5%;
  }
    
  h1{
    font-weight: bold;
    line-height: 1.4;
    width: 100%;
    font-size: 2.2rem;
    margin-bottom: 0.6rem;

    ${breakpoint("xs")`
      width: 70%;
      font-size: 1.9rem;
    `}
    
    ${breakpoint("lg")`
      width: 80%;
      font-size: 1.7rem;
    `}
  }

  p{
    margin-bottom: 1.3rem;
    
    ${breakpoint("xs")`
      width: 80%;
    `}
    
    ${breakpoint("lg")`
      font-size: 0.8rem;
    `}
  }
`;

const Intro = styled.div`
  background-color: #eff0ed;
  padding: 1rem 1.5rem;
  
  background-image: url(${imgBg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: scroll;
  
  display: flex;
  flex-flow: column;
  min-height: 70vh;
  
  ${
  breakpoint("md")`
    padding: 2rem 5rem 1rem 5rem;
  `}
`;

const RoomTypeCont = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const RoomType = styled.div`
  margin-bottom: 0.5rem;
  background-color: ${props => props.theme.palette.primaryBg}
  border-radius: 4px;
  padding: 0.8rem 1.2rem 0.5rem 1.2rem;
  width: 100%;
  display: flex;
  align-items: center; 

  
  img {
    width: 5.5rem;
    height: 5.5rem;
    margin-right: 1rem;
    flex: 0 0 18%;
  }
  
  div {
    flex: 1;
    display: flex;
    flex-flow: column;
    height: 100%;
  }
  
  span {
    flex: 1 1 auto;
  }
  
  p {
    margin-bottom: 0.2rem;
  }
  
  a {
    font-weight: 400;
  }
  
  ${breakpoint("sm")`
    width: 49.7%;
  `}
`;

const Coliving = styled.div`
  line-height: normal;
  ${clearFix()}

  a {
    text-decoration: underline;
    color: #1278ce;
  }

  h3{
    margin-bottom: 0.5rem;
  }

  p{
    margin-bottom: 0.5rem;
    display: none;
  }
  
  p:last-child {
    display: block;
  }

  div > div{
    margin: 0.2rem 0;
  }
  
  ${breakpoint("sm")`
    p {
      display: block;
    }
    
    p:last-child {
      display: none;
    }
  `}

  ${breakpoint("md")`
    float:left;
    width: 33.33%;

    p{
      margin-right: 3rem;
    }
  `}
`;
