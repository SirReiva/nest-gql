import { IntrospectAndCompose } from '@apollo/gateway';
import { ApolloServerPluginInlineTrace } from '@apollo/server/plugin/inlineTrace';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Logger, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import depthLimit from 'graphql-depth-limit-ts';

const loggerBase = new Logger('GraphQLModule', { timestamp: true });
const logger = {
	debug: loggerBase.debug.bind(loggerBase),
	info: loggerBase.verbose.bind(loggerBase),
	error: loggerBase.error.bind(loggerBase),
	warn: loggerBase.warn.bind(loggerBase),
};

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
					pollIntervalInMs: 2000,
					logger,
					subgraphHealthCheck: true,
				}),
				pollIntervalInMs: 2000,
				debug: true,
				serviceHealthCheck: true,
				logger,
			},
			server: {
				playground: true,
				validationRules: [depthLimit(3)],
				plugins: [ApolloServerPluginInlineTrace()],
				logger,
			},
		}),
	],
	providers: [],
})
export class AppModule {}
