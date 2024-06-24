export function generateCriminalLocation(locations) {
    if (locations.length === 0) throw new Error("No location provided");

    const totalLocations = locations.length;
    const locationIndex = Math.floor(Math.random() * totalLocations);

    return locations[locationIndex];
}

export function searchCriminal(criminalLocation, copsSearchLocations) {

    console.log(copsSearchLocations)

    for (let copSearchLocation of copsSearchLocations) {

        const { city, cop, vehicle } = copSearchLocation;

        if ((criminalLocation.name === city.name)) {

            if ((vehicle.range >= city.distance * 2)) {
                return {
                    success: true,
                    message: `Hurray!, Criminal found by cop ${cop.name} in ${city.name}`,
                    copSearchLocation,
                    criminalLocation
                }
            }

            return {
                success: true,
                message: `Oops!, Criminal was found by cop ${cop.name} in ${city.name}, but unable to bring due to less range of ${vehicle.name}`,
                copSearchLocation,
                criminalLocation
            }

        }
        continue;
    }

    return {
        success: false,
        message: `Oops!, Criminal was hiding in ${criminalLocation.name}`,
        criminalLocation,
        copsSearchLocations
    }

}




