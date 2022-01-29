import querystring from 'querystring';
import request     from 'request';
import dotenv      from 'dotenv';
import config      from '../config';
import utils       from '../utils';

dotenv.config();

const client_id:     string = process.env.SPOTIFY_CLIENT_ID;
const client_secret: string = process.env.SPOTIFY_CLIENT_SECRET;
const state_key:     string = 'spotify_auth_state';

const AuthController = {
  login: function (req, res) {
  const state: string = utils.generateRandomString(16);
  const link: string = config.spotifyAccountsAPI + 'authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: config.scope,
      redirect_uri: config.redirectUri,
      state: state
    });

    res.json({'link': link, 'state_key': state_key, 'state': state});
  },

  callback: function (req, res) {
    const code = req.query.code || null;
    const state = req.query.state || null;

    if (state === null) {
      res.json({error: 'state_mismatch'});
    } else {
      const authOptions = {
        url: config.spotifyAccountsAPI + 'api/token',
        form: {
          code: code,
          redirect_uri: config.redirectUri,
          grant_type: 'authorization_code'
        },
        headers: {
          'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
        },
        json: true
      };

      request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          const { access_token, refresh_token } = body;

          res.redirect(config.clientURL + '#/callback?' + 
            querystring.stringify({ access_token, refresh_token })
          );
        } else {
          res.redirect(config.clientURL + '#/callback?' +
            querystring.stringify({ error: 'invalid_token' })
          );
        }
      });
    }
  },

  refreshToken: function (req, res) {
    const refresh_token = req.query.refresh_token;
    const authOptions = {
      url: config.spotifyAccountsAPI + 'api/token',
      headers: {
        'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
      },
      form: {
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      },
      json: true
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        const access_token = body.access_token;

        res.json({ access_token: access_token });
      }
    });
  },

  checkToken: function (req, res) {
    const access_token = req.query.access_token;
    const options = {
      url: config.spotifyAPI + 'me',
      headers: { 'Authorization': 'Bearer ' + access_token },
      json: true
    };

    request.get(options, function(error, response, body) {
      if (!error && response.statusCode === 200 && !body.error) {
        res.json({'status': 'ok'});
      } else {
        res.json({'status': 'fail'});
      }
    });
  }
};

export default AuthController;