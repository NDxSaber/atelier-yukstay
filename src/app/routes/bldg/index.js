import React, { Component } from "react";
import { SEARCHPARAM, SearchPage, reconnect } from "../search";

class BldgPage extends SearchPage {
  constructor(props) {
    super(props);

    this.forceSetFilter(SEARCHPARAM.BUILDING, props.match.params.id)
  }
}

export default reconnect(BldgPage);
