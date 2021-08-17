import React, { useState } from "react";
import {Modal, StyleSheet, Text, Pressable, View} from "react-native";

const InfoModal = (props) => {
    return (
        <View style={styles.centeredView}>
            <Modal
                {...props}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {
                            props.info === "days" &&
                            <Text style={styles.modalText}>"Set days to water"{"\n"}To properly manage the irrigation system, the irrigator should calculate the total run time of the irrigation system for a complete cycle to ensure that it is capable of meeting the watering needs in the time available to water. Water restrictions may limit when irrigation may be used. Thus, the irrigation frequency is not calcualted, but instead it is given by water restrictions.</Text>

                        }
                        {
                            props.info === "zoneType" &&
                            <Text style={styles.modalText}>Because there are thousands of plant species, scientists have assigned an average evapotranspiration rate and a range of values to compensate for differences in water use among different plant types.</Text>
                        }
                        {
                            props.info === "sprayType" &&
                            <Text style={styles.modalText}>An average precipitation rate of the type of sprinklers being used will determine how much water falls onto a designated area in a given amount of water. To input a custom precipitation rate, please provide it on the Advanced Settings.</Text>
                        }
                        {
                            props.info === "soilType" &&
                            <Text style={styles.modalText}>The soil type determines how often and how fast water can be applied to the landscape. Different types of soil have different characteristics in the way they hold or absorb water. The rate at which the soil accepts water is called the infiltration rate. You should try to select sprinkler types whose precipitation rate is equal or below the infiltration rate of the soil.</Text>
                        }
                        {
                            props.info === "exposure" &&
                            <Text style={styles.modalText}>Shady areas may have different evaporation rates than areas with constant direct sunlight.</Text>
                        }
                        {
                            props.info === "slope" &&
                            <Text style={styles.modalText}>Rolling terrain further complicates the problem of matching the precipitation rate of the sprinklers with the infiltration rate. As the angle of the slope increases, the infiltration rate decreases because of the higher potential for runoff.</Text>
                        }
                        {
                            props.info === "city" &&
                            <Text style={styles.modalText}>The historic evapotranspiration rates for the major cities in Texas. The averages used in this app were computed using climatic data over the entire period of record available from the National Weather Service. The data was provided by Texas A&M AgriLife Extension for 2021.</Text>
                        }
                        {
                          props.info === "error" &&
                          <Text style={modalText}>Please fill in all forms.</Text>
                        }
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={props.onRequestClose}
                        >
                            <Text style={styles.textStyle}>Done</Text>
                        </Pressable>
                    </View>
                    
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#62ccc0",
    },
    textStyle: {
      color: "#282c34",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
    }
  });

export default InfoModal;