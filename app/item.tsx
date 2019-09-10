import * as React from 'react'
import { Component } from 'react'
import { dragStore } from './store/DragStore';
import { observer } from '../node_modules/mobx-react';

@observer
export class Item extends Component<any, any> {

    private item: HTMLElement = null

    constructor(props) {
        super(props)
        this.state = {
            dragging: false
        }
    }

    get label() {
        if (this.props.data && this.props.data.label) {
            return <div className="item-icon-label" style={{ backgroundColor: this.props.data.labelColor}}>
                {this.props.data.label}
            </div>
        }
    }

    get dragging() {
        return this.state.dragging ? 'dragging' : ''
    }

    onClick(e) {
        dragStore.mousedown(e, this)
    }

    render() {
        return (
            <div className={'item ' + this.dragging} onMouseDown={this.onClick.bind(this)} ref={item => (this.item = item)} data-id={Math.random()}>
                <div className="item-icon">
                    {this.props.data && this.props.data.label && this.label}
                    {this.props.data && <img className='item-icon-img' src={this.props.data.icon ? ('../img/items/' + this.props.data.icon + '.png') : '../img/items/default.png'}/>}
                </div>

                <div className="item-desc">
                {this.props.data && this.props.data.name && <p className="name">{this.props.data.name}</p>}
                </div>
            </div>
        )
    }
}