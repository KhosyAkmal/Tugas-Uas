import React, { Component, Fragment } from "react";
import "./Dashboard.scss";
import {
  addDataToAPI,
  getDataFromAPI,
  updateDataFromAPI,
  deleteDataFromAPI,
} from "../../../config/redux/action";
import { connect } from "react-redux";
import  {Container, Row, Col} from 'react-bootstrap';


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
        
        <div>
          <Container>
            <Row classname="justify-content-md-center">
              <Col>
              <br/>
              <br/>
              <h2 align="center" >Selamat Datang</h2>
              <h3 align="center" >Website ini bertujuan untuk mencatat barang yang akan masuk ke Gudang dari Supplier</h3>
              <hr/>
              <div align="center">
              {userData != null? <button href="./login" onClick={this.handleLS}> Logout</button> : null}
              </div>
              
              
              </Col>
  
            
            </Row>
          </Container>
        
      </div>
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
