import * as React from 'react'
import { Component } from 'react'
import { dragStore } from './store/DragStore';
import { observer } from '../node_modules/mobx-react';
import { OptionButton } from './OptionButton'

@observer
export class Options extends Component<any, any> {
    constructor(props) {
        super(props)
        this.state = {
            amount : 1
        }

        this.onAmountChange = this.onAmountChange.bind(this);
    }

    onAmountChange(e) {
        this.setState({ amount : e.target.value })
        dragStore.amount = this.state.amount
    }

    render() {
        return (
            <div className="inventory-options">
                <div className="option-panel">
                    <input type="text" className="option-button" value={this.state.amount} onChange={this.onAmountChange} tabIndex={-1}/>
                    <OptionButton name="Utiliser" drop="yes" eventName="useInventory" />
                    <OptionButton name="Donner" drop="yes" eventName="giveInventory" />
                    <OptionButton name="Jeter" drop="yes" eventName="throwInventory" />
                    <OptionButton name="Informations" drop="yes" eventName="infoInventory" />
                    <OptionButton name="Renommer" eventName="renameInventory" />
                </div>
            </div>
        )
    }
}
