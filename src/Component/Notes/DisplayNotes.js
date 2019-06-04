import React, { Component } from 'react';
import firebase from 'firebase';

const INITIAL_STATE = {
    notes: []
}

class DisplayNotes extends Component {
    constructor(props) {
        super(props);
        this.state = INITIAL_STATE;
    }

    componentDidMount() {
        this.db = firebase.database();
        this.listenForChange();
    }

    listenForChange = () => {
        this.db.ref('notes').on('child_added', snapshot => {
            let note = {
                id: snapshot.key,
                title: snapshot.val().title,
                note: snapshot.val().note
            }
            let notes = this.state.notes;
            notes.push(note);
            this.setState({
                notes: notes
            })
        });

        this.db.ref('notes').on('child_removed', snapshot => {
            let notes = this.state.notes;
            notes = notes.filter(note => note.id !== snapshot.key);
            this.setState({
                notes: notes
            })
        });
    }

    removeNoteHandler = (id) => {
        this.db.ref('notes').child(id).remove();
    }

    editClicked = (id) => {
        window.scroll(0, 0);
        this.db.ref('notes' + '/' + id).once('value').then(val => {
            let note = { title: val.val().title, note: val.val().note, id: id };
            this.props.editNoteHandler(note);
        })
    }

    componentWillReceiveProps(nextProps) {
        let notes = this.state.notes;
        if (nextProps.dataToBeUpdate) {
            notes.map((note) => {
                if (note.id === nextProps.dataToBeUpdate.editId) {
                    note.title = nextProps.dataToBeUpdate.title;
                    note.note = nextProps.dataToBeUpdate.note;
                }
                return;
            })
            this.setState({
                notes: notes
            })
        }
    }



    editNoteHandler = (dataToBeUpdate) => {

    }


    render() {
        let cardStyle = { width: '18rem', display: 'inline-block' };
        let notes = null;
        if (this.state.notes.length > 0) {
            notes = this.state.notes.map((n) => {
                return (
                    <div className="card m10 p10 mT20" style={cardStyle} key={n.id}>
                        <div className="card-body">
                            <h5 className="card-title">{n.title}</h5>
                            <p className="card-text">{n.note}</p>
                            <button className="btn btn-danger" onClick={() => this.removeNoteHandler(n.id)}>Delete</button>
                            <button className="btn btn-danger" onClick={() => this.editClicked(n.id)}>Edit</button>
                        </div>
                    </div>
                )
            });
        }

        return (
            <div>
                {notes}
            </div>
        )
    }
}

export default DisplayNotes;



