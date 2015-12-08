import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ExpandBox from './components/command/ExpandBox';
import Subschema, {Form, loader, ValueManager} from 'subschema/index.jsx';
import commands from './commands';
import PT from './PropTypes';
import PropTypes from 'subschema/PropTypes';
import listen from 'subschema/decorators/listen';
import indexLess from './index.less';
import api from '../src/api';

loader.addType({
    'Command': require('./components/command/Command.jsx'),
    'Markdown': require('./components/Markdown.jsx')
});

loader.addValidator({
    'package': require('./validators/package'),
    'semver': require('./validators/semver')
});

var schema = {}, fields = [];
Object.keys(commands).forEach(function (key) {
    fields.push(key);
    var cmd = commands[key];
    var obj = schema[key] = {
        title: key,
        content: cmd.help,
        template: 'ExpandBoxTemplate',
        type: 'Content'
    };
});

console.log('schema', schema);
var conf = {
    schema, fieldsets: {template: "ExpandBox", fields}
}

var valueManager = ValueManager();
class Controller extends Component {

    static childContextTypes = {
        commands: PT.commands,
        valueManager: PropTypes.valueManager
    }

    getChildContext() {
        return {
            commands,
            valueManager
        }
    }

    render() {
        return this.props.children;
    }
}

export default class App extends Component {
    static contextTypes = {
        commands: PT.commands,
        valueManager: PropTypes.valueManager
    }

    @listen('value', 'commands')
    updateCommands(cmds) {
        this.forceUpdate();
    }


    constructor(...rest) {
        super(...rest);
        this.state = {
            page: 'select'
        }
    }

    makeSchema() {
        var defSchema = {
            schema: {
                'commands': {
                    template: false,
                    type: 'Command'
                }
            },
            fieldsets: [{
                legend: 'Choose Actions',
                fields: ['commands']
            }]
        }
        var cmds = valueManager.path('commands');
        if (cmds && cmds.length) {
            cmds.forEach((cmd)=> {
                if (commands[cmd] && commands[cmd].schema) {
                    var cmdSchema = defSchema.schema[cmd] = {
                        subSchema: commands[cmd].schema.schema,
                        type: 'Object'
                    };
                    var fields = commands[cmd].schema.fields || Object.keys(cmdSchema);
                    defSchema.fieldsets.push({
                        legend: cmd,
                        fields: fields.map((f)=> {
                            return cmd + '.' + f;
                        })
                    });
                }
            });
        }
        defSchema.schema.done = {
            type: 'Content',
            content: 'All Done'
        }
        defSchema.fieldsets.push({
            legend: 'Make Zip',
            fields: ['done']
        });
        return defSchema;
    }

    handleSelect = (e, err, value) => {
        e.preventDefault();
        if (value.commands == null || value.commands.length === 0) {
            return;
        }

        this.setState({page: 'config'});

    }
    handleWizard = (e, err, value) => {

        this.setState({page: 'create'});

    }


    render() {
        return <div>

            <Form key='select' schema={this.makeSchema()} template='WizardTemplate' valueManager={valueManager}
                  loader={loader}
                  onSubmit={this.handleSelect}/>
        </div>;
    }
}

ReactDOM.render(<Controller><App/></Controller>, document.getElementById('content'));