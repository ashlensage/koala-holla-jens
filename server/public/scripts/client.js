console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()

  // load existing koalas on page load
  getKoalas();

  
}); // end doc ready

function setupClickListeners() {
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    if($('#nameIn').val() && $('#ageIn').val() && $('#genderIn').val() && $('#readyForTransferIn').val()){
      let koalaToSend = {
        name: $('#nameIn').val(),
        age: parseInt($('#ageIn').val()),
        gender: $('#genderIn').val(),
        readyForTransfer: $('#readyForTransferIn').val(),
        notes: $('#notesIn').val(),
      };
      saveKoala(koalaToSend);
    }
    else{
      alert('invalid input')
    }


  }); 


  $('#viewKoalas').on('click', '#transfer', function(){
    let id = $(this).parent().parent().data('id');
    
    $.ajax({
      method: 'PUT',
      url:`/koalas/transfer/${id}`,
      data: {newTransfer: 'Y'}
    })
    .then((response)=>{
      getKoalas();
    })
    .catch((response)=>{
      console.log("error in PUT request")
    });
   });
};

function getKoalas() {
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $('#viewKoalas').empty();
  $.ajax({
    method: 'GET',
    url:'/koalas'
  })
  .then((response)=>{
    console.log(response)
    renderKoala(response)
  })
} // end getKoalas




function saveKoala( newKoala ) {
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to send koalas
  $.ajax({
    method: 'POST',
    url:'/koalas',
    data: newKoala
  })
  .then((response)=>{
    getKoalas();
  })
  .catch((response)=>{
    console.log("error in POST request")
  })
};



function renderKoala(arr) {
  for (let i = 0; i < arr.length; i++) {

    if(arr[i].ready_to_transfer === "Y"){
      $(`<tr>
      <td>${arr[i].name}</td>
      <td>${arr[i].gender}</td>
      <td>${arr[i].age}</td>
      <td>${arr[i].ready_to_transfer}</td>
      <td>${arr[i].notes}</td>
      <td> </td>
      <td><button>Delete</button></td>
      </tr>
      `).appendTo('#viewKoalas')
    }
    else{
      $(`<tr data-id="${arr[i].id}">
    <td>${arr[i].name}</td>
    <td>${arr[i].gender}</td>
    <td>${arr[i].age}</td>
    <td>${arr[i].ready_to_transfer}</td>
    <td>${arr[i].notes}</td>
    <td><button id="transfer">Ready for Transfer</button></td>
    <td><button id="delete">Delete</button></td>
    </tr>
    `).appendTo('#viewKoalas')
    }
    
  }
};

function transfer(){

}