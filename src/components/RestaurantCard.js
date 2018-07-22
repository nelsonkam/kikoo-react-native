import React from "React";
import {View} from "react-native";
import { Text } from "./Text";
import styled from "styled-components";

const RestaurantCard = ({ image, text, key }) => (
  <View style={{ width: "50%", padding: 8 }} key={key}>
    <TileImage source={{ uri: image }} />
    <Text numberOfLines={1} ellipsizeMode="tail" style={{ marginTop: 6 }}>
      {text}
    </Text>
  </View>
);

const TileImage = styled.Image`
  width: 100%;
  height: 150px;
  border-radius: 8px;
`;

export default RestaurantCard;