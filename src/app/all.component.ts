import { Component, OnInit } from '@angular/core';
import { Task } from './task';
import { TaskService } from './task.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent {
	tasks:Task[];
	task:Task;
	count='2';
	
	constructor(private taskService: TaskService) { }
	
	ngOnInit(): void {
		this.getTasks();
	}
	
	// Add task
	addTask(task: string): void {
		task = task.trim();
		if (!task) { return; }
		this.taskService
			.create(task)
			.then(task => {this.tasks.push(task);});
		this.getTasks();
		//this.deleteCompleted();
	}
	
	// Delete Task
	deleteTask(task: Task): void {
	  this.taskService
		  .delete(task.id)
		  .then(() => {
			this.tasks = this.tasks.filter(h => h !== task);
		  });
	}
	
	//Save Task
	saveTask(task:Task): void {
	  this.taskService
		.update(task)
		.then(() => task);
	}
	
	getTasks(): void {
		this.taskService
			.getTasks()
			.then(tasks => this.tasks = tasks);
	}
		
	deleteCompleted():void{
		this.taskService.deleteCompleted()
			.then(tasks => this.tasks = tasks);
	}
	
	deleteOrder() {
	  for(let i = 0; i < this.tasks.length; i++) {
		if (this.tasks[i].completed == true) {
			this.tasks.splice(i, 1);
			//break;
		}
	  }
	}
}