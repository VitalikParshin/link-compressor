import { useCallback, useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { LINKS_LIST_API, useHttp } from "../hooks/useHttp"
import { Loader } from "../components/Loader"
import { LinksList } from "../components/LinksList"


export const LinksPage = () => {

    const [links, setLinks] = useState()
    const { request, loader } = useHttp()
    const { token } = useContext(AuthContext)

    const getLinks = useCallback(async () => {
        try {
            const response = await request(LINKS_LIST_API, "GET", null, {
                Authorization: `Bearer ${token}`
            })

            setLinks(response)
        } catch (e) {

        }
    }, [request, token])

    useEffect(() => {
        getLinks()
    }, [getLinks])

    if (loader) {
        return <Loader />
    }

    return (
        <>
            {links && <LinksList links={links} />}
        </>
    )
}