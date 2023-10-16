import { Directive, Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { User } from './user.model';

@ObjectType()
@Directive('@key(fields: "id")')
export class Post {
	@Field(() => ID, { complexity: 0 })
	id: number;

	@Field()
	title: string;

	@Field(() => Int, { complexity: 0 })
	authorId: number;

	@Field(() => User, { complexity: 1 })
	user?: User;
}
