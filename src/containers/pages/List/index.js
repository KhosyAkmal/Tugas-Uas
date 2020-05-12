import React, { Component, Fragment } from "react";
import "./List.scss";
import {
  addDataToAPI,
  getDataFromAPI,
  updateDataFromAPI,
  deleteDataFromAPI,
} from "../../../config/redux/action";
import { connect } from "react-redux";


class List extends Component {
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

  updateNotes = (note) => {
    console.log(note);
    const { history } = this.props;
    history.push({
      pathname: '/add',
      state: {
        title: note.data.title,
        content: note.data.content,
        textButton: "UPDATE",
        noteId: note.id,}
    })
  };

  deleteNote = (e, note) => {
    e.stopPropagation();
    const { deleteNote } = this.props;
    const userData = JSON.parse(localStorage.getItem("userData"));
    const data = {
      userId: userData.uid,
      noteId: note.id,
    };
    deleteNote(data);
  };


  render() {
    const { title, content, date, textButton } = this.state;
    const { notes } = this.props;
    const { updateNotes, cancelUpdate, deleteNote } = this;
    console.log("notesss: ", notes);
    return (
      <div className="container">
        <h1>List Barang</h1>
        <hr />
        {notes.length > 0 ? (
          <Fragment>
            {notes.map((note) => {
              return (
                <div
                  className="card-content"
                  key={note.id}
                  onClick={() => 
                    updateNotes(note)
                  }
                >
                  <p className="title">{note.data.title}</p>
                  <p className="date"> {note.data.date}</p>
                  <p className="content">{note.data.content}</p>
                  <div
                    className="delete-btn"
                    onClick={(e) => deleteNote(e, note)}
                  >
                    X
                  </div>
                </div>
              );
            })}
          </Fragment>
        ) : null}
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



export default connect(reduxState, reduxDispatch)(List);
