import { Int, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Post } from './models/post.model';
import { User } from './models/user.model';
import { PostDataLoaderService } from './post-dataloader.service';

@Resolver(() => User)
export class UsersResolver {
	constructor(private readonly postDataLoaderService: PostDataLoaderService) {}

	@ResolveField(() => [Post])
	public posts(@Parent() user: User): Promise<Post[]> {
		return this.postDataLoaderService.loader.load(user.id);
	}

	@ResolveField(() => Int)
	public postCount(@Parent() user: User): Promise<number> {
		return this.postDataLoaderService.loader.load(user.id).then(r => r.length);
	}
}
