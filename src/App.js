import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './components/Home/Home';
import Search from './components/Search/Search';
import Details from './components/details/Details';
import Login from './components/login/Login';
import SignUp from './components/signUp/SignUp';
import Forgot from './components/forgot/Forgot';
import Profile from './components/profile/Profile';
import ProtectedRout from './components/profile/ProtectedRout';
import ErrorPage from './components/error/ErrorPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <MainLayout />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/search' element={<Search />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/forgot' element={<Forgot />} />
        <Route path='/profile' element={<ProtectedRout>
          <Profile />
        </ProtectedRout>} />
        <Route path='/details/:option/:id' element={<Details />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
