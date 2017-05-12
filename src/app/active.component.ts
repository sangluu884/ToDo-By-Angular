import { Component, OnInit } from '@angular/core';
import { Task } from './task';
import { TaskService } from './task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./all.component.css']
})
export class ActiveComponent {
	tasks:Task[];
	
	constructor(private router: Router, private taskService: TaskService) { }
  
	ngOnInit(): void {
		 this.getTasks();
	}
	
	getTasks(): void {
		this.taskService
			.getTasksActive(true)
			.then(tasks => this.tasks = tasks);
	}
	
	// Add task
	addTask(task: string): void {
		task = task.trim();
		if (!task) { return; }
		this.taskService
			.create(task)
			.then(task => {this.tasks.push(task);});
		this.deleteCompleted();
	}
	
	// Delete Task
	deleteTask(task: Task): void {
	  this.taskService
		  .delete(task.id)
		  .then(() => {
			this.tasks = this.tasks.filter(h => h !== task);
			//if (this.selectedHero === hero) { this.selectedHero = null; }
		  });
	}
	
	//Save Task
	saveTask(task:Task): void {
	  this.taskService
		.update(task)
		.then(() => task);
	}
	
	goToAll(): void {
	  this.router.navigate(['/all']);
	}
	
	deleteCompleted():void{
		this.taskService.deleteCompleted()
			//.getTasksCompleted(false)
			.then(tasks => this.tasks = tasks);
	}
}
