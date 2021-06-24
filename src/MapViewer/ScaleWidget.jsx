import ScaleBar from "@arcgis/core/widgets/ScaleBar";
import React, { useState, createRef } from "react";
import "@arcgis/core/assets/esri/css/main.css";
import "./ArcgisMap.css";

class ScaleWidget extends React.Component {
    /**
     * Creator of the Measurement widget class
     * @param {*} props 
     */
    constructor(props) {
        super(props);
        //We create a reference to a DOM element to be mounted
        this.container = createRef();
        //Initially, we set the state of the component to 
        //not be showing the basemap panel
        this.state = {showMapMenu: false};
        this.menuClass = 'esri-icon-printer esri-widget--button esri-widget esri-interactive';
    }
    /**
     * This method is executed after the rener method is executed
     */
    componentDidMount() {
        this.scaleBar = new ScaleBar({
            view: this.props.view,
            unit: "dual"
        });
        this.props.view.ui.add(this.scaleBar, "bottom-left");
    }
    /**
     * This method renders the component
     * @returns jsx
     */
    render(){
        return(
            <>
                
            </>
        );
    }
}

export default ScaleWidget;