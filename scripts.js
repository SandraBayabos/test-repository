//query form
const form = document.getElementById('query-form');

//text input field
const query = document.getElementById('query');

const list = document.getElementById('list-data');

//set onsubmit
form.onsubmit = function (event) {
    event.preventDefault();

    //get value in input field
    const queryTerm = query.value;
    console.log(queryTerm);

    getTaggedPhotos(queryTerm);
}

function getTaggedPhotos(tagName) {
    // const response = fetch();
    fetch("https://api.tumblr.com/v2/tagged?api_key=1PcZXxEv9rVRqHFSnDxLu8U8dEib5Lt2u2kiSXjliNiCWz4OId&tag=" + tagName)

        .then(function (response) {
            return response.json();//convert the raw response into a JSON
        })
        .then(function (result) {
            // console.log(result);//console log the JSON so we can view it
            const items = result.response;

            for (let i = 0; i < items.length; i++) {
                // console.log(items[i]);
                const item = items[i];

                if (item.photos != undefined) {
                    const altSizes = item.photos[0].alt_sizes
                    const imgSrc = altSizes[altSizes.length - 2].url;

                    const img = document.createElement('img');
                    img.src = imgSrc;

                    const li = document.createElement('li');
                    // li.innerHTML = imgSrc;
                    li.appendChild(img);
                    list.appendChild(li);
                }
            }
        })
}
