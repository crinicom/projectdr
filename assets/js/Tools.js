$(document).ready(function(){
    $('.btn-menu').click(function() {
        $('.btn-menu').toggleClass('mm-opening');
        $('.container--menu').slideToggle('fast');
    });

    
        $('#myTable').DataTable();

        $('#other_projects_table').DataTable();

        $('#subTable').DataTable({
            searching: false,
            ordering:  false,
            paging: false,
            bInfo : false
        });
    

});