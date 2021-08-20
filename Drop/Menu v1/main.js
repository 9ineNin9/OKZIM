$jY = jQuery.noConflict()
$jY(document).ready(function(){
    
    function checkVisible(elm) {
    var rect = elm.getBoundingClientRect();
    var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
    }

    function toggleFullScreen() {
    var doc = window.document;
    var docEl = doc.documentElement;
    
    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
    
    if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        requestFullScreen.call(docEl);
    }
    else {
        cancelFullScreen.call(doc);
    }
    }

    //Muda o nomedoo botao de atualizar carrinho do plugin carrinho flutuante (Cart All In One For WooCommerce)
    $jY('.vi-wcaio-sidebar-cart-bt-update.button').text('Atualizar Carrinho')

    //Algumas variáveis úteis
    _navMain = $jY('nav#c_m')
    nav_aside = $jY('#nav_aside')
    pelic_n_a = $jY('#pelic_n_a')
    pointScrollTrigger = 27
    adminBarExiste = !!document.getElementById('wpadminbar')
    _footerMain = $jY('#footer_c_main')








    //
    // PAGINA CARRINHO
    // 
    //

    __cepUrl = function(cep){
       return `https://viacep.com.br/ws/${cep}/json/unicode/`
    }


    if(window.location.href.search('https://dacaw.com.br/carrinho/') == 0){

        //Exibe o botao para aplicar cupom
        $jY(document).on("keyup",".woocommerce-cart table.cart td.actions .coupon .input-text", function() {
            b = $jY(".woocommerce-cart table.cart td.actions .coupon button[name='apply_coupon']")
            !b.is(':visible')
                ? b.slideDown('fast')
                : null;
        });

        
        formShippingCalc = {
            clear : function(){
                $jY('#calc_shipping_postcode').val('')
                $jY('#calc_shipping_city').val('')
                $jY(".woocommerce-cart table.cart td.actions .coupon button[name='apply_coupon']").slideUp()
            },
            setParams: function(){
                $jY('#calc_shipping_postcode').attr('autocomplete', '0')
            }
        }

        
        //Campo cep
        //Campo cep
        //Campo cep
        //Campo cep

        //Campo cep limpa ao focar
        $jY(document).on('focus', '#calc_shipping_postcode', function(){
            $jY(this).val('')    
        })

        $jY(document).on('keyup', '#calc_shipping_postcode', function(){
            l = $jY(this).val().length
            _cep = $jY(this).val()

            if(l >= 8){
                btn_apply_cupom = $jY(".woocommerce-cart table.cart td.actions .coupon button[name='apply_coupon']")
                btn_shipping_calc = $jY('.woocommerce-cart .cart-collaterals .cart_totals .button[name="calc_shipping"]')
                input_city = $jY('#calc_shipping_city')

                //Seta alguns parametors nos campos
                formShippingCalc.setParams()

                $jY.getJSON(__cepUrl(_cep), function(data){

                    if(data != undefined){
                        if(!data.hasOwnProperty('erro')){
                            input_city.val(`${data.logradouro}, ${data.localidade}`)
                            btn_shipping_calc.slideDown()
                            btn_shipping_calc.focus()

                        } else{
                            formShippingCalc.clear()
                            alert(`CEP Inválido: ${_cep}`)
                        }
                       
                    }
                }).fail(function(){
                    formShippingCalc.clear()
                    alert('Verifique o CEP. Se o erro persistir por favor entre em contato conosco!')
                })
            } else{
                $jY('.woocommerce-cart .cart-collaterals .cart_totals .button[name="calc_shipping"]').slideUp()
            }
            
        })

    }















    //
    // PAGINA Checkout
    // 
    // 
    if(window.location.href.search('https://dacaw.com.br/checkout/') == 0){
        

        //Remove os script do bootstrap
        $jY('head link[href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"]').remove()

        $jY(document).on("keyup","#mp-doc-number-div input#docNumber, #box-docnumber input#mp_doc_number", function(){
            if($jY(this).val().length >= 11){
                $jY('#billing_cpf_field input#billing_cpf').val($jY(this).val())
            }
        })

    }
















    
    //
    // PAGINA MINHA CONTA
    // 
    // 

    if(window.location.href.search('https://dacaw.com.br/me/') == 0){
        
        _title = $jY('.customer_login_guest_text > h3')
        btn_reset = $jY('.customer_login_guest_text > button')
        btn_login = $jY('.owp-account-links > li.login')
        btn_register = $jY('.owp-account-links > li.register')

        form_login = $jY('.account-original-style .woocommerce #customer_login>div.u-column1')
        form_register = $jY('.account-original-style .woocommerce #customer_login>div.u-column2')

        //Ajuste para arrumar umas grids vazadas
        if($jY(document).innerWidth() > screen.width){
            $jY('.woocommerce-MyAccount-content').css({
                'overflow':'hidden',
                'overflow-x': 'auto'
            })
        }


        //Muda o texto do enderenco de faturamento
        $jY('.woocommerce-MyAccount-content .addresses .u-column1 header h3').text('Inf. para Checkout')

        //Muda o nome do campo numero para complemento no endereco
        $jY('#acc-custom form label[for="billing_number"]').text('complemento')

        //Remove classes de colunas das seções
        $jY('#acc-custom').find('.col-1,.col-2').removeClass('col-1 col-2')

        //Adiciona os icones aos botoes login my account
        btn_login.prepend('<ion-icon name="log-in-outline"></ion-icon>')
        btn_register.prepend('<ion-icon name="person-add-outline"></ion-icon>')

        $jY('#customer_login label[for="username"]').html('Usuário ou email<span class="required">*</span>');
        $jY('.woocommerce #customer_login label[for="reg_username"]').html('Nome de usuário<span class="required">*</span>');
        $jY(btn_login).children('a').text('Entrar');
        $jY(btn_register).children('a').text('Registrar');
        $jY('.owp-account-links > li.or').text('OU');


        customer_form = {
            open : function(e){
                
                //Esconde os botoes iniciais
                $jY('.owp-account-links').slideUp('fast')
                //Mostra o container do form
                $jY('#customer_login').slideDown('fast')

                //Exibe o title do respectivo form
                e.parent().hasClass('login')
                    ? _title.html('ENTRAR')
                    : _title.html('REGISTRAR');


                //Qual formulario exibir
                e.parent().hasClass('login')
                    ? form_login.slideDown('fast')
                    : form_register.slideDown('fast');

                //Mostra o container com o titulo do form e o botao reset
                _title.parent().toggle('fast')
            },
            reset : function(){
                form_register.removeAttr('style')
                form_login.removeAttr('style')

                $jY('.owp-account-links').slideDown('fast')
                $jY('#customer_login').slideUp('fast')
                _title.parent().toggle('fast')
            }
        }

        //Click nos botoes        
        $jY('a.owp-account-link').on('click', function(e){
            customer_form.open($jY(this))
        })

        //Reset form
        $jY(document).on('click', '.customer_login_guest_text > button', function(){
            customer_form.reset()
        })
    }


    //
    // Single Producto Page Pagina Produto
    // 
    // 
    
    single_product_tabs = $jY('.woocommerce div.product .woocommerce-tabs')
    single_product_short_desc = $jY('.woocommerce-product-details__short-description')
    single_product_galery = $jY('.woocommerce div.product div.images, .woocommerce.content-full-width div.product div.images')
    single_product_on_sale = $jY('.woocommerce div.product.owp-thumbs-layout-vertical span.onsale')


    // Modifica a galeria fixa quando as tabs do produto sao visiveis
    if(window.location.href.search('https://dacaw.com.br/produto/') == 0){
        
        //Deixa o documento com largura mais fluida removendo paading do container da page
        $jY('#main #content-wrap.container')
            .removeClass('container')
            .addClass('container-fluid')


        //os inputs hidden para notas personaliadas dos produtos são inseridos dentro de uma tag p na descrição
        //deixando um espaçamento sem nada isso esconde o p
        $jY('.woocommerce div.product div.woocommerce-product-details__short-description input[type="hidden"]').parent().hide()

        notes_fixed = {
            notes : {
                drop_alert : {
                    txt: "Trabalhamos na modalidade de agente intermediário entre você e seu produto, sendo assim, nossos produtos são enviados diretamente da fábrica, sendo o fornecedor responsável pela entrega, com isso conseguimos os melhores preços e qualidade em produtos internacionais para você.",
                    permission: {
                        rule: [false, null]
                    }
                },
                diferent_colors_alert : {
                    txt: 'Como diferentes computadores exibem cores de forma diferente, a cor do item real pode variar ligeiramente das imagens exibidas.',
                    permission: {
                        rule: [false, null]
                    }
                },
                size_alert : {
                    txt: 'Permita um erro de 1-3 cm devido à medição manual.',
                    permission: {
                        rule: [true, 'input[name="note_size_alert"]']
                    }
                }
            },
            putNote : function(note){
                single_product_short_desc.find(`ul.product_notes`).prepend(`<li>${note}</li>`)
            }
        }

        //Botões Especificações e Noteas do produto no footer pagina do produto - Single Product Page
        buttonFooter = {
            btns : {
                notes : {
                    txt: '*Notas',
                    btnIcon: 'pin-outline',
                    showThisList: 'product_notes'
                },
                specs: {
                    txt: '*Detalhes',
                    btnIcon: 'ellipsis-vertical-outline',
                    showThisList: 'product_specs'
                }
            },
            html : function(text, icon, list){
                return `<h1 class="title_s1_short_desc animate__animated animate__fadeInDown" data-show="${list}">${text}<ion-icon name="${icon}"></ion-icon> <ion-icon class="i_r" name="chevron-forward-outline"></ion-icon> </h1>`
            },
            init : function(){
                count_btns = Object.keys(buttonFooter.btns).length
                
                single_product_short_desc.find('input[name="notes_size_alert"]').length == 1
                    ? note_size_alert = true
                    : note_size_alert = false;

                $jY.each(buttonFooter.btns, function(idx, btn){
                    //Cria os botões
                    single_product_short_desc.append(buttonFooter.html(btn.txt, btn.btnIcon, btn.showThisList))

                    if(idx == "notes"){

                        $jY(`.woocommerce div.product div.woocommerce-product-details__short-description ul.${btn.showThisList}`).length == 0
                            ? single_product_short_desc.append('<ul class="product_data_c product_notes"></ul>')
                            : null;

                        $jY.each(notes_fixed.notes, function(i, note_msg){

                            if(note_msg.permission.rule[0]){
                                single_product_short_desc.find(note_msg.permission.rule[1]).length == 1
                                    ? notes_fixed.putNote(note_msg.txt)
                                    : null;
                            } else{
                                notes_fixed.putNote(note_msg.txt)
                            }

                        })
                        
                    }   

                    //Adiciona o primeiro item nas listas
                    single_product_short_desc.find(`ul.${btn.showThisList}`)
                        .prepend(`<li><ion-icon name="chevron-up-outline"></ion-icon>${btn.txt}</li>`)

                })

                //Adiciona classe das listas "product_data_c" caso não tenham
                !single_product_short_desc.find('.product_specs').hasClass('product_data_c')
                    ? single_product_short_desc.find('.product_specs').addClass('product_data_c')
                    : null ;
            }
        }

        //Inicia os botões
        buttonFooter.init()

        $jY('.title_s1_short_desc').on('click', function(){
            single_product_short_desc.find('.title_s1_short_desc').slideUp('fast')
            single_product_short_desc.find(`ul.${$jY(this).attr('data-show')}`).slideDown()
        })
        
        $jY(document).on('click', 'ul.product_data_c > li:nth-child(1)', function(){
            single_product_short_desc.find('ul.product_data_c').slideUp('fast')
            single_product_short_desc.find('.title_s1_short_desc').slideDown()
        })


        //insere o titulo com nome do produto antes da descricao
        single_product_short_desc.prepend(`<h1 class="title_desc_c">${$jY('.woocommerce div.product .product_title').text()}</h1>`)
        

        //Mensagemd experiencia do usuario        
        single_product_short_desc.find('.title_desc_c').before('<div class="box_message_s1"><div class="w-100 text pr-0 pl-2"> <h3 class="title"> <ion-icon name="ellipsis-vertical-outline" class="pr-1"></ion-icon> Lembre-se<ion-icon name="chevron-forward-outline"></ion-icon></h3> <div class="message" style="display: none;"> <p class="my-1 py-1 py-md-0 py-lg-0 py-xg-0"><ion-icon name="happy-outline"></ion-icon><ion-icon name="chevron-back-outline"></p>Acima de tudo sua expêriencia é muito importante para nós, portanto, caso tenha alguma dúvida. Por vavor sinta-se à vontade para entrar em contato conosco! </div></div></div>')

        //Galeria Fixa Events
        single_product_galery_events = {
            show : function(){
                single_product_galery.slideDown('fast')
            },
            hide : function(){
                single_product_galery.slideUp('fast')
            }
        }

        
        
        //Galeria Fixa
        window.onscroll = function() {
            
            if(screen.width >= 1025){

                 if(checkVisible(single_product_tabs[0]) || checkVisible(_footerMain[0])){
                    single_product_galery_events.hide()

                    //Esconde a box de promocao na secao da imagem do produto ao rola a tela em desktops
                    single_product_on_sale.slideUp('fast')
                 }else{
                    single_product_galery_events.show()

                    //Volta a box de promocao 
                    single_product_on_sale.slideDown('fast')
                 }

                //Mostra a galeria fixa se o scrollTop for igual a 0
                $jY(document).scrollTop() == 0 
                    ? single_product_galery_events.show()
                    : null;
            }    
         };
    }

    btn_access = $jY('.close_accessibility_mob')
    btn_accessibility = {
        show : function(params){

            params.classAdd != undefined
                ? btn_access.addClass(params.classAdd)
                :null;

            btn_access.find('small span').html(params.close_this)
            btn_access.toggle()
        }, 
        hide: function(params){
            params.classRemove != undefined
                ? btn_access.removeClass(params.classRemove)
                :null;
            btn_access.toggle()
        }
    }

    //Caixa de mensagem com título... Apos clicar hover, only text
    box_message_s1 = {
        open : function(e){
            e.addClass('active')
            e.find('.text .title').toggle('fast')
            e.find('.text .message').toggle('fast')

            e.find('div.icon-1 ion-icon.icon-toggle').removeAttr('name')
            e.find('div.icon-1 ion-icon.icon-toggle').attr('name','happy-outline')

        },
        close: function(e){
            e.removeClass('active')
            e.find('.text .title').toggle('fast')
            e.find('.text .message').toggle('fast')
            
            e.find('div.icon-1 ion-icon.icon-toggle').removeAttr('name')
            e.find('div.icon-1 ion-icon.icon-toggle').attr('name','alert-circle-outline')
        }
    }
    // Trigger para iniciar a box
    $jY(document).on('click', '.box_message_s1', function(){
        !$jY(this).hasClass('active')
            ? box_message_s1.open($jY(this))
            : box_message_s1.close($jY(this)) 
    })

    //Adiciona a imagem apos o titulo do produto na pagina do produto
    $jY('.woocommerce div.product .product_title').after('<img src="https://dacaw.com.br/wp-content/uploads/2021/05/Mercado-pago-metodos-de-pagamento.png" class="wp-image-680 single_product_img_mercado_pago">')
    
    //ADiciona icone ao label dos produtos
    $jY('.woocommerce div.product form.cart .variations label').prepend('<ion-icon name="reorder-two-outline"></ion-icon>')


    //Objeto responsável pelos principais eventos no menu
    asideMenu_events = {
        open : function(){

            //MOstra o botao de fechar mais acessivel para dispositivos mobile
            btn_accessibility.show({
                close_this : 'Menu',
                classAdd : 'change_state_aside'
            })

            //Esconde a barrar de adiministrador WP ao abrir o menu
            $jY('div#wpadminbar').hide()

            //Mostra o fundo meio opaco, tbm um disaro de evento
            pelic_n_a.show()
            
            //Desativa scroll dipositivos sm pra cima
            $jY('html').css('overflow-y', 'hidden')

            //Mostra a secao aside
            nav_aside.addClass('active')
            nav_aside.slideDown('fast')
        },
        close: function(){

            //Esconde o botao de fechar mais acessivel para dispositivos mobile
            btn_accessibility.hide({
                classRemove : 'change_state_aside'
            })

            //Exibe a barra de administrador WP ao fechar o menu
            $jY('div#wpadminbar').show()

            //Escnde o fundo meio opaco, tbm um disaro de evento
            pelic_n_a.hide()

            //Reativa scroll dipositivos sm pra cima
            $jY('html').css('overflow-y', 'initial')

            //Mostra a secao aside
            nav_aside.removeClass('active')
            nav_aside.slideUp('fast')
        },
        change: function(){

            nav_aside.is(':visible')
                ? asideMenu_events.close()
                : asideMenu_events.open();
        }
    }
    
    //Dispara o evento change ao clicar fora na pelic pelic_n_a
    $jY(document).on('click', '.change_state_aside', function(){
        asideMenu_events.change()
    })

    $jY('.product_meta').prepend('<span class="custom_meta_trigger align-items-center"><ion-icon name="grid-outline" class="pr-2 hydrated"></ion-icon>Etiquetas</span>')





//Cards
$num = $jY('.cards-ui-container .cards-cont').length;
$even = $num / 2;
$odd = ($num + 1) / 2;

if ($num % 2 == 0) {
  $jY('.ui-card:nth-child(' + $even + ')').addClass('active');
  $jY('.ui-card:nth-child(' + $even + ')').prev().addClass('prev');
  $jY('.ui-card:nth-child(' + $even + ')').next().addClass('next');
} else {
  $jY('.ui-card:nth-child(' + $odd + ')').addClass('active');
  $jY('.ui-card:nth-child(' + $odd + ')').prev().addClass('prev');
  $jY('.ui-card:nth-child(' + $odd + ')').next().addClass('next');
}

$jY('.ui-card').click(function() {
  $slide = $jY('.active').width();
  console.log($jY('.active').position().left);
  
  if ($jY(this).hasClass('next')) {
    $jY('.container').stop(false, true).animate({left: '-=' + $slide});
  } else if ($jY(this).hasClass('prev')) {
    $jY('.container').stop(false, true).animate({left: '+=' + $slide});
  }
  
  $jY(this).removeClass('prev next');
  $jY(this).siblings().removeClass('prev active next');
  
  $jY(this).addClass('active');
  $jY(this).prev().addClass('prev');
  $jY(this).next().addClass('next');
});


// Keyboard nav
$jY('html body').keydown(function(e) {
  if (e.keyCode == 37) { // left
    $jY('.active').prev().trigger('click');
  }
  else if (e.keyCode == 39) { // right
    $jY('.active').next().trigger('click');
  }
});
})
