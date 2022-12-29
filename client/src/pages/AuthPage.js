import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { useHttp, SIGN_UP_API, LOG_IN_API } from "../hooks/useHttp"
import { useToastMessage } from "../hooks/useToastMessage"

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const { loading, error, request, clearError } = useHttp();
    const message = useToastMessage();
    const [form, setForm] = useState({ email: "", password: "" })
    const [isVisible, setVisible] = useState(false)
    const onChangeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const signUpHandler = async () => {
        try {
            await request(SIGN_UP_API, "POST", { ...form })
            // TODO: implement signup
        } catch (e) {
            // Send Sentry log
        }
    }

    const loginHandler = async () => {
        try {
            const data = await request(LOG_IN_API, "POST", { ...form })
            auth.login(data.token, data.userId)
        } catch (e) {
            // Send Sentry log
        }
    }

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    return (
        <div className="row">
            <h1 style={{ display: "flex", justifyContent: "center" }}>Link compressor</h1>
            <div className="col s6 offset-s3">


                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Authorization</span>
                        <div className="input-field">
                            <input
                                className="yellow-input"
                                placeholder="Enter email"
                                id="email"
                                type="text"
                                name="email"
                                onChange={onChangeHandler}
                                value={form.email}
                            />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="input-field">
                            <input
                                className="yellow-input"
                                placeholder="Enter password"
                                id="password"
                                type={isVisible ? "text" : "password"}
                                name="password"
                                value={form.password}
                                onChange={onChangeHandler}
                            />
                            <label htmlFor="email">Password</label>
                            {
                                !!form.password && <i

                                    className="small material-icons"
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        right: 0
                                    }}
                                    onClick={() => setVisible(!isVisible)}
                                >
                                    {isVisible ? "visibility_off" : "visibility"}
                                </i>
                            }

                        </div>
                    </div>
                </div>
                <div className="card-action">
                    <button
                        className="btn yellow darken-4"
                        style={{ marginRight: "10px" }}
                        onClick={loginHandler}
                        disabled={loading}
                    >
                        Log in
                    </button>
                    <button
                        className="btn grey lighten-1 black-text"
                        onClick={signUpHandler}
                        disabled={loading}
                    >
                        Sign up
                    </button>

                </div>
            </div>
        </div >
    )
}