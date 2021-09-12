
class DiskBlock {
    /**
     * Abstraction of disk block
     */
    constructor(){
        this._buffer = "";
        this._isParityBlock = false;
    }

    /**
     * 
     * @returns block buffer
     */
    getBuffer() {
        return this._buffer;
    }

    /**
     * 
     * @returns block parity (is a parity block or not)
     */
    getParity(){
        return this._isParityBlock;
    }

    /**
     * write data to disk block and whether it is a parity block or not
     * @param {*string the data to write to the block} data 
     * @param {*boolean whether the block is for parity or not} isParityBlock 
     */
     write(data, isParityBlock) {
        this._buffer = data;
        this._isParityBlock = isParityBlock;
    }
}

module.exports = DiskBlock;