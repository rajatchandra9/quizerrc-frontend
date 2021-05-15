import React,{ Component } from 'react';
import './quizDisplay.css';
import { BrowserRouter,Redirect, Route, Switch } from "react-router-dom";
import QnA from "../QnA";
import NewqnaForm from '../NewqnaForm';
import GetQuiz from '../GetQuiz';
import RegisterUser from '../RegisterUser/RegisterUser';
import SignIn from "../SignIn/SignIn";
class QuizDisplay extends Component{

    constructor(props){
        super(props);
        this.state={
            userType:"normal",
            loginsuccess:false,
            signedInAs:{
                name:"",
                id:""
            }
        };
    }
    componentDidMount(){
        fetch("https://quizerrc-backend.herokuapp.com/")
          .then(response=>response.json())
          .then(console.log);
    }
    changeLoginSucces=(t,useType)=>{
        this.setState({
            loginsuccess:t,
            userType:useType
        });
    }
    changeCurrentUser=(name,id)=>{
        this.setState({
          signedInAs:{
            name:name,
            id:id
          }
        });
    }
    render(){
        return(
            <div>
                <div>
                    {
                        this.state.loginsuccess && this.state.signedInAs.name!=="" ?
                        <GetQuiz userType={this.state.userType} /> :
                        <BrowserRouter>
                        <Switch>
                            {/* <Route exact path="/signin/:id/quiz/user" render={()=><GetQuiz />}/>
                            <Route exact path="/signin/:id/quiz/admin" render={()=><GetQuiz />}/> */}
                            <Route exact path="/signin" render={()=><SignIn changeSuccess={this.changeLoginSucces} changeCurrentUser={this.changeCurrentUser}/>}/>
                            <Route exact path="/register" component={RegisterUser}/>
                            <Route render={()=><Redirect to="/signin"/>}/>
                        </Switch>
                        </BrowserRouter>
                    }
                </div>
            </div>
        );
    }
}
export default QuizDisplay;

{/* onClick={this.checkAnswer} 
className={classNames[0]} data-id="1"

name="settings" id="beginner" ref={selectedSetting} onClick={handleSettingsChange} */}
{/* //changeSuccess={this.changeLoginSucces} changeCurrentUser={this.changeCurrentUser} */}

{/* <RegisterUser/>
            <GetQuiz 
            userType={this.state.userType}
            update={this.update}
            remove={this.remove}
            /> */}

// //</div>this.state={
        //     quizData:[
        //         {
        //             qid:1,
        //             ques:"Question 1",
        //             sol:["Solution 1","Solution 2","Solution 3","Solution 4"]
        //         },
        //         {
        //             qid:2,
        //             ques:"Question 2",
        //             sol:["Solution 1","Solution 2","Solution 3","Solution 4"]
        //         }
        //     ],
        //     userType:"admin"
        // }
    
    // create=(newQna)=> {
    //     this.setState({
    //       quizData: [...this.state.quizData, newQna]
    //     });
    //   }
    // create=(newQna)=>{
    //     fetch("http://localhost:3001/",{
    //         method:"post",
    //         headers: {"Content-Type":'application/json'},
    //         body: JSON.stringify({
    //             quest:newQna.ques,
    //             ansA:newQna.sol[0],
    //             ansB:newQna.sol[1],
    //             ansC:newQna.sol[2],
    //             ansD:newQna.sol[3]
    //         })
    //     })
    //      .then(response=>response.json())
    //      .then(user=>{
    //             console.log("Successfully Added");
    //             this.getQuiz;     
             
    //      })
    // }
    // getQuiz=()=>{
    //     <GetQuiz/>
    // }
    // update=(id,updatedQna)=>{
    //     const updatedQuizData=this.state.quizData.map(quiz=>{
    //         if(quiz.qid===id){
    //             return {
    //                 ...quiz,
    //                 ques:updatedQna.ques,
    //                 sol:updatedQna.sol
    //             };
    //         }
    //         return quiz;
    //     });
    //     this.setState({
    //         quizData:updatedQuizData
    //     });
    // }
    // remove=(id)=>{
    //     this.setState({
    //         quizData:this.state.quizData.filter(quiz => quiz.qid !== id)
    //     });
    // }