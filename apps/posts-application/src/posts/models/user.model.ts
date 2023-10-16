import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Post } from './post.model';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class User {
	@Field(() => ID, { complexity: 0 })
	@Directive('@external')
	id: number;

	@Field(() => [Post], { complexity: 1 })
	posts?: Post[];
}
