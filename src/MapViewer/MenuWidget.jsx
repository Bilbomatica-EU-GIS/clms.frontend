import React, { useState, createRef } from "react";
import "@arcgis/core/assets/esri/css/main.css";
import WMSLayer from "@arcgis/core/layers/WMSLayer";
import "./lib/font-awesome/css/all.min.css";
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
        this.state = { showMapMenu: false};
        // call the props of the layers list (mapviewer.jsx)
        this.compCfg = this.props.conf;
        this.map = this.props.map;
        this.menuClass = 'esri-icon-drag-horizontal esri-widget--button esri-widget esri-interactive';
        this.layers = {};
    }
    /**
     * Method that will be invoked when the 
     * button is clicked. It controls the open
     * and close actions of the component
     */
    openMenu() {
        if (this.state.showMapMenu) {
            this.container.current.querySelector('#tabcontainer').style.display = 'none';
            this.container.current.querySelector('#paneles').style.display = 'none';
            this.container.current.querySelector(".esri-widget--button").classList.replace('esri-icon-left-arrow', 'esri-icon-drag-horizontal');


            // By invoking the setState, we notify the state we want to reach
            // and ensure that the component is rendered again
            this.setState({ showMapMenu: false });
        } else {
            this.container.current.querySelector("#tabcontainer").style.display = 'block';
            this.container.current.querySelector('#paneles').style.display = 'block';
            this.container.current.querySelector(".esri-widget--button").classList.replace('esri-icon-drag-horizontal', 'esri-icon-left-arrow');


            // By invoking the setState, we notify the state we want to reach
            // and ensure that the component is rendered again
            this.setState({ showMapMenu: true});
        }
    };
    /**
     * This method is executed after the rener method is executed
     */
    componentDidMount() {
        this.props.view.ui.add(this.container.current, "top-left");

        //para poder verlo setState aqui
        this.setState({});


    }
    //Procesar JSON solo 1 vez
    metodprocessJSON() {
        var components = [];
        var index = 0;
        for (var i in this.compCfg) {
            components.push(this.metodProcessComponent(this.compCfg[i], index));
            index++;
        }
        return components;
    }


    metodProcessComponent(component, compIndex) {
        var products = [];
        var index = 0;
        var inheritedIndex = compIndex;
        for (var i in component.Products) {
            products.push(this.metodProcessProduct(component.Products[i], index, inheritedIndex));
            index++;
        }
        return (
            <div className="map-menu-dropdown" id={"component_" + inheritedIndex} key={"a" + compIndex}>
                <div className="ccl-expandable__button" aria-expanded="false" key={"b" + compIndex} onClick={this.toggleDropdownContent.bind(this)}>
                    {component.ComponentTitle}
                </div>
                <div className="map-menu-components-container">
                    {products}
                </div>
            </div>
        );
    }


    metodProcessProduct(product, prodIndex, inheritedIndex) {
        var datasets = [];
        var index = 0;
        var inheritedIndex = inheritedIndex + "_" + prodIndex;
        for (var i in product.Datasets) {
            datasets.push(this.metodProcessDataset(product.Datasets[i], index, inheritedIndex));
            index++;

        }

        return (
            <div className="map-menu-product-dropdown" id={"product_" + inheritedIndex} key={"a" + prodIndex}>
                <fieldset className="ccl-fieldset" key={"b" + prodIndex}>
                    <div className="ccl-expandable__button" aria-expanded="false" key={"c" + prodIndex} onClick={this.toggleDropdownContent.bind(this)}>
                        <div className="ccl-form map-product-checkbox" key={"d" + prodIndex}>
                            <div className="ccl-form-group" key={"e" + prodIndex}>
                                <input type="checkbox" id={"map_product_" + inheritedIndex} name="" value="name" className="ccl-checkbox ccl-required ccl-form-check-input" key={"h" + prodIndex} onChange={(e)=>this.toggleProduct(e.target.checked,"datasets_container" + prodIndex)}></input>
                                <label className="ccl-form-check-label" htmlFor={"map_product_" + inheritedIndex} key={"f" + prodIndex}>
                                    <legend className="ccl-form-legend">
                                        {product.ProductTitle}
                                    </legend>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="ccl-form map-menu-products-container" id={"datasets_container" + prodIndex}>
                        {datasets}
                    </div>
                </fieldset>
            </div>
        );
    }

    metodProcessDataset(dataset, datIndex, inheritedIndex) {
        var layers = [];
        var index = 0;
        var inheritedIndex = inheritedIndex + "_" + datIndex;

        for (var i in dataset.Layer) {
            layers.push(this.metodProcessLayer(dataset.Layer[i], index, inheritedIndex, dataset.ViewService));
            index++;
        }
        return (
            <div className="ccl-form-group map-menu-dataset" id={"dataset_ " + inheritedIndex} key={"a" + datIndex}>
                <div className="map-dataset-checkbox" key={"b" + datIndex}>
                    <input type="checkbox" id={"map_dataset_" + inheritedIndex} name="" value="name" className="ccl-checkbox ccl-required ccl-form-check-input" key={"c" + datIndex} onChange={(e) => {this.toggleDataset(e.target.checked,"layer_container_" + dataset.DatasetId) }}></input>
                    <label className="ccl-form-check-label" htmlFor={"map_dataset_" + inheritedIndex} key={"d" + datIndex} >
                        <span>{dataset.DatasetTitle}</span>
                    </label>
                    <div className="map-menu-icons">
                        <a href="./dataset-catalogue/dataset-info.html" className="map-menu-icon" aria-label="Dataset info">
                            <i className="fas fa-info-circle"></i></a>
                        <a href="./dataset-catalogue/dataset-download.html" className="map-menu-icon" aria-label="Dataset download">
                            <i className="fas fa-download"></i>
                        </a>
                    </div>
                </div>
                <div className="ccl-form map-menu-layers-container" id={"layer_container_" + dataset.DatasetId}>
                    {layers}
                </div>
            </div>
        );
    }

    metodProcessLayer(layer, layerIndex, inheritedIndex, urlWMS) {
        //Por cada layer 
        var inheritedIndex = inheritedIndex + "_" + layerIndex;

        this.layers[layer.LayerId] = new WMSLayer({
            url: urlWMS,
            id: layer.LayerId
        });

        return (
            <div className="ccl-form-group map-menu-layer" id={"layer_" + inheritedIndex} key={"a" + layerIndex}>
                <input type="checkbox" id={layer.LayerId} name="" value="name" className="ccl-checkbox ccl-required ccl-form-check-input" key={"c" + layerIndex} onChange={(e) => {this.toggleLayer(e.target) }}></input>
                <label className="ccl-form-check-label" htmlFor={layer.LayerId} key={"d" + layerIndex} >
                    <span>{layer.Title}</span>
                </label>
            </div>
        )
    };

    /**
     * Method to show/hide a layer
     * @param {*} elem 
     */
    toggleLayer(elem) {
        if (elem.checked) {
            this.map.add(this.layers[elem.id])
        }
        else {
            this.map.remove(this.layers[elem.id])
        }
    }


    /**
     * Method to show/hide all the layers of a dataset
     * @param {*} value 
     * @param {*} id 
     */
    toggleDataset(value,id) {
        var layerChecks = document.querySelector("#"+id).querySelectorAll("input[type=checkbox]");
        layerChecks.forEach(
            element => {    
                element.checked = value;
                this.toggleLayer(element);
            }
        )
    }

    /**
     * Method to show/hide all the datasets of a product
     * @param {*} value 
     * @param {*} id 
     */
    toggleProduct(value,id){
        var datasetChecks = document.querySelector("#"+id).querySelectorAll("[id^='map_dataset_']")
        var layerContainers = document.querySelector("#"+id).querySelectorAll("[id^='layer_container']")
        datasetChecks.forEach(
            element => {    
                element.checked = value;
            }
        )
        layerContainers.forEach(
            element => {    
                this.toggleDataset(value,element.id);
            }
        )
    }
        

    toggleDropdownContent(e) {
        var aria = e.target.getAttribute('aria-expanded');
        e.target.setAttribute("aria-expanded", aria == 'true' ? 'false' : 'true');
    }

    /**
     * This method renders the component
     * @returns jsx
     */
    render() {
        return (
            <>
                <div ref={this.container} className="map-left-menu-container">
                    <div className="map-menu tab-container" id='tabcontainer'>
                        <div className="tabs" role="tablist" onClick={this.openMenu.bind(this)}>
                            <span className="tab tab-selected" id="products_label" role="tab" aria-controls="products_panel" aria-selected="true">Products and datasets</span>
                            <span className="tab" id="active_label" role="tab" aria-controls="active_panel" aria-selected="false">Active on map</span>
                        </div>
                        <div className="panels" id='paneles'>
                            <div className="panel panel-selected" id="products_panel" role="tabpanel" aria-hidden="false">
                                {
                                    this.metodprocessJSON()
                                }
                            </div>
                            <div className="panel" id="active_panel" role="tabpanel" aria-hidden="true"></div>
                        </div>
                    </div>
                    <div
                        className={this.menuClass}
                        id="map_manu_button"
                        role="button"
                        title="Menu of products"
                        onClick={this.openMenu.bind(this)}>
                    </div>
                </div>
            </>
        );
    }
}

export default MenuWidget;