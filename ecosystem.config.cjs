module.exports = {
  apps: [
    {
      name: 'rattil-db',
      script: '/usr/bin/mongod',
      args: '--dbpath /root/data/mongo --bind_ip 127.0.0.1 --logpath /root/data/mongo/mongod.log --logappend',
      autorestart: true,
      max_restarts: 10,
    },
    {
      name: 'rattil',
      script: 'server.js',
      cwd: '/home/quran/quran-reader/server',
      autorestart: true,
      max_restarts: 10,
      env: { NODE_ENV: 'production' },
    },
  ],
};
