import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import {Home,Login,Register} from './pages'
import MenuBar from './component/MenuBar';
import {Container} from 'semantic-ui-react'
import {AuthProvider} from './context/auth'
import PrivateRoute from './utils/AuthRoute'


function App() {
  return (
    <AuthProvider>
    <Router>
      <Container>
      <MenuBar/>
      <Routes>
       <Route exact path='/' element={<Home/>}/>
       <Route exact path='/login' element={<PrivateRoute/>}>
           <Route exact path='/login' element={<Login/>}/>
       </Route>
       <Route exact path='/register' element={<PrivateRoute/>}>
           <Route exact path='/register' element={<Register/>}/>
       </Route>
      </Routes>
      </Container>
    </Router>
    </AuthProvider>
  );
}

export default App;
