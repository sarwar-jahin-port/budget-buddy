import { createContext, useEffect, useState } from "react";
import {GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth";
import { app } from "../firebase/firebase.config";

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({children}) =>{
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const createUser = ({email, password}) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const googleAuth = () =>{
        return signInWithPopup(auth, googleProvider);
    } 

    // TODO: github not connected yet.
    const githubAuth = () =>{
        return signInWithPopup(auth, githubProvider);
    }

    const login = ({email, password}) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = async() =>{
        setLoading(true);
        return signOut(auth).then(()=>setUser(null));
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser) =>{
            if(currentUser){
                setUser(currentUser);
                setLoading(false);
                console.log(currentUser);
            }else{
                setLoading(false);
            }
        });
        return () => {
            return unsubscribe();
        }
    },[])

    const authInfo = {user, loading, createUser, googleAuth, login, logOut, githubAuth};
    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    )
}

export default AuthProvider;