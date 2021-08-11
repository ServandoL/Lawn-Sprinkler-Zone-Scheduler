// Expressed in inches per hour.
// Using the area inside the sprinkler spacing and the gallons per minute being applied to the area
export function calculatePrecipitationRate(gpm, area) {
    return (96.3 * gpm) / area
}

// Determines the daily average operating time.
// irrigationReq => system irrigaiton requirements in inches per week in teh worst case season
// precipitationRate => precipitation rate in inches per hour
// daysAvail => days available for irrigaiton per week
// 60 => constant conversion factor of 60 min/h
export function calculateOperatingTime(irrigationReq, precipitationRate, daysAvail) {
    return (irrigationReq * 60) / (precipitationRate * daysAvail)
}

// Determines maximum internval allowed between irrigation cycles.
// AWHC => Available Water Holding Capacity, the moisture level in the soil, which is above the plants permanent wilting point, and below the soils field capacity, in inches per foot
// rootZoneDepth => root zone depth in feet
// 12.0 => conversion factor from inches to feet
// MAD => Management Allowable Depletion, MAD of 30-50% will sustain a healthy landscape
// ET_0 => reference evapotranspiration rate, in inches per day
// 30.0 => ET reference is given in inches per month, 30 is a conversion factor for inches for 30 days in a month
// K_c => Crop coefficient, decimal
// export function calculateIrrigationFrequency(AWHC, rootZoneDepth, MAD, ET_0, K_c) {
//     return ((AWHC*12.0) * (rootZoneDepth/12.0) * MAD) / ((ET_0/30.0) * K_c)
// }
export function calculateIrrigationFrequency(waterReq, plantAvailableWater) {
    return waterReq / plantAvailableWater;
}

// Determines the number of minutes required to apply enough water to replace the water lost by evapotranspiration for a specific crop at a particular precipitation rate and efficiency
// 30.0 => ET reference is given in inches per month, 30 is a conversion factor for inches for 30 days in a month
// wateringFreq => watering frequency in days
// efficiency => application efficiency of the system in decimal percent
// export function calculateSprinklerRunTime(wateringFreq, ET_0, K_c, precipitationRate,efficiency) {
//     return (60 * wateringFreq * (ET_0/30.0) * K_c) / (precipitationRate * efficiency)
// }
export function calculateZoneRuneTime(waterReq, irrigationFreq, precipitationRate) {
    return (waterReq / (irrigationFreq * precipitationRate)) * 60.0
}

// Determine the runtime given days to water
export function calculateRestrictedRunTime(waterReq, days, precipitationRate) {
    return (waterReq * 60.0) / (days * precipitationRate)
}

// Predict the plant water requirement for turf grass considering effective rainfall
// adjustmentFactor => Conditions considering factors such as density, shade, sun , slope, wind, etc... 1.0 for normal situations
// avgMonthlyRainfall => average rainfall in the area to be irrgated
// PET => potential evapotranspiration (inches per month)
// 0.67 => as much as 67% of long-term rainfall may be considered effective. Effective rainfall refers to the portion of rainfall that is of benefit to the plants.
export function calculateWaterRequirement(PET, K_c, adjustmentFactor, avgMonthlyRainfall) {
    return (PET * K_c * adjustmentFactor) - (avgMonthlyRainfall * 0.67)
}

export function calculateWaterRequirement_noRain(PET, K_c, adjustmentFactor) {
    return PET * K_c * adjustmentFactor
}

// Determines the amount of water held in teh soil and available to the plant for uptake
// SWHC => soil water-holding capacity
// rootZoneDepth => effective root zone depth
// MAD => Management Allowable Depletion, MAD of 30-50% will sustain a healthy landscape
export function calculatePlantAvailableWater(SWHC, rootZoneDepth, MAD) {
    return SWHC * rootZoneDepth * MAD
}

