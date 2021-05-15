import React, { Component } from "react";
import { v4 as uuidv4 } from 'uuid';

class NewqnaForm extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        qid:"",
        ques:"",
        sol1:"",
        sol2:"",
        sol3:"",
        sol4:""
     };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }
  handleSubmit(evt) {
    evt.preventDefault();
    const qnafinal={
        qid:uuidv4(),
        ques:this.state.ques,
        sol:[this.state.sol1,this.state.sol2,this.state.sol3,this.state.sol4]
    }
    this.props.createQna(qnafinal);
    this.setState({ 
        qid:"",
        ques:"",
        sol1:"",
        sol2:"",
        sol3:"",
        sol4:""
     });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor='ques'>Question:</label>
        <input
          type='text'
          placeholder='Question'
          id='ques'
          name='ques'
          value={this.state.ques}
          onChange={this.handleChange}
        />
        <label htmlFor='sol1'>Option A:</label>
        <input
          type='text'
          placeholder='Option A'
          id='sol1'
          name='sol1'
          value={this.state.sol1}
          onChange={this.handleChange}
        />
         <label htmlFor='sol2'>Option B:</label>
        <input
          type='text'
          placeholder='Option B'
          id='sol2'
          name='sol2'
          value={this.state.sol2}
          onChange={this.handleChange}
        />
        <label htmlFor='sol3'>Option C:</label>
        <input
          type='text'
          placeholder='Option C'
          id='sol3'
          name='sol3'
          value={this.state.sol3}
          onChange={this.handleChange}
        />
        <label htmlFor='sol4'>Option D:</label>
        <input
          type='text'
          placeholder='Option D'
          id='sol4'
          name='sol4'
          value={this.state.sol4}
          onChange={this.handleChange}
        />
        <button>Add QnA</button>
      </form>
    );
  }
}
export default NewqnaForm;
