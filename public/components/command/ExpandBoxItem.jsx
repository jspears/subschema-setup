"use strict";
import React, {Component} from 'react';
import style from 'subschema-styles/EditorTemplate-style';
import Content from 'subschema/types/Content.jsx';
import listen from 'subschema/decorators/listen';
import Props from '../../PropTypes';

export default class ExpandBoxItem extends Component {

    handleEnable = (e)=> {
        this.props.onChange(this.props.value);
    }

    handleClick = (e)=> {
        e.preventDefault();
        this.props.onClick(e);
    }


    render() {
        var {name, title, help,isEnabled, error, onClick, errorClassName, isSelected, hasSelection, message, onClick, fieldClass, isSelected, children} = this.props;
        if (!title) {
            title = ''
        }
        var classNameBox = 'expandable-box ' + (isSelected ? 'open' : hasSelection ? 'out' : '') + ' ' + (error != null ? errorClassName || '' : '');
        return (<div className={classNameBox}>
                <Content content={isSelected ? '< '+title : title} type="label" className={'clickable'} htmlFor={name}
                         onClick={this.handleClick}/>
                <div className={isEnabled ? 'expand-box-enabled' : 'expand-box-disabled'}
                     onClick={this.handleEnable}>{isEnabled ? 'enabled' : 'disabled'}</div>

                {isSelected ? <div className={style.noTitle}>
                    {children}
                    {help === false ? null : <Content content={error ? error : help} key='error-block' type='p'
                                                      className={error ? style.error : style.help}/>}
                </div> : null}
            </div>
        );
    }
}