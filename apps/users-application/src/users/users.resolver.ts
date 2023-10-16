import { Args, ID, Query, Resolver, ResolveReference } from '@nestjs/graphql';
import { User } from './models/user.model';
import { UsersService } from './users.service';
import { UserDataLoaderService } from './user-dataloader.service';

@Resolver(() => User)
export class UsersResolver {
	constructor(
		private usersService: UsersService,
		private userDataLoaderService: UserDataLoaderService,
	) {}

	@Query(() => User, { nullable: true })
	user(@Args({ name: 'id', type: () => ID }) id: number): User | null {
		return this.usersService.findById(id);
	}

	@Query(() => [User])
	users(): User[] {
		return this.usersService.findAll();
	}

	@ResolveReference()
	resolveReference(reference: {
		__typename: string;
		id: number;
	}): Promise<User | null> {
		return this.userDataLoaderService.loader.load(reference.id);
	}
}
