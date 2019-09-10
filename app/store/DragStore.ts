import { observable, action, computed } from 'mobx'
import { Component } from 'react';

class DragStore {
    @observable
    public itemData: Object = null
    public itemKey: number = 0

    @observable
    public eventName: String = null
    public amount: Number = 1

    @observable
    public dragging: boolean = false

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
    public mouseup(e) {
        this.dragging = false
        this.itemData = null
        this.itemKey = null

        switch(this.eventName) {
            case "useInventory":
                //
            case "giveInventory":
                //
            case "throwInventory":
                //
            case "infoInventory":
                //
            case "renameInventory":
                //
            case "inventory":
                //
            case "targetInventory":
                //
            default:
        }

        this.amount = 1

        if (this.component)
            this.component.setState({ dragging: false })
    }

    @action
    public mousedown(e, component) {
        this.itemData = component.props.data
        this.itemKey = component.key
    
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