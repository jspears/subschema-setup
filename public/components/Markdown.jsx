import React, {Component} from 'react';
import Editor from 'react-md-editor';
import PropTypes from 'subschema/PropTypes';
import MarkdownLess from './Markdown.less';
import marked from 'marked';

export default class Markdown extends Component {
    static propTypes = {
        onChange: PropTypes.valueEvent
    }

    constructor(...args) {
        super(...args);
        this.state = {
            preview: true
        }
    }

    handlePreview = (e)=> {
        this.setState({preview: !this.state.preview});
    };

    renderEditor(value) {
        return <div>
            <Editor value={value || '#'} onChange={this.props.onChange}/>
            <div className='mardown-preview-linl' onClick={this.handlePreview}>preview</div>
        </div>
    }

    renderPreview(value) {
        value = value || "### Click To Edit";
        var __html = marked(value);
        return <div onClick={this.handlePreview} className='clickable'
                    dangerouslySetInnerHTML={{__html}}/>
    }

    render() {
        var {value,className, onChange, ...rest} = this.props;
        return (<div {...rest}>
            {this.state.preview ? this.renderPreview(value) : this.renderEditor(value)}
        </div>);

    }
}

