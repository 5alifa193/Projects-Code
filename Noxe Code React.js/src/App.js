import './App.css';
import Register from './Register/Register';
import Navbar from './Navbar/Navbar';
import Login from './Login/Login';
import {Routes , Route} from 'react-router-dom';
import Movies from './Movies/Movies';
import Home from './Home/Home';
import TvShow from './TvShow/TvShow';
import People from './People/People';
import SingleMovie from './SingleMovie/SingleMovie';
import SingleTVShow from './SingleTVShow/SingleTVShow';
import NotFound from './NotFound/NotFound';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
      <Route path='movies/:page' element={<ProtectedRoute><Movies/></ProtectedRoute>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='register' element={<Register/>}/>
      <Route path='tv-show/:show' element={<ProtectedRoute><TvShow/></ProtectedRoute>}/>
      <Route path='people' element={<ProtectedRoute><People/></ProtectedRoute>}/>
      <Route path='singlemovie/:movieID' element={<ProtectedRoute><SingleMovie/></ProtectedRoute>}/>
      <Route path='singletvshow/:showID' element={<ProtectedRoute><SingleTVShow/></ProtectedRoute>}/>
      <Route path='*' element={<ProtectedRoute><NotFound/></ProtectedRoute>}/>
    </Routes>
    </>
  );
}

export default App;
