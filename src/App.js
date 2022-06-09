import { Route, Routes } from 'react-router-dom';
import './App.css';
import About from './Pages/About/About';
import Checkout from './Pages/Checkout/Checkout';
import Banner from './Pages/Home/Banner/Banner';
import Experts from './Pages/Home/Experts/Experts';
import Home from './Pages/Home/Home/Home';
import Services from './Pages/Home/Services/Services';
import Login from './Pages/Login/Login';
import RequireAuth from './Pages/Login/RequireAuth/RequireAuth';
import Register from './Pages/Register/Register';
import ServiceDetail from './Pages/ServiceDetail/ServiceDetail';
import Footer from './Pages/Shared/Footer/Footer';
import Header from './Pages/Shared/Header/Header';
import NotFound from './Pages/Shared/NotFound/NotFound';

function App() {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/about' element={<About></About>}></Route>
        <Route path='/banner' element={<Banner></Banner>}></Route>
        <Route path='/service/:serviceId' element={<ServiceDetail></ServiceDetail>}></Route>
        <Route path='/services' element={<Services></Services>}></Route>
        <Route path='/experts' element={<Experts></Experts>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/checkout' element={
          <RequireAuth>
            <Checkout></Checkout>
          </RequireAuth>
        }></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/footer' element={<Footer></Footer>}></Route>
        <Route path='*' element={<NotFound></NotFound>}></Route>

      </Routes>
    </div>
  );
}

export default App;
