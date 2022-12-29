import { useState, useCallback, useEffect } from "react"

const USER_DATA_STORAGE_KEY = "userData"

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [ready, setReady] = useState(false)

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken)
        setUserId(id)

        localStorage.setItem(USER_DATA_STORAGE_KEY, JSON.stringify({
            userId: id,
            token: jwtToken
        }))

    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)

        localStorage.removeItem(USER_DATA_STORAGE_KEY)
    }, [])

    useEffect(() => {
        const dataStorage = JSON.parse(localStorage.getItem(USER_DATA_STORAGE_KEY))

        if (dataStorage && dataStorage.token) {
            login(dataStorage.token, dataStorage.userId)
        }
        setReady(true)
    }, [login])

    return { token, userId, login, logout, ready }
}