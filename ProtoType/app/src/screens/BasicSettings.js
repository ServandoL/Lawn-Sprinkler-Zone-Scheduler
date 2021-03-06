import React, { useState } from "react";
import { Text, ScrollView, StyleSheet, Image, TextInput, View, Button, Platform, Pressable } from "react-native";
import InfoModal from "../components/InfoModal";
import RNPickerSelect from "react-native-picker-select";
import LandscapeData from "../api/landscapeData.json";
import ETData from "../api/texasETData.json";
import SoilData from "../api/soilData.json";

const BasicSettings = ({ route, navigation }) => {

    // let { area,
    //      rainfall,
    //      awhc,
    //      rootDepth,
    //      allowableDepletion,
    //      efficiency,
    //      cropCoefficient,
    //      precipitationRate,
    //      gpm
    // } = route.params;
    const [info, setInfo] = useState("");
    const [toggleModal, setToggleModal] = useState(false);
    const [zoneName, setZoneName] = useState("");
    const [zoneType, setZoneType] = useState("");
    const [sprayType, setSprayType] = useState("");
    const [soilType, setSoilType] = useState("");
    const [sunExposure, setSunExposure] = useState("");
    const [city, setCity] = useState("");
    const [slope, setSlope] = useState("");
    const [days, setDays] = useState("");

    const zoneTypeSelect = LandscapeData.map(type => (
        {
            label: type.name,
            value: [
                type.name,
                parseFloat(type.CropCoefficient),
                parseFloat(type.MaximumRootDepth)
            ]
        }
    ));

    const soilTypeSelect = SoilData.map(type => (
        {
            label: type.Type,
            value: [
                type.Type,
                parseFloat(type.SoilWaterHoldingCapacity),
                parseFloat(type.PlantAvailableWater),
                type.InfiltrationRate
            ]
        }
    ));

    const citySelect = ETData.map(city => (
        {
            label: city.City,
            value: [
                city.City,
                parseFloat(city.Jan),
                parseFloat(city.Feb),
                parseFloat(city.Mar),
                parseFloat(city.Apr),
                parseFloat(city.May),
                parseFloat(city.Jun),
                parseFloat(city.Jul),
                parseFloat(city.Aug),
                parseFloat(city.Sep),
                parseFloat(city.Oct),
                parseFloat(city.Nov),
                parseFloat(city.Dec),
            ]
        }
    ));

    const toggle = () => {
        setToggleModal(true);
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.WrapBasic}>
                <Text style={styles.heading}>Basic Settings</Text>
                <View style={styles.FormGroup}>
                    <Text style={styles.FormLabel}>Zone Name</Text>
                    <TextInput
                        style={styles.FormControl}
                        onChangeText={setZoneName}
                        value={zoneName}
                        placeholder="Enter zone name (optional)"
                    />
                </View>
                <View style={styles.FormGroup}>
                    <View style={styles.textWrap}>
                        
                        {/* <View style={styles.imgWrap}>
                            <Pressable
                                onPress={() => {
                                    setToggleModal(true)
                                    setInfo("days")
                                }}
                            >
                                <Image
                                style={styles.img}
                                source={require("../images/question-circle-fill.jpg")}
                            ></Image>
                            </Pressable>
                            
                        </View> */}
                        <View style={styles.imgWrap}>
                            <Pressable
                                onPress={() => {
                                    setToggleModal(true)
                                    setInfo("days")
                                }}
                            >
                            <View style={styles.circle}>
                                <Text style={styles.circleTxt}>?</Text>
                            </View>

                            </Pressable>
                        </View>
                        <Text style={styles.FormLabel}>Watering days</Text>
                    </View>
                    <RNPickerSelect
                        style={pickerSelectStyles}
                        onValueChange={setDays}

                        items={[
                            { label: "Decide for me (experimental)", value: "" },
                            { label: "1 day", value: 1 },
                            { label: "2 days", value: 2 },
                            { label: "3 days", value: 3 },
                            { label: "4 days", value: 4 },
                            { label: "5 days", value: 5 },
                            { label: "6 days", value: 6 },
                            { label: "7 days", value: 7 }
                        ]}
                    />
                </View>
                <View style={styles.FormGroup}>
                <View style={styles.textWrap}>
                        {/* <View style={styles.imgWrap}>
                            <Pressable
                                onPress={() => {
                                    setToggleModal(true)
                                    setInfo("zoneType")
                                }}
                            >
                                <Image
                                style={styles.img}
                                source={require("../images/question-circle-fill.jpg")}
                            ></Image>
                            </Pressable>
                            
                        </View>                         */}
                        <View style={styles.imgWrap}>
                            <Pressable
                                onPress={() => {
                                    setToggleModal(true)
                                    setInfo("zoneType")
                                }}
                            >
                            <View style={styles.circle}>
                                <Text style={styles.circleTxt}>?</Text>
                            </View>

                            </Pressable>
                        </View>
                        <Text style={styles.FormLabel}>Zone Type</Text>

                    </View>
                    <RNPickerSelect
                        style={pickerSelectStyles}
                        onValueChange={setZoneType}
                        items={zoneTypeSelect}
                    />
                </View>
                <View style={styles.FormGroup}>
                <View style={styles.textWrap}>
                        
                        {/* <View style={styles.imgWrap}>
                            <Pressable
                                onPress={() => {
                                    setToggleModal(true)
                                    setInfo("sprayType")
                                }}
                            >
                                <Image
                                style={styles.img}
                                source={require("../images/question-circle-fill.jpg")}
                            ></Image>
                            </Pressable>
                            
                        </View> */}
                        <View style={styles.imgWrap}>
                            <Pressable
                                onPress={() => {
                                    setToggleModal(true)
                                    setInfo("sprayType")
                                }}
                            >
                            <View style={styles.circle}>
                                <Text style={styles.circleTxt}>?</Text>
                            </View>

                            </Pressable>
                        </View>
                        <Text style={styles.FormLabel}>Spray Type</Text>
                    </View>
                    <RNPickerSelect
                        style={pickerSelectStyles}
                        onValueChange={setSprayType}
                        items={[
                            { label: "Rotor", value: "rotor" },
                            { label: "Fixed Spray Head", value: "fixed spray head" },
                            { label: "Rotary Nozzle", value: "rotary nozzle" },
                            { label: "Drip Line", value: "drip line" }
                        ]}
                    />
                </View>
                <View style={styles.FormGroup}>
                <View style={styles.textWrap}>
                        {/* <View style={styles.imgWrap}>
                            <Pressable
                                onPress={() => {
                                    setToggleModal(true)
                                    setInfo("soilType")
                                }}
                            >
                                <Image
                                style={styles.img}
                                source={require("../images/question-circle-fill.jpg")}
                            ></Image>
                            </Pressable>
                            
                        </View> */}
                        <View style={styles.imgWrap}>
                            <Pressable
                                onPress={() => {
                                    setToggleModal(true)
                                    setInfo("soilType")
                                }}
                            >
                            <View style={styles.circle}>
                                <Text style={styles.circleTxt}>?</Text>
                            </View>

                            </Pressable>
                        </View>
                        <Text style={styles.FormLabel}>Soil Type</Text>
                    </View>
                    
                    <RNPickerSelect
                        style={pickerSelectStyles}
                        onValueChange={setSoilType}
                        items={soilTypeSelect}
                    />
                </View>
                <View style={styles.FormGroup}>
                <View style={styles.textWrap}>
                        {/* <View style={styles.imgWrap}>
                            <Pressable
                                onPress={() => {
                                    setToggleModal(true)
                                    setInfo("exposure")
                                }}
                            >
                                <Image
                                style={styles.img}
                                source={require("../images/question-circle-fill.jpg")}
                            ></Image>
                            </Pressable>
                            
                        </View>                     */}
                        <View style={styles.imgWrap}>
                            <Pressable
                                onPress={() => {
                                    setToggleModal(true)
                                    setInfo("exposure")
                                }}
                            >
                            <View style={styles.circle}>
                                <Text style={styles.circleTxt}>?</Text>
                            </View>

                            </Pressable>
                        </View>
                        <Text style={styles.FormLabel}>Sun Exposure</Text>

                    </View>
                    <RNPickerSelect
                        style={pickerSelectStyles}
                        onValueChange={setSunExposure}
                        items={[
                            { label: "Lots of sun (6-8 hours of sun)", value: "lots of sun" },
                            { label: "Some shade (4-6 hours of sun)", value: "some shade" },
                            { label: "Lots of shade (2-4 hours of sun)", value: "lots of shade" },
                            { label: "Mostly shade (2 or less hours of sun)", value: "mostly shade" }
                        ]}
                    />
                </View>
                <View style={styles.FormGroup}>
                <View style={styles.textWrap}>
                        {/* <View style={styles.imgWrap}>
                            <Pressable
                                onPress={() => {
                                    setToggleModal(true)
                                    setInfo("slope")
                                }}
                            >
                                <Image
                                style={styles.img}
                                source={require("../images/question-circle-fill.jpg")}
                            ></Image>
                            </Pressable>
                            
                        </View> */}
                        <View style={styles.imgWrap}>
                            <Pressable
                                onPress={() => {
                                    setToggleModal(true)
                                    setInfo("slope")
                                }}
                            >
                            <View style={styles.circle}>
                                <Text style={styles.circleTxt}>?</Text>
                            </View>

                            </Pressable>
                        </View>
                        <Text style={styles.FormLabel}>Slope</Text>
                    </View>
                    
                    <RNPickerSelect
                        style={pickerSelectStyles}
                        onValueChange={setSlope}
                        items={[
                            { label: "Flat", value: "flat" },
                            { label: "Slight", value: "slight" },
                            { label: "Moderate", value: "moderate" },
                            { label: "Steep", value: "steep" }
                        ]}
                    />
                </View>
                <View style={styles.FormGroup}>
                <View style={styles.textWrap}>
                        {/* <View style={styles.imgWrap}>
                            <Pressable
                                onPress={() => {
                                    setToggleModal(true)
                                    setInfo("city")
                                }}
                            >
                                <Image
                                style={styles.img}
                                source={require("../images/question-circle-fill.jpg")}
                            ></Image>
                            </Pressable>
                            
                        </View> */}
                        <View style={styles.imgWrap}>
                            <Pressable
                                onPress={() => {
                                    setToggleModal(true)
                                    setInfo("city")
                                }}
                            >
                            <View style={styles.circle}>
                                <Text style={styles.circleTxt}>?</Text>
                            </View>

                            </Pressable>
                        </View>
                        <Text style={styles.FormLabel}>City</Text>
                        </View>
                    
                    <RNPickerSelect
                        style={pickerSelectStyles}
                        onValueChange={setCity}
                        items={citySelect}
                    />
                </View>
                <View style={styles.FormGroup}>
                    <Text style={styles.mutedText}>Everything on this page must be filled in to get the most accurate results.</Text>
                </View>
            </View>

            <View style={styles.BtnWrap}>
                <Button
                    color={Platform.OS === "ios" ? "black" : "black"}
                    title="Advanced Settings"
                    onPress={() => {
                        navigation.push("AdvancedSettings", {
                            zoneName: zoneName,
                            zoneType: zoneType,
                            days: days,
                            sprayType: sprayType,
                            soilType: soilType,
                            sunExposure: sunExposure,
                            city: city,
                            slope, slope
                        });
                    }}
                />
            </View>
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
                            slope: slope
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
                            slope: slope
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
                            slope: slope
                        });
                    }}
                /> */}

            </View>
            {
                toggleModal &&
                <InfoModal 
                    animationType="slide"
                    transparent={true}
                    visible={toggleModal}
                    onRequestClose={() => {
                        setToggleModal(!toggleModal)
                    }}
                    info={info}
                />
            }
        </ScrollView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16,
        marginBottom: 16,
        marginTop: 16,
        // marginHorizontal: 16,
        backgroundColor: "#f4f7f0"
    },
    mutedText: {
        opacity: .5
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
        backgroundColor: "#f4f7f0",
    },
    FormGroup: {
        flex: 0,
        margin: 5,
    },
    img: {
        height: 23,
        width: 23
    },
    imgWrap: {
        flexDirection: "column",
        marginRight: 10
        
    },
    textWrap: {
        display: "flex",
        width: "100%",
        flexDirection: "row",
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
    circle: {
        width: 20,
        height: 20,
        borderRadius: 50,
        backgroundColor: "#62ccc0",
        lineHeight: 0,
        position: "relative"
    },
    circleTxt: {
        fontSize: 14,
        fontWeight: "bold",
        position: "absolute",
        bottom: "5%",
        width: "100%",
        textAlign: "center"

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
});

export default BasicSettings;