const cookies = {
  write: function write (name, value, expires, path, domain, secure) {
    let cookie = [];
    cookie.push(name + '=' + encodeURIComponent(value));
    
    if (typeof expires === 'number') {
      cookie.push('expires=' + new Date(expires).toGMTString());
    }
    
    if (typeof path === 'string') {
      cookie.push('path=' + path);
    }
    
    if (typeof domain === 'string') {
      cookie.push('domain=' + domain);
    }
    
    if (secure === true) {
      cookie.push('secure');
    }
    
    document.cookie = cookie.join('; ');
  },
  
  read: function read (name) {
    let match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
    return (match ? decodeURIComponent(match[3]) : null);
  },
  
  remove: function remove (name) {
    this.write(name, '', Date.now() - 86400000);
  }
};

export default cookies;
