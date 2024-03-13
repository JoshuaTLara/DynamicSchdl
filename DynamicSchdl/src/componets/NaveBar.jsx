import { NavLink, Outlet } from "react-router-dom"
import LogoutButton from "./LogoutButton";

function NavBar() {


    return (
      <>

     <div className="NavBar">
          <NavLink to="Home">Home</NavLink>
          <NavLink to="CreateNewStation">Create New Station</NavLink>
          <NavLink to="CreateNewEmployee">Create New Employees</NavLink>
          <NavLink to="GenerateSchedule">Generate Schedule</NavLink>
          <NavLink to="PastSchedules">Past Schedules</NavLink>
          <LogoutButton />
     </div>
    


    <main>
      <Outlet />
    </main>

   

      </>
    )
}

export default NavBar