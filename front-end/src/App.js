
import './App.css';
import Nav from './components/Nav';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Footer from './components/footer';
import Signup from './components/signup';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/login';
import AddProduct from './components/AddProduct';
import Productlist from './components/Productlist';
import UpdateProduct from './components/UpdateProduct';
import Profile from './components/profile';
function App() {
  return (
    <div className='App'>
      <BrowserRouter>
    <Nav/>
   
   <Routes>
    <Route element = {<PrivateComponent/>} >
    <Route path="/" element ={<Productlist/>}  />
    <Route path="/add" element ={<AddProduct/>}  />
    <Route path="/update/:id" element ={<UpdateProduct/>}  />
    <Route path="/logout" element ={<h1>logout component</h1>}  />
    <Route path="/profile" element ={<Profile/>}  />
   
</Route>
<Route path="/login" element ={<Login/>}  />

    <Route path="/signup" element ={<Signup/>}  />
   </Routes>
   <Footer/>
   </BrowserRouter>
   </div>
  );
}

export default App;
