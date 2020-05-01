import React, { Component } from 'react'; // every react component needs this line
import {Link} from 'react-router-dom';
import axios from 'axios';

// implemented as a function react component
// has a lack of state and did mount methods

// href, since it is going to nothing, should be changed to a button (best practice)
const Exercise = props => (
    <tr>
      <td>{props.exercise.username}</td>
      <td>{props.exercise.description}</td>
      <td>{props.exercise.duration}</td>
      <td>{props.exercise.date.substring(0,10)}</td>
      <td> 
        <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
      </td>
    </tr>
)

// implemented as a class component
export default class ExercisesList extends Component {

    constructor(props){
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);

        this.state = {exercises: []};
    }

    componentDidMount(){
        axios.get('http://localhost:5000/exercises/')
            .then(response => {
                this.setState({
                    exercises: response.data // gets all the data from the exercise 
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteExercise(id) {
        axios.delete('http://localhost:5000/exercises/' + id)
            .then(res => console.log(res.data));
        this.setState({ // this.setState automatically updates the page with react
            exercises: this.state.exercises.filter(el => el._id !== id) // el is elemetn
        })
    }

    exerciseList() {
        return this.state.exercises.map(currentexercise => { // for every exercise it will return a component, below
          return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
        })
    }

    onSubmit(e) {
        e.preventDefault(); // won't do what it was originally programmed to do

        window.location = '/create'; // takes the user back to the list of exercieses
    }

    render() {
        return (
            <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                <tbody>
                    { this.exerciseList() }
                </tbody>
                </table>

                <div classname = "form-group">
                    <input type="submit" value="Create Exercise" className="btn btn-primary"/>
                </div>
            </div>
        )
    }
}