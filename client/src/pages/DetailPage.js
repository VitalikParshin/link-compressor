import { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { AuthContext } from '../context/AuthContext'
import { LINKS_LIST_API, useHttp } from '../hooks/useHttp'
import { Loader } from "../components/Loader"
import { LinkCard } from "../components/LinkCard"

export const DetailPage = (props) => {
    const { token } = useContext(AuthContext)
    const params = useParams()
    const [link, setLink] = useState()
    const { request, loading } = useHttp()
    const linkId = params.id

    const getLink = useCallback(async () => {
        try {
            const response = await request(`${LINKS_LIST_API}/${linkId}`, "GET", null, {
                Authorization: `Bearer ${token}`
            })
            setLink(response)
        } catch (e) {

        }
    }, [token, request, linkId, setLink])

    useEffect(() => {
        getLink()
    }, [getLink])

    if (loading) {
        return <Loader />
    }

    return (
        <>
            {!loading && link && <LinkCard link={link} />}
        </>
    )
}