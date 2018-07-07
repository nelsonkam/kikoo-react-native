import React, {Component} from 'react';
import {Platform, StyleSheet, View, TextInput, Image, FlatList} from 'react-native';
import InputCard from "../components/InputCard"
import {Text, MediumText, BoldText} from "../components/Text"
import {Input} from "../components/Input"
import styled from "styled-components";
const URL = "https://firebasestorage.googleapis.com/v0/b/kikoo-33dd9.appspot.com/o/cover-images%2Fcjhb4nf6c00013i5lhxe6vmms-bestwestern.jpg?alt=media&token=1540c44b-9db7-4005-bf53-4acef0e6f18b"

export default class Home extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <InputCard>
          <Input style={{padding: 8}} placeholder="Que cherchez vous ?"></Input>
          <Image style={{width: 26, height: 26, margin: 8}} source={require('../../assets/search.png')} />
        </InputCard>
        <Content showsVerticalScrollIndicator={false}>
          <Heading>Populaire</Heading>
          <FlatList numColumns={2}  data={[{image: URL, text: "Restaurant BestWestern Akwaba"}, {image: URL, text: "Restaurant BestWestern Akwaba"}, {image: URL, text: "Restaurant BestWestern Akwaba"}, {image: URL, text: "Restaurant BestWestern Akwaba"}]}
          renderItem={({item}, i) => (
            <View style={{width: "50%", padding: 8}} key={i}>
              <TileImage source={{uri: item.image}} />
              <Text numberOfLines={1} ellipsizeMode="tail" style={{marginTop: 6}}>{item.text}</Text>
            </View>
          ) } />
          <Heading>Catégorie</Heading>
          <FlatList numColumns={3}  data={[{image: URL, text: "Petit Déjeuner"}, {image: URL, text: "Déjeuner"}, {image: URL, text: "Diner"}, {image: URL, text: "Desserts"}, {image: URL, text: "Boissons"}]}
          renderItem={({item}, i) => (
            <View style={{width: "33%", padding: 8, alignItems: "center"}} key={i}>
              <CircleImage source={{uri: item.image}} />
              <MediumText numberOfLines={1} ellipsizeMode="tail" style={{marginTop: 6, color: 'black'}}>{item.text}</MediumText>
            </View>
          ) } />
          
          
        </Content>  
      </View>
    );
  }
}

const SearchContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const Content = styled.ScrollView`
  margin-right: 8px;
  margin-left: 8px;
`
const Heading = BoldText.extend`
  font-size: 28px;
  color: black;
  margin-left: 8px;
`
const List = styled.FlatList`
  
  
  margin-top: 8px;
`
const TileImage = styled.Image`
  width: 100%;
  height: 150px;
  border-radius: 8px;
`
const CircleImage = styled.Image`
  width: 72px;
  height: 72px;
  border-radius: 100px;
`