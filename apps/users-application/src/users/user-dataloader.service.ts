import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import DataLoader from 'dataloader';
import { User } from './models/user.model';

@Injectable()
export class UserDataLoaderService {
	public loader = new DataLoader<number, User | null>(async ids => {
		const users = this.usersService.findByIds([...ids]);
		return ids.map(id => users.find(u => u.id === Number(id)) || null);
	});
	constructor(private usersService: UsersService) {}
}
