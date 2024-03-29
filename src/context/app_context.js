import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  useEffect,
} from "react";
import { AppReducer, initialState } from "./app_reducer";
import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../data/constant";

export const AppContext = createContext();

export function AppWrapper({ children }) {
  // const [appState, setAppState] = useState({ value: "hey, I'm here!!" });

  const [state, dispatch] = useReducer(AppReducer, initialState);
  //console.log("This is in app_context state: ", state);

  // add to cart
  const addToCart = (product) => {
    dispatch({
      type: ADD_TO_CART,
      payload: product,
    });
  };
  // remove item from cart
  const removeItem = (productInfo) => {
    dispatch({
      type: REMOVE_CART_ITEM,
      payload: {
        id: productInfo.id,
        size: productInfo.size,
      },
    });
  };
  //toggle amount
  const toggleAmount = (id, size, toggle, inputAmount) => {
    dispatch({
      type: TOGGLE_CART_ITEM_AMOUNT,
      payload: { id, size, toggle, inputAmount },
    });
  };

  //clear cart
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  //everytime cart changes, change the localstorage
  useEffect(() => {
    // dispatch({ type: COUNT_CART_TOTALS });
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  // const contextValue = useMemo(() => {
  //   return [state, dispatch];
  // }, [state, dispatch]);

  return (
    <AppContext.Provider
      value={{ ...state, addToCart, removeItem, toggleAmount, clearCart }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
