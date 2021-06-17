import React, { useState, createRef } from "react";
import "@arcgis/core/assets/esri/css/main.css";
import WMSLayer from "@arcgis/core/layers/WMSLayer";
import "./lib/font-awesome/css/all.min.css";
import "./ArcgisMap.css";
import { faPassport } from "@fortawesome/free-solid-svg-icons";
import { layer } from "@fortawesome/fontawesome-svg-core";

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
        this.map = this.props.map;
        this.menuClass = 'esri-icon-drag-horizontal esri-widget--button esri-widget esri-interactive';
        this.layers = {};
        this.activeLayers = []

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
                                <input type="checkbox" id={"map_product_" + inheritedIndex} name="" value="name" className="ccl-checkbox ccl-required ccl-form-check-input" key={"h" + prodIndex} onChange={(e) => this.toggleProduct(e.target.checked, "datasets_container" + prodIndex)}></input>
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
                    <input type="checkbox" id={"map_dataset_" + inheritedIndex} name="" value="name" className="ccl-checkbox ccl-required ccl-form-check-input" key={"c" + datIndex} onChange={(e) => { this.toggleDataset(e.target.checked, "layer_container_" + dataset.DatasetId) }}></input>
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
                <input type="checkbox" id={layer.LayerId} name="" value="name" className="ccl-checkbox ccl-required ccl-form-check-input" key={"c" + layerIndex} title={layer.Title} onChange={(e) => { this.toggleLayer(e.target) }}></input>
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
        console.log(elem.title)
        if (elem.checked) {
            this.map.add(this.layers[elem.id])
            this.activeLayers.push(this.addActiveLayer(elem));
            this.setState({});
        }
        else {
            this.map.remove(this.layers[elem.id])
            this.removeActiveLayer()
            this.setState({});
        }
    }


    /**
     * Method to show/hide all the layers of a dataset
     * @param {*} value 
     * @param {*} id 
     */
    toggleDataset(value, id) {
        var layerChecks = document.querySelector("#" + id).querySelectorAll("input[type=checkbox]");
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
    toggleProduct(value, id) {
        var datasetChecks = document.querySelector("#" + id).querySelectorAll("[id^='map_dataset_']")
        var layerContainers = document.querySelector("#" + id).querySelectorAll("[id^='layer_container']")
        datasetChecks.forEach(
            element => {
                element.checked = value;
            }
        )
        layerContainers.forEach(
            element => {
                this.toggleDataset(value, element.id);
            }
        )
    }


    toggleDropdownContent(e) {
        var aria = e.target.getAttribute('aria-expanded');
        e.target.setAttribute("aria-expanded", aria == 'true' ? 'false' : 'true');
    }




    // function mapAddLayers(layer) {
    //     $(".map-active-layers").prepend(
    //       '<div class="active-layer" id="active_'+ layer.id +'">'+
    //         '<div class="active-layer-name" name="'+ $(layer).find(".map-layer-name").val() +'">'+ $(layer).find("label").text() +'</div>'+
    //         '<div class="active-layer-options">'+
    //           '<span class="active-layer-position">'+
    //             '<span class="active-layer-position-up"><i class="fas fa-long-arrow-alt-up"></i></span>'+
    //             '<span class="active-layer-position-down"><i class="fas fa-long-arrow-alt-down"></i></span>'+
    //           '</span>'+
    //           '<span class="active-layer-hide"><i class="fas fa-eye"></i></span>'+
    //           '<span class="active-layer-delete"><i class="fas fa-times"></i></span>'+
    //         '</div>'+
    //       '</div>'
    //     );
    //     var id = layer.id.replace("layer_",'');
    //     var url = $(layer).parents(".map-menu-dataset").find(".map-dataset-url").val();

    addActiveLayer(elem) {
        // con el id de las active layers, se cargan en los correspondientes divs
        return (
            <div className="active-layer" id={'active_' + elem.id} key={"a" + elem.id}>
                <div className="active-layer-name" name={elem.id} key={"b" + elem.id}>{elem.title}</div>
                <div className="active-layer-options" key={"c" + elem.id}>
                    <span className="active-layer-hide"><i className="fas fa-eye"></i></span>
                    <span className="active-layer-delete"><i className="fas fa-times"></i></span>
                </div>
            </div>
        );

    }


    removeActiveLayer(elem){
        // elimitar eemento de this.activeLayer que corresponda a id 
        // eliminar vector splice ?¿
        // borrar elemento de vector
        console.log(elem)
    }




    toggleTab() {
        var tabsel = document.querySelector('.tab-selected');
        var tab = document.querySelector('span.tab:not(.tab-selected)');
        var panelsel = document.querySelector('.panel-selected');
        var panel = document.querySelector('div.panel:not(.panel-selected)');

        tabsel.className = 'tab';
        tabsel.setAttribute('aria-selected', 'false');
        panelsel.className = 'panel';
        panelsel.setAttribute('aria-hidden', 'false');

        tab.className = 'tab tab-selected'
        tab.setAttribute('aria-selected', 'true');
        panel.className = 'panel panel-selected';
        panel.setAttribute('aria-hidden', 'true');
    }


    // LEFT PART FOR RENDER IN MENU
    //     <div class="map-download-datasets">
    //     <div class="map-login-block">
    //         <div class="login-content">
    //             <button class="ccl-button ccl-button--default login-block-button">Login to download the data</button>
    //             <p class="login-block-new">New user? <a href="../register.html">Follow this link to register</a></p>
    //         </div>
    //     </div>
    //     <div class="map-area-block">
    //         <button class="ccl-button ccl-button-green">Add to cart</button>
    //         <div class="message-block">
    //             <div class="message-icon">
    //                 <i class="far fa-comment-alt"></i>
    //             </div>
    //             <div class="message-text">
    //                 <p>This is a warning related to the funcionality of start downloading the datasets</p>
    //                 <ul>
    //                     <li>May be can include a link to somewhere</li>
    //                     <li>Or an informative text</li>
    //                 </ul>
    //             </div>
    //         </div>
    //     </div>
    // </div>


    /** 
     * This method renders the component
     * @returns jsx
     */
    render() {
        return (
            <>
                <div ref={this.container} className="map-left-menu-container">
                    <div className="map-menu tab-container" id='tabcontainer'>
                        <div className="tabs" role="tablist">
                            <span className="tab tab-selected" id="products_label" role="tab" aria-controls="products_panel" aria-selected="true" onClick={() => this.toggleTab()}>Products and datasets</span>
                            <span className="tab" id="active_label" role="tab" aria-controls="active_panel" aria-selected="false" onClick={() => this.toggleTab()}>Active on map</span>
                        </div>
                        <div className="panels" id='paneles'>
                            <div className="panel panel-selected" id="products_panel" role="tabpanel" aria-hidden="false">
                                {
                                    this.metodprocessJSON()
                                }
                            </div>
                            <div className="panel" id="active_panel" role="tabpanel" aria-hidden="true">
                                <div className="map-active-layers">
                                    {
                                        this.activeLayers
                                    }
                                </div>
                            </div>
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