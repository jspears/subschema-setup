"use strict";
import React, {Component, Children} from 'react';
import ExpandBoxLess from './ExpandBox.less';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Dom from 'subschema/Dom';

export default class ExpandBox extends Component {

    constructor(props, ...ops) {
        super(props, ...ops);
        this.state = {selected: props.selected == null ? -1 : props.selected};
    }

    componentWillReceiveProps(props) {
        if (this.state.selected !== props.selected) {
            this.setState({selected: props.selected == null ? -1 : props.selected});
        }
    }

    bindDocument() {
        this.unbindDocument();
        this._onDocumentClickListener =
            Dom.listen(this, 'click', this.handleDocumentClick);
    }


    componentWillUnMount() {
        this.unbindDocument();
    }

    handleDocumentClick = (e)=> {
        // If the click originated from within this component
        // don't do anything.
        if (!Dom.isNodeInRoot(e.target, this)) {
            this.setState({selected: -1});
            this.unbindDocument();
        }
    }

    unbindDocument() {
        if (this._onDocumentClickListener) {
            this._onDocumentClickListener.remove();
        }
    }

    handleChildClick(idx, e) {
        var selected = this.state.selected;
        selected = selected == idx ? -1 : idx;
        if (selected > -1) {
            this.bindDocument();
        }
        this.setState({selected});

    }

    renderShow(idx) {
        if (idx !== this.state.selected) {
            return null;
        }
        return <div key='show'>{`Box ${idx+1}`}</div>
    }

    renderChild = (child, idx)=> {
        var isSelected = idx === this.state.selected;

        return child == null ? null : React.cloneElement(child, {
            isSelected,
            hasSelection: this.state.selected > -1,
            onClick: this.handleChildClick.bind(this, idx)
        });
    }

    render() {
        return <div className='expandable-boxes-container'>
            <div className='expandable-boxes'>{Children.map(this.props.children, this.renderChild)}</div>
        </div>
    }
}