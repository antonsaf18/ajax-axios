window.addEventListener('DOMContentLoaded', () => {
  function init() {
    // let request = new XMLHttpRequest();
    // request.open('GET', 'http://localhost:3000/people');
    // request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    // request.send();

    // request.addEventListener('readystatechange', function() {
    //   if (request.readyState === 4 && request.status == 200) {
    //     let data = JSON.parse(request.response);
        
    //   } else {
    //     console.error("что то пошло не так");
    //   }
    // });

    getResource('http://localhost:3000/people')
      .then(data => crerateCards(data.data))
      .catch(err => console.error(err));

    this.remove();
  }

  async function getResource(url) {
    const res = await axios(url);

    if (res.status !== 200 ) {
      throw new Error(`Could not featch ${url}, status: ${res.status}`);
    }

    return res;

  }
  
  function crerateCards(response) {
    response.forEach(item => {
      let card = document.createElement('div');

      card.classList.add('card');

      let icon;
      if(item.motor === "1jz-ge") {
        icon = "icons/1jz-ge.png";
      } else {
        icon = "icons/2jz-ge.png";
        if(item.motor === "1jz-gte") {
          icon = "icons/1jz-gte.png";
        } else {
          icon = "icons/2jz-gte.png";
          if(item.motor === "1g-fe_beams") {
            icon = "icons/1g-fe_beams.png";
          } else{
            icon = "icons/2jz-gte.png";
            if(item.motor === "2jz-ge") {
              icon = "icons/2jz-ge.png";
            } else{
              icon = "icons/2jz-gte.png";
            }
          }
        }
      }

      card.innerHTML = `
        <img src="${item.photo}" alt="persone"> 
        <div class="name">${item.name} ${item.surname}</div>
        <div class="motor">
          <img src=${icon} alt=${item.motor}>
        </div>
        <div class="specification">${item.specification}</div>
      `;
      document.querySelector('.app').appendChild(card);
    });
  }

  document.querySelector('button').addEventListener('click', init, {once: true});
});

