
let urlForm = document.getElementById("urlForm")
let iframeObject = document.getElementById("mainContent")
const testFlag = true


urlForm.onsubmit = function (event) {
    // stop our form submission from refreshing the page
    event.preventDefault();

    // Get the event, then find the input value by name
    let start_url = event.target.children.start_url.value
    
    // Get URL string from the API
    let nextURL = showContent(start_url)
};


let showContent = function (startURL) {
    // TODO Should really split into multiple functions.
    // Then return a promise.
    let reqURL = encodeURL(startURL)

    fetch(reqURL, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    })
    .then((response) => {
        console.log('INITIAL RESPONSE', response)
        // response.text().then(text => console.log("Response text is:", text));
        return response.text()
    })
    .then((respJSON) => {
        // Set iframe to URL
        console.log("Body is:", respJSON)
        let nextURL = parseResponse(respJSON, testFlag)
        populateIFrame(nextURL, iframeObject)
        // Change value
        urlForm.start_url.setAttribute('value', nextURL)
    }
    )
    .catch(err => {
        console.log("Catch error:", err)
        let nextURL = 'https://www.theatlantic.com/technology/archive/2020/01/how-death-itunes-explains-2010s/604291/'
        populateIFrame(nextURL, iframeObject)
        // Change value
        urlForm.start_url.value = nextURL
    })
}

let encodeURL = function(startURL) {
    baseURL = new URL('http://0.0.0.0:5000/');
    baseURL.search = new URLSearchParams({'start_url': startURL}).toString();
    return baseURL
}

let populateIFrame = function(url, iframeObject) {
    iframeObject.setAttribute('src', url)
    iframeObject.removeAttribute('hidden')
}

let swapForms = function(url){
    // Hide URL input 

    // Set button value to url

}

let parseResponse = function (jsonObject, testFlag) {
    // If testFlag is true then give the mock URL.
    let constantString = 'https://www.theatlantic.com/technology/archive/2020/01/how-death-itunes-explains-2010s/604291/'
    return testFlag ? constantString : jsonObject.next_url;
    }
