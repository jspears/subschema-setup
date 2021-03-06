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
//                legend: 'Configure',
                className:'max-height'
                ,
                fieldsets: [
                    {
                        legend: 'Type',
                        template: 'ToggleTemplate',
                        fields
                    },
                    {
                        legend: 'Template',
                        template: 'ToggleTemplate',
                        fields: ['template', 'help']
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
                    }]
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
            help: {
                type: 'Text',
                help: 'Help Content'
            },
            template: {
                type: 'Object',
                subSchema: {
                    template: {
                        type: 'SelectDefault',
                        help: 'Template for type',
                        placeholder: 'Default - EditorTemplate',
                        optionsPath: '_templates'
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
                            type: 'ExpressionSelect',
                            optionsPath: '_validators'
                        }
                    },
                    fields: ['message', 'type']
                }
            }
        }
    }

    var Type = loader.loadType(type);
    var defProps = Type.defaultProps || FREEZE_OBJ;
    each(Type.propTypes, (propType, key)=> {
        if (Editor.fieldPropTypes[key] || propType === PropTypes.value || propType === PropTypes.valueEvent || propType === PropTypes.targetEvent) {
            return
        }
        var type = toType(loader, propType, defProps[key]);
        if (type != null) {
            schema.schema[key] = type;
            fields.push(key);
        }
    });

    return schema;
}

var ignorePropTypes = [
    PropTypes.valueEvent,
    PropTypes.targetEvent,
    PropTypes.event
];
ignorePropTypes.push.apply(ignorePropTypes, ignorePropTypes.map(v=>v.isRequired));

function toType(loader, propType, defaultValue) {
    if (ignorePropTypes.indexOf(propType) > -1) return;
    if (propType === PropTypes.options) {
        return {
            type: 'List',
            labelKey:'label',
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
            type: 'ExpressionSelect',
            help: 'Custom Template',
            defaultValue,
            optionsPath: '_templates'
        }
    }
    if (propType === PropTypes.cssClass) {
        return {
            type: 'Text',
            help: 'CSS Class Name',
            validators: ['cssClass']
        }
    }
    if (propType === PropTypes.processor) {
        return {
            type: 'ExpressionSelect',
            help: 'Processor',
            optionsPath: '_processors'
        }
    }
    if (propType === PropTypes.template) {
        return {
            type: 'ExpressionSelect',
            help: 'Template',
            optionsPath: '_templates'
        }
    }
    if (propType === PropTypes.content) {
        return {
            type: 'Text',
            help: 'Content Expression'
        }
    }
    if (propType === PropTypes.type) {
        return {
            type: 'ExpressionSelect',
            optionsPath: '_types'
        }
    }

    if (propType === PropTypes.schema) {
        return {
            type: 'SchemaBuilder'
        }
    }
    if (propType === PropTypes.number) {
        return {
            type: 'Number'
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

    @listen('value', '.type', true)
    typeChange(type) {
        this.schema = makeSchema(this.context.loader, type || 'Text');
        console.log('typeChange', JSON.stringify(this.schema, null, 2));
        this.forceUpdate();
    }

    render() {
        return <ObjectType {...this.props} schema={this.schema}/>
    }
}
