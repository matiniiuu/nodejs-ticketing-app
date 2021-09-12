process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const axios = require("axios");

const cookie =
    "express:sess=eyJqd3QiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZJall3T0RkaVpUaGtPVFEwWlRrek1qSmhaamRpTXpZNVppSXNJbVZ0WVdsc0lqb2liV0YwYVc1QVoyMWhhV3d1WTI5dElpd2lhV0YwSWpveE5qRTVOVEE1TXpjMmZRLjJLd2Z4ZjJYbGxzMW1mOGFqUmU1NG9MRy1abDRqYzczdFg3NHZCaUttVDAifQ==";

const doRequest = async () => {
    try {
        const { data } = await axios.post(
            `http://localhost:5001/api/tickets`,
            { title: "ticket", price: 5 },
            {
                headers: { cookie },
            }
        );

        await axios.put(
            `http://localhost:5001/api/tickets/${data.id}`,
            { title: "ticket", price: 10 },
            {
                headers: { cookie },
            }
        );

        await axios.put(
            `http://localhost:5001/api/tickets/${data.id}`,
            { title: "ticket", price: 15 },
            {
                headers: { cookie },
            }
        );
    } catch (err) {
        console.log({ err });
    }

    console.log("Request complete");
};

(async () => {
    for (let i = 0; i < 400; i++) {
        doRequest();
    }
})();
