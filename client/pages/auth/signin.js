import { useState } from "react";
import Router from "next/router";
import useRequest from "../../hooks/use-request";
export default function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { doRequest, errors } = useRequest({
        url: "http://localhost:5000/api/users/signin",
        method: "post",
        body: {
            email,
            password,
        },
        onSuccess: () => Router.push("/"),
    });
    const onSubmit = async (e) => {
        e.preventDefault();
        await doRequest();
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <h1>Sign in</h1>
                <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" />
                </div>
                {errors}
                <button className="btn btn-primary">Sign in</button>
            </form>
        </div>
    );
}
