'use strict';
const jwt = require('jsonwebtoken');

const privateKEY = `-----BEGIN RSA PRIVATE KEY-----
MIICXgIBAAKBgQCfBiC4cfKs7aGJFAKvpZ+B5pKGJiPtI9N/Of/nzOq9cxj1HG6w
lOYdK4lP4H+JgJjC2KT+9bgxr9ROp5WIBrvjb6mQltwsW4wm+iiEuOxC8FjgoyD5
/1MIJf3MdLP9s6t7/KHZKN7P6hxwJAVbgyiRsZGSYaM80n/fEHF1zKXSSwIDAQAB
AoGBAJh7brqNgI2ymjbvuhekb0tGxO7e+Yn01WLkQW6KPfgEukSly7mEPRZxXYv7
Dy/Q4CnNRIC5KrJyD9iPtsEk+9jyWo66kg1CreYcvLYltXq2MG3geiPqpt6/Yexa
lGZEbH9IDO95tfN6SimZGT2y0B7OkY7dnHZltakhXMzSpsUBAkEA9LJKWM3tMc7t
kQNcpQ0jWDNto/xBLKsgz8n+YEQMCOJZ/8+XGozzZVzFGM7dswXTWh3kisbOOjcU
qtn5G1RQywJBAKZesvJK4aedMWpW5+wQbj9+BFAHNLP+UrQ+IQcoZJOn3yFynrch
kfODEjs+SRDKk45YL/3ZjUP+YCo6n+mj1IECQFjJqLh4YCzGjOUldyRclAqY/puW
GIAAyDMddDOx/TvsBgQQax+zLU4GT24lAcTHxFzao+bHJGVzPwiPdxg3i+kCQQCF
bpoyvV/yIJ7LXNwxdpQVlCo9TSo12hnWuaWfqgPQcOkCWH12/xOhrFPo8/GB6Bck
KRKElAE6sT/LXq12o5EBAkEAyj1R42vC7kOo41SsAi2z62FyDfT2N7Lw7hrMZACQ
edsvZPwrvMn5/P1kg+S68LJcKPnQFW+v8zM8eaVA6Id7yA==
-----END RSA PRIVATE KEY-----`;

const publicKEY = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCfBiC4cfKs7aGJFAKvpZ+B5pKG
JiPtI9N/Of/nzOq9cxj1HG6wlOYdK4lP4H+JgJjC2KT+9bgxr9ROp5WIBrvjb6mQ
ltwsW4wm+iiEuOxC8FjgoyD5/1MIJf3MdLP9s6t7/KHZKN7P6hxwJAVbgyiRsZGS
YaM80n/fEHF1zKXSSwIDAQAB
-----END PUBLIC KEY-----`;

/*
 ====================   JWT Signing =====================
*/
const i = 'AppBee Tech';
const s = 'some@user.com';
const a = 'Herdman';
const signOptions = {
    issuer: i,
    subject: s,
    audience: a,
    expiresIn: "30d",
    algorithm: "RS256"   // RSASSA [ "RS256", "RS384", "RS512" ]
};