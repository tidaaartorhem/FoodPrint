
import Slider, {SliderProps} from '@react-native-community/slider';
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Dimensions, View, Text } from "react-native";

const SliderExample = () => {
    const [slideCompletionValue, setSlideCompletionValue] = useState(0);
    const [slideCompletionCount, setSlideCompletionCount] = useState(0);
    return (
      <View>
        <SliderExample
          onSlidingComplete={value => {
            setSlideCompletionValue(value);
            setSlideCompletionCount(prev => prev + 1);
          }}
        />
        <Text>
          Completions: {slideCompletionCount} Value: {slideCompletionValue}
        </Text>
      </View>
    );
  };

  export default SliderExample;
