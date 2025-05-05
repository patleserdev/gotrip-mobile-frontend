import 'dotenv/config';

export default ({ config }) => ({
  ...config,
  
  plugins: [
      "expo-font",
      "expo-web-browser"
    ],
 
  extra: {
    apiUrl: process.env.API_BACKEND,
    env: process.env.ENV,
    "eas": {
      "projectId": "282625d7-8bdc-4e7e-882d-82cfcb59433a"
    }
  },
});
