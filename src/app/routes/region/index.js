import React, { Component } from "react";
import { SEARCHPARAM, SearchPage, reconnect } from "../search";

class RegionPage extends SearchPage {
  constructor(props) {
    super(props);

    this.forceSetFilter(SEARCHPARAM.REGION, props.match.params.id)
  }
}

export default reconnect(RegionPage);


