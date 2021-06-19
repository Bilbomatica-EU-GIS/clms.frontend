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
        let title_input = this.container.current.querySelector("input.esri-print__input-text");
        if (!title_input.oninput){
            title_input.oninput = () => {
                    let c = title_input.selectionStart;
                    let r = /[^a-z0-9 .]/gi;
                    let v = title_input.value;
                    if(r.test(v)) {
                        title_input.value = v.replace(r, '');
                        c--;
                    }
                    title_input.setSelectionRange(c, c);
                }
        }
    }
    keepInputLength()
    onInputChange(e){
        let elem = e.target;
        let c = elem.selectionStart;
        let r = /[^a-z0-9 .]/gi;
        let v = elem.value;
        if(r.test(v)) {
            elem.value = v.replace(r, '');
            c--;
        }
        elem.setSelectionRange(c, c);
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