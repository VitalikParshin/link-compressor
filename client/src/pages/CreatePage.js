import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { useHttp, GENERATE_LINK_API } from "../hooks/useHttp"

export const CreatePage = () => {
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const [link, setLink] = useState("")
    const { request } = useHttp()

    const pressHandler = async (event) => {

        if (event.key === "Enter") {
            try {
                const data = await request(
                    GENERATE_LINK_API,
                    "POST",
                    { from: link },
                    { Authorization: `Bearer ${auth.token}` }
                )

                navigate(`/detail/${data.link._id}`)
            } catch (e) {

            }
        }
    }

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{ paddingTop: "2rem" }}>
                <div className="input-field">
                    <input
                        className="yellow-input"
                        placeholder="Enter your link"
                        id="link"
                        type="text"
                        value={link}
                        onChange={(e) => {
                            setLink(e.target.value)
                        }}
                        onKeyDown={pressHandler}
                    />
                    <label htmlFor="link">Link</label>
                </div>
            </div>
        </div>
    )
}