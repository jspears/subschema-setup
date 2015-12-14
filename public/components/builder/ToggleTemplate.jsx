import React, {Component} from 'react';
import ButtonsTemplate from 'subschema/templates/ButtonsTemplate.jsx';
import PropTypes from  'subschema/PropTypes';
import {noop} from 'subschema/tutils';
import Checkbox from 'subschema/types/Checkbox';

export default class ToggleTemplate extends Component {
    static propTypes = {
        buttons: PropTypes.buttons,
        legend: PropTypes.node,
        className: PropTypes.cssClass,
        onButtonClick: PropTypes.event,
        onClick: PropTypes.event
    }

    static defaultProps = {
        toggle: false
    }

    constructor(props, ...args) {
        super(props, ...args);
        this.state = {
            toggle: props.toggle
        }
    }

    handleToggle = (toggle)=> {
        this.setState({toggle});
    };


    renderButtons(buttons) {
        if (!buttons) {
            return null;
        }
        if (buttons.buttons) {
            return <ButtonsTemplate ref="buttons" onButtonClick={this.props.onButtonClick} onClick={this.props.onClick}
                {...buttons}/>
        }
        return <ButtonsTemplate ref="buttons" onButtonClick={this.props.onButtonClick} onClick={this.props.onClick}
                                buttons={buttons}/>
    }

    render() {
        var {legend, buttons, className, ...rest} = this.props.field || {};
        return legend ?
            <fieldset className={className} key='fieldset'>
                <legend>{legend} <Checkbox onChange={this.handleToggle} checked={this.state.toggle}/></legend>
                {this.state.toggle ? this.props.children : null}
                {this.state.toggle ? this.renderButtons(buttons) :null}
            </fieldset> :
            <div className={className} key='div-fieldset'>
                {this.state.toggle ? this.props.children : null}
                {this.state.toggle ? this.renderButtons(buttons) :null}
            </div>
    }
}