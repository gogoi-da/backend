import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupDto, SigninDto, RefreshDto } from './dto';
import { SignupResponse, SigninResponse, RefreshResponse } from './response';
import * as bcrypt from 'bcrypt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

interface JwtPayload {
  sub: string;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Sign a token for a user
   * @param userId - The user's ID
   * @param email - The user's email
   * @returns The signed token
   */
  private async signToken(userId: string, email: string) {
    const payload: JwtPayload = {
      sub: userId,
      email,
    };

    const secret = this.configService.get<string>('SECRET_KEY');
    if (!secret) {
      throw new Error('SECRET_KEY is not defined');
    }

    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: '6h',
      secret,
    });

    const refresh_token = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
      secret,
    });

    return {
      access_token,
      refresh_token,
    };
  }
  async signup(dto: SignupDto): Promise<SignupResponse> {
    try {
      // Check if user already exists
      const existingUser = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });

      if (existingUser) {
        throw new BadRequestException({
          message: {
            title: 'Registration Failed',
            subTitle: 'User with this email already exists',
          },
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(dto.password, 10);

      // Create user
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash: hashedPassword,
          name: dto.name,
          phone: dto.phone,
          language: dto.language || 'en',
          isPremium: dto.isPremium || false,
          ...(dto.examId && { examId: dto.examId }),
        },
        select: {
          id: true,
          email: true,
          name: true,
          phone: true,
          language: true,
          isPremium: true,
          isFirstLogin: true,
          examId: true,
        },
      });

      // Generate tokens
      const tokens = await this.signToken(user.id, user.email);

      return {
        message: {
          title: 'Success',
          subTitle: 'Account created successfully',
        },
        data: {
          ...tokens,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            phone: user.phone,
            language: user.language,
            isPremium: user.isPremium,
            isFirstLogin: user.isFirstLogin,
            examId: user.examId,
          },
        },
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException({
            message: {
              title: 'Registration Failed',
              subTitle: 'Email already exists',
            },
          });
        }
      }

      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new BadRequestException({
        message: {
          title: 'Registration Failed',
          subTitle: 'Failed to create user',
        },
      });
    }
  }

  async signin(dto: SigninDto): Promise<SigninResponse> {
    try {
      // Find user by email
      const user = await this.prisma.user.findUnique({
        where: { email: dto.email },
        select: {
          id: true,
          email: true,
          hash: true,
          name: true,
          phone: true,
          language: true,
          isPremium: true,
          isFirstLogin: true,
          examId: true,
        },
      });

      if (!user) {
        throw new BadRequestException({
          message: {
            title: 'Authentication Failed',
            subTitle: 'Invalid email or password',
          },
        });
      }

      // Verify password
      const passwordMatches = await bcrypt.compare(dto.password, user.hash);
      if (!passwordMatches) {
        throw new BadRequestException({
          message: {
            title: 'Authentication Failed',
            subTitle: 'Invalid email or password',
          },
        });
      }

      // Update isFirstLogin to false since user is logging in (already registered)
      const updatedUser = await this.prisma.user.update({
        where: { id: user.id },
        data: { isFirstLogin: false },
        select: {
          id: true,
          email: true,
          name: true,
          phone: true,
          language: true,
          isPremium: true,
          isFirstLogin: true,
          examId: true,
        },
      });

      // Generate tokens
      const tokens = await this.signToken(updatedUser.id, updatedUser.email);

      return {
        message: {
          title: 'Success',
          subTitle: 'Logged in successfully',
        },
        data: {
          ...tokens,
          user: {
            id: updatedUser.id,
            email: updatedUser.email,
            name: updatedUser.name,
            phone: updatedUser.phone,
            language: updatedUser.language,
            isPremium: updatedUser.isPremium,
            isFirstLogin: updatedUser.isFirstLogin,
            examId: updatedUser.examId,
          },
        },
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException({
        message: {
          title: 'Authentication Failed',
          subTitle: 'Failed to sign in',
        },
      });
    }
  }

  async refresh(dto: RefreshDto): Promise<RefreshResponse> {
    try {
      const secret = this.configService.get<string>('SECRET_KEY');
      if (!secret) {
        throw new Error('SECRET_KEY is not defined');
      }

      // Verify the refresh token
      const payload = await this.jwtService.verifyAsync<JwtPayload>(
        dto.refresh_token,
        { secret },
      );

      // Check if user still exists
      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });

      if (!user) {
        throw new UnauthorizedException({
          message: {
            title: 'Token Refresh Failed',
            subTitle: 'User not found',
          },
        });
      }

      // Generate new tokens
      const tokens = await this.signToken(user.id, user.email);

      return {
        message: {
          title: 'Success',
          subTitle: 'Token refreshed successfully',
        },
        data: tokens,
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException({
        message: {
          title: 'Token Refresh Failed',
          subTitle: 'Invalid or expired refresh token',
        },
      });
    }
  }
}
