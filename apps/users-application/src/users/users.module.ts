import {
	ApolloFederationDriver,
	ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { ApolloServerPluginInlineTrace } from '@apollo/server/plugin/inlineTrace';
import { resolve } from 'path';

@Module({
	providers: [UsersResolver, UsersService],
	imports: [
		GraphQLModule.forRoot<ApolloFederationDriverConfig>({
			driver: ApolloFederationDriver,
			autoSchemaFile: {
				path: resolve(__dirname, 'schema.gql'),
				federation: 2,
			},
			plugins: [ApolloServerPluginInlineTrace()],
		}),
	],
})
export class UsersModule {}
