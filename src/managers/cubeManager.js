const Cube = require('../models/Cube');

const getAllCubes = async function(search,from,to){
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

const getCubeById = function(id){
    return Cube.findById(id).lean();
} 


const createNewCube = async function(name,description,imageUrl,difficultyLevel){
    const cube = new Cube({name, description, imageUrl, difficultyLevel});

    await cube.save();

    return cube;
}

exports.getAllCubes = getAllCubes;
exports.getCubeById = getCubeById;
exports.createNewCube = createNewCube;