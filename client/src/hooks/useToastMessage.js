import { useCallback } from "react"

export const useToastMessage = () => {
    return useCallback((text) => {
        if (window.M && text) {
            window.M.toast({ html: text })
        }
    }, [])
}