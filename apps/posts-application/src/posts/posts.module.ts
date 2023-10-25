import {
	ApolloFederationDriver,
	ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { User } from './models/user.model';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';
import { UsersResolver } from './users.resolver';
import { ApolloServerPluginInlineTrace } from '@apollo/server/plugin/inlineTrace';
import { resolve } from 'path';
import { PostDataLoaderService } from './post-dataloader.service';

@Module({
	imports: [
		GraphQLModule.forRoot<ApolloFederationDriverConfig>({
			driver: ApolloFederationDriver,
			autoSchemaFile: {
				path: resolve(__dirname, 'schema.gql'),
				federation: 2,
			},
			plugins: [ApolloServerPluginInlineTrace()],
			buildSchemaOptions: {
				orphanedTypes: [User],
			},
			context: ({ req, res }: any) => ({ req, res }),
		}),
	],
	providers: [
		PostsService,
		PostsResolver,
		UsersResolver,
		PostDataLoaderService,
	],
})
export class PostsModule {}
