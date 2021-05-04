import * as React from 'react';
import { Component } from 'react';
import { dragStore } from './store/DragStore';
import { observer } from '../node_modules/mobx-react';
import { OptionButton } from './OptionButton';
import { withTranslation } from 'react-i18next';

@observer
class Options extends Component<any, any> {
    constructor(props) {
        super(props)
        this.state = {
            amount : 1
        }

        this.onAmountChange = this.onAmountChange.bind(this);
    }

    componentDidMount() {
        dragStore.amount = this.state.amount
    }

    onAmountChange(e) {
        this.setState({ amount : e.target.value })
        dragStore.amount = e.target.value
    }

    render() {
        const { t } = this.props;

        return (
            <div className="inventory-options">
                <div className="option-panel">
                    <input type="text" className="option-button" value={this.state.amount} onChange={this.onAmountChange} tabIndex={-1}/>
                    <OptionButton name={t("Utiliser")} drop="yes" eventName="useInventory" />
                    <OptionButton name={t("Donner")} drop="yes" eventName="giveInventory" />
                    <OptionButton name={t("Jeter")} drop="yes" eventName="throwInventory" />
                    <OptionButton name={t("Informations")} drop="yes" eventName="infoInventory" />
                    <OptionButton name={t("Renommer")} eventName="renameInventory" />
                </div>
            </div>
        )
    }
}

export default withTranslation('common')(Options);