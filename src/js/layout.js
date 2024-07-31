import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import Home from "./views/home";
import NewContact from "./views/newContact";
import EditContact from "./views/EditContact";
import injectContext from "./store/appContext";

const Layout = () => {
    return (
        <div>
            <BrowserRouter>
                <ScrollToTop>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/newContact" element={<NewContact />} />
                        <Route path="/editContact/:index" element={<EditContact />} />
                        <Route path="*" element={<h1>Not found! :(</h1>} />
                    </Routes>
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);