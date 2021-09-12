/**
 * tests for StorageCenter
 */

const StorageCenter = require('./StorageCenter');

test('should return empty array when no disks', ()=>{
    let storageCenter1 = new StorageCenter(0, 0);
    let storageCenter2 = new StorageCenter(0, 10);

    expect(storageCenter1.buildStorageCenterStructure()).toEqual([]);
    expect(storageCenter2.buildStorageCenterStructure()).toEqual([]);
});

test('should only contain disks when no disk blocks', ()=>{
    let storageCenter1 = new StorageCenter(5, 0);
    let storageCenter2 = new StorageCenter(1, 0);
    let storageCenter3 = new StorageCenter(10, 0);
    
    let structure1 = [
        {disk: "Disk 0", blocks: []},
        {disk: "Disk 1", blocks: []},
        {disk: "Disk 2", blocks: []},
        {disk: "Disk 3", blocks: []},
        {disk: "Disk 4", blocks: []}
    ];
    let structure2 = [
        {disk: "Disk 0", blocks: []},
    ];
    let structure3 = [
        {disk: "Disk 0", blocks: []},
        {disk: "Disk 1", blocks: []},
        {disk: "Disk 2", blocks: []},
        {disk: "Disk 3", blocks: []},
        {disk: "Disk 4", blocks: []},
        {disk: "Disk 5", blocks: []},
        {disk: "Disk 6", blocks: []},
        {disk: "Disk 7", blocks: []},
        {disk: "Disk 8", blocks: []},
        {disk: "Disk 9", blocks: []},
    ];

    expect(storageCenter1.buildStorageCenterStructure()).toEqual(structure1);
    expect(storageCenter2.buildStorageCenterStructure()).toEqual(structure2);
    expect(storageCenter3.buildStorageCenterStructure()).toEqual(structure3);
});

test('should return expected structure', ()=>{
    let storageCenter1 = new StorageCenter(3, 3);
    let storageCenter2 = new StorageCenter(5, 3);

    let structure1 = [
        {disk: "Disk 0", blocks: [{data: "Block A", parity: false}, {data: "Block C + D", parity: true}, {data: "Block E", parity: false}]},
        {disk: "Disk 1", blocks: [{data: "Block B", parity: false}, {data: "Block C", parity: false}, {data: "Block E + F", parity: true}]},
        {disk: "Disk 2", blocks: [{data: "Block A + B", parity: true}, {data: "Block D", parity: false}, {data: "Block F", parity: false}]}
    ];

    let structure2 = [
        {disk: "Disk 0", blocks: [{data: "Block A", parity: false}, {data: "Block E + F + G + H", parity: true}, {data: "Block I", parity: false}]},
        {disk: "Disk 1", blocks: [{data: "Block B", parity: false}, {data: "Block E", parity: false}, {data: "Block I + J + K + L", parity: true}]},
        {disk: "Disk 2", blocks: [{data: "Block C", parity: false}, {data: "Block F", parity: false}, {data: "Block J", parity: false}]},
        {disk: "Disk 3", blocks: [{data: "Block D", parity: false}, {data: "Block G", parity: false}, {data: "Block K", parity: false}]},
        {disk: "Disk 4", blocks: [{data: "Block A + B + C + D", parity: true}, {data: "Block H", parity: false}, {data: "Block L", parity: false}]},
    ];

    expect(storageCenter1.buildStorageCenterStructure()).toEqual(structure1);
    expect(storageCenter2.buildStorageCenterStructure()).toEqual(structure2);
});
