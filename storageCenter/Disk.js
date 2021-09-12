const DiskBlock = require('./DiskBlock');

class Disk {
    /**
     * Abstraction of disk
     * @param {*number number of blocks in disk} numberOfBlocks 
     */
    constructor(numberOfBlocks){
        if(numberOfBlocks > 0){
            this._blocks = this._createBlocks(numberOfBlocks);
        }
        else{
            this._blocks = [];
        }
    }

    /**
     * create blocks in disk
     * @param {*number number of blocks in disk} numberOfBlocks 
     */
    _createBlocks(numberOfBlocks){
        let blocks = []
        for(let i=0; i<numberOfBlocks; i++){
            blocks.push(new DiskBlock());
        }
        return blocks;
    }

    /**
     * 
     * @returns disk blocks
     */
    getBlocks() {
        return this._blocks;
    }
}

module.exports = Disk;