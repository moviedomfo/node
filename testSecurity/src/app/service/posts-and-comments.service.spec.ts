import { TestBed, inject } from '@angular/core/testing';

import { PostsAndCommentsService } from './posts-and-comments.service';

describe('PostsAndCommentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostsAndCommentsService]
    });
  });

  it('should be created', inject([PostsAndCommentsService], (service: PostsAndCommentsService) => {
    expect(service).toBeTruthy();
  }));
});
