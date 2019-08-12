module.exports = {
  apps: [{
    name: 'rgbx.org',
    script: './server/index.js'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-54-198-213-221.compute-1.amazonaws.com',
      key: '~/.ssh/austin.pem',
      ref: 'origin/master',
      repo: 'git@github.com:austinStotts/project.rgbx.git',
      path: '/home/ubuntu/rgbx',
      'post-deploy': 'npm install&& npm run build && pm2 startOrRestart ecosystem.config.js'
    }
  }
}