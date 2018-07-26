// import axios from "axios";
const axios = require("axios")
var Buffer = require('buffer/').Buffer

function searchRestaurant(text) {
  axios.get("https://maps.googleapis.com/maps/api/place/findplacefromtext/json", {
    params: {
      key: "AIzaSyBjFRYwZ4AAgefaugyVqvEK27IRuzB1k6Y",
      input: text,
      inputtype: "textquery",
      language: "fr",
      locationbias: "circle:50000@6.379448:2.451324",
      fields: "photos,formatted_address,name,opening_hours,rating,price_level,id,place_id,types"
    }
  }).then((res) => {
    console.log(JSON.stringify(res.data, null, 2))
  }).catch((err) => {
    console.log(err)
  })
}

export function searchNearby(text) {
  return axios.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json", {
    params: {
      key: "AIzaSyBjFRYwZ4AAgefaugyVqvEK27IRuzB1k6Y",
      location: "6.379448,2.451324",
      radius: "5000",
      keyword: text,
      language: "fr",
      type: 'restaurant'
      // type: 'restaurant,÷\bakery,bar,,cafe,meal_takeaway,meal_delivery'
    }
  }).then(({data}) => {
    return data.results.map((data) => ({
      id: data.id,
      name: data.name,
      isOpened: data.opening_hours ? data.opening_hours.open_now : null,
      image: data.photos ? data.photos[0].photo_reference : null,
      rating: data.rating,
      place_id: data.place_id,
      address: data.vicinity,
      imageURL: require("../assets/blank.png")
    }))
  })
}
export function getImage(reference) {
  return axios.get("https://maps.googleapis.com/maps/api/place/photo", {
    params: {
      key: "AIzaSyBjFRYwZ4AAgefaugyVqvEK27IRuzB1k6Y",
      photoreference: reference,
      maxheight: 768
    },
    responseType: 'arraybuffer'
  })
  .then(response => `data:${response.headers['content-type'].toLowerCase()};base64,${new Buffer(response.data, 'binary').toString('base64')}`)
  .catch((err) => {
    console.log(err.message)
  })
}