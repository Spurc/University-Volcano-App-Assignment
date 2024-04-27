import React from 'react';
import { useState } from 'react';

//API link to connect to swaggerDocs
const API = "http://localhost:3001";

//Asynchronous function that fetches the login token while also sorting errors.
async function getToken() {
  const url = API + "/user/login";

  //Gets the user input values to POST to the swaggerDocs
  let email = document.getElementById("Email").value;
  let password = document.getElementById("Password").value;

  //Fetch POST that sends the user information through to the swaggerDocs.
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    })
  });

  //Parses the results as a json allows for token and message storage.
  const data = await response.json();
  const token = data.token;
  const message = data.message;
  const exp = data.expires_in;
  
  localStorage.setItem("expireyTime", exp);

  //Filters through errors. 
  if(!token){
    return{error: true, message: message};
  }
  else {
    return{error: false, token: token};
  }
}

//Main application function handles login features and errors.
function App() {
  //useStates for storing the token and errors that may arise.
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  
  //Login component is run when corresponding button is clicked.
  const login = async () => {
    //Fetches the data returned by the getToken() function.
    const token = await getToken();

    //For handling token expirey.
    let expirey = localStorage.getItem("expireyTime");
    let currentEpoch = Math.round(Date.now() / 1000);

    //If a token exists check to make sure it is not expired.
    if(token){      
      if(currentEpoch >= expirey){        
        setError("Token is Expired");
      }
    }

    //Handles login errors and stores the token locally upon successful login.
    if (token.error) {
      setError(token.message);      
      setToken(null);     
    } 
    else {
      setToken(token.token);
      localStorage.setItem('token', token.token);      
      alert("Successfully Logged In"); 
      setError(null);
    }
  }

  //Logout component that is run when coressponding button is selected.
  const logout = () => {
    //Refreshes the login system essentially.
    setToken(null);
    setError(null);
    localStorage.removeItem('token');

    //Alerts the user on a successful logout.
    alert("Successfully Logged Out");
    
    //Emptys the login field for new userInput.
    document.getElementById("Email").value = "";
    document.getElementById("Password").value = "";

  }

  //Main architecture of the page. Displays the inputs, buttons and titles.
  return (
    <div className = 'LoginFunction'>
      <h1>Login</h1>
      
        <input
            id = 'Email'
            name = "Email"
            type = "email"
            placeholder = "Email"
            required
        />
        <br></br>
        <input 
            id = 'Password'
            name = "Password"
            type = "password"
            placeholder = "Password"
            required
        />
        <br></br>
        <button className = "login"  onClick = {login}>Login</button>
        <button className = "logout" onClick = {logout}>Logout</button>
      {error && <p id = "errorDisplay">{error}</p>}
    </div>
  );
}

//Renders the application function.
export default App;


