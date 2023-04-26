var InitialCount = -1;



const deleteProducts = async() => {
    url = 'https://autobillingdesk.onrender.com/product';

    let res = await axios.get(url);
    responseText = res.data;
    const products = responseText;

    for (let product of products) {
        const response = await axios.delete(`https://autobillingdesk.onrender.com/product/${product.id}`)

    }
    location.reload();
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
}

const loadProducts = async() => {
    url = 'https://autobillingdesk.onrender.com/product/';

    let res = await axios.get(url);
    responseText = await res.data;
    const products = responseText;
    var len = products.length;

    if (len > InitialCount + 1) {
        $("#1").css("display", "none");
        $("#home").css("display", "grid");
        $("#2").css("display", "grid");
        var payable = 0;$
        const products = responseText;
        console.log(products);
        for (let product of products) {
            payable = payable + parseFloat(product.payable);

        }

        var product = products.pop();
        const x = `
        <section>
                <div class="card card-long animated fadeInUp once">
                    <img src="asset/img/${product.id}.jpg" class="album">
                    <div class="span1">Product Name</div>
                    <div class="card__product">
                        <span>${product.name}</span>
                    </div>
                    <div class="span2">Per Unit</div>
                    <div class="card__price">
                        <span>₹${product.price}/${product.unit}</span>
                    </div>
                    <div class="span3">Units</div>
                    <div class="card__unit">
                        <span>${product.taken} ${product.unit}</span>
                    </div>
                    <div class="span4">Payable</div>
                    <div class="card__amount">
                        <span>₹${product.payable}</span>
                    </div>
                    <div class="span5">Remove</div>
                    <div class="card__remove">
                    <span class="remove-btn" onclick="removeItem(this)" product_id="${product.id}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                    </svg>
                    </span>
                    </div>
                </div>
            </section>
        <section>
        `

        document.getElementById('home').innerHTML = document.getElementById('home').innerHTML + x;
        document.getElementById('2').innerHTML = "CHECKOUT ₹" + payable;
        InitialCount += 1;
    }


}


function removeItem(spanElement) {
    var value = spanElement.getAttribute("product_id");
    axios.delete(`https://autobillingdesk.onrender.com/product/${value}`)
    location.reload();
}

var checkout = async() => {
    document.getElementById('2').innerHTML = "<span class='loader-16' style='margin-left: 44%;'></span>"
    var payable = 0;

    let res = await axios.get('https://autobillingdesk.onrender.com/product/');
    responseText = await res.data;
    products = responseText;

    for (let product of products) {
        payable = payable + parseFloat(product.payable);
    }
    const name = "Auto-Billing Desk";
    const vpa = "asad0406@ybl";
    const amount = (payable).toFixed(2);
    const format = "png";
    const url = `https://upiqr.in/api/qr?name=${name}&vpa=${vpa}&amount=${amount}&format=${format}`;

    await fetch(url)
        .then(function(data) {
            return data.blob();
        })
        .then(function(img) {
            var image = URL.createObjectURL(img);
            $("#home").css("display", "none");
            $("#final").css("display", "none");
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
            $('#image').attr('src', image);
            $("#qr").css("display", "grid");
        }).catch(error => console.error(error));
    var secondsLeft = 60;  // Set the number of seconds for the timer

    // Define a function to update the timer every second
    var countdownTimer = setInterval(function() {
    secondsLeft--;  // Subtract one second
    $("#timer").text("Time remaining: " + secondsLeft + " seconds");  // Update the timer text

    if (secondsLeft <= 0) {  // When the timer reaches zero
        clearInterval(countdownTimer);  // Stop the timer
        $("#timer").text("");  // Clear the timer text
        $("#qr").css("display", "none");  // Hide the QR code
        $("#success").css("display", "grid");  // Show the success message
        setTimeout(function() {  // Wait for 20 seconds before calling deleteproduct
        deleteProducts();
        }, 10000);
  }
    }, 1000);  // Run the timer every second (1000 milliseconds)
}