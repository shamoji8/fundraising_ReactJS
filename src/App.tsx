import React from 'react';
import logo from './logo.svg';
import './App.css';
import { SubstrateProvider } from "./api/providers/connectProvider";

function App() {
  return (
    <SubstrateProvider>

    </SubstrateProvider>
  );
}

export default App;
