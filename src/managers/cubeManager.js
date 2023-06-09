const Cube = require('../models/Cube');

const getAll = async function (search, from, to) {
    let cubes = await Cube.find().lean();

    if (search) {
        cubes = cubes.filter(cube => cube.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (from) {
        cubes = cubes.filter(cube => cube.difficultyLevel >= from);
    }
    if (to) {
        cubes = cubes.filter(cube => cube.difficultyLevel <= to);
    }

    return cubes;
}

const getById = function (id) {
    return Cube.findById(id).populate('accessories').lean();
}

const updateById = function (id, cubeData) {
    return Cube.findByIdAndUpdate(id, cubeData);
}

const create = function (name, description, imageUrl, difficultyLevel, owner) {
    const cube = new Cube({ name, description, imageUrl, difficultyLevel, owner });

    return cube.save();
}

const deleteById = function (id){
    return Cube.findByIdAndDelete(id);
}

const attachAccessory = function (cubeId, accessory) {
    return Cube.findByIdAndUpdate(cubeId, { $push: { accessories: accessory } });
}

exports.getAll = getAll;
exports.getById = getById;
exports.updateById = updateById;
exports.create = create;
exports.deleteById = deleteById;
exports.attachAccessory = attachAccessory;