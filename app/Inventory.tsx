import * as React from 'react'
import { Component } from 'react'
import { ItemList } from './ItemList'
import { Options } from './Options'
import { dragStore } from './store/DragStore'
import { inventoryStore } from './store/InventoryStore'
import { observer } from '../node_modules/mobx-react'
import { Item } from './item'

@observer
export class Inventory extends Component<any, any> {
    private draggable: HTMLElement = null
    private right: HTMLElement = null
    
    private keydownCB: (KeyboardEvent) => void = null

    private rightCB: (KeyboardEvent) => void = null

    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        this.keydownCB = (e: KeyboardEvent) => {
            if (e.key === 'Tab' || e.key === 'Escape') {
                // this.props.history.push('/')
            }
        }
        document.addEventListener('keydown', this.keydownCB)

        this.rightCB = (e: KeyboardEvent) => {
            event.preventDefault()
        }
        document.addEventListener('contextmenu', this.rightCB);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.keydownCB)
        document.removeEventListener('contextmenu', this.rightCB)

        inventoryStore.Reset()
        //this.state.inventory['style'].offsetWidth = "25%"
    }

    get dragging() {
        return dragStore.dragging ? '' : 'hide'
    }

    get itemData() {
        return dragStore.itemData;
    }

    get itemKey() {
        return dragStore.itemKey;
    }

    get dragStyle() {        
        let offset = 0
        if (this.draggable) {
            offset = this.draggable.offsetWidth;
        }

        return {
            left: dragStore.mousex - offset / 2,
            top: dragStore.mousey - offset * 2
        }
    }
    
    render() {
        return (
            <div id="inventory">
                <div id="me" className="inventory-list">
                    <div className="item-list-title">
                        <div className="title">Inventaire</div>
                        <div className="infos">{inventoryStore.pocketsWeight} / 45</div>
                    </div>
                    <ItemList items={inventoryStore.pockets} eventName="inventory" />
                </div>

                <Options />

                    <div id="target" className={"inventory-list " + (inventoryStore.targetMaxWeight == -1 ? "hide" : "")}>
                        <div className="item-list-title">
                            <div className="title">Coffre</div>
                            <div className="infos">{inventoryStore.targetWeight} / {inventoryStore.targetMaxWeight}</div>
                        </div>
                        <ItemList items={inventoryStore.target} eventName="targetInventory" />
                    </div>

                <div className={'item-icon drag ' + this.dragging} style={this.dragStyle} ref={draggable => (this.draggable = draggable)}>
                    <Item data={this.itemData} key={this.itemKey} />
                </div>
            </div>
        )
    }
}
