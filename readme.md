# install

```
npm install -g wrangler
wrangler deploy
wrangler secret put email
```

# requirements

cloudflare domain with dns records

```
TXT @ v=spf1 include:_spf.mx.cloudflare.net include:relay.mailchannels.net ~all
TXT _mailchannels v=mc1 cfid=subdomain.workers.dev
```

# test

```
wrangler dev -r --var "email:user@domain.com"
open test.html
```
