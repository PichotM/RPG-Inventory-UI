import { observable } from "../../node_modules/mobx";

class InventoryStore {
    @observable
    public pockets: any[] = [
        { name : "Argent" },
        { name : "Argent sale" }
    ]

    @observable
    public clothes: any[] = []

    @observable
    public target: any[] = [
        { name : "Argent" },
    ]

    @observable
    public pocketsWeight: Number = 0;

    @observable
    public targetWeight: Number = 0;

    @observable
    public targetMaxWeight: Number = process.env.NODE_ENV == 'production' ? -1 : 1;

    @observable
    public weaponOne: any;
    public weaponTwo: any;
    public weaponThree: any;

    @observable
    public targetClothes: Object = [];

    @observable
    public inventoryVisible: boolean = process.env.NODE_ENV == 'development';

    private sortObject(obj) {
        return obj.sort(function(a, b) {
            if(a.name < b.name) { return -1; }
            if(a.name > b.name) { return 1; }
            return 0;
        })
    }

    public Reset() {
        this.pockets = []
        this.clothes = []

        this.target = []
        this.targetClothes = []

        this.weaponOne = null;
        this.weaponTwo = null;
        this.weaponThree = null;

        this.pocketsWeight = 0
        this.targetWeight = 0
        this.targetMaxWeight = -1
    }

    public Create(inventoryData, boolUpdate) {
        if (!boolUpdate)
            this.Reset()

        if (inventoryData.weaponOne)
            this.weaponOne = inventoryData.weaponOne;

        if (inventoryData.weaponTwo)
            this.weaponTwo = inventoryData.weaponTwo;

        if (inventoryData.weaponThree)
            this.weaponThree = inventoryData.weaponThree;

        if (inventoryData.inv) {
            this.pockets = inventoryData.inv
            this.pockets = this.sortObject(this.pockets);

            this.pocketsWeight = inventoryData.pocketsWeight

            this.clothes = inventoryData.clothes
            this.clothes = this.sortObject(this.clothes);
        }
        
        if (inventoryData.target) {
            this.target = inventoryData.target
            this.target = this.sortObject(this.target);

            this.targetClothes = inventoryData.targetClothes
            this.targetClothes = this.sortObject(this.targetClothes);

            this.targetWeight = inventoryData.targetWeight
        }

        if (this.targetMaxWeight)
            this.targetMaxWeight = inventoryData.targetMaxWeight
    }

    public Hide() {
        this.Reset()
        this.inventoryVisible = false
                
        fetch(`http://gtalife/hideInventory`, { method: 'POST', body: "{}" })
    }
}

export const inventoryStore = new InventoryStore()