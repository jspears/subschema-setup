"use strict";
import React, {Component} from 'react';
import style from 'subschema-styles/EditorTemplate-style';
import PropTypes from 'subschema/../PropTypes';
import {forEditor} from 'subschema/../css';
import Content from 'subschema/../types/Content.jsx';

export default class ExpandBoxEditorTemplate extends Component {
    render() {
        var {name, title, help, error, errorClassName, message, onClick, fieldClass, isSelected, children} = this.props;
        if (!title) {
            title = ''
        }

        return (<div
            className={ (error != null ? errorClassName || '' : '') }>
            <Content content={title} type="label" className={''} htmlFor={name} onClick={onClick}/>

            {isSelected ? <div className={style.noTitle}>
                {children}
                {help === false ? null : <Content content={error ? error : help} key='error-block' type='p'
                                                  className={error ? style.error : style.help}/>}
            </div> : null}
        </div>);
    }
}