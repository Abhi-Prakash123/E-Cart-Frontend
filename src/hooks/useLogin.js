import { useState } from "react";

export function useLogin() {
    const getToken = () => {
        const userToken = localStorage.getItem("token");
        if(userToken) return userToken;
        return ""
    };
    const [login, setLogin] = useState(getToken());

    const saveToken = (userToken) => {
        if(userToken === ""){
            localStorage.clear("token")
            setLogin("");
        }else{
            localStorage.setItem("token", userToken);
            setLogin(userToken.token);
        }
        
    };

    return [login,saveToken]
}