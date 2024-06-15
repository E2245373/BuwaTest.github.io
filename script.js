fetch("../transactions.json")
.then(function(response){
    return response.json();
 })
 .then(function(transactions){
    let placeholder = document.querySelector("#data-output");
    let out = "";
    for(let transaction of transactions){
       out += `
          <tr>
             <td>${transaction.description} </td>
             <td>${transaction.amount}</td>
             <td>${transaction.earnings_expense}</td>
             <td>${transaction.transaction_type}</td>
             <td>${transaction.transaction_date}</td>
          </tr>
       `;
    }
  
    placeholder.innerHTML = out;
 });