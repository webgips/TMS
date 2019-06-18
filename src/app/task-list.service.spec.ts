import { TestBed } from '@angular/core/testing';

import { TaskListService } from './task-list.service';

describe('TaskListService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [TaskListService]
  }));

  it('should be created', () => {
    const service: TaskListService = TestBed.get(TaskListService);
    expect(service).toBeTruthy();
  });
});
