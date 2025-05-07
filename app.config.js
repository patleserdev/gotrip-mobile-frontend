import 'dotenv/config';

export default ({ config }) => ({
  ...config,
  
  plugins: [
      "expo-font",
      "expo-web-browser"
    ],
 
  extra: {
    "eas": {
      "projectId": "282625d7-8bdc-4e7e-882d-82cfcb59433a"
    }
  },
});
