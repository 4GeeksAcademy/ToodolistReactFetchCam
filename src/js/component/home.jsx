
import React, { useState, useEffect } from "react";
import TodoList from "./Todolist";


const Home = ( ) => {
	const [ tasks, setTasks ]= useState ([])
	
	useEffect( ()=> { getTodolist()}, [] )
    
   
	function getTodolist () { 
    
	fetch ( 'https://playground.4geeks.com/apis/fake/todos/user/cam')
    .then(response => {
	if (!response.ok) {
	   throw Error(response.statusText);
	}
    // Read the response as json.
	 return response.json();
     })
    .then(responseAsJson => {
    // Do stuff with the JSONified response
	 setTasks(responseAsJson);
     })
    .catch(error => {
	    console.log('Looks like there was a problem: \n', error);
    });

	}

	const listItems = tasks.map (task => <li> (task)</li>);
	return( 
	
		<div className="text-center">
			
			<h1 className="text-center mt-5">Todolist</h1>
			<TodoList>
				<ul>{listItems}</ul> ;
				</TodoList>
			
		</div>
	);
};

export default Home;
