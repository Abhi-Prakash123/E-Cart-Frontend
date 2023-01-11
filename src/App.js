import React  from 'react';
import { Routes ,Route,Navigate  } from 'react-router-dom';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from './pages/Home';
import Checkout from "./pages/Checkout";
import Thanks from "./pages/Thanks";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route exact path="/" component={Products} /> */}
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/thanks" element={<Thanks />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
