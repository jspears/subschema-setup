"use strict";
import React, {Component} from 'react';

import ExpandBox from './ExpandBox';
import ExpandBoxTemplate from './ExpandBoxItem.jsx';
import PT from '../../PropTypes';
import Preview from '../MarkdownPreview.jsx';

function flatten(cmds, api, seen, ret) {
    ret = ret || [];
    seen = seen || {};
    cmds.forEach(function (cmd) {
        if (typeof cmd !== 'string') return;
        if (seen[cmd]) {
            //already seen;
            return;
        }
        var cmdObj = api[cmd];
        if (cmdObj) {
            if (cmdObj.pre) {
                flatten(cmdObj.pre, api, seen, ret);
            }
            if (!seen[cmd]) {
                seen[cmd] = true;
                ret.push(cmd);
                if (cmdObj.post) {
                    flatten(cmdObj.post, api, seen, ret);
                }
            }
        }
    });

    return ret;
}

export default class CommandList extends Component {

    static contextTypes = {
        commands: PT.commands
    }
    static propTypes = {
        onChange: PT.valueEvent
    }
    handleChange = (key)=> {
        var value;
        if (key === 'everything') {
            return this.props.onChange(Object.keys(this.context.commands));
        }
        if (!this.props.value) {
            value = [key];
        } else {
            var idx = this.props.value.indexOf(key);
            if (idx === -1) {
                value = this.props.value.concat(key);
            } else {
                this.props.value.splice(idx, 1)
                value = this.props.value.concat();
            }
        }
        var flat = flatten(value, this.context.commands);
        console.log('flat', flat)
        this.props.onChange(flat);
    };

    renderOptions() {
        var all = Object.keys(this.context.commands);

        var ret = all.map((key, i)=> {
            var cmd = this.context.commands[key];
            return <ExpandBoxTemplate key={key+'-'+i} value={key} onChange={this.handleChange}
                                      isEnabled={this.isSelected(key)}
                                      title={key}>

                {cmd.description ? <Preview key="preview" value={cmd.description}/> : cmd.help}
            </ExpandBoxTemplate>

        });
        ret.push(<ExpandBoxTemplate key='everything' value='everything' onChange={this.handleChange}
                                    isEnabled={this.isSelected('everything')}
                                    title='everything'>

            {'Do Everything'}
        </ExpandBoxTemplate>)

        return ret;
    }

    isSelected(key) {

        if (!this.props.value) {
            return false;
        }
        if (key === 'everything') {
            return this.props.value.length === Object.keys(this.context.commands).length;
        }
        return this.props.value.indexOf(key) != -1;
    }

    render() {
        return <ExpandBox onChange={this.props.onChange}>
            {this.renderOptions()}
        </ExpandBox>
    }
}

