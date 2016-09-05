;(function(){
    
   // $(".step:nth-child(1)").addClass("activo")
    
    const selector = "#contacto"
    
    $(".step textarea").on("keydown",(ev)=>{
       if(ev.keyCode == 13){
           ev.preventDefault()
           $(ev.target).blur()
       } 
    })
    
   $(".path-step").on("click",(ev)=>{
       const $current_circle= $(ev.target)
      
      focus_circle($current_circle)
       
       const posicion = $current_circle.index() + 1
       let $test = $(".step:nth-child("+posicion+")")
       siguiente($test)
    })
    
     $(selector).find(".input").on("change",(ev)=>{
        let $input= $(ev.target)
        
        let $next_step = $input.parent().next()
        
        siguiente($next_step)
        
        validar_formulario()
        
        
    })
    //helpers
    function validar_formulario(){
       if(es_valido_formulario()){
           send_form()
       }else{
        let $div_invalido = $(selector).find(".input:invalid").first().parent()
        siguiente($div_invalido)
        
        

    }
    
           

    }
    
    
    
    function es_valido_formulario(){
         return document.querySelector(selector).checkValidity()
    }
    
    function siguiente($next_step){
        $(".step.activo").removeClass("activo")
        $next_step.addClass("activo")
        $next_step.find(".input").focus()
       $next_step.focus() 
       //coordinar circulos
       const posicion = $next_step.index() + 1
      
        const $circle = $(".path-step:nth-child("+posicion+")")
        
        focus_circle($circle)
        
      
    }
    
    function focus_circle($circle){
        
       $(".path-step.activi").removeClass("activi") 
       $circle.addClass("activi")
    }
    
    function send_form(){
        const $form = $(selector) 
        $.ajax({
        url: $form.attr("action"), 
        method: "POST",
        data: $form.formObject(),
        dataType: "json",
        success: function(){
        $form.slideUp()
        $("#info").html("Se ha enviado tu mensaje, pronto estaremos en contacto.")
    }
});
    }
    
})()