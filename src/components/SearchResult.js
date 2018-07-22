import React from "react";
import { BoldText, Text } from "./Text";
import {View, Image} from 'react-native';
import styled from "styled-components";

const SearchResult = (props) => (
  <SearchResultContainer key={props.id}>
    <View style={{ width: "75%" }}>
      <RestoName>{props.name}</RestoName>
      <Text>{props.address}</Text>
      <TextLine>
        <Text>{props.rating}</Text>
        <BoldText
          style={{ color: "red", padding: 1, paddingBottom: 2 }}
        >
          ★
        </BoldText>
        <BoldText style={{ fontSize: 16 }}> · </BoldText>
        <Text style={{ color: props.isOpened ? "green" : "red" }}>
          {props.isOpened ? "Ouvert" : "Fermé"}
        </Text>
      </TextLine>
    </View>
    <Image
      style={{ width: 72, height: 72, margin: 8, borderRadius: 4 }}
      source={props.imageURL}
    />
  </SearchResultContainer>
)

const SearchResultContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-right: 16px;
  margin-left: 16px;
  margin-top: 4px;
  margin-bottom: 4px;
`;
const RestoName = BoldText.extend`
  font-size: 18px;
  color: black;
`;
const TextLine = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default SearchResult;