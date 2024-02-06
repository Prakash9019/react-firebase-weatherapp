import { auth, googleProvider } from "./config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/homepage');

    } catch (err) {
      console.error(err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/homepage');

    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);

    } catch (err) {
      console.error(err);
    }
  };
//style={{backgroundColor:"blue",  justifyContent:"center" , alignItems:"center" ,padding:"150px" ,margin: "200px"}}
  return (
    <div className="container">
  <div className="form-container">
    <input
      className="input"
      placeholder="Email..."
      onChange={(e) => setEmail(e.target.value)}
    />
    <br/>
    <br/>
    <input
      className="input"
      placeholder="Password..."
      type="password"
      onChange={(e) => setPassword(e.target.value)}
    />
    <br/>  
    <br/>
    <button onClick={signIn}> Sign In</button>
    <br/>  
    <br/>
    <button onClick={signInWithGoogle}> Sign In With Google</button>
    <br/>  
    <br/>
    <button onClick={logout}> Logout </button>
  </div>
</div>

  );
};

export default Login;