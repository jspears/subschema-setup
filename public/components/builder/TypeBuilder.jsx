"use strict";
import React, {Component} from 'react';
import subschema, {loaderFactory, tutils, decorators, types, DefaultLoader, Editor, PropTypes, ValueManager} from 'subschema';
var {listen} = decorators;
var {each, FREEZE_OBJ} = tutils;
var {Object} = types;

function toLabelVal(t) {
    return {label: t.name, val: t.name}
}

function makeSchema(loader, type) {

    var schema = {
        schema: {
            type: {
                type: 'Select',
                help: 'The type of the component',
                options: loader.listTypes().map(toLabelVal)
            },
            template: {
                type: 'Object',
                subSchema: {
                    template: {
                        type: 'SelectDefault',
                        help: 'Template for type',
                        options: loader.listTemplates().map((t)=> {
                            return {
                                label: t.name,
                                val: t.name
                            }
                        })
                    },
                    className: {
                        type: 'Text',
                        help: 'CSS Class for Template',
                        validators: ['cssClass']
                    }
                }
            },
            name: {
                type: 'Text',
                help: 'The input field name '
            },
            className: {
                type: 'Text',
                validators: ['cssClass']
            },
            dataType: {
                type: 'Text',
                help: 'The dataType for input components ie. input <type="checkbox">'
            },
            placeholder: {
                type: 'Text',
                help: 'Placeholder text'
            },
            fieldAttrs: {
                type: 'Mixed',
                canAdd: true,
                canDelete: true,
                canEdit: true,
                keyType: 'Text',
                valueType: 'Text'
            }
        }
    }
    /*     name: PropTypes.name,
     onChange: PropTypes.targetEvent,
     onBlur: PropTypes.blurEvent,
     className: PropTypes.cssClass,
     id: PropTypes.id,
     type: PropTypes.dataType,
     fieldAttrs: PropTypes.fieldAttrs,
     placeholder: PropTypes.placeholder*/
    var Type = loader.loadType(type);
    var defProps = Type.defaultProps || FREEZE_OBJ;
    each(Type.propTypes, (propType, key)=> {
        schema[key] = toType(loader, propType, defProps[key]);
    });

    return schema;
}

function toType(loader, propType, defaultValue) {
    if (propType === PropTypes.options) {
        return {
            type: 'List',
            help: 'Options',
            itemType: {
                type: 'Object',
                subSchema: {
                    label: 'Text',
                    val: 'Text'
                }
            }
        }
    }
    if (propType === PropTypes.template) {
        return {
            type: 'Select',
            help: 'Custom Template',
            defaultValue,
            options: loader.listTemplates().map(toLabelVal)
        }
    }
    if (propType === PropTypes.cssClass) {
        return {
            type: 'Text',
            help: 'CSS Class'
        }
    }
    if (propType === PropTypes.processor) {
        return {
            type: 'Select',
            help: 'Processor',
            options: loader.listProcessors().map(toLabelVal)
        }
    }
    if (propType === PropTypes.type) {
        return {
            type: 'TypeBuilder'
        }
    }
    if (propType === PropTypes.schema) {
        return {
            type: 'SchemaBuilder'
        }
    }
}


export default class TypeBuilder extends Component {
    static propTypes = {
        onChange: PropTypes.valueEvent
    }

    constructor(...props) {
        super(...props);
        this.state = {
            type: 'Text'
        }
    }

    @listen('value', '.type')
    typeChange(type) {
        this.schema = makeSchema(this.context.loader, type || 'Text');
    }

    render() {
        return <div {...this.props}>
            <Object schema={this.schema}/>
        </div>
    }
}
