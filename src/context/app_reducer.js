import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../data/constant";

//initailize the cart
const getLocalStorage = () => {
  if (typeof window !== "undefined") {
    let cart = localStorage.getItem("cart");
    if (cart) {
      return JSON.parse(localStorage.getItem("cart"));
    } else {
      return [
        // this is for test, remember to delete this object!
        {
          name: "Dope Jacket",
          id: "cl1mshh5o5br60bk88vij6nz7",
          price: 99999,
          slug: "dope-jacket",
          image: "https://media.graphassets.com/cgXuVb5dSmm4VGyAU6Rf",
          size: "S",
          number: 5,
          max: 10,
        },
      ];
    }
  }
};

// cart initialState
export const initialState = {
  cart: getLocalStorage(),
  total_items: 0,
  total_amount: 0,
  shipping_fee: 534,
};

export const AppReducer = (state, action) => {
  // add to cart
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload;
    const tempItem = state.cart.find((i) => i.id === id + color);
    if (tempItem) {
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === id + color) {
          //if the item is in the cart
          let newAmount = cartItem.amount + amount;
          if (newAmount > cartItem.max) {
            //if the amount is bigger than the max amount
            newAmount = cartItem.max;
          }
          return { ...cartItem, amount: newAmount };
        } else {
          //if is not in the cart , just return
          return cartItem;
        }
      });
      return { ...state, cart: tempCart };
    } else {
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      };
      return { ...state, cart: [...state.cart, newItem] };
    }
  }
  // remove item
  if (action.type === REMOVE_CART_ITEM) {
    console.log(action.payload);
    return { ...state };
    // const tempCart = state.cart.filter((item) => item.id !== action.payload);
    // return { ...state, cart: tempCart };
  }

  //clear the cart
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }

  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload;
    const tempCart = state.cart.map((item) => {
      if (item.id === id) {
        if (value === "inc") {
          let newAmount = item.amount + 1;
          if (newAmount > item.max) {
            newAmount = item.max;
          }
          return { ...item, amount: newAmount };
        }
        if (value === "dec") {
          let newAmount = item.amount - 1;
          if (newAmount < 1) {
            newAmount = 1;
          }
          return { ...item, amount: newAmount };
        }
      }
      return item;
    });
    return { ...state, cart: tempCart };
  }

  if (action.type === COUNT_CART_TOTALS) {
    const { total_items, total_amount } = state.cart.reduce(
      (total, cartItem) => {
        const { amount, price } = cartItem;
        total.total_items += amount;
        total.total_amount += price * amount;

        return total;
      },
      {
        total_items: 0,
        total_amount: 0,
      }
    );
    return { ...state, total_items, total_amount };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};
