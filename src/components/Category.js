import React from "react";
import {View, TouchableOpacity} from "react-native";
import { MediumText } from "./Text";
import styled from "styled-components";

const Category = ({ image, text, key, onPress }) => (
  <TouchableOpacity onPress={() => onPress(text)} style={{ width: "33%", padding: 8, alignItems: "center" }} key={key}>
    <CircleImage source={image} />
    <MediumText
      numberOfLines={1}
      ellipsizeMode="tail"
      style={{ marginTop: 6, color: "black" }}
    >
      {text}
    </MediumText>
  </TouchableOpacity>
);

const CircleImage = styled.Image`
  width: 72px;
  height: 72px;
  border-radius: 100px;
`;

export default Category;