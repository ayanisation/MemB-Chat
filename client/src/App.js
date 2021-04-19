import "./App.css";
import { Route, Switch } from "react-router-dom";
import Homepage from "./Components/Homepage";
import ChatRoom from "./Components/ChatRoom";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Searcher from "./Components/Searcher";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Homepage} />
      <Route exact path="/chats/" component={ChatRoom} />
      <Route exact path="/chats/:id" component={ChatRoom} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Signup} />
      <Route exact path="/search" component={Searcher} />
    </Switch>
  );
}

export default App;
