// import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Signup from './components/signup';
import Login from './components/Login';
import AddProducts from './components/AddProducts';
import ProductList from './components/ProductList';
import UpdateComponent from './components/UpdateComponent';
import PrivateComponent from './components/privateComponent';
import Profile from './components/Profile';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ADDCategory from './components/ADDCategory';
import ADDMedia from './components/ADDMedia';
import ADDMaterial from './components/ADDMaterial';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Nav/>
      <Routes>
        {/* <Route element= {<PrivateComponent/>}> */}
        <Route path = "/" element= {<ProductList/>}/>
        <Route path = "/add" element= {<AddProducts/>}/>
        <Route path = "/update/:id" element= {<UpdateComponent/>}/>
        <Route path = "/addMaterial" element= {<ADDMaterial/>}/>
        <Route path = "/addCategory" element= {<ADDCategory/>}/>
        <Route path = "/addMedia" element= {<ADDMedia/>}/>
        <Route path = "/profile" element= {<Profile/>}/>
        {/* <Route path = "/add" element= {<h1>ProductComponent</h1>}/>
        <Route path = "/updatelogout" element= {<h1>ProductComponent</h1>}/>
        <Route path = "/logout" element= {<h1>ProductComponent</h1>}/>
        <Route path = "/profile" element= {<h1>ProductComponent</h1>}/> */}
        
        {/* </Route> */}
        {/* <Route path = "/signup" element= {<Signup/>}/>
        <Route path = "/login" element= {<Login/>}/> */}
      </Routes>
      {/* <Footer/> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
