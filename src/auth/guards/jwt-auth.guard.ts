import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";                       // password
import { IS_PUBLIC_KEY } from "../decorators/is-public.decorator"   // decorators
import { Observable } from "rxjs";


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (isPublic) {
      return true;
    }

    try {
      const canActivate = super.canActivate(context);

      if (canActivate instanceof Observable) {
        return canActivate;
      }

      return canActivate as boolean;
    } catch (err) {
      console.error('Erro de autorização: ', err);
      return false;
    }
  }
}