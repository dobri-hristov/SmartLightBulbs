export const fromEnvReactApp = () => {
  const ENV_KEY = "REACT_APP_AWS_ACCESS_KEY_ID";
  const ENV_SECRET = "REACT_APP_AWS_SECRET_ACCESS_KEY";
  const ENV_SESSION = "REACT_APP_AWS_SESSION_TOKEN";
  const ENV_EXPIRATION = "REACT_APP_AWS_CREDENTIAL_EXPIRATION";

  return () => {
    const accessKeyId = process.env[ENV_KEY];
    const secretAccessKey = process.env[ENV_SECRET];
    const expiry = process.env[ENV_EXPIRATION];

    return accessKeyId && secretAccessKey
      ? Promise.resolve({
          accessKeyId: accessKeyId,
          secretAccessKey: secretAccessKey,
          sessionToken: process.env[ENV_SESSION],
          expiration: expiry ? new Date(expiry) : undefined,
        })
      : Promise.reject(
          new Error("Unable to find environment variable credentials.")
        );
  };
};
