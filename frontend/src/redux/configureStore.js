import { createStore, applyMiddleware, compose } from "redux";
import authReducer from "./authReducer";
import SecureLS from "secure-ls";
import thunk from "redux-thunk";
import { setAuthorizationHeader } from "../api/apiCalls";

const secureLS = new SecureLS();

const getStateFromStorage = () => {
  const hoaxAuth = secureLS.get("hoax-auth");

  let stateInLocalStorage = {
    isLoggedIn: false,
    username: undefined,
    displayName: undefined,
    image: undefined,
    password: undefined,
  };

  if (hoaxAuth) {
    return hoaxAuth;
  }

  return stateInLocalStorage;
};

const updateStateInStorage = (newState) => {
  secureLS.set("hoax-auth", newState);
};

const configureStore = () => {
  const initialState = getStateFromStorage();
  setAuthorizationHeader(initialState);

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    authReducer,
    getStateFromStorage(),
    composeEnhancers(applyMiddleware(thunk))
  );

  // store'da her değişim olduğunda bu fonksiyon çalışacak
  store.subscribe(() => {
    updateStateInStorage(store.getState());
    setAuthorizationHeader(store.getState());
  });

  return store;
};

export default configureStore;
