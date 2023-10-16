import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "id")')
export class User {
	@Field(() => ID, { complexity: 0 })
	id: number;

	@Field({ complexity: 0 })
	name: string;
}
