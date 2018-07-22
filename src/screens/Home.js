import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  Image,
  FlatList,
  ToastAndroid,
  TouchableHighlight
} from "react-native";
import InputCard from "../components/InputCard";
import { Text, MediumText, BoldText } from "../components/Text";
import { Input } from "../components/Input";
import styled from "styled-components";
import { searchNearby, getImage } from "../data";
import RestaurantCard from "../components/RestaurantCard";
import Category from "../components/Category";
import SearchResult from "../components/SearchResult";

const URL =
  "https://firebasestorage.googleapis.com/v0/b/kikoo-33dd9.appspot.com/o/cover-images%2Fcjhb4nf6c00013i5lhxe6vmms-bestwestern.jpg?alt=media&token=1540c44b-9db7-4005-bf53-4acef0e6f18b";

const popularRestos = [
  {
    image: URL,
    text: "Restaurant BestWestern Akwaba"
  },
  {
    image: URL,
    text: "Restaurant BestWestern Akwaba"
  },
  {
    image: URL,
    text: "Restaurant BestWestern Akwaba"
  },
  {
    image: URL,
    text: "Restaurant BestWestern Akwaba"
  }
];
const categories = [
  {
    image: URL,
    text: "Petit Déjeuner"
  },
  {
    image: URL,
    text: "Déjeuner"
  },
  {
    image: URL,
    text: "Diner"
  },
  {
    image: URL,
    text: "Desserts"
  },
  {
    image: URL,
    text: "Boissons"
  }
];
export default class Home extends Component {
  state = {
    search: "",
    isSearching: false,
    searchResults: []
  };

  handleSearchClick = () => {
    const { search } = this.state;
    this.setState({ isSearching: search !== "" });
    searchNearby(search)
      .then(res => {
        console.log(res, search);
        this.setState({ searchResults: res });
        res.forEach((elem, i) => {
          getImage(elem.image).then(image => {
            res[i].imageURL = { uri: image };
            this.setState({ searchResults: res });
          });
        });
      })
      .catch(err => {
        console.log(err);
        ToastAndroid.show("Une erreur est survenue", ToastAndroid.SHORT);
      });
  };
  handleSearchChange = search => {
    if (search === "") {
      this.setState({ search, isSearching: false });
    } else {
      this.setState({ search });
    }
  };
  render() {
    const { isSearching } = this.state;
    let content;
    if (!isSearching) {
      content = (
        <Content showsVerticalScrollIndicator={false}>
          <Heading>Populaire</Heading>
          <FlatList
            numColumns={2}
            data={popularRestos}
            renderItem={({ item }, i) => <RestaurantCard {...item} key={i} />}
          />
          <Heading>Catégorie</Heading>
          <FlatList
            numColumns={3}
            data={categories}
            renderItem={({ item }, i) => <Category {...item} key={i} />}
          />
        </Content>
      );
    } else {
      content = (
        <FlatList
          extraData={this.state}
          data={this.state.searchResults}
          renderItem={({ item }) => <SearchResult {...item} />}
        />
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <InputCard>
          <Input
            onFocus={() => console.log(this.state)}
            onChangeText={this.handleSearchChange}
            style={{ padding: 8 }}
            placeholder="Que cherchez vus ?"
          />

          <TouchableHighlight onPress={this.handleSearchClick}>
            <Image
              style={{ width: 26, height: 26, margin: 8 }}
              source={require("../../assets/search.png")}
            />
          </TouchableHighlight>
        </InputCard>
        {content}
      </View>
    );
  }
}



const SearchContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Content = styled.ScrollView`
  margin-right: 8px;
  margin-left: 8px;
`;
const Heading = BoldText.extend`
  font-size: 28px;
  color: black;
  margin-left: 8px;
`;
const List = styled.FlatList`
  margin-top: 8px;
`;


