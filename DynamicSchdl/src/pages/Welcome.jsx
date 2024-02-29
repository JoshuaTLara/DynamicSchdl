
import axios from 'axios';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';


export default function Welcome() {
    // To login i need a user to enter user name and password
    // keep track of them with state values
    // when form is submitted send state values to server as req.body
        const navigate = useNavigate()
        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')

        // const [userId, setUserId] = useState(null)

        // to use redux we need to subscribe (useSelector())to the dstore
        const userId = useSelector((state) => state.userId)

        const dispatch = useDispatch()

    // how to handle the submittion of the form? create a function form submission invokes
    const handleLogin = async (e) => {
        e.preventDefault()

        // need to create my req.body object:
        const bodyObj = {
            email,
            password
        }

        // send the data to our /login endpoin to validate:
        const res = await axios.post("/api/login", bodyObj)

        // get response and save the userId to redux store
        if (res.data.success) {

           //what do i do with the userId that it returns to me
           // dispatch the userId to the store
           dispatch({
            type: "USER_AUTH",
            payload: res.data.userId

           })
           setEmail("")
           setPassword("")
           navigate('/navbar')
        } 
        // alert(res.data.message)
    }
    

    // On initial render, I want this component to determine if 
    // there is a userId saved in the servers rew.session object
    //1. define a funciton to do it,
    const sessionCheck = async () => {
        const res = await axios.get("/api/session-check")


        if (res.data.success) {
            // setUserId(res.data.userId)
            dispatch({
                type: "USER_AUTH",
                payload: res.data.userId
    
               })
        } 
    }

    //2. invoke that function on intitial reder only (with a useEffect() hook)
    // useffect takes in a (callback, optionalDependencyArray)
    // if the dependencyArray is not provided, useEffect will run on EvERy render
    // if dependencyArray is empty ([]), then this tells useEffect to only 
    // run on the initial render
    // if the dependencyArray contains values, useEffect will only run
    // each time one of those vaues is changes/used
    useEffect(() => {
        sessionCheck()
    }, [])

    return (
        <>
        <h1>Welcome to Dynamic Scheduler</h1>
        <p>Login Below</p>
        {!userId && (

            <form onSubmit={handleLogin} id="key">
                <input id="email" type="email" value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
                <input id="password" type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                <input type="submit" />
            </form>
        )
        }
        {userId && 
        navigate('/navbar')
      }
       
       <NavLink to="/register">Register</NavLink>
       
        </>
    )
}

