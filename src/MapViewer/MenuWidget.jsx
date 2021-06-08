import React, { useState, createRef } from "react";
import "@arcgis/core/assets/esri/css/main.css";
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
        this.state = { showMapMenu: false };
        // call the props of the layers list (mapviewer.jsx)
        this.compCfg = this.props.conf;
        this.menuClass = 'esri-icon-drag-horizontal esri-widget--button esri-widget esri-interactive';
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



   
    // La linea de abajo se quita porque si no no va
    // </div> className="map-menu-components-container" key={"c" + compIndex}
    // Al quitar este, se ve un recuadro y todas ok <div className="ccl-expandable__button" aria-expanded="false" key={"b" + compIndex}></div>

    metodProcessComponent(component, compIndex) {
        var products = [];
        var index = 0;
        for (var i in component.Products) {
            products.push(this.metodProcessProduct(component.Products[i], index));
            index++;
        }
        return (
            <div className="map-menu-dropdown" id={"component_" + compIndex} key={"a" + compIndex}>
                <div key={"b" + compIndex}>
                    {component.ComponentTitle}</div>
                <div>
                    {products}
                </div>
            </div>

        );
    }


    // PRODUCTS
    // Code erased (div class not working)
    // className="ccl-form map-menu-products-container"

    metodProcessProduct(product, prodIndex) {
        var datasets = [];
        var index = 0;
        for (var i in product.Datasets) {
            datasets.push(this.metodProcessDataset(product.Datasets[i], index));
            index++;
        }
        return (
            <div id={"product_" + prodIndex} key={"a" + prodIndex}>
                <fieldset key={"b" + prodIndex}>
                    <div key={"c" + prodIndex}>
                        <div key={"d" + prodIndex}>
                            <div className="ccl-form-group" key={"e" + prodIndex}>
                                <input type="checkbox" id={"map_product_" + prodIndex} name="" value="name" className="ccl-checkbox ccl-required ccl-form-check-input" key={"h" + prodIndex}></input>
                                <label className="ccl-form-check-label" key={"f" + prodIndex}>
                                    <span>
                                        {product.ProductTitle}
                                    </span>
                                </label>
                                <div>
                                    {datasets}
                                </div>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </div>

        );
    }

    metodProcessDataset(dataset, datIndex) {
        var layers = [];
        var index = 0;
        for (var i in dataset.Layer) {
            layers.push(this.metodProcessLayer(dataset.Layer[i], index));
            index++;

        }

        // This code is not working
        //</div> <// input type = "hidden" className = "map-dataset-url" value = { dataset.ViewService } key = { "a" + datIndex } > </input >//
        // <div> className="ccl-form map-menu-layers-container" (before {layers} quit because failure)

        return (
            <div className="ccl-form-group map-menu-dataset" id={"dataset_ " + datIndex} key={"a" + datIndex}>
                <div className="map-dataset-checkbox" key={"b" + datIndex}>
                    <input type="checkbox" id={"map_dataset_" + datIndex} name="" value="name" className="ccl-checkbox ccl-required ccl-form-check-input" key={"c" + datIndex}></input>
                    <label className="ccl-form-check-label" key={"d" + datIndex} >
                        <span>{dataset.DatasetTitle}</span>
                    </label>
                    <div className="map-menu-icons">
                        <a href="./dataset-catalogue/dataset-info.html" className="map-menu-icon" aria-label="Dataset info">
                            <i className="fas fa-info-circle"></i></a>
                        <a href="./dataset-catalogue/dataset-download.html" className="map-menu-icon" aria-label="Dataset download">
                            <i className="fas fa-download"></i>
                        </a>
                    </div>
                    <div>
                        {layers}
                    </div>
                </div>
            </div>

        );
    }

    metodProcessLayer(layer, layerIndex) {
        //  Linea de abajo para revisar
        //<input type="hidden" className="map-layer-name" value={layer.LayerId} key={"b" + layerIndex} > </input>
        return (
            <div className="ccl-form-group map-menu-layer" id={"layer_" + layerIndex} key={"a" + layerIndex}>
                <input type="checkbox" id={"layer_" + layerIndex} name="" value="name" className="ccl-checkbox ccl-required ccl-form-check-input" key={"c" + layerIndex}></input>
                <label className="ccl-form-check-label" key={"d" + layerIndex} >
                    <span>{layer.Title}</span>
                </label>
            </div>
        )
    };

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
                </div>
            </>
        );
    }
}

export default MenuWidget;