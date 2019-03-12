import React from 'react';
import './App.css';

import { data } from './data';
import Pano from './components/Pano';

const App = () => (
  <div className="App">
    <Pano data={data} />
  </div>
);

export default App;