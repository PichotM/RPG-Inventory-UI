import * as React from 'react'
import { Component } from 'react'
import { ItemList } from './ItemList'
import Options from './Options'
import { dragStore } from './store/DragStore'
import { inventoryStore } from './store/InventoryStore'
import { observer } from '../node_modules/mobx-react'
import { Item } from './item'
import { SwitchTransition, CSSTransition  } from 'react-transition-group'
import { withTranslation } from 'react-i18next'

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
class Inventory extends Component<any, any> {
    private draggable: HTMLElement = null

    constructor(props) {
        super(props)
        this.state = {
            clothes : false,
            targetClothes : false
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
    
    render() {
        const { t } = this.props;

        return (
            <div id="inventory">
                <div className="inventory-list">
                    <div className="item-list-title">
                        <div className={"title" + (this.state.clothes ? "" : " selected")} onClick={() => this.setState({ clothes : false })}>{t("Inventaire")}</div>
                        <div className="title" style={{ pointerEvents: 'none' }}>&nbsp;&nbsp;|&nbsp;&nbsp;</div>
                        <div className={"title" + (!this.state.clothes ? "" : " selected")} onClick={() => this.setState({ clothes : true })} >{t("Vêtements")}</div>
                        <div className="infos">{inventoryStore.pocketsWeight} / 45</div>
                    </div>
                    <SwitchTransition>
                        <FadeTransition key={this.state.clothes ? "lol" : "no"}>
                            <ItemList items={this.state.clothes ? inventoryStore.clothes : inventoryStore.pockets} eventName="inventory" />
                        </FadeTransition>
                    </SwitchTransition>

                    <div className="gunInventory">
                        <div className="item-list-title">
                            <div className="title selected" style={{ pointerEvents: 'none' }}>{t("Armes")}</div>
                        </div>
                        <Item keyNumber="1" eventName="weaponOne" data={inventoryStore.weaponOne && { name : inventoryStore.weaponOne.name, base : inventoryStore.weaponOne.base }} />
                        <Item keyNumber="2" eventName="weaponTwo" data={inventoryStore.weaponTwo && { name : inventoryStore.weaponTwo.name, base : inventoryStore.weaponTwo.base }} />
                        <Item keyNumber="3" eventName="weaponThree" data={inventoryStore.weaponThree && { name : inventoryStore.weaponThree.name, base : inventoryStore.weaponThree.base }} />
                    </div>
                </div>

                <Options />

                <div className={"inventory-list " + (inventoryStore.targetMaxWeight <= 0 ? "hide" : "")}>
                    {inventoryStore.targetMaxWeight > 0 && (
                    <div className="item-list-title">
                        <div className={"title" + (this.state.targetClothes ? "" : " selected")} onClick={() => this.setState({ targetClothes : false })}>{t("Coffre")}</div>
                        <div className="title" style={{ pointerEvents: 'none' }}>&nbsp;&nbsp;|&nbsp;&nbsp;</div>
                        <div className={"title" + (!this.state.targetClothes ? "" : " selected")} onClick={() => this.setState({ targetClothes : true })} >{t("Vêtements")}</div>
                        <div className="infos">{inventoryStore.targetWeight} / {inventoryStore.targetMaxWeight}</div>
                    </div>
                    )}
                    
                    {inventoryStore.targetMaxWeight > 0 && (
                        <SwitchTransition>
                            <FadeTransition key={this.state.targetClothes ? "lol" : "no"}>
                                <ItemList IsTarget={true} items={this.state.targetClothes ? inventoryStore.targetClothes : inventoryStore.target} eventName="targetInventory" />
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

export default withTranslation('common')(Inventory);