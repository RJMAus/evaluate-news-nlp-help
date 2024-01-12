// POST request to get meaningCloud Data
const postMeaningCloudInfo = async (url_path = "", data={}) => {
    const response = await fetch(url_path, {
            method: 'POST', 
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
           // Body data type must match "Content-Type" header        
            body: JSON.stringify(data),
        });

    try {
        const newData = await response.json();
        return newData;
    } catch(error) {
        console.log("error", error);
    }
}

function isValidUrl(string) {
    console.log("isValidUrl running...")
    try {
      new URL(string);
    } catch (_) {
      return false;  
    }
  
    return true;
  }

function handleSubmit(event) {
    event.preventDefault()
    alert("Started handleSubmit");
    // check what text was put into the form field
    let formText = document.getElementById('name').value
    // console.log(Client.isValidUrl(formText));
    // if (!Client.isValidUrl(formText)) {
    console.log(isValidUrl(formText));
    if (!isValidUrl(formText)) {
        alert("Please enter a valid URL");
        return;
    }
    Client.checkForName(formText)

    console.log("::: Form Submitted :::")

    postMeaningCloudInfo("http://localhost:8081/meaningCloud", {url: formText})
    .then(function(res){
        const entries = Object.entries(res);
        for (const entry of entries){
            const newParagraph = document.createElement('p');
            newParagraph.appendChild(document.createTextNode(`${entry[0]}: ${entry[1]}`))
            document.getElementById('results').appendChild(newParagraph);
        }
    })
}

export { handleSubmit }