import React from "react";
import { Provider } from "react-redux";
import store from "./store";
// import {
//   BrowserRouter as Router,
//   Route,
//   Switch,
//   Redirect,
// } from 'react-router-dom';

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


import { useAuthState } from 'react-firebase-hooks/auth'
// import { useCollectionData } from 'react-firebase-hooks/firestore'
import AppHeader from "./components/AppHeader";
import ChatScreen from "./screens/ChatScreen";
import SignInScreen from "./screens/SignInScreen";


function App() {
  const { user } = useAuthState(firebase.auth())
  return (
    <Provider store={store}>
      <div className="App">
        <AppHeader />
        <section>
          {user ? <ChatScreen /> : <SignInScreen />}
        </section>
      </div>
    </Provider>
  );
}

export default App;
