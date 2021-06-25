import Legend from "@arcgis/core/widgets/Legend";
import React, {useState, createRef } from "react";
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
        this.container = createRef();
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
            this.container.current.querySelector(".legend-panel").style.display='none';
            this.container.current.querySelector(".esri-widget--button").classList.replace('esri-icon-right-arrow','esri-icon-legend');
            // By invoking the setState, we notify the state we want to reach
            // and ensure that the component is rendered again
            this.setState({showMapMenu: false});
        } else {
            this.props.mapViewer.setActiveWidget(this);
            this.container.current.querySelector(".esri-widget--button").classList.replace('esri-icon-legend','esri-icon-right-arrow');
            this.container.current.querySelector(".legend-panel").style.display='block';
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
        this.LegendWidget = new Legend({
            view: this.props.view,
            container: document.querySelector(".legend-panel"),
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
                    <div className= "legend-panel"></div>
                </div>
            </>
        );
    }
}

export default LegendWidget;