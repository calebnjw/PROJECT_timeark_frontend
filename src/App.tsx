import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Grid, Column } from "carbon-components-react";

import logo from "./logo.svg";
import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Grid>
              <Column lg={8} sm={8}>
                <div className="App">
                  <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                      Edit <code>src/App.tsx</code> and save to reload.
                    </p>
                    <a
                      className="App-link"
                      href="https://reactjs.org"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Learn React
                    </a>
                  </header>
                </div>
              </Column>
              <Column lg={8} sm={8}>
                <div className="App">
                  <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                      Edit <code>src/App.tsx</code> and save to reload.
                    </p>
                    <a
                      className="App-link"
                      href="https://reactjs.org"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Learn React
                    </a>
                    <p>HELLO HELLO</p>
                  </header>
                </div>
              </Column>
            </Grid>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
