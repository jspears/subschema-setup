import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ExpandBox from './components/command/ExpandBox';
import Subschema, {Form, loader, loaderFactory, DefaultLoader, ValueManager} from 'subschema/index.jsx';
import SchemaBuilder from './components/builder/SchemaBuilder.jsx';
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
    }]
});

valueManager.addListener('schema', function (val, old, path) {
    console.log('value changed', val, path);
    if (val != null) {
        valueManager.update('_allFields', Object.keys(val));
    }
}, null, true);

ReactDOM.render(<SchemaBuilder loader={loader}  valueManager={valueManager}/>, document.getElementById('content'));