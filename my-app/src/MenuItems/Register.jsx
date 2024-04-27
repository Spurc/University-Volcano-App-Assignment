import React from "react";

//API link to connect to swaggerDocs
const API = "http://localhost:3001";

//Asynchronous function that fetch POST's the users registration data. While also handling errors.
async function RegisterPOST(){
  const url = API + "/user/register";

  //Retrives the user inputs.
  const username = document.getElementById("Email").value;
  const password = document.getElementById("Password").value;  

  //POST fetch that sends the user inputs to the swaggerDocs to add the user to the system.
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      email: username,
      password: password,
    })
  });

  const data = await res.json();

  //If an error is present return the error message else return the success message.
  if(data.error){
    document.getElementById("ErrorHandle").innerHTML = data.message;
  }
  else{
    document.getElementById("ErrorHandle").innerHTML = data.message;
  }
}

//Main function that renders the desgin of the webpage. 
function Register(){
  return (
    <div className = "RegisterFunction">
      <h1>Register Here</h1>
        <input
            id = 'Email'
            type = "email"
            placeholder = "Email"
            required
        />
        <br></br>
        <input 
            id = 'Password'
            type = "password"
            placeholder = "Password"
            required
        />
        <br></br>
        <button className = "register" onClick={RegisterPOST}>Register</button>
      <p id = "ErrorHandle"></p>
    </div>
  ); 
}
export default Register;