import { NavLink, Outlet } from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Nav from 'react-bootstrap/Nav';

function NavBar() {

  // const navigate = useNavigate()
  // const userId = 1

  // // on render, check if there's a userId in session(?)(need to ping server since req.session persists, but React info does not)
  // // if no userId found, instantly call `navigate('/welcome')

  // const checkForUser = () => {
  //   if (!userId) {
  //     navigate("/Welcome")
  //   }
  // }

  // useEffect(() => {
  //   checkForUser()
  // })

    return (
      <>
<Container>
      <Navbar expand="lg" className="bg-body-tertiary" fixed="top">
        <Container>
          <Navbar.Brand href="#"><NavLink to="Home">Home</NavLink></Navbar.Brand>
          <Navbar.Brand href="#"><NavLink to="PastSchedules">Past Schedules</NavLink></Navbar.Brand>
          <Navbar.Brand href="#"><NavLink to="CreateNewStation">Create New Station</NavLink></Navbar.Brand>
          <Navbar.Brand href="#"><NavLink to="AddEmployees">Add Employees</NavLink></Navbar.Brand>
          <Navbar.Brand href="#"><NavLink to="GenerateSchedule">Generate Schedule</NavLink></Navbar.Brand>


    <main>
      <Outlet />
    </main>

        </Container>
      </Navbar>
    </Container>

      </>
    )
}

export default NavBar