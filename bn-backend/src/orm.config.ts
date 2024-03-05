import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const config: TypeOrmModuleOptions = {
    type: 'postgres', //postgres
    logging: true,
  synchronize: true,
};
export default config;