import React, { useState } from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Image, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Asset } from "expo-asset";
import { Ionicons } from "@expo/vector-icons";
import Stack from "./navigation/Stack";

const cacheImages = (images) =>
  images.map((image) => {
    // images는 url이 될것이다. + array여야 한다!
    if (typeof image === "string") {
      return Image.prefetch(image);
      // fetch = 가져오다 image.prefetch는 promise를 준다!
    } else {
      return Asset.fromModule(image).downloadAsync();
      //Asset.fromModule 이것도 promise를 준다!
      //그리고 images들은 promise들의 array임!
      //promise 의미는 load 의미임!.. 그래서 기다려줘야함!
    } //즉 어플 실행전에 미리 필요한 구성요소를 load하는 것이다!
  });
const cacheFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));

export default function App() {
  const [isReady, setIsReady] = useState(false);
  //isReady값을 useState를 이용햐 false값을 준다.. setIsready는 어떻게 변화할지..
  const loadAssets = () => {
    const images = cacheImages([
      "https://images.unsplash.com/photo-1601742162870-46790bce3120?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80",
      require("./assets/splash.png"),
    ]);
    const fonts = cacheFonts([Ionicons.font]);
    console.log(images);
    console.log("haha");
    console.log(fonts);
    return Promise.all([...images, ...fonts]);
    // 하나의 어레이를 만든다   ...는 그 어레이의 모든속성을 가져온다 보면됨!
  };
  const onFinish = () => setIsReady(true);
  return isReady ? (
    <>
      <NavigationContainer>
        <Stack />
      </NavigationContainer>
      <StatusBar barStyle="light-content" />
    </>
  ) : (
    <AppLoading
      startAsync={loadAssets}
      onFinish={onFinish}
      onError={(e) => console.error(e)}
    /> //appLoading은 기본적으로 startAsync을 통해 loadAssets를 위해 기다려줄거임! 그래서 구지
    // async / return await 안해줘도됨
  );
}
