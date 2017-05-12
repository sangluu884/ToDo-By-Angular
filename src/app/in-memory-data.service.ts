import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
 
  createDb() {
    let tasks = [
      {id: 1, name: 'Mr. Nice', status:true, completed:false},
      {id: 2, name: 'Narco', status:false, completed:false}
    ];
    return {tasks};
  }
}
