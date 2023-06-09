exports.SECRET = 'donttellanybody';

exports.generateOptions = (difficultyLevel) => {
    const titles = [
        "Very Easy",
        "Easy",
        "Medium (Standard 3x3)",
        "Intermediate",
        "Expert",
        "Hardcore"
    ];

    const options = titles.map((title,index) => ({
        title: `${index + 1} - ${title}`,
        value: index + 1,
        selected: index+1 == difficultyLevel,
    }));

    return options;
}
