import React, { Component, Fragment } from "react";
import "./Add.scss";
import {
  addDataToAPI,
  getDataFromAPI,
  updateDataFromAPI,
  deleteDataFromAPI,
} from "../../../config/redux/action";
import { connect } from "react-redux";


class Add extends Component {
  state = {
    title: "",
    content: "",
    date: "",
    textButton: "SIMPAN",
    noteId: "",
  };

  // getDataFirebase = () => {
  //     const starCountRef = firebase.database().ref('posts/' + postId + '/starCount');
  // }

  componentDidMount() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    // console.log('dashboard : ', JSON.parse(userData))
    this.props.getNotes(userData.uid);
  }

  handleSaveNotes = () => {
    const { title, content, textButton, noteId } = this.state;
    const { saveNotes, updateNotes, history } = this.props;
    const userData = JSON.parse(localStorage.getItem("userData"));
    const data = {
      title: title,
      content: content,
      date: new Date().getTime(),
      userId: userData.uid,
    };

    

    if (textButton === "SIMPAN") {
      saveNotes(data);
    } else {
      data.noteId = noteId;
      updateNotes(data);
    }
    console.log(data);
    history.push('/list')
  };

  onInputChange = (e, type) => {
    this.setState({
      [type]: e.target.value,
    });
  };

  updateNotes = (state) => {
    console.log(state);
    this.setState({
      title: state.data.title,
      content: state.data.content,
      textButton: "UPDATE",
      stateId: state.id,
    });
  };

  cancelUpdate = () => {
    this.setState({
      title: "",
      content: "",
      textButton: "SIMPAN",
    });
  };


  render() {
    const { title, content, textButton } = this.state;
    const { state } = this.props.location;
    
    return (
      <div className="container">

        <div className="input-form">
          <input
            placeholder="title"
            className="input-title"
            value={title}
            placeholder={state != null ? state.title : "title"}
            onChange={(e) => this.onInputChange(e, "title")}
          />
          <textarea
            placeholder="content"
            className="input-content"
            value={content}
            placeholder={state != null ? state.content : "content"}
            onChange={(e) => this.onInputChange(e, "content")}
          ></textarea>
          {
          textButton === "UPDATE"? (
            <button
              className="save-btn"
              onClick={this.handleSaveNotes}
              onClick={this.cancelUpdate}
            >
              Cancel
            </button>
          ) : null}

          <br></br>
          <button className="save-btn" onClick={this.handleSaveNotes}>
            {textButton}
          </button>
        </div>
        <hr />
      </div>
    );
  }
}

const reduxState = (state) => ({
  userData: state.user,
  notes: state.notes,
  state: state.notes
});

const reduxDispatch = (dispatch) => ({
  saveNotes: (data) => dispatch(addDataToAPI(data)),
  getNotes: (data) => dispatch(getDataFromAPI(data)),
  updateNotes: (data) => dispatch(updateDataFromAPI(data)),
  deleteNote: (data) => dispatch(deleteDataFromAPI(data)),
});



export default connect(reduxState, reduxDispatch)(Add);
