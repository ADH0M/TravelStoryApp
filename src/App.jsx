import './App.css'
import { BrowserRouter ,Routes , Route} from 'react-router-dom';
import AppRouter from './Router/AppRouter';
import AuthContext from "./Context/AuthContext";
function App() {

  return (
    <AuthContext>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<AppRouter/>}/>
        </Routes>
      </BrowserRouter>
    </AuthContext>
  )
}

export default App
