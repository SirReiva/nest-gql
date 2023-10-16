import { IntrospectAndCompose } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import depthLimit from 'graphql-depth-limit-ts';
import { ApolloServerPluginInlineTrace } from '@apollo/server/plugin/inlineTrace';

@Module({
	imports: [
		GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
			driver: ApolloGatewayDriver,
			gateway: {
				supergraphSdl: new IntrospectAndCompose({
					subgraphs: [
						{ name: 'users', url: 'http://localhost:3002/graphql' },
						{ name: 'posts', url: 'http://localhost:3003/graphql' },
					],
				}),
				pollIntervalInMs: 2000,
				debug: true,
			},
			server: {
				playground: true,
				validationRules: [depthLimit(3)],
				plugins: [ApolloServerPluginInlineTrace()],
			},
		}),
	],
})
export class AppModule {}
