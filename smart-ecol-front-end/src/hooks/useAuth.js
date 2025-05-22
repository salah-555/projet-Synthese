import {useEffect, useState} from 'react';

const useAuth = () => {
    const [user, setUser] = useState(null);


    useEffect(() => {
        const storeUser  = localStorage.getItem('user');
        if (storeUser) {
            try {
                setUser(JSON.parse(storeUser));
            } catch {
                setUser(null)
            }
        }
    }, []);

    return { user };
};

export default useAuth;