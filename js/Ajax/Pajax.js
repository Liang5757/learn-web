function PAjax (method, url, body, headers) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url);
    
    for (const [key, value] in headers.entries()) {
      xhr.setRequestHeader(key, value);
    }
    xhr.send(body);
    
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 400) {
          resolve(xhr.responseText);
        } else {
          reject(xhr);
        }
      }
    }
  })
}
