import { Injectable } from '@nestjs/common';
import DataLoader from 'dataloader';
import { Post } from './models/post.model';
import { PostsService } from './posts.service';

@Injectable()
export class PostDataLoaderService {
	public loader = new DataLoader<number, Array<Post>>(async ids => {
		const posts = this.postsService.findAllByAuthorIds([...ids]);
		return ids.map(id => posts.filter(p => p.authorId === Number(id)));
	});
	constructor(private readonly postsService: PostsService) {}
}
