declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    [key: string]: string | undefined;
  }
}

declare var process: {
  env: {
    NODE_ENV: 'development' | 'production';
    [key: string]: string | undefined;
  }
};