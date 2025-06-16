import 'dotenv/config';

import * as joi from 'joi';

interface EnvironmentVariables {
  WSO2_HOST: string;
  WSO2_PORT: string;
  WSO2_API_VERSION: string;
  API_GATEWAY_HOST: string;
  PORT: number;
  SESSION_SECRET: string;
  WSO2_CLIENT_ID: string;
  CLIENT_SECRET: string;
  ENCRYPTION_PASSWORD: string;
  API_URL: string;
}

const environmentSchema = joi
  .object<EnvironmentVariables>({
    WSO2_HOST: joi.string().uri().required(),
    WSO2_PORT: joi.string().required(),
    WSO2_API_VERSION: joi.string().required().default('v2'),
    API_GATEWAY_HOST: joi.string().required().default('localhost'),
    PORT: joi.number().default(10410),
    SESSION_SECRET: joi.string().default('s3cr3t'),
    WSO2_CLIENT_ID: joi.string().required(),
    CLIENT_SECRET: joi.string().required(),
    ENCRYPTION_PASSWORD: joi.string().default('IkIopwlWorpqUj'),
    API_URL: joi.string().uri().required().default('http://localhost:10410'),
  })
  .unknown();

const validationResult = environmentSchema.validate({
  ...process.env,
});
const error = validationResult.error;
const value = validationResult.value as EnvironmentVariables;
if (error) {
  throw new Error(`Invalid environment variables: ${error.message}`);
}
export const environment: EnvironmentVariables = value;
export const {
  WSO2_HOST,
  WSO2_PORT,
  WSO2_API_VERSION,
  API_GATEWAY_HOST,
  PORT,
  SESSION_SECRET,
  WSO2_CLIENT_ID,
  CLIENT_SECRET,
  ENCRYPTION_PASSWORD,
  API_URL,
} = environment;
export const WSO2_URL = `${WSO2_HOST}:${WSO2_PORT}/${WSO2_API_VERSION}`;
export const WSO2_SCIM_URL = `${WSO2_HOST}:${WSO2_PORT}/${WSO2_API_VERSION}/scim2`;
export const WSO2_SCIM_ROLES_URL = `${WSO2_SCIM_URL}/Roles`;
export const WSO2_SCIM_USERS_URL = `${WSO2_SCIM_URL}/Users`;
export const WSO2_SCIM_GROUPS_URL = `${WSO2_SCIM_URL}/Groups`;
export const WSO2_SCIM_SEARCH_ROLES_URL = `${WSO2_SCIM_URL}/Roles/.search`;
export const WSO2_SCIM_SEARCH_USERS_URL = `${WSO2_SCIM_URL}/Users/.search`;
export const WSO2_SCIM_SEARCH_GROUPS_URL = `${WSO2_SCIM_URL}/Groups/.search`;
export const WSO2_SCIM_USER_URL = (userId: string) =>
  `${WSO2_SCIM_USERS_URL}/${userId}`;
export const WSO2_SCIM_ROLE_URL = (roleId: string) =>
  `${WSO2_SCIM_ROLES_URL}/${roleId}`;
