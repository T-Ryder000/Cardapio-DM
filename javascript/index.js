$(document).ready(function () {
  cardapio.eventos.init();
})


var cardapio = {};


cardapio.eventos = {

  init: () => {
      cardapio.metodos.obterItensCardapio();
  }

}

cardapio.metodos = {

  // obtem a lista de itens do cardápio
  obterItensCardapio: (categoria = 'sanduiches', vermais = false) => {

      var filtro = MENU[categoria];
      console.log(filtro);

      if (!vermais) {
          $("#itensCardapio").html('');
          $("#btnVerMais").removeClass('hidden');
      }

      $.each(filtro, (i, e) => {

          let temp = cardapio.templates.item.replace(/\${img}/g, e.img)
          .replace(/\${nome}/g, e.name)
          .replace(/\${preco}/g, e.price.toFixed(2).replace('.', ','))
          .replace(/\${id}/g, e.id)
          .replace(/\${dsc}/g, e.dsc)
          .replace(/\${accordion}/g, e.accordion)

          // botão ver mais foi clicado (12 itens)
          if (vermais && i >= 8 && i < 12) {
              $("#itensCardapio").append(temp)
          }

          // paginação inicial (8 itens)
          if (!vermais && i < 8) {
              $("#itensCardapio").append(temp)
          }

      })

      // remove o ativo
      $(".container-menu a").removeClass('active');

      // seta o menu para ativo
      $("#menu-" + categoria).addClass('active')

  },

  // clique no botão de ver mais
  verMais: () => {

      var ativo = $(".container-menu a.active").attr('id').split('menu-')[1];
      cardapio.metodos.obterItensCardapio(ativo, true);

      $("#btnVerMais").addClass('hidden');

  },

}

cardapio.templates = {

  item: `
      <div class="col-12 col-lg-3 col-md-3 col-sm-6 mb-5">
            <div class="accordion" id="accordion\${accordion}">
                <div class="accordion-item">
                    <div class="card card-item accordion-button" id="\${id}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse\${accordion}" aria-expanded="false" aria-controls="collapse\${accordion}">
                        <div class="img-produto">
                            <img src="\${img}" />
                        </div>
                        <p class="title-produto text-center mt-4">
                            <b>\${nome}</b>
                        </p>
                        <p class="price-produto text-center">
                            <b>R$ \${preco}</b>
                        </p>
                    </div>

                    <div id="collapse\${accordion}" class="accordion-collapse collapse " data-bs-parent="#accordion\${accordion}">
                    <div class="accordion-body">
                        <strong>\${dsc}</strong>
                    </div>
                    </div>
                </div>
            </div>
      </div>
  `,

}