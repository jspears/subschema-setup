import React, {Component} from 'react';
import marked from 'marked';

export default class Preview extends Component {

    render() {
        var __html = marked(this.props.value);
        return <div onClick={this.props.onClick} className='clickable'
                    dangerouslySetInnerHTML={{__html}}/>
    }
}