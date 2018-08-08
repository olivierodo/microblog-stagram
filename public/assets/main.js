
   const page = {
     previous : null,
     list : [],
     next : null,
     setCurrent : function(currentId) {
       const pos = this.list.indexOf(currentId);
       if (-1 !== pos) {
         this.list = this.list.slice(0,pos);
       } else {
         this.list.push(currentId);
       }
       this.previous = this.list[this.list.length-2];
       console.log(this.previous, this.list);
       return this;
     },
     setNext : function(pagination) {
       this.next = pagination && pagination.next_max_id;
       return this;
     },
     render : function () {
       //document.getElementById('previous').style.display = this.previous ? 'block' : 'none';
       //document.getElementById('next').style.display = this.next ? 'block' : 'none';
     },
     go : function(direction) {
       direction = this[direction];
       console.log(direction);
       loagPost(direction);
     }
   };

  function getHtmlMedia(post) {
    const _post = document.createElement("div");
    _post.className="row post col-md-12";

    const link = document.createElement('a');
    link.className="lightbox";
    link.href= post.images.standard_resolution.url;

    const elI = document.createElement("div");
    elI.className="col-md-6";

    const image = document.createElement('img');
    image.className = 'img-response';
    image.src= post.images.low_resolution.url;
    image.alt = post.tags.join(',');

    const elT = document.createElement("div");
    elT.className="col-md-4 description";
    elT.appendChild(document.createTextNode((post.caption && post.caption.text)|| ''));

     elI.appendChild(image);  
     _post.appendChild(elI);  
     _post.appendChild(elT);  
     return _post;
  }

  function loagPost(id) {
    fetch('/posts?p=' + id)
      .then(response => response.json())
      .then(response => {
        page
          .setCurrent(response.data[0].id, undefined === id)
          .setNext(response.pagination)
          .render();
        return response.data;
      })
      .then(response => {
        Array.from(document.getElementsByClassName('post')).forEach(el => el.remove());
        response
          .map(getHtmlMedia)
          .forEach( el => {
            console.log(el);
            document.getElementById("posts").appendChild(el);
          });
      });
  };

window.onload = loagPost();


