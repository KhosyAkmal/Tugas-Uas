import React, {Component, Fragment} from 'react';
import './Dashboard.scss'
import { addDataToAPI, getDataFromAPI, updateDataFromAPI } from '../../../config/redux/action';
import { connect } from 'react-redux';

class Dashboard extends Component {
    state = {
        title: '',
        content: '',
        date: '',
        textButton: 'SIMPAN',
        noteId: ''
    }

    // getDataFirebase = () => {
    //     const starCountRef = firebase.database().ref('posts/' + postId + '/starCount');
    // }

    componentDidMount() {
        const userData = JSON.parse(localStorage.getItem('userData'));
        // console.log('dashboard : ', JSON.parse(userData))
        this.props.getNotes(userData.uid);
    }
    
    handleSaveNotes = () => {
        const {title, content, textButton, noteId} = this.state;
        const {saveNotes, updateNotes} = this.props;
        const userData = JSON.parse(localStorage.getItem('userData'))
        const data = {
            title: title,
            content: content,
            date: new Date().getTime(),
            userId: userData.uid
        }

        if(textButton === 'SIMPAN'){
            saveNotes(data)
        } else {
            data.noteId = noteId
            updateNotes(data)  
        }
        console.log(data)
    }

    onInputChange = (e, type) => {
        this.setState({
            [type] : e.target.value
        })
    }

    updateNotes = (note) => {
        console.log(note)
        this.setState({
            title: note.data.title,
            content: note.data.content,
            textButton: 'UPDATE',
            noteId: note.id

        })
    }

    cancelUpdate = () => {
        this.setState({
            title: '',
            content: '',
            textButton: 'SIMPAN'
        })
    }

    render(){
        const {title, content, date, textButton} = this.state;
        const {notes} = this.props
        const {updateNotes} = this;
        console.log('notesss: ',notes)
        return(
            <div className="container">
                <div className="input-form">
                    <input placeholder="title" className="input-title" value={title} onChange={(e) =>this.onInputChange(e, 'title')}/>
                    <textarea placeholder="content" className="input-content" value={content} onChange={(e) =>this.onInputChange(e, 'content')}>

                    </textarea>
                    {
                        textButton === 'UPDATE' ? (
                            <button className="save-btn" onClick={this.handleSaveNotes} onClick={this.cancelUpdate}>Cancel</button>
                        ) : null
                    }
                    
                    <br></br>
                    <button className="save-btn" onClick={this.handleSaveNotes}>{textButton}</button>
                    
                </div>
                <hr/>
                {
                    notes.length > 0 ? (
                        <Fragment>
                            {
                                notes.map(note=> {
                                    return (
                                        <div className="card-content" key={note.id} onClick={() => updateNotes(note)} >
                                            <p className="title">{note.data.title}</p>
                                            <p className="date">{note.data.date}</p>
                                            <p className="content">{note.data.content}</p>
                                        </div>
                                    )
                                })
                            }
                        </Fragment>
                    ) : null
                }
            </div>
        )
    }
}

const reduxState = (state) => ({
    userData: state.user,
    notes: state.notes
})

const reduxDispatch = (dispatch) => ({
    saveNotes : (data) => dispatch(addDataToAPI(data)),
    getNotes: (data) => dispatch(getDataFromAPI(data)),
    updateNotes: (data) => dispatch(updateDataFromAPI(data)),
})

export default connect(reduxState, reduxDispatch) (Dashboard);