import React, { Component } from 'react';

class QnA extends Component{
    constructor(props){
        super(props);
        this.state={
            isEditing:false,
            ques:this.props.ques,
            sol1:this.props.sola,
            sol2:this.props.solb,
            sol3:this.props.solc,
            sol4:this.props.sold
        };
    }
    handleRemove=()=> {
        this.props.removeQna(this.props.qid);
    }
    handleUpdate=(evt)=> {
        evt.preventDefault();
        const updatedQna={
            _id:this.props.qid,
            question:this.state.ques,
            optionA:this.state.sol1,
            optionB:this.state.sol2,
            optionC:this.state.sol3,
            optionD:this.state.sol4,
            _v:0
        }
        this.props.updateQna(this.props.qid, updatedQna);
        this.setState({ isEditing: false });
      }
    toggleForm=()=> {
        if(this.props.userType==="admin"){
            this.setState({ isEditing: !this.state.isEditing });
        }
    }
    handleChange=(evt)=>{
        this.setState({
          [evt.target.name]: evt.target.value
        });
      }
    render(){
        const solArr=[this.props.sola,this.props.solb,this.props.solc,this.props.sold]
        const answers=solArr.map(ans=>{
            return (
                <li>
                    <input type="radio"/>
                    <label htmlFor="sola">{ans}</label>
                </li>
            );
        });
        if(this.state.isEditing){
            return(
            <form onSubmit={this.handleUpdate}>
                <label htmlFor='ques'>Question:</label>
                <input
                type='text'
                id='ques'
                name='ques'
                value={this.state.ques}
                onChange={this.handleChange}
                />
                <label htmlFor='sol1'>Option A:</label>
                <input
                type='text'
                id='sol1'
                name='sol1'
                value={this.state.sol1}
                onChange={this.handleChange}
                />
                <label htmlFor='sol2'>Option B:</label>
                <input
                type='text'
                id='sol2'
                name='sol2'
                value={this.state.sol2}
                onChange={this.handleChange}
                />
                <label htmlFor='sol3'>Option C:</label>
                <input
                type='text'
                id='sol3'
                name='sol3'
                value={this.state.sol3}
                onChange={this.handleChange}
                />
                <label htmlFor='sol4'>Option D:</label>
                <input
                type='text'
                id='sol4'
                name='sol4'
                value={this.state.sol4}
                onChange={this.handleChange}
                />
                <button>Save</button>
          </form>
            );
        }else{
            return(
                <div>
                    <div>
                            <h1>Question {this.props.qid}: {this.props.ques} ?</h1>
                            {
                                this.props.userType==="admin" && <div>
                                <button style={{margin:"5px"}} onClick={this.toggleForm}>
                                    {/* <i class='fas fa-pen' /> */}
                                    Edit
                                </button>
                                <button onClick={this.handleRemove}>
                                    {/* <i class='fas fa-trash' /> */}
                                    Remove
                                </button>
                            </div>
                            }
                    </div>
                    <ul>
                        {answers}
                    </ul>
                    {this.props.userType==="normal" && <button>Save Response</button>}
                </div>
            );
        }
        // return(
        //     {result}
        // );
    }
}
export default QnA;

// onClick={this.toggleForm}
// onClick={this.handleRemove}