import { AuthGuard } from '@nestjs/passport';

//rest api authguard
export class JwtAuthGuard extends AuthGuard('jwt') {}
