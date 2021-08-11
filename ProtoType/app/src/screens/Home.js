import React from "react";
import { View, ScrollView, Text, Button, Image, StyleSheet } from "react-native";

const HomeScreen = ({ navigation }) => {
    return (
        <ScrollView contentContainerStyle={styles.container} >
            <View style={styles.imgWrap}>
                <Image
                    style={styles.logo}
                    source={require("../images/droplet-half.png")}
                />
            </View>

            <View style={styles.BtnWrap}>
                <Button
                    color={Platform.OS === "ios" ? "black" : "black"}
                    title="Create your schedule"
                    onPress={() => navigation.navigate("BasicSettings")}
                />
            </View>

        </ScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 16,
    },
    BtnWrap: {
        borderWidth: 1,
        borderColor: "#232c34",
        borderRadius: 5,
        margin: 5,
        padding: 5
    },
    imgWrap: {
        alignItems: "center"
    },
    logo: {
        margin: 20,
        resizeMode: "contain",
    }
})

export default HomeScreen;