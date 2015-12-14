import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ExpandBox from './components/command/ExpandBox';
import Subschema, {Form, loader, ValueManager} from 'subschema/index.jsx';
import BuilderLoader from './components/builder/loader';
loader.addLoader(BuilderLoader);

var schema = {
    schema: {
        schema: {
            type: 'Mixed',
            valueType: 'TypeBuilder',
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

var valueManager = ValueManager({
    schema: {
        name: {
            type: 'Text',
            help: 'Type Text',
            template: {
                template: false
            }
        },
        title: {
            type: 'Select',
            help: 'Select Text',
            options: [{label: 'Mr.', val: 'Mr'}, {label: 'Mrs.', val: 'Ms'}, {label: 'Ms.', val: 'Ms'}]
        }
    },
    fieldsets: [{
        legend: 'Mr So and So',
        fields: ['name', 'title']
    }],
    _templates: loader.listTemplates().map((v)=>v.name),
    _types: loader.listTypes().map((v)=>v.name),
    _validators: loader.listValidators().map((v)=>v.name)
});

valueManager.addListener('schema', function (val, old, path) {
    console.log('value changed', val, path);
    if (val != null) {
        valueManager.update('_allFields', Object.keys(val));
    }
}, null, true);

ReactDOM.render(<Form schema={schema} loader={loader}
                      valueManager={valueManager}/>, document.getElementById('content'));