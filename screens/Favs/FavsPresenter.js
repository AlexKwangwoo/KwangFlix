import React, { useEffect, useState } from "react";
import { PanResponder, Dimensions, Animated } from "react-native";
import styled from "styled-components/native";
import { apiImage } from "../../api";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
const Container = styled.View`
  flex: 1;
  background-color: black;
  align-items: center;
`;
const Poster = styled.Image`
  border-radius: 20px;
  width: 100%;
  height: 100%;
`;

const styles = {
  //animated.view를 위한 css!! css라 적용방법이 다름!
  top: 50,
  height: HEIGHT / 1.5,
  width: "90%",
  position: "absolute",
};

export default ({ results }) => {
  const [topIndex, setTopIndex] = useState(0); //맨위의 카드를 알기위해서!
  const nextCard = () => setTopIndex((currentValue) => currentValue + 1);
  const position = new Animated.ValueXY();
  const panResponder = PanResponder.create({
    //카드 넘기는 함수를 만들어 주었다.
    //react-native에서는 손을 찍은곳부터 0으로 절대값이 시작된다!
    //animated.ValueXY는 XY의 좌표를 준다!
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, { dx, dy }) => {
      //dx는 현재 찍은점부터의 거리인데.. 다시 점을 찍으면 원래 있던 자리로 온다!
      // 왜냐하면 x,y가 0,0 이므로 기본위치로 오기때문이다
      position.setValue({ x: dx, y: dy });
      //Responder를 통해 현재 방향을 알 수 있다!
      //그러나 position 값도 설정 해줘야한다! animated.ValueXY값!!
      // animated.ValueXY를 받은 position은 getTranslateTransform()을 가지는데
      // 이것은 x와 y에 대한 css 표현값을 가지게 된다!
    },
    //onPanResponderRelease: (evt, gesture) => gesture은 dx dy가 있다!
    onPanResponderRelease: (evt, { dx, dy }) => {
      if (dx >= 250) {
        // discard to the right
        Animated.spring(position, {
          toValue: {
            // 범위가 300 넘어가면 카드를 화면밖으로 날려버린다!
            x: WIDTH + 100,
            y: dy,
          },
          useNativeDriver: false,
        }).start(nextCard);
      } else if (dx <= -250) {
        //discard to the left
        Animated.spring(position, {
          toValue: {
            x: -WIDTH - 100,
            y: dy,
          },
          useNativeDriver: false,
        }).start(nextCard);
      } else {
        Animated.spring(position, {
          toValue: {
            x: 0,
            y: 0,
          },
          useNativeDriver: false,
        }).start(); // start를 입력해야 ResponderRelease가 실행됨
        // animated.spring은 애니메이션처럼 천천히 원래위치0,0으로 오게 한다
        //스프링은 숫자를 갔만큼..다시 되돌릴것이다!
      }
    }, // 카드를 놓았을때 원래 자리로 오게 하는 함수
  });

  //interpolate는 x나..무언가의 값이 오면.. 내가원하는 함수 설정값으로 좌표를 이동시킨다!
  // 항상 -부터 +로 향해 갈것이다!
  const roationValues = position.x.interpolate({
    inputRange: [-255, 0, 255],
    //inputRange값이 -200일때 outputRange를 통해 -10으로 조정한다
    outputRange: ["-8deg", "0deg", "8deg"],
    //output에 숫자만 아니라 각도 도 가능해서 카드를 좌우움직이는값을주지만
    // 아웃풋 값은 회전으로 바꿀것이다!
    extrapolate: "clamp", // -10<x<10 범위 밖에가면 멈춘다!!
  });
  const secondCardOpacity = position.x.interpolate({
    inputRange: [-255, 0, 255],
    outputRange: [1, 0.2, 1],
    extrapolate: "clamp",
  });
  const secondCardScale = position.x.interpolate({
    inputRange: [-255, 0, 255],
    outputRange: [1, 0.8, 1],
    extrapolate: "clamp",
  });
  useEffect(() => {
    position.setValue({ x: 0, y: 0 });
  }, [topIndex]);
  return (
    <Container>
      {results.map((result, index) => {
        if (index < topIndex) {
          return null;
          //만약 맨위의 카드의index가 topIndex보다작으면 그카드는 null이 되어
          // 화면에서 영원히 렌더가 안될것이다!
          //즉 맨위는 인덱스 0 맨위 밑에는 인덱스 1.. 이렇게 된다!
        } else if (index === topIndex) {
          return (
            // 여기는 첫번째 카드!
            <Animated.View
              style={{
                ...styles,
                zIndex: 1,
                transform: [
                  { rotate: roationValues },
                  //맨위에꺼만 로테이션tranform속성중 rotate를 이용한다!
                  // 값은 roationValues를 통해 넘긴다!
                  ...position.getTranslateTransform(),
                ],
              }}
              key={result.id}
              {...panResponder.panHandlers}
            >
              <Poster source={{ uri: apiImage(result.poster_path) }}></Poster>
            </Animated.View>
          );
        } else if (index === topIndex + 1) {
          return (
            //여기는 두번째 카드.. opacity의 조정!!
            <Animated.View
              style={{
                ...styles,
                zIndex: -index,
                opacity: secondCardOpacity,
                transform: [{ scale: secondCardScale }],
              }}
              key={result.id}
              {...panResponder.panHandlers}
            >
              <Poster source={{ uri: apiImage(result.poster_path) }}></Poster>
            </Animated.View>
          );
        } else {
          //여기는 나머지 카드들!!
          return (
            <Animated.View
              style={{
                ...styles,
                zIndex: -index,
                opacity: 0,
              }}
              key={result.id}
              {...panResponder.panHandlers}
            >
              <Poster source={{ uri: apiImage(result.poster_path) }}></Poster>
            </Animated.View>
          );
        }
      })}
    </Container>
  );
};
