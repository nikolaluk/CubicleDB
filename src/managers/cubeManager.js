const Cube = require('../models/Cube');

const getAll = async function(search,from,to){
    let cubes = await Cube.find().lean();

    if(search){
        cubes = cubes.filter(cube => cube.name.toLowerCase().includes(search.toLowerCase()));
    }
    if(from){
        cubes = cubes.filter(cube => cube.difficultyLevel >= from);
    }
    if(to){
        cubes = cubes.filter(cube => cube.difficultyLevel <= to);
    }

    return cubes;
}

const getById = function(id){
    return Cube.findById(id).populate('accessories').lean();
} 


const create = async function(name,description,imageUrl,difficultyLevel){
    const cube = new Cube({name, description, imageUrl, difficultyLevel});

    return cube.save();
}

const attachAccessory = function(cubeId, accessory){
    return Cube.findByIdAndUpdate(cubeId, {$push: {accessories:accessory}});
}

exports.getAll = getAll;
exports.getById = getById;
exports.create = create;
exports.attachAccessory = attachAccessory;