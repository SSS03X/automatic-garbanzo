<<<<<<< HEAD
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
=======
import {CssBaseline} from '@mui/material';
import {Routes, Route} from 'react-router';
import {Login} from './pages/Login.tsx';
import {Register} from './pages/Register.tsx';
import {Home} from './pages/Home.tsx';
import {CreatePost} from './pages/CreatePost.tsx';
import Header from './components/Header.tsx';
import {Posts} from "./pages/Posts.tsx";
import PostDetail from './pages/PostDetail'
import EditPage from './pages/EditPage'
import ProtectedRoute from './components/ProtectedRoute';

function App() {

  return (
    <>
      <CssBaseline/>
      <Header/>
      <Routes>
        <Route path={'/'} element={<Home/>}/>
          <Route path={'/edit-page/:id'} element={<ProtectedRoute><EditPage /></ProtectedRoute>}/>
        <Route path={'/posts/:id'} element={<PostDetail/>}/>
        <Route path={'/posts'} element={<Posts/>}/>
        <Route path={'/login'} element={<Login/>}/>
        <Route path={'/register'} element={<Register/>}/>
        <Route path={'/create-post'} element={<CreatePost/>}/>
      </Routes>
    </>
  );
}

export default App;
>>>>>>> 23a0a692911787c23ed5b0b3bb42c60f44d825ff
