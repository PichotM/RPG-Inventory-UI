import * as React from 'react'
import { Component } from 'react'
import { dragStore } from './store/DragStore';
import { observer } from '../node_modules/mobx-react';

import { Icons } from './icons'

@observer
export class Item extends Component<any, any> {
    public item: HTMLElement = null

    constructor(props) {
        super(props)
        this.state = {
            dragging: false
        }

        this.onClick = this.onClick.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
    }

    get label() {
        if (this.props.data && this.props.data.qty && this.props.data.qty > 1 || this.props.keyNumber) {
            return <div className="item-icon-label" >
                {this.props.keyNumber || this.props.data.qty}
            </div>
        }
    }

    get dragging() {
        return this.state.dragging ? 'dragging' : ''
    }

    onClick(e) {
        if (this.props.data && this.props.data.name)
        {
            dragStore.mousedown(e, this)
            if (e.button === 2)
            {
                dragStore.eventName = "useInventory"
                dragStore.mouseup()
            }
        }
    }

    onMouseEnter(e) {
        if (!this.props.keyNumber) return;

        dragStore.eventName = this.props.eventName
        this.setState({ dragOver: true })
    }

    onMouseLeave(e) {
        if (!this.props.keyNumber) return;

        dragStore.eventName = null
        this.setState({ dragOver: false })
    }

    get getIcon() {
        const iconName = this.props.data && (this.props.data.base ? this.props.data.base : this.props.data.name);
        const icon = iconName && Icons[iconName] || 'default';
        return (
            <div className="item-icon">
                <img className='item-icon-img' src={'../ui/assets/img/items/' + icon + '.png'}/>
            </div>
        )
    }

    render() {
        return (
            <div className={'item ' + this.dragging}
                onMouseDown={this.onClick}
                ref={item => (this.item = item)}
                data-id={Math.random()}
                
                onMouseEnter={this.onMouseEnter.bind(this)}
                onMouseLeave={this.onMouseLeave.bind(this)}
            >
                
                {(this.props.keyNumber || (this.props.data && this.props.data.qty)) && this.label}
                {this.props.data && this.getIcon}

                <div className="item-desc">
                {this.props.data && this.props.data.name && <p className="name">{this.props.data.name + (this.props.data.suffix ? " (" + this.props.data.suffix + ")" : "")}</p>}
                </div>
            </div>
        )
    }
}
