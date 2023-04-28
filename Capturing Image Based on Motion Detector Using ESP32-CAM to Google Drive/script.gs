// Fungsi ini akan di jalankan sebagai Web App, artinya dapat menghandle 
// HTML service untuk berinteraksi dengan fungsi dari server-side Apps Script ini
// Fungsi doPost adalah fungsi khusus untuk melayani POST request
// e merupakan representasi dari argument yang dikirimkan. Berisikan data-data/parameter dari POST request tersebut
// Use this in googlescript
function doPost(e) {
  // Mengambil parameter-parameter dari Data ESP32
  var myFoldername = e.parameter.myFoldername;
  var myFile = e.parameter.myFile;
  var myFilename = Utilities.formatDate(new Date(), "GMT+7", "dd/MM/yyy_HH:mm:ss")+"_"+e.parameter.myFilename;
  var contentType = myFile.substring(myFile.indexOf(":")+1, myFile.indexOf(";"));
  var data = myFile.substring(myFile.indexOf(",")+1);
  // Decode Menggunakan Metode base64
  data = Utilities.base64Decode(data);
  var blob = Utilities.newBlob(data, contentType, myFilename);
  
  // Menyimpan Foto ke Google Drie
  var folder, folders = DriveApp.getFoldersByName(myFoldername);
  if (folders.hasNext()) {
    folder = folders.next();
  } else {
    folder = DriveApp.createFolder(myFoldername);
  }
  var file = folder.createFile(blob);    
  file.setDescription("Uploaded From ESP32");
  
  var imageID = file.getUrl().substring(file.getUrl().indexOf("/d/")+3,file.getUrl().indexOf("view")-1);
  var imageUrl = "https://drive.google.com/uc?authuser=0&id="+imageID;
  
  return ContentService.createTextOutput("Completed.");
}