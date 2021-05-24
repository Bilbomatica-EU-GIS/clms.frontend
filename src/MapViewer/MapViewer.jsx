import React, { useRef, useEffect, useState, useCallback, createRef } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery";
import Zoom from "@arcgis/core/widgets/Zoom";
import ScaleBar from "@arcgis/core/widgets/ScaleBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import "@arcgis/core/assets/esri/css/main.css";
import "./ArcgisMap.css";
import ReactDOM from 'react-dom';
import BasemapWidget from './BasemapWidget';

class MapViewer extends React.Component {
    constructor(props) {
        super(props);
        this.mpd = createRef();
        this.mapCfg = props.cfg.Map;
        this.map = new Map({
            basemap: "topo-vector"
        });
    }
    
    componentDidMount() {
        this.view = new MapView({
                                    container: this.mpd.current,
                                    map: this.map,
                                    center: this.mapCfg.center,
                                    zoom: this.mapCfg.zoom,
                                    ui: {
                                        components: ["attribution"] // empty the UI, except for attribution
                                    }
                                });
        this.zoom = new Zoom({
            view: this.view
        });
        this.view.ui.add(this.zoom, {
            position: "top-right"
        });
        this.setState({});
    }

    renderBasemap() {
        if (this.view)
            return <BasemapWidget view={this.view} />
    }
    
    render(){
        return(
            <div className="map-container">
                <div ref={this.mpd} className="map">
                    {this.renderBasemap()}
                </div>
            </div>
        )
    }
}

export default MapViewer;
