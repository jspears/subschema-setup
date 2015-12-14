"use strict";
import React, {Component} from 'react';
import Subschema, {templates, decorators} from 'Subschema';

var {ModalTemplate} = templates;
var {listen} = decorators;

export default class ModalCreateTemplate extends Component {
    @listen("value", ".key")
    keyName(key) {
        this.setState({key});
    }

    render() {
        var {children, title, ...props} = this.props;
        return <ModalTemplate {...props} title={`${title} Property '${this.state.key}'`}>
            {children}
        </ModalTemplate>
    }
}
