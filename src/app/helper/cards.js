import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import breakpoint from "styled-components-breakpoint"

import { formatPrice } from "./index";
import { ACCOMOCATIONTYPE, getRoomTypeText } from "./types";

import Card from "../components/card";
import comingSoonImg from "../assets/coming-soon.jpg";
import Spinner from "../components/spinner";



const ListingCardComp = props => {
  let listing = props.obj;
  let photos = listing.fields.photos;
  let photoUrl = (!photos || !photos.length) ? comingSoonImg : photos[0].thumbnails.full.url;

  let unit = listing.fields.unit;
  let unitType = unit.fields.unitType;
  let floor = unit.fields.floor;
  let roomNum = unit.fields.numberOfRooms;

  let building = props.bldgIdIndex[unit.fields.building.id];

  let field;
  switch(unitType) {
    case ACCOMOCATIONTYPE.WHOLELIVING:
      field = (<ListingSummary><b>{roomNum} Bedroom {getRoomTypeText(unitType)}</b> on <b>Floor {floor}</b> </ListingSummary>);
      break;
    case ACCOMOCATIONTYPE.COLIVING:
      field = (<ListingSummary><b>{getRoomTypeText(unitType)} room</b> in a <b>{roomNum} bedroom</b> unit on <b>Floor {floor}</b></ListingSummary>);
      break
    default:
      field = (<ListingSummary></ListingSummary>);
  }

  return (
    <Card imgSrc={photoUrl} key={listing.id} to={'/b/' + building.fields.stub + '/' + listing.id}>
      <Header><b>{formatPrice(listing.fields.pricePerMonth)}</b>/mo</Header>
      <Body>
        {field}
        <div>{building.fields.name}</div>
      </Body>
    </Card>
  )
}

const BuildingCardComp = props => {
  let building = props.obj;
  let photoUrl = building.fields.photos[0].thumbnails.full.url;

  return (
    <Card imgSrc={photoUrl} key={building.id} to={'/b/' + building.fields.stub}>
      <Header>Starting at <b>{formatPrice(building.fields.startingPrice)}</b>/mo</Header>
      <Body>
        <BuildingName>{building.fields.name}</BuildingName>
        <RegionName>
        {
          building.fields.regions.map((region) => (
            region.fields.name
          )).join(', ')
        }
        </RegionName>
      </Body>
    </Card>
  )
}

export const ListingCard = connect(
  state => ({
    bldgIdIndex: state.building.idIndex,
  }),
  null,
)(ListingCardComp);

export const BuildingCard = connect(
  state => ({
  }),
  null,
)(BuildingCardComp);

const Header = styled.div`  
  font-size: 1.4rem;
  b {
    font-weight: 400;
  }
  
   ${breakpoint("sm")`
    font-size: 1rem;
  `}
`

const Body = styled.div`
  font-size: 1.1rem;
  line-height: 1.4rem;
  margin-bottom: 1rem;
  flex: 1 1 auto;
  
  ${breakpoint("sm")`
    font-size: 0.9rem;
  `}
`

const ListingSummary = styled.span`
  b {
    font-weight: 400;
  }
`

const BuildingName = styled.div`
  font-weight: 400;
`

const RegionName = styled.div`
`
