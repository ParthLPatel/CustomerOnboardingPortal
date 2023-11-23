const occupationMapping = {
    "Agriculture/Forestry/Mining":[
        "Administrator",
        "Farmer (crop)",
        "Farmer (livestock)",
        "Fisheries Employee",
        "Forestry Employee",
        "Horticultruralist",
        "Landscaper",
        "Logger",
        "Metals Processing Worker",
        "Mining - Labourer",
        "Pulp and Paer Processing Worker",
        "Trapper/Hunter"
    ],
    "Arts & Entertainment & Media":[
        "Actor",
        "Agent",
        "Amusement Park Employee",
        "Arcade Employee",
        "Artist",
        "Athlete",
        "Author",
        "Broadcaster",
        "Coach",
        "Designer",
        "Editor",
        "Event Planner",
        "Executive",
        "Fitness Trainer",
        "IT Professional",
        "Journalist",
        "Manager",
        "Marketing/Sales"
    ],
    "Technology":[
        "Administrator",
        "Computer Prorammer/Developer",
        "Engineer",
        "Executive",
        "IT Professional",
        "Manager",
        "Marketing/Sales",
        "Web Designer"
    ]
}

const getIndustries = ()=>{
    return Object.keys(occupationMapping);
}

const getOccupations = industry=>{
    return occupationMapping[industry];
}

module.exports = {getIndustries,getOccupations}