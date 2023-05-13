import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/infraestructure/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerModule } from './player/infraestructure/player.module';
import { TeamModule } from './team/infraestructure/team.module';
import { ChampionshipModule } from './championship/infraestructure/championship.module';
import { DisciplineModule } from './discipline/infraestructure/discipline.module';
import { SportFieldModule } from './sport-field/infraestructure/sport-field.module';
import { TypeFieldModule } from './type-field/infraestructure/typeField.module';
import { AuthModule } from './auth/infraestructure/auth.module';
import { AuthMiddleware } from './auth/infraestructure/middlewares/auth.middleware';
import { ProgrammingModule } from './programming/infraestructure/programming.module';
import { GroupsModule } from './groups/infraestructure/groups.module';
import { ScoreModule } from './score/infraestructure/score.module';


const ENV = process.env.NODE_ENV;
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: !ENV ? '.env' : `.env.${ENV}` }),    
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}', __dirname + '/**/*.view{.ts,.js}'],
      }),
    UserModule,
    PlayerModule,
    TeamModule,
    ChampionshipModule,
    SportFieldModule,
    TypeFieldModule,
    DisciplineModule,
    AuthModule,
    ProgrammingModule,
    GroupsModule,
    ScoreModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
