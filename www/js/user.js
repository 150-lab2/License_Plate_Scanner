function addPermit(){
    console.log("addPermit");
    showcase = document.getElementById("showcase")
    showcase.innerHTML = "<form><label for='license_plate_number'>License Plate Number:</label>\
    <input type='text' id='license_plate_number' name='license_plate_number' required>\
    <label for='license_plate_number'>License Plate Number:</label>\
    <input type='text' id='license_plate_number' name='license_plate_number' required>\
    <label for='organization'>Organization:</label>\
    <select id='colleges' name='colleges'>\
    <option value='Fresno State University'>Fresno State University</option>\
    <option value='Stanford University'>Stanford University</option>\
    <option value='San Jose State University'>San Jose State University</option>\
  </select></form>\
    <button style='margin-top: 30px;' onclick='checkout()'>Checkout</button>";
    
}
function checkout(){
    showcase.innerHTML = "<form>\
    <input type='text' placeholder='First Name' required>\
    <input type='text' placeholder='Last Name' required>\
    <input type='text' placeholder='Card Number' required>\
    <input type='password' placeholder='CVV' required>\
    <input type='text' placeholder='MM/YY' required>\
    </form>\
    <p>Total: $99 USD </p>\
    <button style='margin-top: 30px;' onclick='loadPermit()'>Submit Payment</button>";
}
function loadPermit(){
    showcase.innerHTML = "<table>\
    <caption>Permit: #512873</caption>\
    <tr><td>Organization:</td><td>Fresno State University</td></tr>\
    <tr><td>License Plate Number:</td><td>1234567</td></tr>\
    <tr><td>Expiration Date:</td><td>02-01-2024</td></tr>\
    </table>";
}