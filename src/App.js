import React,{Component} from 'react';
import './App.css';
import GetQuiz from './Components/GetQuiz';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import QuizDisplay from "./Components/QuizDisplay/quizDisplay";

class App extends Component{
  render(){
    return(
      <div>
        <QuizDisplay/>
      </div>
    );
  }
}
// function App() {
//   componentD
//   return (
//     <div>
//         <QuizDisplay/>
//     </div>
//   );
// }

export default App;

/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */