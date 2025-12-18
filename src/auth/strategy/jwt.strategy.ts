import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Request } from 'express';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

interface JwtPayload {
  sub: string;
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    const secret = config.get<string>('SECRET_KEY');
    if (!secret) {
      throw new Error('SECRET_KEY is not defined');
    }
    const options: StrategyOptions = {
      jwtFromRequest: (req) => {
        // Custom extractor that passes the request context
        const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req) as
          | string
          | null;
        // Store request in a way that can be accessed in validate
        if (req) {
          (req as any)._jwtStrategyReq = req;
        }
        return token;
      },
      secretOrKey: secret,
      passReqToCallback: true,
    };

    super(options);
  }

  async validate(
    req: Request,
    payload: JwtPayload,
  ): Promise<Omit<User, 'hash'>> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
    });

    if (!user) {
      throw new UnauthorizedException(
        'You are not authorized to perform this action',
      );
    }

    // Remove password hash from user data before returning
    const { hash, ...userWithoutHash } = user;
    return userWithoutHash;
  }
}
