"use strict";

import React, {Component} from 'react';
import Subschema, {PropTypes, types} from 'Subschema';
import parse from 'parse-author';

function format(obj) {
    if (obj == null || typeof obj === 'string') return obj;
    return `${obj.name} <${obj.email}> (${obj.url})`
}


var {Text} = types;
export default class Person {
    static propTypes = {
        onChange: PropTypes.valueEvent
    }

    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = {
            value: format(props.value)
        }
    }

    componentWillReceiveProps(props) {
        if (props.value !== this.props.value) {
            this.setState({value: format(props.value)});
        }
    }

    handleChange = (e)=> {
        this.setState({value: e.target.value});
    }

    //only update on blur rather than key stroke.... not sure if their
    //regex allows for continual parsing..   Restricted might work
    //here
    handleBlur = (e)=> {
        if (this.props.onBlur) {
            this.props.onBlur(e);
        }
        this.props.onChange(parse(this.state.value));
    }


    render() {
        var {onChange, value, ...props} = this.props;
        return <Text onBlur={this.handleBlur} onChange={this.handleChange} value={this.state.value} {...props}/>
    }
}
