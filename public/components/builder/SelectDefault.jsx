import React, {Component} from 'react';
import subschema, {loaderFactory,types, DefaultLoader, ValueManager} from 'subschema';

var {Select, Checkbox} = types;

export default class SelectDefault extends Component {

    //allows for injection of the Select types.
    static propTypes = Select.propTypes;

    constructor(...rest) {
        super(...rest);
        //init state
        this.state = {disabled: true};
    }

    //inline styles, because this is an example
    render() {
        return <div>
            <Checkbox className='' style={{position: 'absolute',  left:'-5px', top:'5px'}}
                      onChange={(e)=>this.setState({disabled: !e})} checked={!this.state.disabled}/>
            <Select {...this.props} disabled={this.state.disabled}/>
        </div>
    }
}
