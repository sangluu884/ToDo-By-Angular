import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Task } from './task';

@Injectable()
export class TaskService{
	tasks:Task[];
	
	private tasksUrl = 'api/tasks';  // URL to web api
	private headers = new Headers({'Content-Type': 'application/json'});
	
	constructor(private http: Http) { }
	
	getTasks(): Promise<Task[]> {
		return this.http.get(this.tasksUrl)
				   .toPromise()
				   .then(response => response.json().data as Task[])
				   .catch(this.handleError);
	}
	
	// Get all the tasks with their status are true
	getTasksActive(active: boolean): Promise<Task[]> {
		return this.getTasks()
					.then(tasks => tasks.filter(task => (task.status == active)&&(task.completed == false)));
	}
	
	// Get all the tasks with their status are true
	getTasksCompleted(completed:boolean): Promise<Task[]> {
		return this.getTasks()
					.then(tasks => tasks.filter(task => task.completed == completed));
	}
	
	create(name: string): Promise<Task> {
	  return this.http
		.post(this.tasksUrl, JSON.stringify({name: name, status:false, completed:false}), {headers: this.headers})
		.toPromise()
		.then(res => res.json().data as Task)
		.catch(this.handleError);	
	}
	
	delete(id: number): Promise<void> {
	  const url = `${this.tasksUrl}/${id}`;
	  return this.http.delete(url, {headers: this.headers})
		.toPromise()
		.then(() => null)
		.catch(this.handleError);
	}
	
	// test delete 2
	// deleteCompleted(completed: boolean): Promise<void> {
	  // const url = `${this.tasksUrl}/${completed}`;
	  // return this.http.delete(url, {headers: this.headers})
		// .toPromise()
		// .then(() => null)
		// .catch(this.handleError);
	// }
	
	// test delete 1
	deleteCompleted():Promise<Task[]>{
		return this.getTasksCompleted(false)
					.then(tasks => this.tasks = tasks);
	}
	
	update(task: Task): Promise<Task> {	
		const url = `${this.tasksUrl}/${task.id}`;
		return this.http
		  .put(url, JSON.stringify(task), {headers: this.headers})
		  .toPromise()
		  .then(() => task)
		  .catch(this.handleError);
	}
				
	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}
}