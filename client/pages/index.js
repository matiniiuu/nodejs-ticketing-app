import axios from "axios";
import buildClient from "../api/build-client";
import Link from "next/link";
export default function LandingPage({ currentUser, tickets }) {
    console.log("current user => ", currentUser);
    console.log("tickets => ", tickets);
    const ticketList = tickets.map((ticket, index) => {
        return (
            <tr key={index}>
                <td>{ticket.title}</td>
                <td>{ticket.price}</td>
                <td>
                    <Link href={`/tickets/${ticket.id}`}>
                        <a>View</a>
                    </Link>
                </td>
            </tr>
        );
    });
    return (
        <div>
            <h1>Tickets</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Link</th>
                    </tr>
                </thead>
                <tbody>{ticketList}</tbody>
            </table>
        </div>
    );
}
LandingPage.getInitialProps = async (context, client, currentUser) => {
    try {
        const response = await client.get("http://localhost:5001/api/tickets", { withCredentials: true });
        return { tickets: response.data, currentUser };
    } catch (err) {
        return {};
    }
};
