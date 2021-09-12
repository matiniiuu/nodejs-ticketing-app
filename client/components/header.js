import Link from "next/link";
export default ({ currentUser }) => {
    const links = [!currentUser && { label: "Sign Up", href: "/auth/signup" }, !currentUser && { label: "Sign In", href: "/auth/signin" }, currentUser && { label: "Sign Out", href: "/auth/signout" }]
        .filter((linkConfig) => linkConfig)
        .map(({ label, href }, index) => {
            return (
                <li key={index} className="nav-item">
                    <Link href={href}>
                        <a className="nav-link">{label}</a>
                    </Link>
                </li>
            );
        });
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <Link href="/">
                    <a className="navbar-brand">Matihan</a>
                </Link>
                <div className="d-flex justify-content-end">
                    <ul className="nav d-flex align-items-center">{links}</ul>
                </div>
            </div>
        </nav>
    );
};
