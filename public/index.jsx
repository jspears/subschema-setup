import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ExpandBox from './components/ExpandBox';
import Subschema, {Form, loader} from 'subschema';
import commands from './commands';
loader.addTemplate('ExpandBoxTemplate', require('./components/ExpandBoxTemplate.jsx'));
loader.addTemplate('ExpandBox', require('./components/ExpandBox.jsx'));

var schema = {}, fields = [];
Object.keys(commands).forEach(function (key) {
    fields.push(key);
    var cmd = commands[key];
    var obj = schema[key] = {
        title:key,
        help: cmd.help,
        template: 'ExpandBoxTemplate',
        type: 'Checkbox'
    };


});
console.log('schema', schema);
var conf = {
    schema, fieldsets: {template: "ExpandBox", fields}
}

export default class App extends Component {
    render() {
        return <div>

            <Form schema={conf} loader={loader} />

        </div>;
    }
}

ReactDOM.render(<App/>, document.getElementById('content'));