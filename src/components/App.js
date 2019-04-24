import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Badges from "../pages/Badges";
import badgeNew from "../pages/BadgeNew";
import Layout from "./Layout";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import BadgeEdit from "../pages/BadgeEdit";
import BadgeDetailContainer from "../pages/BadgeDetailContainer";

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/badges" component={Badges}/>
                    <Route exact path="/badges/new" component={badgeNew}/>
                    <Route exact path="/badges/:badgeId" component={BadgeDetailContainer}/>
                    <Route exact path="/badges/:badgeId/edit" component={BadgeEdit}/>
                    <Route component={NotFound}/>
                </Switch>
            </Layout>
        </BrowserRouter>
    );
}

export default App;