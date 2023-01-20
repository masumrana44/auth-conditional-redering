 import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import LoginForm from './Components/LoginForm/LoginForm';
import Register from './Components/Register/Register';
import Root from './Root/Root';

function App() {
  const router=createBrowserRouter([
    {path:'/',element:<Root/>,
   children:[
    {path:'/login',element:<LoginForm/>},
    {path:'/',element:<LoginForm/>},
    {path:'/register',element:<Register/>}
    
   ]},
   {path:'*',element:<div>Page not Found 404</div>}
  ])
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
