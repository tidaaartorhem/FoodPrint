// const res = await fetch(
//   'https://foodprint-api-dev.herokuapp.com/all',
// );
const fruits = [
  {
    id: 1,
    price: 2,
    type: "FRUIT",
    weight: "1000g",
    name: "Banana",
    image: require("../../../assets/images/banana.png"),
    color: "#ffffb1",
  },
  {
    id: 2,
    name: "Apple",
    type: "FRUIT",
    image: require("../../../assets/images/apple.png"),
    price: 7,
    weight: "500g",
    color: "#ffb1b1",
  },
  {
    id: 3,
    name: "Avocado",
    type: "FRUIT",
    image: require("../../../assets/images/avocado.png"),
    price: 2.50,
    weight: "500g",
    color: "#a7ffa7",
  },
  {
    id: 4,
    name: "Pomegranate",
    type: "FRUIT",
    image: require("../../../assets/images/pomegranate.png"),
    price: 5,
    weight: "1000g",
    color: "#ffa7a7",
  },
  {
    id: 5,
    name: "Kiwi",
    type: "FRUIT",
    image: require("../../../assets/images/kiwi.png"),
    price: 1,
    weight: "500g",
    color: "#a7ffa7",
  },
  {
    id: 6,
    name: "Coconut",
    type: "FRUIT",
    image: require("../../../assets/images/coconut.png"),
    price: 2,
    weight: "1 unit",
    color: "#edb9b9",
  },
  {
    id: 7,
    name: "Lime",
    type: "FRUIT",
    image: require("../../../assets/images/lime.png"),
    price: 50,
    weight: "500g",
    color: "#ebffb1",
  },
  {
    id: 8,
    name: "Pineapple",
    type: "FRUIT",
    image: require("../../../assets/images/pineapple.png"),
    price: 3,
    weight: "1 unit",
    color: "#ffffb1",
  },
  {
    id: 9,
    name: "Green Apple",
    image: require("../../../assets/images/green-apple.png"),
    price: 4,
    type: "FRUIT",
    weight: "1000g",
    color: "#a7ffa7",
  },
  {
    id: 10,
    name: "Grapes",
    image: require("../../../assets/images/grape.png"),
    price: 3,
    type: "FRUIT",
    weight: "1000g",
    color: "#ffa7ff",
  },
  {
    id: 11,
    name: "Figs",
    image: require("../../../assets/images/Figs.png"),
    price: 9.69,
    type: "FRUIT",
    weight: "1000g",
    color: "#ffa7ff",
  },
  {
    id: 12,
    name: "Raisins",
    image: require("../../../assets/images/Raisins.png"),
    price: 5.03,
    type: "FRUIT",
    weight: "1000g",
    color: "#ffa7ff",
  },
  {
    id: 13,
    name: "Cod",
    image: require("../../../assets/images/Cod.png"),
    price: 7.4,
    type: "FRUIT",
    weight: "1000g",
    color: "#ffa7ff",
  },
  {
    id: 14,
    name: "Tuna",
    image: require("../../../assets/images/Tuna.png"),
    price: 5.03,
    type: "FRUIT",
    weight: "1000g",
    color: "#ffa7ff",
  },
];

export const getGroceryItems = (searchText = "", type) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const data = fruits
          .filter((d) =>
            d.name.toLowerCase().includes(searchText.toLowerCase())
          )
          .filter((f) => f.type === type);
        resolve({
          data: data,
          total: data.length,
        });
      } catch (err) {
        reject(err);
      }
    }, 250);
  });
};

export const getGroceryItem = (id = "") => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve({
          data: fruits.find((f) => f.id == id),
        });
      } catch (err) {
        reject(err);
      }
    }, 0);
  });
};
