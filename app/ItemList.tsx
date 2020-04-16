import * as React from 'react'
import { Component } from 'react'
import { Item } from './item'
import { Scrollbars } from 'react-custom-scrollbars'
import 'dragster'
import { dragStore } from './store/DragStore';

export class ItemList extends Component<any, any> {
    private list: HTMLElement

    constructor(props) {
        super(props)
        this.state = {
            dragOver: false
        }
    }

    get items() {
        if (this.props.items) {
            return this.props.items.map((item, id) => {
                return <Item target={this.props.IsTarget} data={item} key={id} />
            })
        }
    }

    get dragOver() {
        return dragStore.dragging && this.state.dragOver ? 'dragover' : ''
    }

    onMouseEnter(e) {
        dragStore.eventName = this.props.eventName
        this.setState({ dragOver: true })
    }

    onMouseLeave(e) {
        dragStore.eventName = null
        this.setState({ dragOver: false })
    }

    filteredItems(searchValue) {
        return this.props.items.map((item, id) => {
            if (item.name.indexOf(searchValue) != -1)
                return <Item target={this.props.IsTarget} data={item} key={id} />
        })
    }

    scroll({ style, ...props }) {
        return (
            <div
                style={{
                    ...style,
                    position: 'absolute',
                    right: '0',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)'
                }}
                {...props}
            />
        )
    }

    render() {
        return (
            <div
                className={'item-list ' + this.dragOver}
                ref={list => this.list = list}
                onMouseEnter={this.onMouseEnter.bind(this)}
                onMouseLeave={this.onMouseLeave.bind(this)}
                tabIndex={-1}
            >
                <Scrollbars renderThumbVertical={this.scroll}>
                    {this.props.searchValue.length == 0 ? this.items : this.filteredItems(this.props.searchValue) }
                </Scrollbars>
            </div>
        )
    }
}
