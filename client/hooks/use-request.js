import axios from "axios";
import { useState } from "react";

export default ({ url, method, body, onSuccess }) => {
    const [errors, setErrors] = useState(null);
    const doRequest = async () => {
        setErrors(null);
        try {
            const response = await axios[method](url, body, { withCredentials: true });
            console.log({ asd: response.data });
            if (onSuccess) {
                onSuccess(response.data);
            }
            return response.date;
        } catch (err) {
            console.log({ err });
            setErrors(
                <div class="alert alert-danger">
                    <h4>Ooops....</h4>
                    <ul class="my-0">
                        {err.response.data.errors.map((err, index) => (
                            <li key={index}>{err.message}</li>
                        ))}
                    </ul>
                </div>
            );
        }
    };

    return { doRequest, errors };
};
