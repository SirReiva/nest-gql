import { Directive, Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Post } from './post.model';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class User {
	@Field(() => ID)
	@Directive('@external')
	id: number;

	@Field(() => [Post])
	posts: Post[];

	@Field(() => Int)
	postCount: number;
}
