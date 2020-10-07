import React, { useState } from "react";
import PropTypes from "prop-types";
import { ScrollView, ActivityIndicator, RefreshControl } from "react-native";

const ScrollContainer = ({
  loading,
  children,
  contentContainerStyle,
  refreshFn,
}) => {
  const [refresing, setRefresing] = useState(false); //새로고침을 위한 설정!
  const onRefresh = async () => {
    setRefresing(true);
    await refreshFn();
    //함수를 prop로 보내고있다!..이게 함수인이유는 이미 getData부터 함수가 되었기떄문이다
    setRefresing(false);
  };
  return (
    // 여기서 children은 moviepresent에서 Scrollcontainer 밑에있는 모든 친구들을 의미한다
    // children은 정해져있는 props의 속성임. 바꾸면안됨!
    <ScrollView
      refreshControl={
        <RefreshControl
          onRefresh={onRefresh}
          enabled={false}
          refresing={refresing}
          tintColor={"white"}
        />
      }
      style={{ backgroundColor: "black" }}
      contentContainerStyle={{
        flex: loading ? 1 : 0,
        justifyContent: loading ? "center" : "flex-start",
        ...contentContainerStyle,
        // 좀더 많은 스타일을 넣기위해.. 정해져있어서 다른속성도 가질수있게 한다
        // 다른곳은 다른속성 필요없지만.. 필요한곳을 위해 props로 추가할것임!
      }}
    >
      {loading ? <ActivityIndicator color="white" size="small" /> : children}
    </ScrollView>
  );
};

ScrollContainer.propTypes = {
  loading: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  contentContainerStyle: PropTypes.object,
  refreshFn: PropTypes.func,
};

export default ScrollContainer;
