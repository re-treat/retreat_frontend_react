// import './App.css';
import Login from './pages/login/login';
import Register from "./pages/register/register";
import MoodBoard from "./components/MoodBoard";
import MoodDetail from "./components/MoodDetail";
import { Switch, Route, Redirect } from "react-router-dom";

import 'antd/dist/antd.css';
import './pages/login/login.less'
import "./css/mooddetail.css";
import "./css/moodboard.css";
function App() {
  return (
    <div className="moodboard">
      <Switch>
        <Route exact path="/login/" component={Login}></Route>
        <Route exact path="/join/" component={Register}></Route>
        <Route exact path="/home/" component={MoodBoard}></Route>
        <Route exact path="/mood/:emotion/" component={MoodDetail}></Route>
        <Route path="/" exact component={Login} />
      </Switch>
    </div>
  );
}

export default App;
