import React, { useEffect, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ScrollView, StyleSheet, Dimensions, View, Text } from "react-native";
import { RadioButton } from 'react-native-paper';
import SliderExample from '@react-native-community/slider';
import { getGroceryItem } from "../services";
import {
  addToCart,
  clearFromCart,
  removeFromCart,
} from "../store/actions/grocery";
import { CartCard, EmptyState } from "../components";

function Cart({ navigation }) {
  const dispatch = useDispatch();
  const windowHeight = Dimensions.get("window").height;
  const { cart } = useSelector((state) => state.groceryState);
  const [items, setItems] = useState([]);
  const [protiens, setProtiens] = useState(0);
  const [fats, setFats] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [cost, setCost] = useState(0);



  useEffect(() => {
    (async () => {
      const keys = Object.keys(cart).filter((key) => !!cart[key]);
      const promises = keys.map((id) => getGroceryItem(id));
      const data = (await Promise.all(promises)).map((d) => d.data);

      setItems(data);
    })();
  }, [cart]);

  const handleUpdate = ({ type, item }) => {
    if (type === "PLUS") {
      dispatch(addToCart(item));
    } else if (type === "MINUS") {
      dispatch(removeFromCart(item));
    } else if (type === "DELETE") {
      dispatch(clearFromCart(item));
    }
  };

  const total = items.reduce((a, b) => a + cart[b.id] * b.price, 0);

  return (
    <View style={{ ...styles.container, minHeight: windowHeight }}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome5
            style={{ margin: 12 }}
            name="chevron-left"
            color="#424242"
            size={24}
          />
        </TouchableOpacity>
        <Text style={styles.heading}>Cart</Text>
        <View style={{ width: 45 }}></View>
      </View>
      <ScrollView>
        {items.length ? (
          <View style={{ marginTop: 8, paddingBottom: 96 }}>
            {items.map((item) => (
              <CartCard
                data={item}
                cart={cart}
                key={item.id}
                navigation={navigation}
                onUpdate={handleUpdate}
              ></CartCard>
            ))}
            <View
              style={{
                padding: 16,
                paddingVertical: 24,
                minWidth: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  color: "#424242",
                  fontFamily: "Montserrat-Regular",
                }}
              >
                Total
              </Text>
              <View style={{ flexDirection: "row", alignContent: "center" }}>
                <FontAwesome5
                  size={20}
                  color="#424242"
                  name="dollar-sign"
                  style={{ paddingTop: 7, paddingRight: 2 }}
                />
                <Text
                  style={{
                    fontSize: 24,
                    color: "#424242",
                    fontFamily: "Montserrat-SemiBold",
                  }}
                >
                  {total}
                </Text>
              </View>
            </View>
            <View
              style={{
                padding: 16,
                paddingVertical: 8,
                minWidth: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  color: "#424242",
                  fontFamily: "Montserrat-Regular",
                }}
              >
                Macros
              </Text>
            
            </View>
            <View
              style={{
                paddingLeft: 22,
                paddingTop: 22,
                minWidth: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "#424242",
                  fontFamily: "Montserrat-Regular",
                }}
              >
                Carbs 
              </Text>
              <SliderExample
            style={{width: 200, height: 40}}
            step={0.5} tapToSeek={true}
            minimumValue = {0}
            maximumValue={1}
            onValueChange={(value)=>setCarbs(value)}
            minimumTrackTintColor="#32CD32"
            maximumTrackTintColor="#000000"
              /> 

            </View>
            <View  style={{
                marginLeft:75,
                minWidth: "100%",
                flexDirection: "row",
                justifyContent: "center",
              }}> 
              

                {carbs === 0 ? ( <Text
                style={{
                  fontSize: 15,
                  color: "#424242",
                  fontFamily: "Montserrat-Regular",
                }}
              >
                Less 
              </Text>) : carbs == 0.5 ? ( <Text
                style={{
                  fontSize: 15,
                  color: "#424242",
                  fontFamily: "Montserrat-Regular",
                }}
              >
                Doesn't Matter 
              </Text>):(<Text
                style={{
                  fontSize: 15,
                  color: "#424242",
                  fontFamily: "Montserrat-Regular",
                }}
              >
                More 
              </Text>)}

              

            </View>
            <View
              style={{
                paddingLeft: 22,
                paddingTop: 22,
                minWidth: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "#424242",
                  fontFamily: "Montserrat-Regular",
                }}
              >
               Protien
              </Text>
              <SliderExample
  style={{width: 200, height: 40}}
  step={0.5} tapToSeek={true}
  minimumValue = {0}
            maximumValue={1}
            onValueChange={(value)=>setProtiens(value)}
  minimumTrackTintColor="#32CD32"
  maximumTrackTintColor="#000000"
/>
            </View>
            <View  style={{
                marginLeft:75,
                minWidth: "100%",
                flexDirection: "row",
                justifyContent: "center",
              }}> 
              

                {protiens === 0 ? ( <Text
                style={{
                  fontSize: 15,
                  color: "#424242",
                  fontFamily: "Montserrat-Regular",
                }}
              >
                Less 
              </Text>) : protiens == 0.5 ? ( <Text
                style={{
                  fontSize: 15,
                  color: "#424242",
                  fontFamily: "Montserrat-Regular",
                }}
              >
                Doesn't Matter 
              </Text>):(<Text
                style={{
                  fontSize: 15,
                  color: "#424242",
                  fontFamily: "Montserrat-Regular",
                }}
              >
                More 
              </Text>)}

              

            </View>
            <View
              style={{
                paddingLeft: 22,
                paddingTop: 22,
               
                minWidth: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "#424242",
                  fontFamily: "Montserrat-Regular",
                }}
              >
                Fat
              </Text>
              <SliderExample
  style={{width: 200, height: 40}}
  step={0.5} tapToSeek={true}
  minimumValue = {0}
  maximumValue={1}
            onValueChange={(value)=>setFats(value)}
  minimumTrackTintColor="#32CD32"
  maximumTrackTintColor="#000000"
/>
            </View>
            <View  style={{
                marginLeft:75,
                minWidth: "100%",
                flexDirection: "row",
                justifyContent: "center",
              }}> 
              

                {fats === 0 ? ( <Text
                style={{
                  fontSize: 15,
                  color: "#424242",
                  fontFamily: "Montserrat-Regular",
                }}
              >
                Less 
              </Text>) : fats == 0.5 ? ( <Text
                style={{
                  fontSize: 15,
                  color: "#424242",
                  fontFamily: "Montserrat-Regular",
                }}
              >
                Doesn't Matter 
              </Text>):(<Text
                style={{
                  fontSize: 15,
                  color: "#424242",
                  fontFamily: "Montserrat-Regular",
                }}
              >
                More 
              </Text>)}

              

            </View>
            {/* <View
              style={{
                paddingLeft: 22,
                paddingTop: 22,
               
                minWidth: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                 style={{
                  fontSize: 24,
                  color: "#424242",
                  fontFamily: "Montserrat-Regular",
                }}
              >
                Cost
              </Text>
              <SliderExample
  style={{width: 200, height: 40}}
  step={1} tapToSeek={true}
  minimumValue = {0}
  maximumValue={100}
            onValueChange={(value)=>setCost(value)}
  minimumTrackTintColor="#32CD32"
  maximumTrackTintColor="#000000"
/>
            </View> */}
            {/* <View  style={{
                
                minWidth: "100%",
                flexDirection: "column",
                justifyContent: "space-between",
              }}> 
           
              <Text  style={{
                 
                  fontSize: 10,
                  color: "#424242",
                  fontFamily: "Montserrat-Regular",
                }}>
                (The slider is a measure of how much cost matters to you and not reduction in cost)
              </Text>
</View>
<View style={{
                
                minWidth: "100%",
                flexDirection: "column",
                justifyContent: "space-between",
              }}>
                 <Text
                style={{
                  marginLeft:235,
                  fontSize: 15,
                  color: "#424242",
                  fontFamily: "Montserrat-Regular",
                }}
              >
                {cost}% 
              </Text>
              

            </View> */}
            <TouchableOpacity
            onPress={() => navigation.push("Summary", { item: { items } , protiens:protiens, fats:fats, carbs:carbs})}
              style={{
                marginTop: 20,
                backgroundColor: "#32CD32",
                borderRadius: 16,
                padding: 16,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "#FFFFFF",
                  textAlign: "center",
                  fontFamily: "Montserrat-SemiBold",
                }}
              >
                SUBMIT
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <EmptyState
            type="cart"
            message="No Items in cart"
            description="When you are ready, go ahead and add some"
          />
        )}
      </ScrollView>
    </View>
  );
}

Cart.sharedElements = (route) => {
  const {
    item: { cart },
  } = route.params;
  return [
    ...Object.keys(cart)
      .filter((key) => !!cart[key])
      .map((c) => `item.${c}.photo`),
  ];
};

const styles = StyleSheet.create({
  slider: {
    width: 300,
    opacity: 1,
    height: 50,
    marginTop: 10,
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
    margin: 0,
  },
  container: {
    padding: 16,
    backgroundColor: "#F2F2F2",
  },
  topBar: {
    minWidth: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heading: {
    fontSize: 24,
    color: "#424242",
    textAlign: "center",
    fontFamily: "Montserrat-SemiBold",
  },
});

export default Cart;
