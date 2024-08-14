export default {
  apps: [
    {
      name: 'my-react-app',
      script: 'node_modules/.bin/vite',
      args: 'dev',
      env: {
        PORT: 3001,
      },
      watch: true,
      ignore_watch: ['node_modules', 'dist'],
    },
  ],
};
