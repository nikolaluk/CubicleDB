const Accessory = require('../models/Accessory');

const create = async function(name,description,imageUrl){
    const accessory = new Accessory({name,description,imageUrl});

    await accessory.save();

    return accessory;
}

exports.create = create;