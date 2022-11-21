import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Home from "../components/home/Home";
import BooksList from "../components/books-list/BooksList";

function Routes() {
    return (
        <Switch>
            <Redirect exact from="/" to="/home" />
            <Route path="/home">
                <Home />
            </Route>
            <Route path="/books/:genreType">
                <BooksList />
            </Route>
            <Route path="*">
                <Redirect to="/home" />
            </Route>
        </Switch>
    );
}

export default Routes;
