import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Switch ,Route} from 'react-router-dom/cjs/react-router-dom.min';
import Login from './components/Auth/Login';
import Home from './components/Customers/Home';
import SignUp from "./components/Auth/SignUp"
import { Container } from 'react-bootstrap';
import AdminHome from './components/Admin/AdminHome';


function App() {
  const isLoggedIn = useSelector(state=>state.auth.isLoggedIn);

  return (
    <Container fluid>
      {/* <Switch>
        <Route path="/login">
        {!isLoggedIn ? <Login/> : <Redirect to="/home"/>}
        </Route>
        <Route path="/signup">
        {!isLoggedIn ? <SignUp/> : <Redirect to="/home"/>}
        </Route>
        <Route path="/home">
        {isLoggedIn ? <AdminHome/> : <Login/>}
        </Route>
        <Route path="/" exact>
        {!isLoggedIn ? <Login/> : <Redirect to="/home"/>}
        </Route>
      </Switch> */}
      <AdminHome/>
      </Container>
  )
}

export default App
