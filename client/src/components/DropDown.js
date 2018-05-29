import React, { Component } from 'react';
import './DropDown.css';
import {cities} from '../data/cities.json';

/**
 * Component representing a simple dropdown menu.
 */
class DropDown extends Component {
    constructor(props) {
        super(props);
        this.dropDownContentRef = React.createRef();
        this.handleCitySelection = this.handleCitySelection.bind(this);
        this.toggleContent = this.toggleContent.bind(this);
        this.handleCityButtonClick = this.handleCityButtonClick.bind(this);
        this.handleMenuClose = this.handleMenuClose.bind(this);
        this.state = {
            showContent: false,
            citySelection: 'City'};
    }

    componentDidMount() {
        window.addEventListener("click", this.handleMenuClose);
    }

    componentWillUnmount() {
        window.removeEventListener("click", this.handleMenuClose);
    }

    /**
     * Handle closing dropdown menu logic when user clicks outside of the dropdown content.
     * @param {Event Obj} event 
     */
    handleMenuClose(event) {
        // if user clicked outside the dropdown while the dropdown is showing, close it
        if(!this.dropDownContentRef.current.contains(event.target) 
            && !document.getElementsByClassName("dropDownButton")[0].contains(event.target)) 
        {
            if(this.state.showContent) {
                this.toggleContent();
            }   
        }
    }

    /**
     * Toggle dropdown menu (open/close)
     */
    toggleContent() {
        let oldVal = this.state.showContent;
        this.setState({showContent: !oldVal});
    }

    /**
     * Handle the selection of a city from the drop down
     * @param {Event Obj} event 
     */
    handleCitySelection(event) {
        this.setState({citySelection: event.target.innerText});
        this.toggleContent();
    }

    /**
     * Handle opening/closing the dropdown menu when the dropdown button is clicked
     */
    handleCityButtonClick() {
        this.toggleContent();       
    }

    render() {
        let cityElements = [];
        cityElements = cities.sort().map((item) => <a key={item} onClick={this.handleCitySelection}>{item}</a>)
        return (
            <div className="dropDownContainer">
                <div className="dropDown">
                    <button className="dropDownButton button" onClick={this.handleCityButtonClick}>{this.state.citySelection}</button>
                    <div ref={this.dropDownContentRef} className="dropDownContent" style={{ visibility: this.state.showContent ? 'visible' : 'hidden' }}>
                        {cityElements}
                    </div>
                </div>
            </div>
        );
    }
}

export default DropDown;