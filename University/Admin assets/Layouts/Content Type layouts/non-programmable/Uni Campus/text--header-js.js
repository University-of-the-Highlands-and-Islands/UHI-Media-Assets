<!-- Course search auto-complete -->
<script>
var partner = '<t4 type="content" name="Title" output="normal" modifiers="htmlentities" />';
partner = partner.toLowerCase().slice(0, 3);
$(function() {
    $("#search").autocomplete({
        delay: 400,
        minLength: 3,
        position: {
            my: 'right top',
            at: 'right bottom'
        },
        //     source: 'http://dev-www.uhi.ac.uk/en/t4-media/one-web/university/admin-assets/php/php-search-auto-complete.php',
        source: '<t4 type="media" formatter="image/path" id="278301" />?q=' + partner,
        response: function (event, ui) {
            // event before the menu opens
            //        console.log(ui);
        },
        select: function(event, ui) {
            $('#coursesearch').val(ui.item.value);
            $('#search').val(ui.item.value);
            if(ui.item.label.substring(0,6) === "Search")
                $('#auto').val("0");
            else $('#auto').val("1");
            $('#coursesearch').submit();
        }
    });
});
</script>