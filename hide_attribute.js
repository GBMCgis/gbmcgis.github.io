hide_page=false;
django.jQuery(document).ready(function(){
    if (django.jQuery('#id_swppp_required').is(':checked')) {
        django.jQuery(".swppp-group").show();
        hide_page=false;
    }else
    {
        django.jQuery(".swppp-group").hide();
        hide_page=true;

    }
    django.jQuery("#id_swppp_required").click(function(){
        hide_page=!hide_page;
        if(hide_page)
        {
            django.jQuery(".swppp-group").hide();
        }else
        {
            django.jQuery(".swppp-group").show();
        }
    })
})
