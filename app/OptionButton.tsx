import * as React from 'react'
import { Component } from 'react'
import { dragStore } from './store/DragStore';
import { observer } from '../node_modules/mobx-react';

@observer
export class OptionButton extends Component<any, any> {
    constructor(props) {
        super(props)
        this.state = {
            dragOver: false
        }
    }

    get dragOver() {
        return dragStore.dragging && this.state.dragOver ? 'dragover' : ''
    }

    onMouseEnter(e) {
        if (dragStore.isTarget) return;
        dragStore.eventName = this.props.eventName
        this.setState({ dragOver: true })
    }

    onMouseLeave(e) {
        if (dragStore.isTarget) return;
        dragStore.eventName = null
        this.setState({ dragOver: false })
    }

    render() {
        return <button
            className={"option-button " + (this.props.drop ? 'drop ' : '') + this.dragOver}
            onMouseEnter={this.onMouseEnter.bind(this)}
            onMouseLeave={this.onMouseLeave.bind(this)}
            tabIndex={-1}
        >{this.props.name}</button>
    }
}
