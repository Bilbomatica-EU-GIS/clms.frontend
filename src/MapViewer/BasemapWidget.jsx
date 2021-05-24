import BasemapGallery from "@arcgis/core/widgets/BasemapGallery";
import React, { useState, createRef } from "react";
import "@arcgis/core/assets/esri/css/main.css";
import "./ArcgisMap.css";

class BasemapWidget extends React.Component {
    constructor(props) {
        super(props);
        this.basemaps = createRef();
        this.state={showMapMenu: false};
        this.menuClass = 'esri-icon-basemap esri-widget--button esri-widget esri-interactive esri-icon-basemap';
    }
    openMenu() {
        if (this.state.showMapMenu) {
            this.basemapGallery.domNode.style.display = 'none';
            this.basemaps.current.classList.replace('esri-icon-right-arrow','esri-icon-basemap');
            this.setState({showMapMenu: false});
        } else {
            this.basemapGallery.domNode.classList.add("basemap-gallery-container");
            this.basemapGallery.domNode.style.display = 'block';
            this.basemaps.current.classList.replace('esri-icon-basemap','esri-icon-right-arrow');
            this.setState({showMapMenu: true});
        }
    };
    componentDidMount() {
        this.basemapGallery = new BasemapGallery({
            view: this.props.view,
        });
        this.props.view.ui.add(this.basemaps.current, "top-right");
        this.props.view.ui.add(this.basemapGallery, "top-right");
    }
    render(){
        return(
            <>
            <div
                ref={this.basemaps}
                className={this.menuClass}
                id="map_basemap_button"
                role="button"
                title="Basemap gallery"
                onClick={this.openMenu.bind(this)}>
            </div>
            </>
        );
        //</div>
    }
}

export default BasemapWidget;