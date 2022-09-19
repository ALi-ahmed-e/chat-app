import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Signup from './components/sign up/Signup';
import Home from './components/home/Home';
import ChatWindow from './components/chatwindow/ChatWindow';
import Settings from './components/settings/Settings';
import SideBar from './components/sidebar/SideBar';
import Chats from './components/chats/Chats';
import AddFrien from './components/Addfriend/AddFrien';
function App() {




  const RequireAuth = ({ children }) => {
    return localStorage.getItem('user') ? (children) : <Navigate to='/signup' />
  }


  return (

    <div className="App">
      <BrowserRouter>
        <SideBar />
        <Routes>
          {/* <Route path='/' element={<SideBar />}> */}
            <Route path='/chats' element={<RequireAuth><Chats /></RequireAuth>} />

          {/* </Route> */}
          <Route path='/Addfriend' element={<RequireAuth><AddFrien /></RequireAuth>} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/' element={<RequireAuth><Home /></RequireAuth>} />


          <Route path='/chatwindow' element={<RequireAuth><ChatWindow /></RequireAuth>} />
          <Route path='/settings' element={<RequireAuth><Settings /></RequireAuth>} />

          {/* </Route> */}



        </Routes>

      </BrowserRouter>
    </div>

  );
}

export default App;
