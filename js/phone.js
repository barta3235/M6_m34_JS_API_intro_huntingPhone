const loadPhone = async (searchText)=>{
      const res= await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
      const data = await res.json();
      const phones= data['data'];
      displayPhones(phones);
}


const displayPhones = (phones) => {

    const phoneContainer= document.getElementById('phone-container');


    // clear phone container cards before adding new cards
    phoneContainer.textContent='';
    
    // display show all button if there are mor ethan 12 phones
    const showbuttonid= document.getElementById('show-all-container');
    if(phones.length > 12){
        showbuttonid.classList.remove('hidden');
    }else{
        showbuttonid.classList.add('hidden');
    }


    // display only first 12 phones
    phones=phones.slice(0,12);

    phones.forEach(phone=>{
        
        const phoneCard= document.createElement('div');
        phoneCard.classList= 'card flex flex-col justify-center items-center border border-[#CFCFCF] p-[25px]';
        phoneCard.innerHTML= `
             
        <div>
        
        <div class="bg-[#0D6EFD0D] rounded-lg">
            <figure><img class="p-[40px]" src="${phone.image}" alt="Shoes" /></figure>
        </div>
        
        <div class="mt-[25px] flex flex-col justify-center items-center text-center">
          <h2 class="card-title mb-5 text-[25px] font-bold">${phone.phone_name}</h2>
          <p class="text-[#706F6F] text-[18px] font-normal mb-2"> iPhone versions continually evolve with improved features, enhanced performance, and sleek designs, captivating users with innovation. </p>
          <h2 class="card-title mt-2 mb-4 text-[25px] font-bold">$999</h2>
          
          <div class="card-actions">
            <button class="btn btn-primary">Show Details</button>
          </div>
        </div>

        </div>
         
         `
        phoneContainer.appendChild(phoneCard);
     })
}



//handle search button

const handleSearch=()=>{
    const searchField= document.getElementById('search-field');
    const searchText =searchField.value;
    loadPhone(searchText);
}

