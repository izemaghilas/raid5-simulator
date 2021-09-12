const Disk = require('./Disk');

class Controller {
    /**
     * Abstraction of storage space controller
     * @param {*number number of disks the controller maintain} numberOfDisks 
     * @param {* number number of blocks in each disk} numberOfBlocks 
     */
    constructor(numberOfDisks, numberOfBlocks){
        if(numberOfDisks > 0){
            this._disks = this._createDisks(numberOfDisks, numberOfBlocks);
        }
        else{
            this._disks = [];
        }
    }

    /**
     * 
     * @param {*number number of disks the controller maintain} numberOfDisks 
     * @param {*number number of blocks in each disk} numberOfBlocks 
     * @returns created disks
     */
    _createDisks(numberOfDisks, numberOfBlocks) {
        let disks = [];
        for(let i=0; i<numberOfDisks; i++){
            disks.push(new Disk(numberOfBlocks));
        }
        return disks;
    }

    /**
     * 
     * @returns the contoller maintained disks
     */
    getDisks(){
        return this._disks;
    }

    /**
     * write data to disks, by default write letters
     * 
     * if no disks exit.
     *  
     * check if there is only one disk, 
     * if so, write "Block" in each disk block.
     * 
     * else, Set a "parityBlockIndex" to know which block is the parity block 
     * and a "temporaryBuffer" to be able to define parity block data.
     * 
     * iterate over each disk and write "Block"+letter, 
     * expect for parity block data which will be defined from data on temporayBuffer
     * 
     * @param {*number number of blocks in each disk} numberOfBlocks 
     */
    write(numberOfBlocks) {

        // if no disks exit
        if(this._disks.length === 0){
            return;
        }

        // letters to write
        const dataToWrite = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        if(this._disks.length === 1){
            this._disks[0].getBlocks().forEach(block=>{
                block.write("Block", false);
            });
        }
        else{
            /***
             * for parity block
             * first set it to first block of the last disk
             * than increment indexes => if last disk: diskIndex=0 else disk: diskIndex+=1, blockIndex will always be incerement by one
             */
            let parityBlockIndex = {
                diskIndex: this._disks.length-1,
                blockIndex: 0
            };

            // temporary store written data in non parity blocks
            let temporaryBuffer = [];

            let dataToWriteIndex = 0;
            let blockIndex = 0;

            while(blockIndex < numberOfBlocks){
                // write data to each disk block
                for(let i=0; i<this._disks.length; i++){
                    let disk = this._disks[i];
                    if(i !== parityBlockIndex.diskIndex){
                        disk.getBlocks()[blockIndex].write("Block "+dataToWrite[dataToWriteIndex], false);
                        temporaryBuffer.push(dataToWrite[dataToWriteIndex]);

                        //increment index on dataToWrite
                        if(dataToWriteIndex === dataToWrite.length-1){
                            dataToWriteIndex=0;
                        }
                        else{
                            dataToWriteIndex+=1;
                        }
                    }
                }
                // write parity block data
                let parityBlock = this._disks[parityBlockIndex.diskIndex].getBlocks()[blockIndex];
                parityBlock.write("Block "+temporaryBuffer.join(' + '), true);
                temporaryBuffer = [];

                //increment parity block index
                if(parityBlockIndex.diskIndex === this._disks.length-1){
                    parityBlockIndex.diskIndex = 0;
                    parityBlockIndex.blockIndex +=1; 
                }
                else{
                    parityBlockIndex.diskIndex += 1;
                    parityBlockIndex.blockIndex +=1;
                }

                blockIndex+=1;
            }
        }
    }
}


module.exports = Controller;