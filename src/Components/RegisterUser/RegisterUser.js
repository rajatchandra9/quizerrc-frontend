import React, { Component } from "react";
class RegisterUser extends Component{
    constructor(props){
        super(props);
        this.state={
            name:"",
            password:"",
            emailid:"",
            rollNo:0,
            isValid:{
                msg:"",
                data:true
            }
        };
    }
    handleChange=(evt)=>{
        this.setState({ [evt.target.name]:evt.target.value,isValid:{msg:"",data:true}});
    }
    handleSubmit=(evt)=>{
        evt.preventDefault();
        //alert(`${this.state.emailid} ${this.state.name} ${this.state.password}`);
        fetch("https://quizerrc-backend.herokuapp.com/register",{
            method:"post",
            headers: {"Content-Type":'application/json'},
            body: JSON.stringify({
                email:this.state.emailid,
                name:this.state.name,
                password:this.state.password,
                rollNo:this.state.rollNo,
            })
        })
         .then(response=>response.json())
         .then(user=>{
             if(user==="Email Already Used"){
                this.setState({isValid:{msg:"EAU",data:false}});
             }
             else if(user==="Blank Error"){
                 this.setState({isValid:{msg:"BE",data:false}});
             }
             else if(user==="Password Error"){
                this.setState({isValid:{msg:"PE",data:false}});
            }
             else{
                //this.props.changeSuccess(true);
                 alert(`You are successfully registered as ${user.email} !! In order to use the Detector you need to login with Username as your Email Address`)
                console.log("Successfully Registered");     
             }
         })
        this.setState({ emailid:"", 
                        name:"",
                        password:"",
                        rollNo:0
                      })
    }
    render(){
        return(
            <div className="container">
                {/* <div className="imgcontainer">
                    <img src={avtimg} alt="Avatar" length={151.91} width={151.91} className="avatar"/>
                </div> */}
                {(!this.state.isValid.data && this.state.isValid.msg==="EAU") && <h6 style={{color:"red"}}>Email Already Exists!!</h6>}
                {(!this.state.isValid.data && this.state.isValid.msg==="BE") && <h6 style={{color:"red"}}>Please fill in every field!!</h6>}
                {(!this.state.isValid.data && this.state.isValid.msg==="PE") && <h6 style={{color:"red"}}>Please enter valid Password!!</h6>}
                <form onSubmit={this.handleSubmit}>
                <div className="container">
                    <label htmlFor="name"><b style={{color:"white",fontFamily:`"Lucida Console","Courier New",monospace`}}>Name</b></label>
                    <input 
                     type="text" 
                     placeholder="Enter Name" 
                     name="name" 
                     value={this.state.name}
                     onChange={this.handleChange}
                     />

                    <label htmlFor="emailid"><b style={{color:"white",fontFamily:`"Lucida Console","Courier New",monospace`}}>Email Address</b></label>
                    <input 
                     type="text" 
                     placeholder="Enter Email Address" 
                     name="emailid" 
                     value={this.state.emailid}
                     onChange={this.handleChange}
                     />
                     <label htmlFor="rollNo"><b style={{color:"white",fontFamily:`"Lucida Console","Courier New",monospace`}}>Roll Number</b></label>
                    <input 
                     type="number" 
                     placeholder="Enter Roll No." 
                     name="rollNo" 
                     value={this.state.rollNo}
                     onChange={this.handleChange}
                     />
                    <label htmlFor="password"><b style={{color:"white",fontFamily:`"Lucida Console","Courier New",monospace`}}>Password</b></label>
                    <input 
                     type="password" 
                     placeholder="Enter Password" 
                     name="password" 
                     value={this.state.password}
                     onChange={this.handleChange}
                    />
                    <h6 style={{color:"green"}}>The Password Must be of Atleast 6 Characters Long and can be Alpha-Numeric*</h6>
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
        );
    }
}
export default RegisterUser;