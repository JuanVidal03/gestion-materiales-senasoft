import { Suspense, lazy } from "react";
import "./modal.css";

const Loader = lazy(() => import("../loader/Loader.jsx"));
const UserFrom = lazy(() => import("../userFrom/UserForm.jsx"));

const Modal = () => {

    return (
        <Suspense fallback={<Loader/>}>
            <section className="modal-container">
                <UserFrom/>
            </section>
        </Suspense>
    );
}

export default Modal;
