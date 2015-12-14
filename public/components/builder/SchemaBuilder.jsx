import React, {Component} from 'react';
import Subschema, {PropTypes, loaderFactory, types,decorators, DefaultLoader} from 'Subschema';
import BuilderLoader from './loader';
import SchemaBuilderLess from './SchemaBuilder.less';

var {listen} = decorators;
var ObjectType = types.Object;

var builderLoader = loaderFactory([DefaultLoader, BuilderLoader]);
var toName = (v)=>v.name;
var schema = {
    schema: {
        schema: {
            type: 'Mixed',
            valueType: {
                type:'TypeBuilder'
            },
            createTemplate: 'ModalCreateTemplate',

            canAdd: true,
            canEdit: true,
            canRemove: true
        },
        fieldsets: {
            type: 'List',
            canAdd: true,
            canEdit: true,
            canRemove: true,
            canReorder: true,
            itemType: {
                type: 'Object',
                subSchema: {
                    legend: 'Text',
                    fields: {
                        type: 'List',
                        canAdd: true,
                        canEdit: true,
                        canRemove: true,
                        canReorder: true,
                        itemType: {
                            type: 'ExpressionSelect',
                            options: '_allFields'
                        }
                    }
                },
                fields: ['legend', 'fields']
            }
        }
    },
    fieldsets: [{
        legend: 'Schema Builder', fields: ['schema', //'fieldsets'
        ]
    }]
}
class SchemaBuilderContext extends Component {
    static contextTypes = PropTypes.contextTypes;
    static childContextTypes = PropTypes.contextTypes;

    getChildContext() {
        var {valueManager, loader} = this.props;
        valueManager.update('_types', loader.listTypes().map(toName));
        valueManager.update('_templates', loader.listTemplates().map(toName));
        valueManager.update('_processors', loader.listProcessors().map(toName));
        valueManager.update('_operators', loader.listOperators().map(toName));
        valueManager.update('_validators', loader.listValidators().map(toName));
        return {
            valueManager,
            loader: builderLoader
        }
    }

    render() {
        return this.props.children;
    }
}

class SchemaView extends Component {
    @listen("value", null)
    setSchema(schema) {
        var {_templates,_types, _processors, _validators, _allFields, _operators, ...rest } = schema;
        this.setState({schema: rest});
    }

    render() {
        return <pre>{JSON.stringify(this.state.schema, null, 3)}</pre>
    }

}
export default class SchemaBuilder extends Component {
    static contextTypes = ObjectType.contextTypes;
    static propTypes = ObjectType.propTypes;

    render() {
        var {valueManager, loader, ...rest} = this.props;
        return <SchemaBuilderContext valueManager={valueManager} loader={loader}>
            <div>
                <ObjectType {...rest} schema={schema}/>
                <SchemaView/>
            </div>
        </SchemaBuilderContext>
    }
}