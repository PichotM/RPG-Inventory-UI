import * as React from "react";
import { Component } from "react";
import { Inventory } from "./Inventory";
import { observer } from 'mobx-react'
import { dragStore } from "./store/DragStore";
import { inventoryStore } from './store/InventoryStore'
import { CSSTransition } from 'react-transition-group';

@observer
export class App extends Component<any, any> {
    constructor(props) {
        super(props)
        this.state = {
            visible : false
        }

        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        const t = this;

        const appHandlers = {
            showInventory(inventoryData) {
                inventoryStore.Create(inventoryData)
                t.setState({ visible : true })
            },
            hideInventory() {
                inventoryStore.Reset()
                t.setState({ visible : false })
                
                fetch('http://pichot/hideInventory', { method: 'POST', body: "{}" })
            }
        };

        window.addEventListener('message', function(event) {
            if (appHandlers[event.data.eventName])
                appHandlers[event.data.eventName](event.data.eventData)
        })

        document.addEventListener('mouseup', e => {
            dragStore.mouseup(e)
        })

        document.addEventListener('mousemove', e => {
            if (dragStore.dragging) {
                dragStore.setMouse(e)
            }
        })
    }

    // todo unmount

    render() {
        return (
            <CSSTransition
            in={this.state.visible}
            classNames='viewport'
            timeout={500}
            unmountOnExit
            >
                <div>
                    <div className="blurBackground"></div>
                    <Inventory />
                </div>
            </CSSTransition>
        )
    }
}