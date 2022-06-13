import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from "./router";
import Query from "./services/query";
import Auth from "./services/auth/Auth";
import Theme from "./theme";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Query>
            <Auth>
                <Theme>
                    <Router/>
                </Theme>
            </Auth>
        </Query>
    </React.StrictMode>
);

