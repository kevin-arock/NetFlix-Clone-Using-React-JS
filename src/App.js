import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Header from './components/Header';
import Browse from './components/Browse';

const router = createBrowserRouter([
  {
    path:"/",
    element:<Login/>
  },
  {
    path:"Browse",
    element:<Browse/>
  },
  
])

function App() {
  return (
    <div >
    <RouterProvider router={router}/>    
    </div>
  );
}

export default App;
