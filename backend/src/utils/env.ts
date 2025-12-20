export function required(envName: string): string {
  const enviroment = process.env[envName];

  if (!enviroment) {
    throw new Error(`Enviroment variable missing: ${envName}`);
  }

  return enviroment;
}
