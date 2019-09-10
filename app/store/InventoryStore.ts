import { observable } from "../../node_modules/mobx";

class InventoryStore {
    @observable
    public pockets: any[] = [
        {
            name: 'Batte de baseball',
            desc: 'Une batte de baseball, rien de plus',
            qty: 777,
            icon: 'bat'
        },
        {
            label: '!',
            labelColor: 'rgb(114, 196, 67)',
            name: 'Hamburger',
            desc: 'Un magnifique hamburger cuisiné de la main du grand maître Utopic',
            qty: 1,
            icon: 'burger'
        },
        {  label: 3, labelColor: 'red', name: '7.62mm', desc: 'Ce qui va bientôt terminer dans le crâne de Jefferson Parker', qty: 1, icon: 'bullet' },
        {
            name: 'item test',
            desc: 'Un simple carton pour remplir un vide',
            qty: 1
        },
        { name: 'Album de Skartiz', desc: 'Retrouvez un condensé de tous les meilleurs hits 2017-2019 de ton rappeur préféré SKARTIZ.', qty: 1, icon: 'music' },
        { name: 'Radio', desc: 'Une radio pour diffuser votre voix sur d\'autres fréquences', icon: 'radio', qty: 1 }
    ]

    @observable
    public target: any[] = [
        { name: 'Album de Skartiz', desc: 'Retrouvez un condensé de tous les meilleurs hits 2017-2019 de ton rappeur préféré SKARTIZ.', qty: 1, icon: 'music' },
        { name: 'Objet', desc: 'Un simple objet.', qty: 1 },
        { name: 'Vêtement', desc: 'Une belle chemise bleue.', qty: 1, icon: 'shirt' },
        { name: 'Pantalon', desc: 'Un magnifique jean slim noir.', qty: 10, icon: 'jean' },
        { name: 'Masque', desc: 'Un masque classique acheté à Vespucci Beach.', qty: 1, icon: 'mask' },
        { name: 'Menotte', desc: 'Des menottes cool.', qty: 1, icon: 'cuff' },
        { name: 'Radio', desc: 'Une radio pour diffuser votre voix sur d\'autres fréquences', icon: 'radio', qty: 1 }
    ]

    @observable
    public pocketsWeight: Number = 0;

    @observable
    public targetWeight: Number = 0;

    @observable
    public targetMaxWeight: Number = -1;

    public Reset() {
        this.pockets = []
        this.target = []
        this.pocketsWeight = 0
        this.targetWeight = 0
        this.targetMaxWeight = 0
    }

    public Create(inventoryData) {
        this.Reset()

        if (inventoryData.inv) {
            this.pockets = inventoryData.inv
            this.pocketsWeight = inventoryData.pocketsWeight
        }
        
        if (inventoryData.target) {
            this.target = inventoryData.target
            this.targetWeight = inventoryData.targetWeight
            this.targetMaxWeight = inventoryData.targetMaxWeight
        }
    }
}

export const inventoryStore = new InventoryStore()