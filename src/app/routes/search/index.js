import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { frontloadConnect } from "react-frontload";
import Page from "../../components/page";
import styled from "styled-components";
import breakpoint from "styled-components-breakpoint";
import { clearFix, darken, lighten } from "polished";
import { ListingCard } from "../../helper/cards";
import FontAwesome from "react-fontawesome";
import qs from "qs";

import Spinner from "../../components/spinner";
import Navigation from "../../components/navigation";
import coLivingIcon from "../../assets/roomtype/icon_private.svg";
import wholeLivingIcon from "../../assets/roomtype/icon_whole.svg";
import bldgIcon from "../../assets/roomtype/icon_building.svg";
import regionIcon from "../../assets/roomtype/icon_region.svg";

import { getBuildings } from "../../../modules/building";
import { getAllListing } from "../../../modules/listing";
import { ACCOMOCATIONTYPE, getRoomTypeText } from "../../helper/types";
import createEnum from "../../helper/create_enum";

const frontload = async props =>
  await Promise.all([props.getBuildings(), props.getAllListing()]);

function parseQueryString(qStr) {
  return qs.parse(qStr, { ignoreQueryPrefix: true });
}

export const SEARCHPARAM = createEnum({
  TYPE: "type",
  BUILDING: "bldg",
  REGION: "region"
});

export class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showFilter: false,
      selectedFilters: parseQueryString(props.location.search)
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      this.setState({ selectedFilters: parseQueryString(this.props.location.search) });
    }
  }

  // Should be only called from the constructor
  forceSetFilter = (filterName, filterValue) => {
    this.state.selectedFilters[filterName] = filterValue;
  };

  // Should move all the _ functionns eventually to a seperate class. Use immutable.js
  _isFilterSet = (filterName, filterValue) => {
    let currentSelected = this.state.selectedFilters;

    if (!(filterName in currentSelected)) {
      return false;
    }

    let currentFilterValue = currentSelected[filterName];

    if (Array.isArray(currentFilterValue)) {
      // return true if the value can be found in array
      return (currentFilterValue.indexOf(filterValue) !== -1);
    }

    return (currentFilterValue === filterValue);
  };

  _setSingleFilter = (filterName, filterValue) => {
    let currentSelected = { ...this.state.selectedFilters };
    currentSelected[filterName] = filterValue;

    return currentSelected;
  };

  _setMultiFilter = (filterName, filterValue) => {
    let currentSelected = { ...this.state.selectedFilters };

    if (!currentSelected[filterName]) {
      currentSelected[filterName] = [];
    } else if (!Array.isArray(currentSelected[filterName])) {
      currentSelected[filterName] = [currentSelected[filterName]];
    }

    currentSelected[filterName].push(filterValue);

    return currentSelected;
  };

  _removeSingleFilter = (filterName, filterValue) => {
    let currentSelected = { ...this.state.selectedFilters };
    delete currentSelected[filterName];

    return currentSelected;
  };

  _removeMultiFilter = (filterName, filterValue) => {
    let currentSelected = { ...this.state.selectedFilters };

    if (!Array.isArray(currentSelected[filterName])) {
      currentSelected[filterName] = [currentSelected[filterName]];
    }

    currentSelected[filterName].splice(currentSelected[filterName].indexOf(filterValue), 1);

    if (!currentSelected[filterName].length) {
      delete currentSelected[filterName];
    }

    return currentSelected;
  };

  _setSelectedFilter = (filters) => {
    this.setState({ selectedFilters: filters });
  };

  _applyFilter = (filters) => {
    this.props.history.push("/search?" + qs.stringify(filters));
  };

  handleRemoveSingleFilter(filterName, filterValue) {
    this._applyFilter(this._removeSingleFilter(filterName, filterValue));
  }

  handleRemoveMultiFilter(filterName, filterValue) {
    this._applyFilter(this._removeMultiFilter(filterName, filterValue));
  }

  handleToggleSingleFilter = (filterName, filterValue) => {
    let nextState = (this._isFilterSet(filterName, filterValue)) ? this._removeSingleFilter(filterName, filterValue) :
      this._setSingleFilter(filterName, filterValue);

    this._setSelectedFilter(nextState);
  };

  handleToggleMultiFilter = (filterName, filterValue) => {
    let nextState = (this._isFilterSet(filterName, filterValue)) ?
      this._removeMultiFilter(filterName, filterValue) :
      this._setMultiFilter(filterName, filterValue);

    this._setSelectedFilter(nextState);
  };

  handleApplyFilter = () => {
    this._applyFilter(this.state.selectedFilters);
    this.handleOpenCloseFilter(false);
  };

  handleCloseFilter = () => {
    // revert changes back to the search
    this._setSelectedFilter(parseQueryString(this.props.location.search));
    this.handleOpenCloseFilter(false);
  };

  handleOpenCloseFilter = (force) => {
    this.setState({
      showFilter: (force === undefined) ? !this.state.showFilter : force
    });
  };

  getFilteredListings = () => {
    let { bldg, region, type } = this.state.selectedFilters;

    if(!bldg && !region && !type) {
      return this.props.listingList;
    }

    let filtered = this.props.listingList

    if (bldg) {
      bldg = Array.isArray(bldg) ? bldg : [bldg];

      let bldgSet = new Set(bldg.map((bldgStub) => this.props.buildingStub[bldgStub].id))
      filtered = filtered.filter((listing) => bldgSet.has(listing.fields.unit.fields.building.id));

    } else if (region) {
      let bldgSet = new Set(this.getFilteredBuildings().map((bldg) => bldg.id));
      filtered = filtered.filter((listing) => bldgSet.has(listing.fields.unit.fields.building.id));
    }

    if (type) {
      filtered = filtered.filter((data) => data.fields.unit.fields.unitType === type);
    }

    return filtered;
  }

  getFilteredBuildings = () => {
    let { region } = this.state.selectedFilters;

    if(!region || !region.length) {
      return this.props.buildingList;
    }

    let selRegionSet = new Set(Array.isArray(region) ? region : [region]);

    return this.props.buildingList
      .filter((obj) => obj.fields.active)
      .filter((bldg) => {
      if(!bldg.fields.regions) {
        return false;
      }

      for (var reg of bldg.fields.regions) {
        if(selRegionSet.has(reg.fields.stub)) return true;
      }
      return false;
    });
  }

  render() {
    let bldgIdx = this.props.buildingIndex;
    let searchResList = this.props.listingList;

    let listings = this.getFilteredListings();
    let content = (!bldgIdx || !searchResList) ? <Spinner/> : (
      <Wrapper>
        <SearchSummaryCont><b>{listings.length} room(s)</b> found</SearchSummaryCont>
        <SearchResultCont>
          {listings.map((obj, i) => {
            return (<CardWrapper key={obj.id}><ListingCard obj={obj}/></CardWrapper>);
          })
          }
        </SearchResultCont>
      </Wrapper>
    );

    let filters = this.state.selectedFilters;
    return (
      <Page id="homepage">
        <Header>
          <Navigation/>
          {this.props.regionStub &&
          <FilterCont show={!this.state.showFilter}>
            {
              filters[SEARCHPARAM.TYPE] &&
              <Filter onClick={() => this.handleRemoveSingleFilter(SEARCHPARAM.TYPE, filters.type)}>
                <img
                  src={filters.type == ACCOMOCATIONTYPE.COLIVING ? coLivingIcon : wholeLivingIcon}/>
                {getRoomTypeText(filters.type)}
                <FontAwesome name="times"/>
              </Filter>
            }

            {
              filters[SEARCHPARAM.REGION] && (
                (Array.isArray(filters.region) ? filters.region : [filters.region])
                  .map((regionStub) => {
                    return (
                      <Filter key={regionStub}
                              onClick={() => this.handleRemoveMultiFilter(SEARCHPARAM.REGION, filters.type)}>
                        <img src={regionIcon}/>
                        {this.props.regionStub[regionStub].fields.name}
                        <FontAwesome name="times"/>
                      </Filter>
                    );
                  })

              )
            }

            {
              filters[SEARCHPARAM.BUILDING] && (
                (Array.isArray(filters.bldg) ? filters.bldg : [filters.bldg])
                  .map((bldgStub) => {
                    return (
                      <Filter key={bldgStub}
                              onClick={() => this.handleRemoveMultiFilter(SEARCHPARAM.BUILDING, filters.type)}>
                        <img src={bldgIcon}/>
                        {this.props.buildingStub[bldgStub].fields.name}
                        <FontAwesome name="times"/>
                      </Filter>
                    );
                  })

              )
            }

            <AddFilter isShow={this.state.showFilter} onClick={this.handleOpenCloseFilter}><FontAwesome name="plus"/>Set
              your filters</AddFilter>
          </FilterCont>
          }
        </Header>

        <Divider show={this.state.showFilter}/>
        <FilterSelectorCont show={this.state.showFilter}>
          <FilterSelector>
            <ActionCont>
              <CTAButton onClick={this.handleApplyFilter}>Apply</CTAButton>
              <CTAButtonGray onClick={this.handleCloseFilter}>Close</CTAButtonGray>
            </ActionCont>
            <h2>Filters</h2>
            <div>Select unit type</div>
            <RegionCont>
              <RegionButton
                selected={ACCOMOCATIONTYPE.COLIVING === this.state.selectedFilters.type}
                onClick={() => {
                  this.handleToggleSingleFilter(SEARCHPARAM.TYPE, ACCOMOCATIONTYPE.COLIVING);
                }}>
                Co-living
              </RegionButton>
              <RegionButton
                selected={ACCOMOCATIONTYPE.WHOLELIVING === this.state.selectedFilters.type}
                onClick={() => {
                  this.handleToggleSingleFilter(SEARCHPARAM.TYPE, ACCOMOCATIONTYPE.WHOLELIVING);
                }}>
                Whole-unit
              </RegionButton>
            </RegionCont>

            <div>Select a region (one or multiple)</div>
            <RegionCont>
              {this.props.regionList.map((region) => (
                <RegionButton
                  key={region.id}
                  selected={(
                    this.state.selectedFilters.region &&
                    this.state.selectedFilters.region.indexOf(region.fields.stub) != -1) ? true : false}
                  onClick={() => {
                    this.handleToggleMultiFilter(SEARCHPARAM.REGION, region.fields.stub);
                  }}>
                  {region.fields.name}
                </RegionButton>
              ))}
            </RegionCont>

            <div>Select a building (one or multiple)</div>
            <RegionCont>
              {this.getFilteredBuildings().map((bldg) => (
                <RegionButton
                  key={bldg.id}
                  selected={(
                    this.state.selectedFilters.bldg &&
                    this.state.selectedFilters.bldg.indexOf(bldg.fields.stub) != -1) ? true : false}
                  onClick={() => {
                    this.handleToggleMultiFilter(SEARCHPARAM.BUILDING, bldg.fields.stub);
                  }}>
                  {bldg.fields.name}
                </RegionButton>
              ))}
            </RegionCont>
          </FilterSelector>
        </FilterSelectorCont>
        <Divider show={true}/>

        <Content>
          {content}
        </Content>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  buildingList: state.building.list,
  buildingIndex: state.building.idIndex,
  buildingStub: state.building.stubIndex,
  listingList: state.listing.list,
  regionList: state.region.list,
  regionStub: state.region.stubIndex
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getBuildings, getAllListing }, dispatch);

export function reconnect(Component) {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    frontloadConnect(frontload, {
      onMount: true,
      onUpdate: false
    })(Component)
  );
}

export default reconnect(SearchPage);

const ActionCont = styled.span`
  float: right;
  font-size: 1.65rem;
  cursor: pointer;
`;

const RegionCont = styled.div`
  line-height: 2.7rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  
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
  background-color: ${props => (props.selected) ? lighten(0.1, props.theme.palette.primary) : "white"};
  color: ${props => (props.selected) ? "white" : "auto"};


  padding: 0.5rem 1rem;
  font-size: 1rem;
  margin-bottom: 0.2rem;
  
  :hover {
    background-color: ${props => props.theme.palette.primary};
    color: white;
  }
  
  ${breakpoint("sm")`
    font-size: 0.9rem;    
  `}
`;


const SearchSummaryCont = styled.div`
  font-size: 1.5rem;
  b {
    font-weight: 400;
  }
  
  ${breakpoint("sm")`
    font-size: 1.1rem;
  `}
`;

const SearchResultCont = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  
  &:after {
    content: "";
    flex: auto;
  }
`;

const Divider = styled.hr`
  margin: 1rem 0;
  border-bottom: solid 1px #aaa;
  display: ${props => props.show ? "block" : "none"};
`;

const FilterSelectorCont = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 100%;
  display: ${props => props.show ? "block" : "none"};
  background-color: white;
  overflow-y: scroll;
  
  h2 {
    margin-top: 1rem;
  }
  
  ${breakpoint("sm")`
    position: relative;
    height: auto;
    
    h2 {
      display:none;
    }
  `}
`;

const FilterCont = styled.div`
  line-height: 2.2rem;
  display: ${props => props.show ? "flex" : "none"};
  flex-wrap: wrap;
  justify-content: space-between;
  
  &:after {
    content: "";
    flex: auto;
  }
`;

const Selector = styled.div`
  margin: 0 0.1rem;
  border-radius: 1.4rem;
  padding: 0.2rem 1.2rem;
  border: solid 1px;
  font-size: 1.2rem;
  margin-bottom: 0.3rem;
  
  ${breakpoint("sm")`
    font-size: 0.9rem;
    padding: 0.2rem 1rem;
  `}
`;

const Filter = styled(Selector)`
  border-color: ${props => lighten(0.5, props.theme.palette.textColor)};
  background-color: ${props => lighten(0.5, props.theme.palette.textColor)};
  background-color: ${props => lighten(0.5, props.theme.palette.textColor)};
  cursor: pointer;

  img {
    path: #fff;
    fill: #fff;
    width: 1.4rem;
    height: 100%;
    margin-right: 0.3rem;
    float: left;
    filter: contrast(0) ;
  }
  
  span {
    margin-left: 0.5rem;
    cursor: pointer;
    
    :hover {
      color: ${props => darken(0.2, props.theme.palette.textColor)}
    }
  }
  
  :hover {
    border-color: ${props => lighten(0.4, props.theme.palette.textColor)};
    background-color: ${props => lighten(0.4, props.theme.palette.textColor)};
  }
`;

const AddFilter = styled(Selector)`
  border-color: ${props => props.theme.palette.textColor};
  background-color: ${props => props.isShow ? props.theme.palette.textColor : "white"};
  cursor: pointer;
  color: ${props => props.isShow ? "white" : props.theme.palette.textColor};
  
  span {
    margin-right: 0.5rem;
  }
  
  :hover {
    background-color: ${props => props.theme.palette.textColor};
    color: white;
  }
`;

const Content = styled.div`
  min-height: 80vh;
`;

const Wrapper = styled.div`
  ${clearFix()}
  padding: 0rem 1.5rem;
  
  h3 {
    margin-bottom: 0.4rem;
  }
  
  p {
    margin-bottom: 0.8rem;
  }

  ${breakpoint("md")`
    padding: 0rem 5rem;
  `}
`;

const CTAButton = styled.button`
  margin-left: 0.2rem;
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

const CardWrapper = styled.div`
  min-width: 100%;
  width: 100%;
  padding: 0.2rem;
  margin-bottom: 1rem;
  
  ${breakpoint("sm")`
    min-width: 50%;
    width: 50%;
  `}
  
  ${breakpoint("md")`
    min-width: 33%;
    width: 33%;
  `}
  
  ${breakpoint("xl")`
    min-width: 25%;
    width: 25%;
  `}
`;

const Header = styled.div`
  ${clearFix()}
  background-color: #fff;
  padding: 1rem 1.5rem;
 
  
  ${
  breakpoint("md")`
    padding: 2rem 5rem 0 5rem;
  `}
`;

const FilterSelector = styled(Wrapper)`
  font-size: 0.9rem;
  padding-top: 1rem;
  
  ${breakpoint("sm")`
    font-size: 1.1rem;
  `}
`;

const CTAButtonGray = styled(CTAButton)`
  background-color: #ededed;
  color: ${props => props.theme.palette.textColor}
  
  &:hover {
    background-color: ${darken(0.1, "#ededed")}
  }
`;
