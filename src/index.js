import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from "./router";
import Query from "./services/query";
import Auth from "./services/auth/Auth";
import Theme from "./theme";
import i18config from "./services/i18n";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Query>
        <Theme>
            <Auth>
                <Router/>
            </Auth>
        </Theme>
    </Query>
);

