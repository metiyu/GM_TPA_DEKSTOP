import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore"
import React, { createContext, useContext, useState } from "react"
import { useEffect } from "react"
import { db } from "./firebaseConfig"

let CurrentUserContext = createContext({
    user: {
        uid: "",
        username: "",
        displayName: "tes"
    }
});

export const CurrentUserProvider = ({ children }) => {
    const[user, setUser] = useState(null)

    useEffect(() => {
        onAuthStateChanged(getAuth(), (user) => {
            setUser(user)
        })
    })

    return(
        <CurrentUserContext.Provider value={{user}}>
            {children}
        </CurrentUserContext.Provider>
    )
}

export const UseCurrentUser = () => useContext(CurrentUserContext)