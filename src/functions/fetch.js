export function fetch(URL, callback, params = undefined, async = true, type = undefined) {
    try {
        let request = new XMLHttpRequest();

        if (type !== undefined) {
            request.responseType = type;
        }

        request.onload = (e) => {
            try
            {
                let json = JSON.parse(request.responseText);
                callback(json);
            }
            catch(e)
            {
                callback(request.response);
            }
        };

        if (params !== undefined) {
            let body = [];
            params.forEach(function(item, i) {
                body.push(item.field + '=' + encodeURIComponent(item.value));
            });

            request.open('POST', URL, async);
            request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            request.send(body.join('&'));
        } else {
            request.open('GET', URL, async);
            request.send();
        }
    } catch (err) {
        console.error(err);
    }
}

export function p(field, value) {
    return {
        'field': field,
        'value': value
    };
}
