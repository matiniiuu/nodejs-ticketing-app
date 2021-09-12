import Router from "next/router";
import useRequest from "../../hooks/use-request";

const TicketShow = ({ ticket }) => {
    const { doRequest, errors } = useRequest({
        url: "http://localhost:5002/api/orders",
        method: "post",
        body: {
            ticketId: ticket.id,
        },
        onSuccess: (order) => {
            console.log({ order });
            return Router.push(`/orders/${order.id}`);
        },
    });
    return ticket ? (
        <div>
            <h1>{ticket.title}</h1>
            <h4>Price: {ticket.price}</h4>
            {errors}
            <button className="btn btn-primary" onClick={doRequest}>
                Purchase
            </button>
        </div>
    ) : (
        <div>Something went wrong please try again</div>
    );
};
TicketShow.getInitialProps = async (context, client) => {
    try {
        const { ticketId } = context.query;
        const { data } = await client.get(`http://localhost:5001/api/tickets/${ticketId}`, { withCredentials: true });
        return { ticket: data };
    } catch (err) {
        return {};
    }
};
export default TicketShow;
