import { useState, useCallback } from "react";

export const SIGN_UP_API = "/api/auth/register"
export const LOG_IN_API = "/api/auth/login"
export const GENERATE_LINK_API = "/api/link/generate"
export const LINKS_LIST_API = "/api/link"

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async (url, method = "GET", body = null, headers = {}) => {
        setLoading(true)
        try {
            if (body) {
                body = JSON.stringify(body)
                headers["Content-Type"] = "Application/json"
            }
            const response = await fetch(url, { method, body, headers })
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || "Something weng wrong")
            }

            setLoading(false)
            return data
        } catch (e) {
            setLoading(false)
            setError(e.message)
            throw e
        }
    }, [])

    const clearError = () => {
        setError(null)
    }

    return { loading, error, request, clearError }
}