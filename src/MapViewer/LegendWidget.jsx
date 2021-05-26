import Legend from "@arcgis/core/widgets/Legend";
import React, { useState, createRef } from "react";
import "@arcgis/core/assets/esri/css/main.css";
import "./ArcgisMap.css";

class LegendWidget extends React.Component {
    /**
     * Creator of the Basemap widget class
     * @param {*} props 
     */
    constructor(props) {
        super(props);
        //We create a reference to a DOM element to be mounted
        this.legends = createRef();
        //Initially, we set the state of the component to 
        //not be showing the basemap panel
        this.state = {showMapMenu: false};
        this.menuClass = 'esri-icon-legend esri-widget--button esri-widget esri-interactive';
    }
    /**
     * Method that will be invoked when the 
     * button is clicked. It controls the open
     * and close actions of the component
     */
    openMenu() {
        if (this.state.showMapMenu) {
            this.legend.domNode.style.display = 'none';
            this.legends.current.querySelector(".esri-widget--button").classList.replace('esri-icon-right-arrow','esri-icon-basemap');
            // By invoking the setState, we notify the state we want to reach
            // and ensure that the component is rendered again
            this.setState({showMapMenu: false});
        } else {
            this.basemapGallery.domNode.style.display = 'block';
            this.container.current.querySelector(".esri-widget--button").classList.replace('esri-icon-basemap','esri-icon-right-arrow');
            // By invoking the setState, we notify the state we want to reach
            // and ensure that the component is rendered again
            this.setState({showMapMenu: true});
        }
    };
    /**
     * This method is executed after the rener method is executed
     */
    componentDidMount() {
        this.props.view.ui.add(this.container.current, "top-right");
        this.basemapGallery = new BasemapGallery({
            view: this.props.view,
            container: document.querySelector(".basemap-container .esri-component"),
        })
    }
    /**
     * This method renders the component
     * @returns jsx
     */
    render(){
        return(
            <>
                <div ref={this.container} className="legend-container">
                    <div
                        className={this.menuClass}
                        id="legend_button"
                        role="button"
                        title="Legend"
                        onClick={this.openMenu.bind(this)}>
                    </div>
                    <div className="esri-icon-legend esri-widget--button esri-widget esri-interactive"></div>
                </div>
            </>
        );
    }
}

export default LegendWidget;




// 
 //*** Legend ***//
 var legend_container = document.createElement('div');
 legend_container.className = "legend-container";
 view.ui.add(legend_container, "top-right");

 var legend_button = document.createElement('div');
 legend_button.className = "esri-icon-legend esri-widget--button esri-widget esri-interactive";
 legend_button.setAttribute("role","button");
 legend_button.setAttribute("title","Legend");
 legend_button.addEventListener('click', function(evt){
   if (this.classList.contains("esri-icon-legend")) {
     closeWidgets();
     legend_panel.style.display = "block";
     this.classList.remove("esri-icon-legend");
     this.classList.add("esri-icon-right-arrow");
   }
   else if (this.classList.contains("esri-icon-right-arrow")) {
     legend_panel.style.display = "none"
     this.classList.remove("esri-icon-right-arrow");
     this.classList.add("esri-icon-legend");
   }
 });
 legend_container.appendChild(legend_button);

 var legend_panel = document.createElement('div');
 legend_container.appendChild(legend_panel);

 var legend = new Legend({
   view: view,
   container: legend_panel,
   // layerInfos: [
   //   {
   //     layer: layer,
   //     //title: "Coastal Zones 2012"
   //   }
   // ]
 });

 //*** Coastal Zones legend test ***//
 // const layer2 = new WMSLayer({
 //   url: "https://image.discomap.eea.europa.eu/arcgis/services/CoastalZones/CZ_CoastalZones_2012/MapServer/WmsServer?",
 //   // sublayers: [
 //   //   {              name:"Coastal_Zones_2012_raster55645"
 //   //   },
 //   //   {              name:"Coastal_Zones_2012_vector53031"
 //   //   }
 //   // ]
 // });
 // map.add(layer2);
 
 //*** Time slider test ***//
 // const layer3 = new WMSLayer({
 //   url: "https://image.discomap.eea.europa.eu/arcgis/services/CoastalZones/CZ_CoastalZones_2012/MapServer/WmsServer?",
 //   // sublayers: [
 //   //   {              name:"sen2rgb"
 //   //   }
 //   // ]
 // });
 // map.add(layer3);
 // //*** Time slider ***//
 // const timeSlider = new TimeSlider({
 //   container: "timeSlider",
 //   view: view,
 //   timeVisible: true,
 //   mode: "instant",
 //   loop: false
 // });
 // view.ui.add(timeSlider, "bottom-right");
 // view.whenLayerView(layer3).then(function (lv) {
 //   //console.log(layer3.timeInfo);
 //   // Se asigna el fullTimeExtent de la layer al timeslider, sin alterarlo
 //   timeSlider.fullTimeExtent = layer3.timeInfo.fullTimeExtent;
 // });

 //*** Activate a single widget each time ***//
 function closeWidgets() {
   $.each($( ".esri-icon-right-arrow" ), function( i, widget ) {
     $(widget).trigger( "click" );
   })
 }
