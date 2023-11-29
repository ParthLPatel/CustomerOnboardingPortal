const citiesMapping = {
    "British Columbia": ["Vancouver", "Victoria", "Surrey", "Burnaby"],
    "Alberta": ["Calgary", "Edmonton", "Red Deer", "Lethbridge"],
    "Saskatchewan": ["Saskatoon", "Regina", "Prince Albert", "Moose Jaw"],
    "Manitoba": ["Winnipeg", "Brandon", "Thompson", "Portage la Prairie"],
    "Ontario": ["Toronto", "Ottawa", "Mississauga", "Hamilton"],
    "Quebec": ["Montreal", "Quebec City", "Laval", "Gatineau"],
    "New Brunswick": ["Fredericton", "Saint John", "Moncton", "Miramichi"],
    "Nova Scotia": ["Halifax", "Dartmouth", "Sydney", "Truro"],
    "Prince Edward Island": ["Charlottetown", "Summerside", "Stratford"],
    "Newfoundland": ["St. John's", "Mount Pearl", "Corner Brook", "Conception Bay South"],
    "Northwest Territories": ["Yellowknife", "Inuvik", "Hay River", "Fort Smith"],
    "Nunavut": ["Iqaluit", "Rankin Inlet", "Arviat", "Baker Lake"],
    "Yukon": ["Whitehorse", "Dawson City", "Watson Lake", "Carmacks"],
}

const getProvinces = () => {
    return Object.keys(citiesMapping);
}

const getCities = province => {
    return citiesMapping[province];
}

module.exports = { getProvinces, getCities }