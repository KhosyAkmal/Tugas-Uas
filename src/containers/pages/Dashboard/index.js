import React, { Component, Fragment } from "react";
import "./Dashboard.scss";
import {
  addDataToAPI,
  getDataFromAPI,
  updateDataFromAPI,
  deleteDataFromAPI,
} from "../../../config/redux/action";
import { connect } from "react-redux";



class Dashboard extends Component {
  
  handleLS(){
    const userData = JSON.parse(localStorage.getItem("userData"));
        if (userData){
          JSON.parse(localStorage.clear("userData"));
        }
    
  }
 

  render() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    console.log("notesss: ", );
    return (
      <div>
        {
          userData != null? <button href="./login" onClick={this.handleLS}> Logout</button> : null
        }
        
      </div>
    );
  }
}

const reduxState = (state) => ({
  userData: state.user,
  notes: state.notes,
});

const reduxDispatch = (dispatch) => ({
  saveNotes: (data) => dispatch(addDataToAPI(data)),
  getNotes: (data) => dispatch(getDataFromAPI(data)),
  updateNotes: (data) => dispatch(updateDataFromAPI(data)),
  deleteNote: (data) => dispatch(deleteDataFromAPI(data)),
});



export default connect(reduxState, reduxDispatch)(Dashboard);
