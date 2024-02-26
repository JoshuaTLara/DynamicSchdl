import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom' 

//pages

import Home from './pages/Home.jsx'
import Welcome from './pages/Welcome.jsx'
import AddEmployees from './pages/AddEmployees.jsx'
import CreateNewStation from './pages/CreateNewStation.jsx'
import GenerateSchedule from './pages/GenerateSchedule.jsx'
import PastSchedules from './pages/PastSchedules.jsx'
import './App.css'



// Componets
import NavBar from './componets/NaveBar.jsx'





const router = createBrowserRouter(
  createRoutesFromElements(
<>
    <Route path="/" element={<NavBar />}>
      <Route path="Home" element={<Home />} />
      <Route path="PastSchedules" element={<PastSchedules />} />
      <Route path="CreateNewStation" element={<CreateNewStation />} />
      <Route path="AddEmployees" element={<AddEmployees />} />
      <Route path="GenerateSchedule" element={<GenerateSchedule />} />
      {/* <Route path="Welcome" element={<Welcome />} /> */}
    </Route>
    <Route path='/Welcome' element={<Welcome />} ></Route>
</>
  )
)

function App() {


  return (
    <RouterProvider router={router} />

  )
}

export default App
