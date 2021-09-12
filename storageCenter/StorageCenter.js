const Controller = require("./Controller");

class StorageCenter {
    /**
     * Abstraction of storage center
     * @param {*number number of disks} numberOfDisks 
     * @param {*number number of blocks in each disk} numberOfBlocks 
     */
    constructor(numberOfDisks, numberOfBlocks) {
        this._controller = new Controller(numberOfDisks, numberOfBlocks);
        this._controller.write(numberOfBlocks);
    }
    
    /**
     * build storage center structure
     * @returns storage center structure => [ { disk: "", blocks: [{data: "", parity: true | false}] }, ... ]
     */
    buildStorageCenterStructure(){
        let structure = [];
        let disks = this._controller.getDisks();

        disks.forEach((disk, index)=>{
            let blocks = [];
            disk.getBlocks().forEach((block)=>{
                blocks.push({
                    data: block.getBuffer(),
                    parity: block.getParity()
                });
            })
            structure.push({
                disk: "Disk "+index,
                blocks: blocks
            });
        })

        return structure;
    }
}

module.exports = StorageCenter;