"use strict";

import React, {Component} from 'react';

import Subschema, {loaderFactory, tutils, decorators, types, DefaultLoader, Editor, PropTypes, ValueManager} from 'subschema/index.jsx';

var {listen} = decorators;
var {each, FREEZE_OBJ} = tutils;
var ObjectType = types.Object;

function toLabelVal(t) {
    return {label: t.name, val: t.name}
}

function makeSchema(loader, type) {
    var fields = ['type', 'title', 'placeholder', 'className'];
    var schema = {
        fieldsets: [
            {
                legend: 'Configure Type',
                fields
            },
            {
                legend: 'Template',
                template: 'ToggleTemplate',
                fields: ['template']
            },
            {
                legend: 'Validators',
                template: 'ToggleTemplate',
                fields: ['validators']
            },
            {
                legend: 'Advanced',
                template: 'ToggleTemplate',
                fields: ['name', 'dataType', 'fieldAttrs']
            }
        ],
        schema: {
            type: {
                type: 'ExpressionSelect',
                help: 'The type of the component',
                placeholder: 'Text',
                optionsPath: '_types'
            },
            title: {
                type: 'InputFalse',
                help: 'The text in the label to use (unchecking will use no title)'
            },
            placeholder: {
                type: 'Text',
                help: 'Placeholder text'
            },

            template: {
                type: 'Object',
                subSchema: {
                    template: {
                        type: 'SelectDefault',
                        help: 'Template for type',
                        placeholder: 'Default - EditorTemplate',
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
                help: 'The input field name'
            },
            className: {
                type: 'Text',
                help: 'CSS Class for Type',
                validators: ['cssClass']
            },
            dataType: {
                type: 'Text',
                help: 'The dataType for input components ie. input <type="checkbox">'
            },
            fieldAttrs: {
                type: 'Mixed',
                canAdd: true,
                canDelete: true,
                canEdit: true,
                keyType: 'Text',
                valueType: 'Text'
            },
            validators: {
                type: 'List',
                title: false,
                template: false,
                canAdd: true,
                canDelete: true,
                canEdit: true,
                canReorder: true,
                itemType: {
                    type: 'Object',
                    subSchema: {
                        'message': 'Text',
                        'type': {
                            type: 'Select',
                            options: loader.listValidators().map(toLabelVal)
                        }
                    },
                    fields: ['message', 'type']
                }
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
        if (Editor.fieldPropTypes[key] || propType === PropTypes.value || propType === PropTypes.valueEvent || propType === PropTypes.targetEvent) {
            return
        }
        schema.schema[key] = toType(loader, propType, defProps[key]);
        fields.push(key);
    });

    return schema;
}

function toType(loader, propType, defaultValue) {
    if (propType === PropTypes.options) {
        return {
            type: 'List',
            title: 'Options',
            canAdd: true,
            canEdit: true,
            canReorder: true,
            canRemove: true,
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
            help: 'CSS Class Name',
            validators: ['css']
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
    if (propType === PropTypes.bool) {
        return {
            type: 'Checkbox'
        }
    }
}


export default class TypeBuilder extends Component {
    static propTypes = {
        onChange: PropTypes.valueEvent,
        path: PropTypes.path
    }
    static contextTypes = PropTypes.contextTypes;

    static inputClassName = ' ';
    static template = false;
    static noTemplate = true;

    constructor(...props) {
        super(...props);
        this.state = {
            type: 'Text'
        }
    }

    @listen('value', '.type', true)
    typeChange(type) {
        this.schema = makeSchema(this.context.loader, type || 'Text');
        console.log('typeChange', type, this.schema);
        this.forceUpdate();
    }

    render() {
        if (!this.schema) {

        }
        return <div {...this.props}>
            <ObjectType schema={this.schema} valueManager={this.context.valueManager} path={this.props.path}/>
        </div>
    }
}
