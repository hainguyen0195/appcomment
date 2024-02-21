import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routes from './router/routers'
import { Provider } from 'react-redux';
import store, { persistor } from './store/rootReducer';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  return (
    <Provider store={store}>

      <BrowserRouter>
        <Routes>
          {
            routes.map((route, index) => {
              const Page = route.component
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Page />
                  }
                />
              )
            })
          }
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
