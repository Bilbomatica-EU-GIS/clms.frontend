import BasemapGallery from "@arcgis/core/widgets/BasemapGallery";
import React, { createRef } from "react";
import "@arcgis/core/assets/esri/css/main.css";
import "./ArcgisMap.css";

class BasemapWidget extends React.Component {
    /**
     * Creator of the Basemap widget class
     * @param {*} props 
     */
    constructor(props) {
        super(props);
        //We create a reference to a DOM element to be mounted
        this.container = createRef();
        //Initially, we set the state of the component to 
        //not be showing the basemap panel
        this.state = {showMapMenu: false};
        this.menuClass = 'esri-icon-basemap esri-widget--button esri-widget esri-interactive esri-icon-basemap';
        this.loadFirst = true;
    }
    /**
     * Method that will be invoked when the 
     * button is clicked. It controls the open
     * and close actions of the component
     */
    openMenu() {
        if (this.loadFirst){
            document.querySelectorAll(".esri-basemap-gallery__item")[3].setAttribute("aria-selected",true);
            document.querySelectorAll(".esri-basemap-gallery__item")[3].classList.add("esri-basemap-gallery__item--selected");
            this.loadFirst = false;
        }
        if (this.state.showMapMenu) {
            this.props.mapViewer.setActiveWidget();
            this.basemapGallery.domNode.style.display = 'none';
            this.container.current.querySelector(".esri-widget--button").classList.replace('esri-icon-right-arrow','esri-icon-basemap');
            // By invoking the setState, we notify the state we want to reach
            // and ensure that the component is rendered again
            this.setState({showMapMenu: false});
        } else {
            this.props.mapViewer.setActiveWidget(this);
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
            container: this.container.current.querySelector(".basemap-panel"),
            //activeBasemap: "topo"
        })
    }
    /**
     * This method renders the component
     * @returns jsx
     */
    render(){
        return(
            <>
                <div ref={this.container} className="basemap-container">
                    <div
                        className={this.menuClass}
                        id="map_basemap_button"
                        role="button"
                        title="Basemap gallery"
                        onClick={this.openMenu.bind(this)}>
                    </div>
                    <div className="basemap-panel"></div>
                </div>
            </>
        );
    }
}

export default BasemapWidget;