import React,{Component} from 'react';
import QnA from './QnA';
import NewqnaForm from './NewqnaForm';

class GetQuiz extends Component{
    constructor(props){
        super(props);
        this.state={
            quizData:[],
            userType:this.props.userType
        }
    }
    componentDidMount(){
        console.log("In component did mount");
        fetch("/signin/:id/quiz/")
        .then(response => response.json())
        .then((data) => this.setState({ quizData: data }));
    }
    create=(newQna)=>{
        fetch("/signin/:id/quiz",{
            method:"post",
            headers: {"Content-Type":'application/json'},
            body: JSON.stringify({
                quest:newQna.ques,
                ansA:newQna.sol[0],
                ansB:newQna.sol[1],
                ansC:newQna.sol[2],
                ansD:newQna.sol[3]
            })
        })
         .then(response=>response.json())
         .then(addedqna=>{
             console.log(addedqna.message);
             if(addedqna.message==="QnA Created"){
                console.log("Successfully Added");
                console.log(addedqna.quesSet);
                if(addedqna)
                this.setState({
                    quizData:[...this.state.quizData, addedqna.quesSet]
                });
             }      
         })
    }
    update=(qid,changedQna)=>{
        fetch(`/signin/:id/quiz/${qid}`, 
        {  
            method: "PATCH",  
            headers: {    "Content-type": "application/json"  },  
            body: JSON.stringify({
                _id: changedQna._id,
                question: changedQna.question,
                optionA: changedQna.optionA,
                optionB: changedQna.optionB,
                optionC: changedQna.optionC,
                optionD: changedQna.optionD,
                __v: 0
            })
        }) 
        .then(response => {    
            console.log(response.status);
            const updatedQuizData=this.state.quizData.map(quiz=>{
                if(quiz._id===qid){
                    return {
                        ...quiz,
                        question: changedQna.question,
                        optionA: changedQna.optionA,
                        optionB: changedQna.optionB,
                        optionC: changedQna.optionC,
                        optionD: changedQna.optionD
                    };
                }
                return quiz;
            });
            this.setState({
                quizData:updatedQuizData
            });     
            return response.json();              
        })  
        .then(data => console.log(data));
    }
    remove=(quizid)=>{
        fetch(`/signin/:id/quiz/${quizid}`, 
        { method: 'DELETE' })
        .then(res=>res.json())
        .then((result)=>{
            this.setState({
                quizData:this.state.quizData.filter(quiz => quiz._id !== quizid)
            });
        });
    }
    render(){
        return(
            <div>
                 {this.state.quizData.length>=1 && this.state.quizData.map(eachqna=>{
                  return(
                    <QnA 
                        userType={this.state.userType}
                        sola={eachqna.optionA}
                        solb={eachqna.optionB}
                        solc={eachqna.optionC}
                        sold={eachqna.optionD}
                        qid={eachqna._id} 
                        ques={eachqna.question}
                        updateQna={this.update}
                        removeQna={this.remove}
                    />
                  ); 
               })}
               {this.state.userType==="admin" && <NewqnaForm createQna={this.create}/>}
            </div>
        );
    }
}
export default GetQuiz;