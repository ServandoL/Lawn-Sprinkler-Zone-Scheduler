import React, { useState } from "react";
import { Text, ScrollView, StyleSheet, TextInput, View, Button, Platform } from "react-native";
import RNPickerSelect from "react-native-picker-select";

const AdvancedSettings = ({ route, navigation }) => {

    const { zoneName, zoneType, days, sprayType, soilType, sunExposure, city, slope } = route.params;

    const [area, setArea] = useState(undefined);
    const [rainfall, setRainfall] = useState(undefined);
    const [awhc, setAwhc] = useState(undefined);
    const [rootDepth, setRootDepth] = useState(undefined);
    const [allowableDepletion, setAllowableDepletion] = useState(undefined);
    const [efficiency, setEfficiency] = useState(undefined);
    const [cropCoefficient, setCropCoefficient] = useState(undefined);
    const [precipitationRate, setPrecipitationRate] = useState(undefined);
    const [gpm, setGpm] = useState(undefined);
    return (
        <ScrollView style={styles.container}>
            <View style={styles.WrapBasic}>
                <Text style={styles.heading}>Advanced Settings</Text>
                <View style={styles.FormGroup}>
                    <Text style={styles.FormLabel}>Area (sq/ft)</Text>
                    <TextInput
                        style={styles.FormControl}
                        onChangeText={setArea}
                        value={area}
                        placeholder="Enter area"
                    />
                </View>
                <View style={styles.FormGroup}>
                    <Text style={styles.FormLabel}>Consider monthly rainfall?</Text>
                    <RNPickerSelect
                        style={pickerSelectStyles}
                        onValueChange={setRainfall}
                        items={[
                            {label: "Yes", value:"yes"},
                            {label: "no", value:"no"}
                        ]}
                    />
                </View>
                <View style={styles.FormGroup}>
                    <Text style={styles.FormLabel}>Available Water Holding Capacity (in/in)</Text>
                    <TextInput
                        style={styles.FormControl}
                        onChangeText={setAwhc}
                        value={awhc}
                        placeholder="ex: 0.18"
                    />
                </View>
                <View style={styles.FormGroup}>
                    <Text style={styles.FormLabel}>Root Depth (inches)</Text>
                    <TextInput
                        style={styles.FormControl}
                        onChangeText={setRootDepth}
                        value={rootDepth}
                        placeholder="root depth in inches"
                    />
                </View>
                <View style={styles.FormGroup}>
                    <Text style={styles.FormLabel}>Allowable Depletion (decimal percent)</Text>
                    <TextInput
                        style={styles.FormControl}
                        onChangeText={setAllowableDepletion}
                        value={allowableDepletion}
                        placeholder="ex: 0.5"
                    />
                </View>
                <View style={styles.FormGroup}>
                    <Text style={styles.FormLabel}>System Efficiency (decimal percent)</Text>
                    <TextInput
                        style={styles.FormControl}
                        onChangeText={setEfficiency}
                        value={efficiency}
                        placeholder="ex: 0.8"
                    />
                </View>
                <View style={styles.FormGroup}>
                    <Text style={styles.FormLabel}>Crop Coefficient (decimal)</Text>
                    <TextInput
                        style={styles.FormControl}
                        onChangeText={setCropCoefficient}
                        value={cropCoefficient}
                        placeholder="decimal less than 1, more than 0"
                    />
                </View>
                <View style={styles.FormGroup}>
                    <Text style={styles.FormLabel}>Precipitation Rate (in/hr)</Text>
                    <TextInput
                        style={styles.FormControl}
                        onChangeText={setPrecipitationRate}
                        value={precipitationRate}
                        placeholder="ex: 0.89"
                    />
                </View>
                <View style={styles.FormGroup}>
                    <Text style={styles.FormLabel}>Gallons per minute (gpm)</Text>
                    <TextInput
                        style={styles.FormControl}
                        onChangeText={setGpm}
                        value={gpm}
                        placeholder="ex: 11.43"
                    />
                </View>
            </View>
            {/* <View style={styles.BtnWrap}>
                <Button 
                    color={Platform.OS === "ios" ? "white" : "black"}
                    title="Go back"
                    onPress={() => goBack()}
                />
            </View> */}
            <View style={styles.BtnWrap}>
            {
                    !zoneType || !days || !sprayType || !soilType || !sunExposure || !city || !slope ?
                    <Button 
                    color={Platform.OS === "ios" ? "black" : "black"}
                    title="Generate Schedule"
                    disabled
                    onPress={() => {
                        navigation.push("CreateSchedule", {
                            zoneName: zoneName,
                            zoneType: zoneType, 
                            days: days,
                            sprayType: sprayType,
                            soilType: soilType,
                            sunExposure: sunExposure,
                            city: city,
                            slope: slope,
                            efficiency: efficiency,
                            area: area,
                            rainfall: rainfall,
                            awhc: awhc,
                            rootDepth: rootDepth,
                            allowableDepletion: allowableDepletion,
                            efficiency: efficiency,
                            cropCoefficient: cropCoefficient,
                            precipitationRate: precipitationRate,
                            gpm: gpm
                        });
                    }}
                />
                     :
                     <Button 
                    color={Platform.OS === "ios" ? "black" : "black"}
                    title="Generate Schedule"
                    onPress={() => {
                        navigation.push("CreateSchedule", {
                            zoneName: zoneName,
                            zoneType: zoneType, 
                            days: days,
                            sprayType: sprayType,
                            soilType: soilType,
                            sunExposure: sunExposure,
                            city: city,
                            slope: slope,
                            efficiency: efficiency,
                            area: area,
                            rainfall: rainfall,
                            awhc: awhc,
                            rootDepth: rootDepth,
                            allowableDepletion: allowableDepletion,
                            efficiency: efficiency,
                            cropCoefficient: cropCoefficient,
                            precipitationRate: precipitationRate,
                            gpm: gpm
                        });
                    }}
                />
                }
                {/* <Button 
                    color={Platform.OS === "ios" ? "black" : "black"}
                    title="Generate Schedule"
                    onPress={() => {
                        navigation.push("CreateSchedule", {
                            zoneName: zoneName,
                            zoneType: zoneType, 
                            days: days,
                            sprayType: sprayType,
                            soilType: soilType,
                            sunExposure: sunExposure,
                            city: city,
                            slope: slope,
                            efficiency: efficiency,
                            area: area,
                            rainfall: rainfall,
                            awhc: awhc,
                            rootDepth: rootDepth,
                            allowableDepletion: allowableDepletion,
                            efficiency: efficiency,
                            cropCoefficient: cropCoefficient,
                            precipitationRate: precipitationRate,
                            gpm: gpm
                        });
                    }}
                /> */}
            </View>

        </ScrollView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginHorizontal: 16,
        marginHorizontal: 16,
        marginBottom: 16,
        marginTop: 16,
        backgroundColor: "#f4f7f0"
    },
    baseText: {
        fontSize: 14,
    },
    heading: {
        fontSize: 30,
        fontWeight: "bold",
    },
    FormLabel: {
        fontSize: 20,
        fontWeight: "bold"
    },
    WrapBasic: {
        borderColor: "#f4f7f0",
        borderWidth: 3,
    },
    FormGroup: {
        flex: 0,
        margin: 5,
    },
    FormControl: {
        width: "100%",
        fontSize: 16,
        padding: 10,
        marginTop: 5,
        marginBottom: 0,
        borderWidth: 2,
        borderColor: "#282c34",
        backgroundColor: "#eee",
        borderRadius: 10,
    },
    BtnWrap: {
        flex: 1,
        backgroundColor: "#bfd2d0",
        borderWidth: 1,
        borderColor: "#282c34",
        borderRadius: 5,
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
        backgroundColor: "#eee",
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
})

export default AdvancedSettings;