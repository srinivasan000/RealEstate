import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import "./assets/styles/globals.css";
import { StateContextProvider } from "./context/index";
import {
  Detail,
  Nopage,
  Create,
  Author,
  Update,
  Active,
  Category,
  About
} from "./pages/";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.

ReactDOM.render(
  <React.StrictMode>
    <ThirdwebProvider activeChain={ChainId.Mumbai}>
      <StateContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/home" element={<App />} />
            <Route path="*" element={<Nopage />} />
            <Route path="/detail" element={<Detail />} />
            <Route path="/create" element={<Create />} />
            <Route path="/author" element={<Author />} />
            <Route path="/update" element={<Update />} />
            <Route path="/activity" element={<Active />} />
            <Route path="/category/housing" element={<Category />} />
            <Route path="/category/farmhouse" element={<Category />} />
            <Route path="/category/office" element={<Category />} />
            <Route path="/category/rental" element={<Category />} />
            <Route path="/category/commercial" element={<Category />} />
            <Route path="/category/country" element={<Category />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </BrowserRouter>
      </StateContextProvider>
    </ThirdwebProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
