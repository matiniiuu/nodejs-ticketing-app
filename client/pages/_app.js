import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
import buildClient from "../api/build-client";
import Header from "../components/header";
const AppComponent = ({ Component, pageProps, currentUser }) => {
    return (
        <div>
            <Header currentUser={currentUser} />
            <div className="container">
                <Component {...pageProps} />
            </div>
        </div>
    );
};
AppComponent.getInitialProps = async (appContext) => {
    let pageProps = {};
    try {
        const client = buildClient(appContext.ctx);
        const { data } = await client.get("/users/currentUser", { withCredentials: true });
        if (appContext.Component.getInitialProps) {
            pageProps = await appContext.Component.getInitialProps(appContext.ctx, client, data.currentUser);
        }

        return {
            pageProps,
            ...data,
        };
    } catch (err) {
        console.log({ err });
        return { pageProps };
    }
};
export default AppComponent;
