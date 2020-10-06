import React, { useLayoutEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import Favs from "../screens/Favs";
import Movies from "../screens/Movies/MoviesContainer";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";

const Tabs = createBottomTabNavigator();

const getHeaderName = (route) =>
  route?.state?.routeNames[route.state.index] || "Movies";

export default ({ navigation, route }) => {
  useLayoutEffect(() => {
    const name = getHeaderName(route);
    navigation.setOptions({
      title: name,
      headerShown: name !== "TV",
      headerTitleAlign: "center",
    });
  }, [route]);
  // getHeaderName을 만들었음!밑에껄 이용해서!
  // useLayoutEffect와 useEffect의 차이점은 모든 레이아웃이 나오고 실행된다는 의미임!
  // 모든 그래픽이 기본적으로 랜더링 된 후에 실행되는거 말고는 다 똑같음!
  // title은 props의 navigation과 route에서 내용을 console.log찍어서 속성을 이용했다!
  // route.state.~~ 에서 ? 는 저게 없다면 if와 같음!... Moview를 title하겠다는 뜻임!
  //부모에서 받은 props를 이용해 부모쪽으로 설정을 보낼수있다!
  return (
    <Tabs.Navigator
      screenOptions={
        ({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconName = Platform.OS === "ios" ? "ios-" : "md-";
            if (route.name === "Movies") {
              iconName += "film";
            } else if (route.name === "Tv") {
              iconName += "tv";
            } else if (route.name === "Search") {
              iconName += "search";
            } else if (route.name === "Discovery") {
              iconName += "heart";
            }
            return (
              <Ionicons
                name={iconName}
                color={focused ? "white" : "grey"}
                size={26}
              />
            );
          },
        })
        // screenOptions={({route}) => {
        //   return {}
        // }
        // }) => { return {} } 이것과 => ({}) 이것은 같다!
      }
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: "black",
          borderTopColor: "black",
        },
      }}
    >
      <Tabs.Screen name="Movies" component={Movies} />
      <Tabs.Screen name="Tv" component={Tv} />
      <Tabs.Screen name="Search" component={Search} />
      <Tabs.Screen name="Discovery" component={Favs} />
    </Tabs.Navigator>
  );
};
