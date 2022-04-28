//components
import Navbar from './Components/Navbar';
import Header from './Components/Header';
import Footer from './Components/Footer';
import AdminNavbar from './Components/AdminNavbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//client side pages
import Home from './Pages';
import AboutUs from './Pages/AboutUs';
import ContactUs from './Pages/ContactUs';
import Inventory from './Pages/Inventory';
import OrderNow from './Pages/OrderNow';
import AdminLogin from './Pages/AdminLogin';
//admin pages
import AdminHome from './Pages/Admin/AdminHome';
import AdminSigns from './Pages/Admin/AdminSigns';
import AdminReviews from './Pages/Admin/AdminReviews';
import AdminPopUp from './Pages/Admin/AdminPopUp';
import AdminImageGallery from './Pages/Admin/AdminImageGallery';
//admin login stuff
import PrivateRoute from "./Components/PrivateRoute"
import ForgotPassword from "./Components/ForgotPassword"
import { AuthProvider } from "./AuthContext"

function App() {
  return (
    <Router>
      <Header/>
      <Navbar />
      <br></br>
      <AdminNavbar />
      <AuthProvider>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/about' component={AboutUs} />
        <Route path='/inventory' component={Inventory} />
        <Route path='/contact' component={ContactUs} />
        <Route path='/order' component={OrderNow} />
        <Route path='/login' component={AdminLogin} />
        <Route path='/forgot-password' component={ForgotPassword}/>

        <PrivateRoute path='/admin/home' component={AdminHome} />
        <PrivateRoute path='/admin/signs' component={AdminSigns} />
        <PrivateRoute path='/admin/reviews' component={AdminReviews} />
        <PrivateRoute path='/admin/popup' component={AdminPopUp} />
        <PrivateRoute path='/admin/imagegallery' component={AdminImageGallery} />
      </Switch>
      </AuthProvider>
      <Footer/>
    </Router>
  );
}

export default App;
