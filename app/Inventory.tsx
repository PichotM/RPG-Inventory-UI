import * as React from 'react'
import { Component } from 'react'
import { ItemList } from './ItemList'
import { Options } from './Options'
import { dragStore } from './store/DragStore'
import { inventoryStore } from './store/InventoryStore'
import { observer } from '../node_modules/mobx-react'
import { Item } from './item'
import { SwitchTransition, CSSTransition  } from 'react-transition-group'
import { Icons } from './icons'

const FadeTransition = props => (
    <CSSTransition
      {...props}
      classNames="transition"
      addEndListener={(node, done) => {
        node.addEventListener("transitionend", done, false);
      }}
    />
);
  

@observer
export class Inventory extends Component<any, any> {
    private draggable: HTMLElement = null

    constructor(props) {
        super(props)
        this.state = {
            clothes : false,
            targetClothes : false,
            searchPocketsValue: '',
            searchOtherValue: '',
            pocketsOrder: 0,
            targetOrder: 0
        }
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

    requestFullFocus() {
        fetch('http://gtalife/askFullFocus', { method: 'POST', body: "{}" })
    }

    releaseFullFocus() {
        fetch('http://gtalife/releaseFullFocus', { method: 'POST', body: "{}" })
    }
    
    render() {
        const icons = Icons

        return (
            <div id="inventory">
                <div className="inventory-list">
                    <div className="item-list-title">
                        <div className={"title" + (this.state.clothes ? "" : " selected")} onClick={() => this.setState({ clothes : false })}>Inventaire</div>
                        <div className="title" style={{ pointerEvents: 'none' }}>&nbsp;&nbsp;|&nbsp;&nbsp;</div>
                        <div className={"title" + (!this.state.clothes ? "" : " selected")} onClick={() => this.setState({ clothes : true })} >Vêtements</div>
                        <div className="title" style={{ pointerEvents: 'none' }}>&nbsp;&nbsp;|&nbsp;&nbsp;</div>
                        <div className="title">
                            <span className="dropdown-parent">Trier par &#9660;</span>
                            <div className="dropdown">
                                <div onClick={() => this.setState({ pocketsOrder : 0 })} className={this.state.pocketsOrder == 0 ? "selected" : ""}>{this.state.pocketsOrder == 0 ? "✔ " : ""}Alphabétique</div>
                                <div onClick={() => this.setState({ pocketsOrder : 1 })} className={this.state.pocketsOrder == 1 ? "selected" : ""}>{this.state.pocketsOrder == 1 ? "✔ " : ""}Nombre</div>
                                {/* <div onClick={() => this.setState({ pocketsOrder : 2 })} className={this.state.pocketsOrder == 2 ? "selected" : ""}>{this.state.pocketsOrder == 2 ? "✔ " : ""}Poids</div> */}
                            </div>
                        </div>
                        <div className="title" style={{ pointerEvents: 'none' }}>&nbsp;&nbsp;|&nbsp;&nbsp;</div>
                        <div className="title"><input onFocus={() => this.requestFullFocus()} onBlur={() => this.releaseFullFocus()} className="searchBox" type="text" onChange={(event) => this.setState({ searchPocketsValue: event.target.value })} placeholder="Rechercher"/></div>
                        <div className="infos">{inventoryStore.pocketsWeight} / 45</div>
                    </div>
                    <SwitchTransition>
                        <FadeTransition key={this.state.clothes ? "lol" : "no"}>
                            <ItemList items={this.state.clothes ? inventoryStore.clothes : inventoryStore.pockets} order={this.state.pocketsOrder} searchValue={this.state.searchPocketsValue} eventName="inventory" />
                        </FadeTransition>
                    </SwitchTransition>

                    <div className="gunInventory">
                        <div className="item-list-title">
                            <div className="title selected" style={{ pointerEvents: 'none' }}>Armes</div>
                        </div>
                        <Item keyNumber="1" eventName="weaponOne" data={inventoryStore.weaponOne && { name : inventoryStore.weaponOne }} />
                        <Item keyNumber="2" eventName="weaponTwo" data={inventoryStore.weaponTwo && { name : inventoryStore.weaponTwo }} />
                        <Item keyNumber="3" eventName="weaponThree" data={inventoryStore.weaponThree && { name : inventoryStore.weaponThree }} />
                    </div>
                </div>

                <Options />

                <div className={"inventory-list " + (inventoryStore.targetMaxWeight <= 0 ? "hide" : "")}>
                    {inventoryStore.targetMaxWeight > 0 && (
                    <div className="item-list-title">
                        <div className={"title" + (this.state.targetClothes ? "" : " selected")} onClick={() => this.setState({ targetClothes : false })}>Coffre</div>
                        <div className="title" style={{ pointerEvents: 'none' }}>&nbsp;&nbsp;|&nbsp;&nbsp;</div>
                        <div className={"title" + (!this.state.targetClothes ? "" : " selected")} onClick={() => this.setState({ targetClothes : true })} >Vêtements</div>
                        <div className="title" style={{ pointerEvents: 'none' }}>&nbsp;&nbsp;|&nbsp;&nbsp;</div>
                        <div className="title">
                            <span className="dropdown-parent">Trier par &#9660;</span>
                            <div className="dropdown">
                                <div onClick={() => this.setState({ targetOrder : 0 })} className={this.state.targetOrder == 0 ? "selected" : ""}>{this.state.targetOrder == 0 ? "✔ " : ""}Alphabétique</div>
                                <div onClick={() => this.setState({ targetOrder : 1 })} className={this.state.targetOrder == 1 ? "selected" : ""}>{this.state.targetOrder == 1 ? "✔ " : ""}Nombre</div>
                                {/* <div onClick={() => this.setState({ targetOrder : 2 })} className={this.state.targetOrder == 2 ? "selected" : ""}>{this.state.targetOrder == 2 ? "✔ " : ""}Poids</div> */}
                            </div>
                        </div>
                        <div className="title" style={{ pointerEvents: 'none' }}>&nbsp;&nbsp;|&nbsp;&nbsp;</div>
                        <div className="title"><input onFocus={() => this.requestFullFocus()} onBlur={() => this.releaseFullFocus()} className="searchBox" type="text" onChange={(event) => this.setState({ searchOtherValue: event.target.value })} placeholder="Rechercher"/></div>
                        <div className="infos">{inventoryStore.targetWeight} / {inventoryStore.targetMaxWeight}</div>
                    </div>
                    )}
                    
                    {inventoryStore.targetMaxWeight > 0 && (
                    <SwitchTransition>
                        <FadeTransition key={this.state.targetClothes ? "lol" : "no"}>
                            <ItemList IsTarget={true} items={this.state.targetClothes ? inventoryStore.targetClothes : inventoryStore.target} order={this.state.targetOrder} searchValue={this.state.searchOtherValue} eventName="targetInventory" />
                        </FadeTransition>
                    </SwitchTransition>
                    )}
                </div>

                <div className={'item-icon drag ' + this.dragging} style={this.dragStyle} ref={draggable => (this.draggable = draggable)}>
                    <Item data={this.itemData} key={this.itemKey} />
                </div>
            </div>
        )
    }
}
