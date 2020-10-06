import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Detail from "../screens/Detail";
import Tabs from "./Tabs";
import { CardStyleInterpolators } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    screenOptions={{
      gestureEnabled: true,
      headerStyle: {
        backgroundColor: "black",
        borderBottomColor: "black",
        shadowColor: "black",
      },
      headerTintColor: "white",
      headerBackTitleVisible: false,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }}
  >
    <Stack.Screen name="Tab" component={Tabs} />
    <Stack.Screen name="Detail" component={Detail} />
  </Stack.Navigator>
  //네이게이터의 모든 screen은 navigation이란 prop에 접근권을 가지고 있다!
  // 또한 name= 은 화면에 표시될 창의 이름이다!
);
