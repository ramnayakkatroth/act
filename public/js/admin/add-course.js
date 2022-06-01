
$(document).ready(function () {   
    const  mediaFilesacceptedExtensions = [ "jpg", "png","jpeg"];
    let mediaFiles=[];
    let file ='';
    $('body').on('click','#add-course',function () {
        alert('hai')
        var name = $('#name').val();
        var interest = $('#interest').val();
        var countryId = $("#country_id").val();
        var city = $('#city_id').val();       
      
        if(name==""){
            messageDisplay("Please enter name");
            return false;
        }
        if(interest==""){
            messageDisplay("Please enter in which your interested in");
            return false;
        }  
        if(countryId==""){
            messageDisplay("Please select country");
            return false;
        }
        if(city==""){
            messageDisplay("Please enter city");
            return false;
        }
      
        let element=$(this);
        element.attr("disabled","disabled").html("Please Wait..");
        let formData=new FormData();    
            formData.append('name',name);   
            formData.append('interest',interest);       
            formData.append('countryId',countryId);   
            formData.append('city',city);   
            formData.append('upload_file', mediaFiles[0]);     

        $.ajax({
            type: "POST",
            url: '/admin/add-investor-data',           
            data: formData,
            dataType: "json",
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {          
                if (data.success) {
                    messageDisplay(data.message, 2000, "success");   
                    setTimeout(function(){ 
                       window.location.href = "/admin/investor";
                        }, 2000);                     

               } else {
                    messageDisplay(data.message, 2000, "error");                   
               }    
              
            },
          
        });
      
    }).on('change',"#country_id",function(){
        var countryId = $('#country_id').val();
        // console.log(countryId);return;
        let formData=new FormData();       
        formData.append('countryId',countryId);

    $.ajax({
        type: "POST",
        url: '/get-city-by-country',            
        data: formData,
        dataType: "json",
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {          
            if (data.success) {
            var citylist = data.cityList;
            var city = '';              
            for(let i=0;i<citylist.length;i++){
                city=city+`<option value="${citylist[i].id}">${citylist[i].city}</option>`;
            }
            $("#city_id").html(city);
           } else {
            city=city+`<option value="">City Not Found</option>`;
            $("#city_id").html(city);
           }
        },
    });
    }).on('change','#file-upload',function (e){
        var files = e.target.files;
        var element=$(this);
        var incerement=0;

        if ($(this).get(0).files.length != 0) {
            $.each(files, function (i, file) {
                console.log(files[i].type);

                var FileType = files[i].type;
                var filename = files[i].name;
                console.log(filename);
                var reader = new FileReader();
                reader.onload = function (e) {

                    var fileExtension = FileType.substr((FileType.lastIndexOf('/') + 1));
                    var Extension = fileExtension.toLowerCase();
                    let showFileName = '';
                    let filePath = '/static/img/file.png';
                    if ($.inArray(Extension, mediaFilesacceptedExtensions) === -1) {
                        showFileName = filename;
                    } else {
                        filePath = e.target.result;
                    }
                    incerement++;

                    mediaFiles = [];
                    mediaFiles.push(file);

                    let html = `<div class="attachimage-box" style="background: url(${filePath}) no-repeat center;">
                            <div class="delete-file delete-image">
                                <i class="fas fa-trash-alt"></i>
                                <div>
                                    Delete
                                </div>
                            </div>
                              <div>${showFileName}</div>
                        </div>`;
                    $("#files-wrapper").prepend(html);

                    if (files.length == incerement) {
                        element.val("");
                    }
                };
                reader.readAsDataURL(file);
            });
        }

    }); 

});
