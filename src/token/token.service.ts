import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

dotenv.config();

interface TokenPayload {
  userId: string;
  login: string;
}

@Injectable()
export class TokenService {
  private readonly JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || '';
  private readonly JWT_SECRET_REFRESH_KEY =
    process.env.JWT_SECRET_REFRESH_KEY || '';
  private readonly TOKEN_EXPIRE_TIME = process.env.TOKEN_EXPIRE_TIME || '1h';
  private readonly TOKEN_REFRESH_EXPIRE_TIME =
    process.env.TOKEN_REFRESH_EXPIRE_TIME || '24h';

  constructor(private readonly jwtService: JwtService) {}

  async getAccessToken(payload: TokenPayload) {
    const options: JwtSignOptions = {
      secret: this.JWT_SECRET_KEY,
      expiresIn: this.TOKEN_EXPIRE_TIME,
    };

    return await this.jwtService.signAsync(payload, options);
  }

  async getRefreshToken(payload: TokenPayload) {
    const options: JwtSignOptions = {
      secret: this.JWT_SECRET_REFRESH_KEY,
      expiresIn: this.TOKEN_REFRESH_EXPIRE_TIME,
    };

    return await this.jwtService.signAsync(payload, options);
  }

  async verifyAccessToken(token: string) {
    const options: JwtVerifyOptions = { secret: this.JWT_SECRET_KEY };
    return await this.jwtService.verifyAsync(token, options);
  }

  async verifyRefreshToken(token: string) {
    try {
      const options: JwtVerifyOptions = { secret: this.JWT_SECRET_REFRESH_KEY };
      const { userId, login } = await this.jwtService.verifyAsync(
        token,
        options,
      );
      const accessToken = await this.getAccessToken({ userId, login });
      const refreshToken = await this.getRefreshToken({ userId, login });
      return { accessToken, refreshToken };
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new HttpException('Token expired', HttpStatus.FORBIDDEN);
      }
      if (
        error.name === 'JsonWebTokenError' &&
        error.message === 'jwt must be provided'
      ) {
        throw new HttpException(
          'Token must be provided',
          HttpStatus.UNAUTHORIZED,
        );
      }
    }
  }
}
