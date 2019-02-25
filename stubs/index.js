const spawn = require('child_process').spawn;
const glob = require('glob');
const yaml = require('js-yaml');
const fs = require('fs');
const proxy = require('http-proxy-middleware');
const express = require('express');
const jwtDecode = require('jwt-decode');

const finalFile = 'stubs/endpoints/ignored.yaml';

if (fs.existsSync(finalFile)) fs.unlinkSync(finalFile);

glob('./stubs/endpoints/**/*.yaml', (err, files) => {
  // eslint-disable-next-line
  if (err) console.log(err);

  let data = [];

  files.forEach((f) => {
    const item = yaml.load(fs.readFileSync(f));
    data = data.concat(item);
  });

  fs.writeFileSync(finalFile, yaml.safeDump(data));

  let prc;

  if (!/^win/.test(process.platform)) { // linux
    prc = spawn('stubby', ['-d', finalFile, '-s', '54887']);
  } else { // windows
    prc = spawn('cmd', ['/s', '/c', 'stubby', '-d', finalFile, '-s', '54887']);
  }

  prc.stdout.setEncoding('utf8');
  prc.stdout.on('data', (data2) => {
    // eslint-disable-next-line
    console.log(data2);
  });

  prc.on('close', (code) => {
    // eslint-disable-next-line
    console.log('process exit code ' + code);
  });

  prc.on('error', (err2) => {
    // eslint-disable-next-line
    console.log(err2);
  });

  const app = express();

  app.use('/*', proxy({
    target: 'http://0.0.0.0:54887',
    onProxyReq: (proxyReqOpts) => {
      try {
        console.log(proxyReqOpts.body);
        if (proxyReqOpts.hasHeader('authorization')) {
          const auth = proxyReqOpts.getHeader('authorization');
          if (auth.indexOf('Bearer ') > -1) {
            const dados = jwtDecode(auth.replace('Bearer ', ''));
            proxyReqOpts.setHeader('authorization', dados.codigoAluno);
          }
        }
      } catch (err5) {
        // eslint-disable-next-line
        console.log({
          err5,
        });
      }

      return proxyReqOpts;
    },
    xfwd: false,
    secure: true,
  }));

  app.listen(54888).on('listening', () => {
    // eslint-disable-next-line
    console.log('API Server running at 54888');
  });
});
