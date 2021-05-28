import React, { useRef, useEffect, useState, useCallback, createRef } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Zoom from "@arcgis/core/widgets/Zoom";
import "@arcgis/core/assets/esri/css/main.css";
import "./ArcgisMap.css";
import BasemapWidget from './BasemapWidget';
import MeasurementWidget from './MeasurementWidget';
import PrintWidget from './PrintWidget';
import AreaWidget from './AreaWidget';
import ScaleWidget from './ScaleWidget';
import LegendWidget from './LegendWidget';


class MapViewer extends React.Component {
    /**
     * This method does the creation of the main component 
     * @param {*} props 
     */
    constructor(props) {
        super(props);
        //we create a reference to the DOM element that will
        //be later mounted. We will use the reference that we
        //create here to reference the DOM element from javascript
        //code, for example, to create later a MapView component 
        //that will use the map div to show the map
        this.mapdiv = createRef();
        this.mapCfg = props.cfg.Map;
        this.map = new Map({
            basemap: "topo-vector"
        });
    }
    
    /**
     * Once the component has been mounted in the screen, this method
     * will be executed, so we can access to the DOM elements, since
     * they are already mounted
     */
    componentDidMount() {
        // this.mapdiv.current is the reference to the current DOM element of 
        // this.mapdiv after it was mounted by the render() method
        this.view = new MapView({
                                    container: this.mapdiv.current,
                                    map: this.map,
                                    center: this.mapCfg.center,
                                    zoom: this.mapCfg.zoom,
                                    ui: {
                                        components: ["attribution"] 
                                    }
                                });
        this.zoom = new Zoom({
            view: this.view
        });
        this.view.ui.add(this.zoom, {
            position: "top-right"
        });

        //Once we have created the MapView, we need to ensure that the map div
        //is refreshed in order to show the map on it. To do so, we need to
        //trigger the renderization again, and to trigger the renderization
        //we invoke the setState method, that changes the state and forces a
        //react component to render itself again
        this.setState({});
    }

    /**
     * This method evaluates the ability to render the basemaps widget and
     * returns the jsx allowing such a render (if conditions are ok)
     * @returns jsx
     */
    renderBasemap() {
        if (this.view)
            return <BasemapWidget view={this.view} />
    }

    renderLegend(){
        if(this.view)
            return <LegendWidget view={this.view} />
    }
    
    renderMeasurement() {
        if (this.view)
            return <MeasurementWidget view={this.view} />
    }

    renderPrint() {
        if (this.view)
            return <PrintWidget view={this.view} />
    }

    renderArea() {
        if (this.view)
            return <AreaWidget view={this.view}  map={this.map}/>
    }

    renderScale() {
        if (this.view)
            return <ScaleWidget view={this.view} />
    }


   
    
    /**
     * This method renders the map viewer, invoking if necessary the methods
     * to render the other widgets to display
     * @returns jsx
     */
    render(){
        // we use a reference (ref={this.mapdiv}) in order to reference a
        // DOM element to be mounted (but not yet mounted)
        return(
            <div className="map-container">
                <div ref={this.mapdiv} className="map">
                    {this.renderBasemap()}
                    {this.renderLegend()}
                    {this.renderMeasurement()}
                    {this.renderPrint()}
                    {this.renderArea()}
                    {this.renderScale()}
                    
                </div>
            </div>
        )
    }
}

export default MapViewer;
