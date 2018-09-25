import React, { Component } from "react";
import GoogleMap from "google-map-react";
import config from "../config";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: {
        zoom: 17
      }
    };
  }

  renderMarkers(map, maps) {
    let _this = this;
    let marker = new maps.Marker({
      position: _this.mapPosition(),
      map
    });

    let markerContent =
      '<div id="content">' +
      '<h3 id="firstHeading" class="firstHeading">' +
      this.props.data.fields.name +
      "</h3>" +
      '<div id="bodyContent">' +
      "<p>" +
      this.props.data.fields.address +
      "</p>" +
      "</div>" +
      "</div>";

    let infowindow = new maps.InfoWindow({
      content: markerContent,
      maxWidth: 200
    });

    marker.addListener("click", function() {
      infowindow.open(map, marker);
    });

    infowindow.open(map, marker);

    this.setState({
      map: {
        ...this.state.map,
        map: map,
        maps: maps
      }
    });
  }

  mapPosition() {
    return {
      lat: Number(this.props.data.fields.regions[0].fields.startLatitude),
      lng: Number(this.props.data.fields.regions[0].fields.startLongitude)
    };
  }

  render() {
    return (
      <div style={{ height: "360px", width: "100%" }}>
        <GoogleMap
          bootstrapURLKeys={{ key: config.google.STATIC_MAP_API_KEY }}
          defaultCenter={this.mapPosition()}
          defaultZoom={this.state.map.zoom}
          onGoogleApiLoaded={({ map, maps }) => this.renderMarkers(map, maps)}
          yesIWantToUseGoogleMapApiInternals
        />
      </div>
    );
  }
}
