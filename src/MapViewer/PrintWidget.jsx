import Print from "@arcgis/core/widgets/Print";
import React, { useState, createRef } from "react";
import "@arcgis/core/assets/esri/css/main.css";
import "./ArcgisMap.css";

class PrintWidget extends React.Component {
    /**
     * Creator of the Measurement widget class
     * @param {*} props 
     */
    constructor(props) {
        super(props);
        //We create a reference to a DOM element to be mounted
        this.container = createRef();
        //Initially, we set the state of the component to 
        //not be showing the basemap panel
        this.state = {showMapMenu: false};
        this.menuClass = 'esri-icon-printer esri-widget--button esri-widget esri-interactive';
        this.titleMaxLength = 50;
        this.textMaxLength = 200;
    }
    /**
     * Method that will be invoked when the 
     * button is clicked. It controls the open
     * and close actions of the component
     */
    openMenu() {
        if (this.state.showMapMenu) {
            this.print.domNode.style.display = 'none';
            this.container.current.querySelector(".esri-widget--button").classList.replace('esri-icon-right-arrow','esri-icon-printer');
            // By invoking the setState, we notify the state we want to reach
            // and ensure that the component is rendered again
            this.setState({showMapMenu: false});
        } else {
            this.print.domNode.style.display = 'block';
            this.container.current.querySelector(".esri-widget--button").classList.replace('esri-icon-printer','esri-icon-right-arrow');
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
        this.print = new Print({
            view: this.props.view,
            container: this.container.current.querySelector(".print-panel"),
        });
    }

    componentDidUpdate() {
        let exportBtn = document.querySelector(".esri-print__export-button");
        this.setLayoutConstraints();
        this.setMapOnlyConstraints();
    }

    /**
     * Sets constrictions on text inputs
     */
    setMapOnlyConstraints() {
        let mapOnly = document.querySelector("[data-tab-id='mapOnlyTab']");

        //If map only options are deployed, same restriction for all the text inputs
        var observer = new MutationObserver(
            (mutations) => {
                mutations.forEach((mutation)=>{
                    if(mutation.attributeName == "aria-selected"){
                        let currentExpand = mutation.target.getAttribute("aria-selected");
                        if(currentExpand==="true"){
                            this.setTextFilters();
                            let optSVGZ = document.querySelector("[value='svgz']");
                            optSVGZ && optSVGZ.parentElement.removeChild(optSVGZ);
                            let fileName = document.querySelector("[data-input-name='fileName']");
                            fileName.parentElement.setAttribute("style","display:none");
                        } else {
                            this.setLayoutConstraints();
                        }
                    }
                })
            }
        );
        observer.observe(mapOnly, {attributes: true});
    }

    setLayoutConstraints() {
        this.setTextFilters();
        let advanceOptions = document.querySelector(".esri-print__advanced-options-button");

        //If advanced options are deployed, same restriction for all the text inputs
        var advancedFunction = (mutations) => {
            mutations.forEach((mutation)=>{
                if(mutation.attributeName == "aria-expanded"){
                    let currentExpand = mutation.target.getAttribute("aria-expanded");
                    if(currentExpand){
                        this.setTextFilters();
                    }
                }
            })
        };
        var observer = new MutationObserver((m)=>{
            advancedFunction(m);
        });
        observer.observe(advanceOptions, {attributes: true});
    }
    
    noSpecialChars(elem){
        let c = elem.selectionStart;
        let r = /[^a-z0-9 .]/gi;
        let v = elem.value;
        if(r.test(v)) {
            elem.value = v.replace(r, '');
            c--;
        }
        elem.setSelectionRange(c, c);
    }

    setTextFilters() {
        let inputs = document.querySelectorAll("input.esri-print__input-text");
        inputs.forEach((input)=>{
            if(input.type==="text" && !input.oninput){
                if((input.getAttribute("data-input-name")==="title")||
                   (input.getAttribute("data-input-name")==="fileName")
                ){
                    input.setAttribute("maxlength",""+this.titleMaxLength);
                } else {
                    input.setAttribute("maxlength",""+this.textMaxLength);
                }
                input.oninput = () => {this.noSpecialChars(input);}
            }
        })
    }

    /**
     * This method renders the component
     * @returns jsx
     */
    render(){
        return(
            <>
                <div ref={this.container} className="print-container">
                    <div
                        className={this.menuClass}
                        id="map_print_button"
                        role="button"
                        title="Print"
                        onClick={this.openMenu.bind(this)}>
                    </div>
                    <div className="print-panel">
                    </div>
                </div>
            </>
        );
    }
}

export default PrintWidget;