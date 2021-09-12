import { useEffect } from "react";
import Router from "next/router";
import useRequest from "../../hooks/use-request";
export default function Signup() {
    const { doRequest } = useRequest({
        url: "http://localhost:5000/api/users/signout",
        method: "post",
        body: {},
        onSuccess: () => Router.push("/"),
    });
    useEffect(() => {
        doRequest();
    }, []);
    return <div>Signinig you out....</div>;
}
