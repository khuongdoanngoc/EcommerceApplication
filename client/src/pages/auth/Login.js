import "./login.css"
import Layout from "../../components/Layout/Layout";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            toast.warning("Please enter both username and password.");
            return;
        }
        try {
            const loginURL = `${process.env.REACT_APP_API}/api/v1/auth/login`;
            const data = {
                username,
                password,
            };
            const res = await axios.post(loginURL, data);
            if (res.data.success) {
                toast.success(res.data.message);
                // set token
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                delete res.data.user['password']
                const authToken = {
                    token: res.data.token,
                    user: res.data.user
                }
                localStorage.setItem("auth", JSON.stringify(authToken));
                navigate("/");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            if (!error.response.data.success) {
                const message = error.response.data.message;
                toast.error(message);
            } else {
                toast.error("Failure Login!");
            }
        }
    };

    const handleServiceLogin = async (service) => {
        window.location.href = `${process.env.REACT_APP_API}/api/v1/auth/${service}`;
    };



    return (
        <Layout>
            <div className="login">
                <h2 className="login-title">Login</h2>
                <hr />
                <form onSubmit={handleLoginSubmit}>
                    <div className="login-row">
                        <div className="login-normally">
                            <div className="">
                                <Form.Label htmlFor="email">
                                    Username
                                </Form.Label>
                                <Form.Control
                                    className="input-focus"
                                    placeholder="Please enter your username"
                                    aria-label="email"
                                    aria-describedby="basic-addon1"
                                    required
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="login-password">
                                <Form.Label htmlFor="password">
                                    Password
                                </Form.Label>
                                <Form.Control
                                    className="input-focus"
                                    placeholder="Please enter your password"
                                    aria-label="password"
                                    aria-describedby="basic-addon1"
                                    type="password"
                                    required
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className="login-third-party">
                            <a
                                className="login-social"
                                href="/"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleServiceLogin("google");
                                }}
                                >
                                <button type="button">
                                    <i
                                        className="bi bi-google"
                                        style={{ fontSize: "30px" }}></i>
                                    <span
                                        style={{
                                            fontSize: "20px",
                                            fontFamily: "Poppins",
                                        }}>
                                        Login with Google
                                    </span>
                                </button>
                            </a>
                            <a
                                className="login-social"
                                href="/"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleServiceLogin("facebook");
                                }}
                                >
                                <button type="button">
                                    <i
                                        className="bi bi-facebook"
                                        style={{ fontSize: "30px" }}></i>
                                    <span
                                        style={{
                                            fontSize: "20px",
                                            fontFamily: "Poppins",
                                        }}>
                                        Login with Facebook
                                    </span>
                                </button>
                            </a>
                        </div>
                    </div>
                    <hr />
                    <div className="login-submit">
                        <button
                            className="submit-button"
                            type="submit"
                            onClick={handleLoginSubmit}
                            >
                            <span>Login</span>
                        </button>
                        <a className="login-submit-register" href="/register">
                            Create An Account
                        </a>
                        <a
                            className="login-forgot-password"
                            href="/forgot-password">
                            Forgot Password?
                        </a>
                    </div>
                </form>
            </div>
        </Layout>
    );
}

export default Login;
