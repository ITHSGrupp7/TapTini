import { NavLink } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <div className="flex flex-col gap-2">
                <div>NotFoundPage</div>
                <NavLink to="/">Back to Homepage</NavLink>
        </div>
    );
}
