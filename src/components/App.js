// import logo from './logo.svg';
// import './App.css';
import MoodBoard from './MoodBoard';
import MoodDetail from './MoodDetail';
import {Switch, Route, Redirect } from "react-router-dom"
import '../css/mooddetail.css'
import '../css/moodboard.css'
function App() {
  return (
    <div className="moodboard">
      <Switch>
          <Route exact path='/home/' component={MoodBoard} ></Route>
          <Route exact path='/mood/:emotion/' component={MoodDetail} ></Route>
          <Route path='*' exact component={MoodBoard} />
        </Switch>
    </div>
  );
}

export default App;
