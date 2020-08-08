import { observable, action } from 'mobx'
import { Component } from 'react';
import { inventoryStore } from './InventoryStore'

class DragStore {
    @observable
    public itemData: Object = null
    public itemKey: number = 0

    @observable
    public eventName: String = null
    public amount: Number = 1

    @observable
    public dragging: boolean = false
    public isTarget: boolean = false

    @observable
    public mousex: number = 0

    @observable
    public mousey: number = 0

    @observable
    public component: Component = null

    @action
    public setMouse(e) {
        this.mousex = e.clientX
        this.mousey = e.clientY
    }

    @action
    public mouseup() {
        
        this.dragging = false

        if (this.eventName && (this.eventName != "inventory" || this.isTarget)) {
            switch(this.eventName) {
                case "renameInventory":
                    inventoryStore.Hide()
                    break;
                default:
            }

            fetch(`http://gtalife/inventoryInteraction`, { method: 'POST', body: JSON.stringify({
                eventName : this.eventName,
                itemData : this.itemData,
                itemKey : this.itemKey,
                amount : this.amount
            })})
        }

        this.itemData = null
        this.itemKey = null
        this.eventName = null

        if (this.component)
            this.component.setState({ dragging: false })
    }

    @action
    public mousedown(e, component) {
        this.itemData = component.props.data
        this.itemKey = component.key
        this.isTarget = component.props.target
    
        this.setMouse(e)
        this.component = component
        this.dragging = true
        this.eventName = component.props.eventName

        switch (e.which) {
            case 1:
                this.dragging = true
        }

        component.setState({ dragging: this.dragging })
    }
}

export const dragStore = new DragStore()