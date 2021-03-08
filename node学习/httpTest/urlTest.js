let myURL = new URL('https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash');
console.log(myURL.hostname);
console.log(myURL.protocol, myURL.username, myURL.password, myURL.pathname, myURL.hash);
console.log(myURL.toJSON());