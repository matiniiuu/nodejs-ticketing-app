import { useEffect, useState } from "react";

const OrderShow = ({ order }) => {
    const [timeLeft, setTimeLeft] = useState(0);
    useEffect(() => {
        const findTimeLeft = () => {
            const msLeft = new Date(order.expiresAt) - new Date();
            setTimeLeft(Math.round(msLeft / 1000));
        };
        findTimeLeft();
        const timerId = setInterval(findTimeLeft, 1000);
        return () => {
            clearInterval(timerId);
        };
    }, []);
    if (timeLeft < 0) {
        return <div>Order Expired</div>;
    }
    return order ? <div>Time left to pay: {timeLeft} Seconds</div> : <div>Something went wrong please try again</div>;
};
OrderShow.getInitialProps = async (context, client) => {
    try {
        const { orderId } = context.query;
        const { data } = await client.get(`http://localhost:5002/api/orders/${orderId}`, { withCredentials: true });
        return { order: data };
    } catch (err) {
        return {};
    }
};
export default OrderShow;
