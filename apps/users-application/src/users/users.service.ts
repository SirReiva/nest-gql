import { Injectable } from '@nestjs/common';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
	private users: User[] = [
		{ id: 1, name: 'John Doe' },
		{ id: 2, name: 'Richard Roe' },
	];

	findById(id: number): User | null {
		return this.users.find(user => user.id === Number(id)) || null;
	}

	findAll(): User[] {
		return this.users;
	}

	findByIds(ids: number[]): User[] {
		const numIds = ids.map(id => Number(id));
		return this.users.filter(u => numIds.includes(u.id));
	}
}
