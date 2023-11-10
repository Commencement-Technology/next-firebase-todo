import { useEffect, useState } from "react";
import { auth } from "../firebase";

interface User {
    uid: string;
}

interface AuthHookResult {
    user: User | null;
    isLoggedIn: boolean;
}

const useAuth = (): AuthHookResult => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {

        auth.onAuthStateChanged((user) => {
            setIsLoggedIn(user && user.uid ? true : false);
            setUser(user);
        });

    });


    return { user, isLoggedIn };

};

export default useAuth;
