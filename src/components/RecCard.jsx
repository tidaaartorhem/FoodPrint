import React, { useEffect, useState } from "react";
import { Checkbox } from 'react-native-paper';

import { FontAwesome5 } from "@expo/vector-icons";
import { StyleSheet, Image, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SharedElement } from "react-navigation-shared-element";
export default function RecCard({ navigation, data, cart, onUpdate }) {
  const { id, name, image, color, price, weight } = data;
  const [checked, setChecked] = React.useState(true);

  const handleUpdate = (type) => {
    if (!onUpdate) return;

    onUpdate({ type, item: data });
  };

  return (
    <View style={styles.cartCard}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        
          <TouchableOpacity
            style={{ ...styles.photoContainer, backgroundColor: color }}
            onPress={() => navigation.push("Detail", { item: data })}
          >
            <SharedElement id={`item.${id}.photo`}>
              <Image style={styles.photo} resizeMode="contain" source={image} />
            </SharedElement>
          </TouchableOpacity>
          <View style={{ padding: 8, paddingLeft: 16 }}>
            <Text style={styles.name}>Organic{'\n'}{name}</Text>
            <View style={styles.countIconBox}>


              {/* <TouchableOpacity
              style={styles.countIcon}
              onPress={() => handleUpdate("PLUS")}
            >
              <FontAwesome5 name="plus" size={12} color="#FFFFFF" />
            </TouchableOpacity> */}
              <Text style={styles.count}>{cart[id]}</Text>
              {/* <TouchableOpacity
              style={styles.countIcon}
              onPress={() => handleUpdate("MINUS")}
            >
              <FontAwesome5 name="minus" size={12} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.weight}>x {weight}</Text> */}
            </View>
          </View>
          <View style={{ flexDirection: "column", flex:2}}>
          <FontAwesome5 name="sync" size={20} color="black" />
          </View>
      
          <View style={{ padding: 8, paddingLeft: 16 }}>
            <Text style={styles.name}>{name}</Text>
            <View style={styles.countIconBox}>


              {/* <TouchableOpacity
              style={styles.countIcon}
              onPress={() => handleUpdate("PLUS")}
            >
              <FontAwesome5 name="plus" size={12} color="#FFFFFF" />
            </TouchableOpacity> */}
              <Text style={styles.count}>{cart[id]}</Text>
              {/* <TouchableOpacity
              style={styles.countIcon}
              onPress={() => handleUpdate("MINUS")}
            >
              <FontAwesome5 name="minus" size={12} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.weight}>x {weight}</Text> */}
            </View>
          </View>
          <TouchableOpacity
            style={{ ...styles.photoContainer, backgroundColor: color }}
            onPress={() => navigation.push("Detail", { item: data })}
          >
            <SharedElement id={`item.${id}.photo`}>
              <Image style={styles.photo} resizeMode="contain" source={image} />
            </SharedElement>
          </TouchableOpacity> 
        <View>
       
            <Checkbox.Android
              color="green"
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked(!checked);
              }}
            />
        </View>

      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  photoContainer: {
    padding: 8,
    borderRadius: 24,
  },
  photo: {
    height: 40,
    width: 40,
  },
  name: {
    fontSize: 12,
    paddingBottom: 4,
    fontFamily: "Montserrat-SemiBold",
  },
  count: {
    fontSize: 12,
    paddingLeft: 8,
    paddingRight: 8,
    fontFamily: "Montserrat-SemiBold",
  },
  weight: {
    paddingLeft: 16,
    color: "#7a7a7a",
    fontFamily: "Montserrat-Regular",
  },
  priceBox: {
    padding: 12,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
  },
  price: {
    minWidth: 24,
    paddingRight: 12,
    fontFamily: "Montserrat-SemiBold",
  },
  cartCard: {
    padding: 8,
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 16,
    borderRadius: 16,
    minWidth: "100%",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  countIconBox: {
    paddingBottom: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  countIcon: {
    backgroundColor: "#32CD32",
    borderRadius: 4,
    paddingLeft: 5,
    paddingRight: 5,
    padding: 3,
  },
});
