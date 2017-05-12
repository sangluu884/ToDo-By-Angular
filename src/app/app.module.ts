import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { AppRoutingModule } from './app-routing.module';

import { TaskService }         	from './task.service';
import { AppComponent } from './app.component';
import { AllComponent } from './all.component';
import { ActiveComponent } from './active.component';
import { CompletedComponent } from './completed.component';

@NgModule({
  declarations: [
    AppComponent,
	AllComponent,
	ActiveComponent,
	CompletedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
	InMemoryWebApiModule.forRoot(InMemoryDataService),
	AppRoutingModule
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
