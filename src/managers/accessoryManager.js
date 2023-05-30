const Accessory = require('../models/Accessory');

const getAll = async function(){
    let accessories = await Accessory.find().lean();

    return accessories;
}

const getOthers = function(accessoryIds){
    return Accessory.find({_id: {$nin: accessoryIds}}).lean();
}

const create = async function(name,description,imageUrl){
    const accessory = new Accessory({name,description,imageUrl});

    return accessory.save();
}

exports.getAll = getAll;
exports.getOthers = getOthers;
exports.create = create;
