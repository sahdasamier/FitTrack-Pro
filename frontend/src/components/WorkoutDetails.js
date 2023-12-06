const WorkoutDetails = ({workout}) => {
   return(
    <div className="workout-details">
        <h4>{workout.title}</h4>
        <p> <strong>Load(kg): </strong> {workout.load}</p>
        <p> <strong>Reps: </strong> {workout.load}</p>
        <p>{workout.createdAt}</p> 
        {/* //that is automatic time stamp that mongodb added for us    */}

    </div>
    
   ) 
}

export default WorkoutDetails; 