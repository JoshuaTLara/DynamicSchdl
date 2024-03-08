import { NavLink, Outlet } from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import LogoutButton from "./LogoutButton";

function NavBar() {


    return (
      <>

      <Navbar expand="lg" className="bg-body-tertiary" fixed="top">
        <Container>
          <Navbar.Brand href="#"><NavLink to="Home">Home</NavLink></Navbar.Brand>
          <Navbar.Brand href="#"><NavLink to="PastSchedules">Past Schedules</NavLink></Navbar.Brand>
          <Navbar.Brand href="#"><NavLink to="CreateNewStation">Create New Station</NavLink></Navbar.Brand>
          <Navbar.Brand href="#"><NavLink to="CreateNewEmployee">Create New Employees</NavLink></Navbar.Brand>
          <Navbar.Brand href="#"><NavLink to="GenerateSchedule">Generate Schedule</NavLink></Navbar.Brand>
          <LogoutButton />
        </Container>
      </Navbar>


    <main>
      <Outlet />
    </main>

   

      </>
    )
}

export default NavBar