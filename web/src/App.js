import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { MoneyButtonClient } from "@moneybutton/api-client"
import Home from "./pages/home"
import Create from "./pages/create"
import SignedIn from "./components/SignedIn"

const mbClient = new MoneyButtonClient(process.env.REACT_APP_OAUTH_CLIENT_IDENTIFIER)

export default function App() {
  return (
    <SignedIn mbClient={mbClient}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/create">
            <Create />
          </Route>
        </Switch>
      </Router>
    </SignedIn>
  )
}
