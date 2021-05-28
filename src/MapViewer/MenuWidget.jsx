import React, { useState, createRef } from "react";
import "@arcgis/core/assets/esri/css/main.css";
import "./ArcgisMap.css";

class MenuWidget extends React.Component {
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
        this.state = { showMapMenu: false };
        this.menuClass = 'esri-icon-drag-horizontal esri-widget--button esri-widget esri-interactive';
    }
    /**
     * Method that will be invoked when the 
     * button is clicked. It controls the open
     * and close actions of the component
     */
    openMenu() {
        if (this.state.showMapMenu) {
            this.container.current.querySelector(".map-left-menu-container").style.display = 'none';
            this.container.current.querySelector(".map-menu tab-container").style.display = 'none';
            this.container.current.querySelector(".tab tab-selected").style.display = 'none';
            this.container.current.querySelector(".esri-widget--button").classList.replace('esri-icon-left-arrow', 'esri-icon-drag-horizontal');
            // By invoking the setState, we notify the state we want to reach
            // and ensure that the component is rendered again
            this.setState({ showMapMenu: false });
        } else {
            this.container.current.querySelector(".map-left-menu-container").style.display = 'block';
            this.container.current.querySelector(".map-menu tab-container").style.display = 'block';
            this.container.current.querySelector(".tab tab-selected").style.display = 'block';
            this.container.current.querySelector(".esri-widget--button").classList.replace('esri-icon-drag-horizontal', 'esri-icon-right-arrow');
            // By invoking the setState, we notify the state we want to reach
            // and ensure that the component is rendered again
            this.setState({ showMapMenu: true });
        }
    };
    /**
     * This method is executed after the rener method is executed
     */
    componentDidMount() {
        this.props.view.ui.add(this.container.current, "top-left");
    }
    /**
     * This method renders the component
     * @returns jsx
     */
    render() {
        return (
            <>
                <div ref={this.container} className="map-left-menu-container">
                    <div
                        className={this.menuClass}
                        id="map-left-menu-container"
                        role="button"
                        title="Menu of Products"
                        onClick={this.openMenu.bind(this)}>
                    </div>
                    <div className="map-menu tab-container">
                        <div className="tabs" role="tablist" onClick={this.openMenu.bind(this)}>
                            <span className="tab tab-selected" id="products_label" role="tab" aria-controls="products_panel" aria-selected="true">Products and datasets</span>
                            <span className="tab" id="active_label" role="tab" aria-controls="active_panel" aria-selected="false">Active on map</span>
                        </div>
                    </div>
                    <div className="panels" onClick={this.openMenu.bind(this)}>
                        <div className="panel panel-selected" id="products_panel" role="tabpanel" aria-hidden="false"></div>
                        <div className="panel" id="active_panel" role="tabpanel" aria-hidden="true">
                            <div className="map-active-layers"></div>
                            <div className="map-download-datasets">
                                <div className="map-login-block">
                                    <div className="login-content">
                                        <button className="ccl-button ccl-button--default login-block-button">Login to download the data</button>
                                        <p className="login-block-new">New user? <a href="../register.html">Follow this link to register</a></p>
                                    </div>
                                </div>
                                <div className="map-area-block" onClick={this.openMenu.bind(this)}>
                                    <button className="ccl-button ccl-button-green">Add to cart</button>
                                    <div className="message-block">
                                        <div className="message-icon">
                                            <i className="far fa-comment-alt"></i>
                                        </div>
                                        <div className="message-text">
                                            <p>This is a warning related to the funcionality of start downloading the datasets</p>
                                            <ul>
                                                <li>May be can include a link to somewhere</li>
                                                <li>Or an informative text</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>      
            </>
            );
    }
}

export default MenuWidget;