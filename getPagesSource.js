// @author Rob W <http://stackoverflow.com/users/938089/rob-w>
// Demo: var serialized_html = DOMtoString(document);

function DOMtoString(document_root) {
    //console.log(document_root.documentElement.outerHTML)
    var x = document_root.childNodes[1].childNodes[3].childNodes[9].childNodes[1].childNodes[0].contentDocument;
    var y = x.childNodes[1].childNodes[3].childNodes[3].childNodes[11].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[1].childNodes[18].childNodes[3].childNodes[1].childNodes[0].childNodes[1];
    //console.log(y);
    // So y is the outerHTML I can parse to get the stuff
    var z = y.childNodes[2].childNodes[0].childNodes[1].childNodes[1].childNodes[6].childNodes[3].childNodes[1].childNodes[1].childNodes[1].childNodes[0].childNodes[0].childNodes[1].childNodes[1].children;
    //console.log(z);
    var courseTitles = [];
    var courseTimes = [];
    var courseLocations = [];
    var courseInstructors = [];
    for (let item of z){

        //console.log(item);
        if(item.id){
            //console.log(item);
            var name = '';
            if(item.querySelectorAll(".PSLEVEL1GRIDODDROW").length > 0){
                name = item.querySelectorAll(".PSLEVEL1GRIDODDROW");
            }
            else{
                name = item.querySelectorAll(".PSLEVEL1GRIDEVENROW");
            }
            //console.log(name);
            var tempList = [];
            for (let item2 of name){
                var temp = item2.childNodes[1].innerText;
                //console.log(temp);
                tempList.push(temp);
            }
            //console.log(tempList);
            courseTitles.push(tempList[1].replace('&', ''));
            courseTimes.push(tempList[2].replace('&', ''));
            courseLocations.push(tempList[3].replace('&', ''));
            courseInstructors.push(tempList[4].replace('&', ''));
        }

    }
    console.log(courseTitles);
    console.log(courseTimes);
    console.log(courseLocations);
    console.log(courseInstructors);
    var URL = "https://calcentralcalendar.github.io/?" + "Courses=" + courseTitles.join('~') + "&" + "Times=" + courseTimes.join('~') + "&" + "Locations=" + courseLocations.join('~') + "&" + "Instructors=" + courseInstructors.join('~');
   //window.open(URL,'_blank');
    // z.forEach(function(element) {
    //     console.log(element);
    // });
    var html = URL;
    //     node = document_root.firstChild;

  
    return html;
}

function parseOuterHTML(outerHTML) {

}

chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
});