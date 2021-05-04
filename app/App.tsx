import * as React from "react";
import { Component } from "react";
import Inventory from "./Inventory";
import { observer } from 'mobx-react'
import { dragStore } from "./store/DragStore";
import { inventoryStore } from './store/InventoryStore'
import { CSSTransition } from 'react-transition-group';
import './i18n';

// TODO redo the router-dorm

const env = process.env.NODE_ENV || 'dev';

@observer
export class App extends Component<any, any> {
    private keydownCB: (KeyboardEvent) => void = null

    constructor(props) {
        super(props)

        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        const t = this;

        const appHandlers = {
            showInventory(inventoryData) {
                inventoryStore.Create(inventoryData, false)
                inventoryStore.inventoryVisible = true
            },
            updateInventory(inventoryData) {
                inventoryStore.Create(inventoryData, true)
            },
            hideInventory(inventoryData) {
                inventoryStore.Hide()
            }
        };

        window.addEventListener('message', function (event) {
            if (appHandlers[event.data.eventName])
                appHandlers[event.data.eventName](event.data.eventData)
        })

        document.addEventListener('mouseup', e => {
            dragStore.mouseup()
        })

        document.addEventListener('mousemove', e => {
            if (dragStore.dragging)
                dragStore.setMouse(e)
        })

        this.keydownCB = (e: KeyboardEvent) => {
            if (e.key === 'Tab' || e.key === 'Escape' || e.key === 'K')
                inventoryStore.Hide()
        }

        document.addEventListener('keydown', this.keydownCB)
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.keydownCB)
    }

    render() {
        return (
            <CSSTransition
                in={inventoryStore.inventoryVisible}
                classNames='transitionOpacity'
                timeout={500}
                unmountOnExit
            >
                <div className="viewport">
                    <div className="blurBackground"></div>
                    <React.Suspense fallback="loading">
                        <Inventory />
                    </React.Suspense>
                </div>
            </CSSTransition>
        )
    }
}