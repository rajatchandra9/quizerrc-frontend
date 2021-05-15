import React, { Component } from "react";
// import "./Signin.css";

class SignIn extends Component{
    constructor(props){
        super(props);
        this.state={
            username:"",
            password:"",
            isValid:true
        };
    }
    handleChange=(evt)=>{
        this.setState({ [evt.target.name]:evt.target.value,isValid:"true"});
    }
    handleSubmit=(evt)=>{
        evt.preventDefault();
        alert(`You are signing as ${this.state.username}`);
        fetch("https://quizerrc-backend.herokuapp.com/signin",{
            method:"post",
            headers: {"Content-Type":'application/json'},
            body: JSON.stringify({
                email:this.state.username,
                password:this.state.password,
                userType:"normal"
            })
        })
         .then(response=>response.json())
         .then(result=>{
             if(result.msg==="Successful"){
                 alert("Login Successful");
               // window.location.href=`${window.location.href}/newscene` ;
                this.props.changeSuccess(true,"normal");
                this.props.changeCurrentUser(result.data.name,result.data._id);  
                const nextUrl=`${window.location.href}/${result.data._id}/quiz/user`;
                window.history.pushState(null,"",nextUrl);
                window.history.replaceState(null,"",nextUrl);   
             }
             else{
                 this.setState({isValid:false});
                //  alert("Status Code :204 Invalid Credentials! Try again to login");
             }
         })
        this.setState({ username:"",password:""})
    }
    handleAdminLogin=(evt)=>{
        evt.preventDefault();
        alert(`You are signing as ${this.state.username}`);
        fetch("https://quizerrc-backend.herokuapp.com/signin",{
            method:"post",
            headers: {"Content-Type":'application/json'},
            body: JSON.stringify({
                email:this.state.username,
                password:this.state.password,
                userType:"admin"
            })
        })
         .then(response=>response.json())
         .then(result=>{
             if(result.msg==="Successful"){
                 alert("Login Successful");
               // window.location.href=`${window.location.href}/newscene` ;
                this.props.changeSuccess(true,"admin");
                this.props.changeCurrentUser(result.data.name,result.data._id);  
                const nextUrl=`${window.location.href}/${result.data._id}/quiz/admin`;
                window.history.pushState(null,"",nextUrl);
                window.history.replaceState(null,"",nextUrl);   
             }
             else{
                 this.setState({isValid:false});
                //  alert("Status Code :204 Invalid Credentials! Try again to login");
             }
         })
        this.setState({ username:"",password:""})
    }
    render(){
        return(
            <div style={{backgroundColor:"black"}}>
            <div className="container">               
                    <h2 style={{color:"white"}}>Login to attempt quiz</h2>
                    {/* <div className="imgcontainer">
                        <img src={avtimg} alt="Avatar" length={151.91} width={151.91} className="avatar"/>
                    </div> */}
                    {!this.state.isValid && <h6 style={{color:"red"}}>Invalid Username or Password*</h6>}
                    <form onSubmit={this.handleSubmit}>
                    <div className="container">
                        <label htmlFor="username"><b style={{color:"white"}}>Username</b></label>
                        <input 
                         type="text" 
                         placeholder="Enter Username" 
                         name="username" 
                         value={this.state.username}
                         onChange={this.handleChange}
                         />

                        <label htmlFor="password"><b style={{color:"white"}}>Password</b></label>
                        <input 
                         type="password" 
                         placeholder="Enter Password" 
                         name="password" 
                         value={this.state.password}
                         onChange={this.handleChange}
                        />
                        <button type="submit">Login</button>
                        <button onClick={this.handleAdminLogin}>Login As Admin</button>
                        {/* <div>
                        <label style={{color:"white"}}>  
                            <input type="checkbox" defaultChecked name="remember"/> Remember me
                        </label>
                        </div> */}
                        {/* <span className="psw" style={{color:"white"}}>Forgot <a href="/reset">Password?</a></span> */}
                    </div>
                </form>
            </div>
            </div>
        );
    }
}
export default SignIn;