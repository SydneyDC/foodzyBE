import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

// authGuard for GraphQL queries & mutations if ever using a DB
export class GqlAuthGuard extends AuthGuard('jwt') {
   getRequest(context: ExecutionContext): any {
      const ctx = GqlExecutionContext.create(context);
      return ctx.getContext().req;
   }
}
