# install

```
npm install -g wrangler
wrangler deploy
```

# requirements

cloudflare domain with dns records

```
TXT @ v=spf1 include:_spf.mx.cloudflare.net include:relay.mailchannels.net ~all
TXT _mailchannels v=mc1 cfid=subdomain.workers.dev
```

enviornment variable `email` which is approved for cloudflare email routing

```
wrangler dev --var "email:user@domain.com"
wrangler secret put email
```
