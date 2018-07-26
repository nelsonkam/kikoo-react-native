import React, { Component } from "react";
import {
  View,
  Image,
  FlatList,
  ToastAndroid,
  BackHandler,
  TouchableOpacity
} from "react-native";
import InputCard from "../components/InputCard";
import { Text, MediumText, BoldText } from "../components/Text";
import { Input } from "../components/Input";
import styled from "styled-components";
import { searchNearby, getImage } from "../data";
import RestaurantCard from "../components/RestaurantCard";
import Category from "../components/Category";

import Search from "./Search";

const URL =
  "https://firebasestorage.googleapis.com/v0/b/kikoo-33dd9.appspot.com/o/cover-images%2Fcjhb4nf6c00013i5lhxe6vmms-bestwestern.jpg?alt=media&token=1540c44b-9db7-4005-bf53-4acef0e6f18b";

const popularRestos = [
  {
    image: require("../../assets/mcbouffe.jpg"),
    text: "McBouffe"
  },
  {
    image: require("../../assets/steers.jpg"),
    text: "Debonnaire's / Steers"
  },
  {
    image: require("../../assets/impala.jpg"),
    text: "Impala"
  },
  {
    image: require("../../assets/dominos.jpg"),
    text: "Domino's Express"
  }
];
const categories = [
  {
    image: require("../../assets/breakfast.jpg"),
    text: "Petit Déjeuner"
  },
  {
    image: require("../../assets/lunch.jpg"),
    text: "Déjeuner"
  },
  {
    image: require("../../assets/dinner.jpg"),
    text: "Diner"
  },
  {
    image: require("../../assets/dessert.jpg"),
    text: "Desserts"
  },
  {
    image: require("../../assets/drinks.jpg"),
    text: "Boisson"
  }
];
export default class Home extends Component {

  state = {
    search: "",
    isSearching: false,
    isSearchLoading: false,
    searchResults: []
  };
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    if (this.state.isSearching) {
      this.setState({ search: "", isSearching: false });
      return true
    } 
    return false
  }

  handleSearchClick = () => {
    const { search } = this.state;
    this.setState({ isSearching: search !== "", isSearchLoading: true });
    this.searchRestaurant(search)
  };

  searchRestaurant = (search) => {
    searchNearby(search)
    .then(res => {
      console.log(res, search);
      this.setState({ searchResults: res, isSearchLoading: false });
      res.forEach((elem, i) => {
        getImage(elem.image).then(image => {
          res[i].imageURL = { uri: image };
          this.setState({ searchResults: res });
        });
      });
    })
    .catch(err => {
      console.log(err);
      this.setState({ isSearchLoading: false });
      ToastAndroid.show("Une erreur est survenue", ToastAndroid.SHORT);
    });
  }

  handleSearchChange = search => {
    if (search === "") {
      this.setState({ search, isSearching: false });
    } else {
      this.setState({ search });
    }
  };

  handleCategoryClick = (search) => {
    this.setState({ search, isSearching: true, isSearchLoading: true });
    this.searchRestaurant(search)
  }

  render() {
    const { isSearching, isSearchLoading, searchResults } = this.state;
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
            renderItem={({ item }, i) => <Category {...item} onPress={this.handleCategoryClick} key={i} />}
          />
        </Content>
      );
    } else {
      content = (
        <Search isLoading={isSearchLoading} extraData={this.state} searchResults={searchResults} />
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <InputCard>
          <Input
            onFocus={() => console.log(this.state)}
            onChangeText={this.handleSearchChange}
            style={{ padding: 8 }}
            value={this.state.search}
            placeholder="Que cherchez vous ?"
          />

          <TouchableOpacity onPress={this.handleSearchClick}>
            <Image
              style={{ width: 26, height: 26, margin: 8 }}
              source={require("../../assets/search.png")}
            />
          </TouchableOpacity>
        </InputCard>
        {content}
      </View>
    );
  }
}

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


