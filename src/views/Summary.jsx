import React, { useEffect, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ScrollView, StyleSheet, Dimensions, View, Text } from "react-native";
import * as Progress from 'react-native-progress';
import { getGroceryItem } from "../services";
import { Checkbox } from 'react-native-paper';
import { SharedElement } from "react-navigation-shared-element";

import { CartCard, EmptyState, RecCard } from "../components";
function Summary({ route, navigation }) {

    const windowHeight = Dimensions.get("window").height;
    const [items, setItems] = useState([]);
    const { cart } = useSelector((state) => state.groceryState);
    const {groceryItems, protiens, fats, carbs} = route.params; 
    const [carbon, setCarbon] = useState(0)
    const [checked, setChecked] = React.useState(true);

    // const data = {
    //     itemid: 'Apple'
    //     replaceid:'Organic Apple'
    // }
    useEffect(() => {
        (async () => {
          const keys = Object.keys(cart).filter((key) => !!cart[key]);
          const promises = keys.map((id) => getGroceryItem(id));
          const data = (await Promise.all(promises)).map((d) => d.data);
          const toggle = setInterval(() => {
            setCarbon(0.80);
          }, 1000);
          setItems(data);
          
        })();
        
      }, [cart]);
    
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
          <Text style={styles.heading}>Summary</Text>
          <View style={{ width: 45 }}></View>
        </View>
        <ScrollView>
        <View
              style={{
                padding: 24,
                paddingVertical: 8,
                minWidth: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              
            </View>
            <View style={{
                padding: 24,
                paddingBottom: 20,
                minWidth: "100%",
                flexDirection: "row",
                justifyContent: "center",
              }}>
        <Progress.Circle showsText={true}  indeterminateAnimationDuration={4000} progress={carbon} color='green' size={100} />
        
        </View>
        <View style={{
                
                paddingBottom: 20,
                minWidth: "100%",
                flexDirection: "row",
                justifyContent: "center",
              }}>
        <Text  style={{
                  fontSize: 15,
                  fontWeight:"900",
                  color: "#424242",
                  fontFamily: "Montserrat-Regular",
                }}> Reduction in Carbon Emissions</Text></View>
        <View
              style={{
                padding: 24,
                paddingVertical: 8,
                minWidth: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "#424242",
                  fontFamily: "Montserrat-Regular",
                }}
              >
                Replacements
              </Text>
            
            </View>
           
            {items.length ? (
          <View style={{ marginTop: 8, paddingBottom: 96 }}>
        
               <View style={styles.cartCard}>
               <View style={{ flexDirection: "row", alignItems: "center" }}>
                 
               <TouchableOpacity
            style={{ ...styles.photoContainer, backgroundColor: "#fff" }}
            onPress={() => navigation.push("Detail", { item: data })}
          >
            <SharedElement id={`item.${id}.photo`}>
              <Image style={styles.photo} resizeMode="contain" source="../../../assets/images/Figs.png" />
            </SharedElement>
          </TouchableOpacity>
                   <View style={{ padding: 8, paddingLeft: 16 }}>
                     <Text style={styles.name}>Figs</Text>
                     <View style={styles.countIconBox}>
         
         
                      
                       <Text style={styles.count}>{cart[id]}</Text>
                      
                     </View>
                   </View>
                   <View style={{ flexDirection: "column", flex:2}}>
                   <FontAwesome5 name="sync" size={20} color="black" />
                   </View>
               
                   <View style={{ padding: 8, paddingLeft: 16 }}>
                     <Text style={styles.name}>Raisins</Text>
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
                    
                     onPress={() => navigation.push("Detail", { item: data })}
                   >
                    
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
                >{}
                  {total}(<Text style={{
                  fontSize: 18,
                  color: "#424242",
                  fontFamily: "Montserrat-SemiBold",
                }}>$0</Text>)
                </Text>
              </View>
            </View>
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
                  fontSize: 22,
                  color: "#424242",
                  fontFamily: "Montserrat-Regular",
                }}
              >
                Carbon Emissions
              </Text>
              <View style={{ flexDirection: "row", alignContent: "center" }}>
                <Text
                  style={{
                    fontSize: 24,
                    color: "#424242",
                    fontFamily: "Montserrat-SemiBold",
                  }}
                >
                  10<Text style={{
                  fontSize: 18,
                  color: "#32CD32",
                  fontFamily: "Montserrat-SemiBold",
                }}>(-5)</Text>
                </Text>
              </View>
            </View>
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
                Macros
              </Text>
            </View>
            <View
               style={{
                paddingLeft: 22,
              
                minWidth: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "#424242",
                  fontFamily: "Montserrat-Regular",
                }}
              >
                Fat
              </Text>
              <View style={{ flexDirection: "row", alignContent: "center" }}>
                
                <Text
                  style={{
                    fontSize: 18,
                    color: "#424242",
                    fontFamily: "Montserrat-SemiBold",
                  }}
                >{}
                3g <Text style={{
                    fontSize: 18,
                    color: "#FF0000",
                    fontFamily: "Montserrat-SemiBold",
                  }}>(-1g)</Text>
                </Text>
              </View></View>
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
                  fontSize: 20,
                  color: "#424242",
                  fontFamily: "Montserrat-Regular",
                }}
              >
                Protein
              </Text>
              <View style={{ flexDirection: "row", alignContent: "center" }}>
              
                <Text
                  style={{
                    fontSize: 18,
                    color: "#424242",
                    fontFamily: "Montserrat-SemiBold",
                  }}
                >6g <Text style={{
                  fontSize: 18,
                  color: "#32CD32",
                  fontFamily: "Montserrat-SemiBold",
                }}>(+2g)</Text>
                </Text>
              </View>
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
                fontSize: 20,
                color: "#424242",
                fontFamily: "Montserrat-Regular",
              }}
              >
                Carbs
              </Text>
              <View style={{ flexDirection: "row", alignContent: "center" }}>
              
                <Text
                  style={{
                    fontSize: 18,
                    color: "#424242",
                    fontFamily: "Montserrat-SemiBold",
                  }}
                >
                  10g<Text style={{
                    fontSize: 18,
                    color: "#32CD32",
                    fontFamily: "Montserrat-SemiBold",
                  }}>(+3g)</Text>
                </Text>
              </View>
            </View>
            
             <TouchableOpacity
            // onPress={() => navigation.push("Summary", { item: { items } , protiens:protiens, fats:fats, carbs:carbs, total:total})}
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
                CONFIRM
              </Text>
            </TouchableOpacity>
            <View
              style={{
                padding: 16,
                paddingVertical: 24,
                minWidth: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            ></View></View>)
            : (
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
  
  export default Summary;