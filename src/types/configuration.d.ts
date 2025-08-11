export type AppConfiguration = {
  cache: CacheConfiguration;
  db: DataSourceConfiguration;
  server: ServerConfiguration;
  swagger: SwaggerConfiguration;
};

export type CacheConfiguration = {
  connectionUrl: string;
  url: {
    prefix: string;
    ttlSeconds: number;
  };
};

export type DataSourceConfiguration = {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
};

export type ServerConfiguration = {
  host: string;
  port: number;
};

export type SwaggerConfiguration = {
  username: string;
  password: string;
};
