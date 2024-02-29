const loadPhone = async (searchText,isShowAll)=>{
      const res= await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
      const data = await res.json();
      const phones= data['data'];
      displayPhones(phones,isShowAll);
}


const displayPhones = (phones,isShowAll) => {

    const phoneContainer= document.getElementById('phone-container');


    // clear phone container cards before adding new cards
    phoneContainer.textContent='';
    
    // display show all button if there are mor ethan 12 phones
    const showbuttonid= document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowAll){
        showbuttonid.classList.remove('hidden');
    }else{
        showbuttonid.classList.add('hidden');
    }


    // display only first 12 phones if not show all
    if(!isShowAll){
        phones=phones.slice(0,12);
    }

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
            <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
          </div>
        </div>

        </div>
         
         `
        phoneContainer.appendChild(phoneCard);
     })

     //hide loading spinner
     toggleLoadingSPinner(false);
}



//handle search button

const handleSearch=(isShowAll)=>{
    setTimeout(toggleLoadingSPinner(true),5000);
    const searchField= document.getElementById('search-field');
    const searchText =searchField.value;
    loadPhone(searchText,isShowAll);
}

const toggleLoadingSPinner =(isLoading) =>{
    const loadingSpinner= document.getElementById('spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }else{
        loadingSpinner.classList.add('hidden');
    }
}


//handle show all

const handleShowAll = () =>{
    handleSearch(true);
}



// handle show details

const handleShowDetail= async (id)=>{
    // load single phone data
    const res= await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data= await res.json();
    const phone= data['data']; 

    console.log(phone);
    showPhoneDetails(phone);
}

const showPhoneDetails= (phone) =>{
    
    const boxInfo= document.getElementById('ekhane-boss');
    boxInfo.innerHTML= `
    
    <div class="bg-[#0D6EFD0D] rounded-lg flex justify-center items-center">
    <figure><img class="p-[40px]" src="${phone.image}" alt="Shoes" /></figure>
    </div>

<div class="mt-[25px]">
       <h2 class="text-[30px] font-bold mb-6"> ${phone.name}</h2>
       
       <h3><span class="text-[20px] font-semibold">Storage: </span><span>${phone.mainFeatures.storage}</span></h3>
       <h3><span class="text-[20px] font-semibold">Display Size: </span> <span>${phone.mainFeatures.displaySize}</span></h3>
       <h3><span class="text-[20px] font-semibold">Chipset: </span> <span>${phone.mainFeatures.chipSet}</span></h3>
       <h3><span class="text-[20px] font-semibold">Memory: </span> <span>${phone.mainFeatures.memory}</span></h3>
       <h3><span class="text-[20px] font-semibold">Slug: </span> <span>${phone.slug}</span></h3>
       <h3><span class="text-[20px] font-semibold">Release Date: </span> <span>${phone.releaseDate}</span></h3>
       <h3><span class="text-[20px] font-semibold">Brand: </span><span>${phone.brand}</span></h3>
     
</div>

    
    `

    show_details_modal.showModal() 

}