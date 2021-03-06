import React, { useState, useLayoutEffect } from "react";
import { Text, ScrollView, StyleSheet, TextInput, View, Button, SectionList } from "react-native";
import { calculatePrecipitationRate, calculateWaterRequirement_noRain, calculatePlantAvailableWater, calculateWaterRequirement, calculateIrrigationFrequency, calculateZoneRunTime, calculateRestrictedRunTime, calculateIrrigationFrequency_intervals } from "../js/formulas";
import monthlyRainfallData from "../api/texasMonthlyRain.json";
import soilData from "../api/soilData.json";

const CreateSchedule = ({ route, navigation }) => {

    let {
        zoneName,
        zoneType,
        days,
        sprayType,
        soilType,
        sunExposure,
        city,
        slope,
        area,
        rainfall,
        awhc,
        rootDepth,
        allowableDepletion,
        efficiency,
        cropCoefficient,
        precipitationRate,
        gpm
    } = route.params;

    /*
        zoneType: Array
        zoneType[0] = name
        zoneType[1] = CropCoefficient
        zoneType[2] = MaximumRootDepth

        soilType: Array
        soilType[0] = type
        soilType[1] = SoilWaterHoldingCapacity or awhc
        soilType[2] = PlantAvailableWater
        soilType[3] = InfiltrationRate: Object
            {
                flat_slope
                slight_slope
                moderate_slope
                steep_slope
            }
        
        city: Array
        city[0]: city name
        city[1-12]: months Jan-Dec
    */

    zoneType = {
        name: zoneType[0],
        cropCoefficient: zoneType[1],
        maxRootDepth: zoneType[2]
    }

    soilType = {
        type: soilType[0],
        awhc: soilType[1],
        plantAvailableWater: soilType[2],
        infiltrationRate: soilType[3]
    }

    city = {
        name: city[0],
        jan: city[1],
        feb: city[2],
        mar: city[3],
        apr: city[4],
        may: city[5],
        jun: city[6],
        jul: city[7],
        aug: city[8],
        sep: city[9],
        oct: city[10],
        nov: city[11],
        dec: city[12]
    }

    let infiltrationRate = parseFloat(soilType["infiltrationRate"].flat_slope)
    if (!zoneName) {
        zoneName = "Zone 1";
    }
    if (!precipitationRate) {
        if (sprayType === "fixed spray head") {
            precipitationRate = 1.5;
        } else if (sprayType === "rotor head") {
            precipitationRate = 0.8;
        } else if (sprayType === "rotary nozzle") {
            precipitationRate = 0.4;
        } else {
            precipitationRate = 0.5;
        }
    } else {
        precipitationRate = parseFloat(precipitationRate);
    }
    // calculate precipitation rate if area and gpm are given by user
    if (area && gpm) {
        precipitationRate = calculatePrecipitationRate(parseFloat(gpm), parseFloat(area));
    }

    // calculate adjustment factor based on sun exposure and slope
    let adjustmentFactor = 1;
    if (sunExposure === "lots of sun") {
        if (slope === "steep") {
            adjustmentFactor = 1.5
            infiltrationRate = parseFloat(soilType["infiltrationRate"].steep_slope)
        } else if (slope === "moderate") {
            adjustmentFactor = 1.3
            infiltrationRate = parseFloat(soilType["infiltrationRate"].moderate_slope)
        } else if (slope === "slight") {
            adjustmentFactor = 1.2
            infiltrationRate = parseFloat(soilType["infiltrationRate"].slight_slope)
        } else {
            adjustmentFactor = 1.0
        }
    } else if (sunExposure === "some shade") {
        if (slope === "steep") {
            adjustmentFactor = 1.1
            infiltrationRate = parseFloat(soilType["infiltrationRate"].steep_slope)
        } else if (slope === "moderate") {
            adjustmentFactor = 1
            infiltrationRate = parseFloat(soilType["infiltrationRate"].moderate_slope)
        } else if (slope === "slight") {
            adjustmentFactor = 0.9
            infiltrationRate = parseFloat(soilType["infiltrationRate"].slight_slope)
        } else {
            adjustmentFactor = 0.8
        }
    } else if (sunExposure === "lots of shade") {
        if (slope === "steep") {
            adjustmentFactor = 1
            infiltrationRate = parseFloat(soilType["infiltrationRate"].steep_slope)
        } else if (slope === "moderate") {
            adjustmentFactor = 0.8
            infiltrationRate = parseFloat(soilType["infiltrationRate"].moderate_slope)
        } else if (slope === "slight") {
            adjustmentFactor = 0.7
            infiltrationRate = parseFloat(soilType["infiltrationRate"].slight_slope)
        } else {
            adjustmentFactor = 0.7
        }
    } else { // mostly shade
        if (slope === "steep") {
            adjustmentFactor = 1
            infiltrationRate = parseFloat(soilType["infiltrationRate"].steep_slope)
        } else if (slope === "moderate") {
            adjustmentFactor = 0.7
            infiltrationRate = parseFloat(soilType["infiltrationRate"].moderate_slope)
        } else if (slope === "slight") {
            adjustmentFactor = 0.6
            infiltrationRate = parseFloat(soilType["infiltrationRate"].slight_slope)
        } else {
            adjustmentFactor = 0.5
        }
    }

    if (!allowableDepletion) {
        allowableDepletion = 0.5; // 0.5 or 50% is nominal
    } else {
        allowableDepletion = parseFloat(allowableDepletion);
    }

    if (!rootDepth) {
        rootDepth = parseFloat(zoneType.maxRootDepth);
    } else {
        rootDepth = parseFloat(rootDepth);
    }

    if (!awhc) {
        awhc = parseFloat(soilType.awhc);
    } else {
        awhc = parseFloat(awhc);
    }

    let plantAvailableWater = calculatePlantAvailableWater(awhc, rootDepth, allowableDepletion);
    let irrigationFreq = {}
    let irrigationRunTime = {}
    let monthlyRainfall = {}
    let weeklyPlantRequirement = {}

    // Get avg monthly rainfall based on the selected city
    Object.keys(monthlyRainfallData).forEach(key => {
        if (monthlyRainfallData[key].City === city.name) {
            monthlyRainfall = monthlyRainfallData[key];
        }
    });

    // Calculate plant water requirement, in inches per week, considering monthly rainfall otherwise calculate it without considering monthly rainfall
    if (rainfall === "yes") {
        Object.keys(city).forEach(key => {
            if (key !== "name") {
                let monthlyPET = city[key];
                if (!cropCoefficient) {
                    cropCoefficient = zoneType.cropCoefficient;
                } else {
                    cropCoefficient = parseFloat(cropCoefficient);
                }
                let plantReq = calculateWaterRequirement(monthlyPET, cropCoefficient, adjustmentFactor, monthlyRainfall[key]);
                if (plantReq < 0) {
                    plantReq = 0
                }
                weeklyPlantRequirement[key] = plantReq / 4; // divide by 4 to get inches per week
            }
        });
    } else {
        Object.keys(city).forEach(key => {
            if (key !== "name") {
                let monthlyPET = city[key];
                if (!cropCoefficient) {
                    cropCoefficient = zoneType.cropCoefficient;
                } else {
                    cropCoefficient = parseFloat(cropCoefficient);
                }
                let plantReq = calculateWaterRequirement_noRain(monthlyPET, cropCoefficient, adjustmentFactor);
                weeklyPlantRequirement[key] = plantReq / 4; // divide by 4 to get inches per week
            }
        });
    }

    // calculate irrigation frequency
    if (days) {
        Object.keys(weeklyPlantRequirement).forEach(key => {
            let freq = Math.ceil(calculateIrrigationFrequency(weeklyPlantRequirement[key], plantAvailableWater))
            irrigationFreq[key] = freq;
            });
    } else {
        Object.keys(city).forEach(key => {
            if (key !== "name") {
                let dailyPET = city[key]/30.0;    // et rates is given in inches per month - dividing by 30 to get inches per day
                if (!cropCoefficient) {
                    cropCoefficient = zoneType.cropCoefficient;
                } else {
                    cropCoefficient = parseFloat(cropCoefficient);
                }
                let freq = Math.floor(calculateIrrigationFrequency_intervals(awhc*12.0, rootDepth/12.0, allowableDepletion, dailyPET, cropCoefficient))
                irrigationFreq[key] = freq;
            }
        });
    }
    

    // calculate run time given days to water
    if (days) {
        Object.keys(weeklyPlantRequirement).forEach(key => {
            let runTime = Math.ceil(calculateRestrictedRunTime(weeklyPlantRequirement[key], days, precipitationRate))
            irrigationRunTime[key] = runTime;
        })
    } else {
        // calculate zone run time without days to water given
        Object.keys(irrigationFreq).forEach(key => {
            // let runTime = Math.ceil(calculateZoneRuneTime(weeklyPlantRequirement[key], irrigationFreq[key], precipitationRate));
            let dailyPET = city[key]/30.0;
            if (!cropCoefficient) {
                cropCoefficient = zoneType.cropCoefficient;
            } else {
                cropCoefficient = parseFloat(cropCoefficient);
            }
            if (!efficiency) {
                efficiency = 0.6;
            } else {
                efficiency = parseFloat(efficiency);
            }
            let runTime = Math.ceil(calculateZoneRunTime(irrigationFreq[key], dailyPET, cropCoefficient, precipitationRate, efficiency))
            if (runTime === NaN) {
                runTime = 1;
            } else if (runTime === Infinity) {
                runTime = 1;
            }
            irrigationRunTime[key] = runTime;
        });
    }

    let DATA = [];
    if (days) {
        Object.keys(irrigationFreq).forEach(key => {
            let element = {};
            element.title = key;
            element.data = [
                "Plant water requirement: " + weeklyPlantRequirement[key].toFixed(2) + " in/week",
                "Minutes per day: " + irrigationRunTime[key] + " minutes per day",
                "Days to water: " + days + " day(s) a week",
            ]
            DATA.push(element);
        })
    } else {
        Object.keys(irrigationFreq).forEach(key => {
            let element = {};
            element.title = key;
            element.data = [
                "Plant water requirement: " + weeklyPlantRequirement[key].toFixed(2) + " in/week",
                "Minutes per run: " + irrigationRunTime[key] + " minutes",
                "Maximum days to skip: " + irrigationFreq[key] + " day(s)",
                
            ]
            DATA.push(element);
        })
    }


    // Renders
    const Item = ({ title }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
          <SectionList
            ListHeaderComponent={
                <View>
                    <View style={styles.textWrap}>
                        {
                            rainfall === "yes" ?
                                <Text style={styles.heading}>Zone run time in {city.name}, TX considering average monthly rainfall</Text> :
                                <Text style={styles.heading}>Zone run time in {city.name}, TX not considering average monthly rainfall</Text>
                        }
                    </View>
                    <View style={styles.textWrap}>
                        {
                            gpm ?
                                <Text style={styles.baseText}>{zoneName} @ {gpm} gpm and {precipitationRate.toFixed(2)} inches of water per hour</Text> :
                                <Text style={styles.baseText}>{zoneName} @ {precipitationRate.toFixed(2)} inches of water per hour</Text>
                        }
                    </View>
                    <View style={styles.textWrap}>
                        <Text style={styles.baseText}>Landscape: {zoneType.name}</Text>

                    </View>
                    <View style={styles.textWrap}>
                        <Text style={styles.baseText}>Spray type: {sprayType}</Text>

                    </View>
                        <Text style={styles.baseText}>Soil type: {soilType.type}</Text>

                </View>
            }
            ListFooterComponent={
                <View style={styles.footer}>
                    <Text style={styles.baseText}>Developed by Servando</Text>
                    <Text style={styles.baseText}>Version 1.0.0</Text>
                </View>
            }
            sections={DATA}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => <Item title={item} />}
            renderSectionHeader={({ section: { title } }) => (
                <View style={styles.sectionWrap}>
                    <Text style={styles.header}>{title.toUpperCase()}</Text>
                </View>
            )}
        />  
        </View>
        
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16,
        marginBottom: 16,
        marginTop: 16,
        backgroundColor: "#f4f7f0"
    },
    footer: {
        padding: 50,
        alignItems: "center",
        backgroundColor: "#f4f7f0"
    },
    textWrap: {
        borderBottomWidth: 2,
        borderBottomColor: "black"
    },
    baseText: {
        fontSize: 16,
        margin: 5
    },
    sectionWrap: {
        borderTopColor: "black",
        borderBottomColor: "black",
        borderTopWidth: 2,
        borderBottomWidth: 2,
        margin: 10
    },
    heading: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10
    },
    item: {
        backgroundColor: "#bfd2d0",
        color: "white",
        padding: 15,
        margin: 10,
    },
    header: {
        fontSize: 20,
    },
    title: {
        fontSize: 16,
    },
    BtnWrap: {
        flex: 1,
        backgroundColor: "#282c34",
        margin: 5,
        height: 50,
        padding: 5
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderColor: "#282c34",
        borderRadius: 4,
        color: "black",
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: "purple",
        borderRadius: 4,
        color: "black",
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});

export default CreateSchedule;