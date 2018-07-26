import React, { Component } from "react";
import { FlatList, ActivityIndicator, View } from "react-native";
import { MediumText } from "../components/Text";
import SearchResult from "../components/SearchResult";

export default class Search extends Component {

  render() {
    const {isLoading, searchResults, extraData} = this.props

    if (isLoading) {
      return <ActivityIndicator size="large" />
    }

    if (searchResults.length === 0) {
      return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <MediumText>Aucun résultat retrouvé</MediumText>
        </View>
      )
    }
    return (
      <FlatList
        extraData={extraData}
        data={searchResults}
        renderItem={({ item }) => <SearchResult {...item} />}
      />
    )
  }
}