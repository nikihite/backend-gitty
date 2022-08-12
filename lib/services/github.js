const fetch = require('cross-fetch');

const exCodeForToken = async (code) => {
  const client_id = process.env.GH_CLIENT_ID;
  const client_secret = process.env.GH_CLIENT_SECRET;

  const res = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }, body: JSON.stringify({ client_id, client_secret, code }),
  });

  const resp = await res.json();
  return resp.access_token;
};

const getGithubProfile = async (token) => {
  const res = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd/github.v3+json',
    },
  });
  return res.json();
};
module.exports = { exCodeForToken, getGithubProfile };
