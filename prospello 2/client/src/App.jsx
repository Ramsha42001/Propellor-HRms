import './App.css'

//Functionalities imports
import {Routes,Route} from 'react-router-dom'

//Views 
import Home from './views/home'
import Login from './views/Login'
import Signup from './views/Signup'

function App() {

  return (
      <>
      <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
      </>

  );
}

export default App;
