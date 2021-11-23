import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import {Home,Login,Register} from './pages'
import MenuBar from './component/MenuBar';
import {Container} from 'semantic-ui-react'
function App() {
  return (
    <Router>
      <Container>
      <MenuBar/>
      <Routes>
       <Route exact path='/' element={<Home/>}/>
       <Route path='/login' element={<Login/>}/>
       <Route path="/register" element={<Register/>}/>
      </Routes>
      </Container>
    </Router>
  );
}

export default App;
