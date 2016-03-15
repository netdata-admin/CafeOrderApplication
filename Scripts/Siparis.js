var apiKey = "*IoT Apikeyni giriniz*";
var name = "not_set";
function connect(socketName) {
    name = socketName;
    connecttoNetdataSocketIO(apiKey, name);
}
function onConnect() {
    $("#spnAvukatData").text("Bağlandı");
    $("#spnDoktorData").text("Bağlandı");
    $("#spnOgrenciData").text("Bağlandı");
    $("#spnNetCafeData").text("Bağlandı");
}
function onDisconnect() {
    $("#spnAvukatData").text("Bağlantı Kapatıldı");
    $("#spnDoktorData").text("Bağlantı Kapatıldı");
    $("#spnOgrenciData").text("Bağlantı Kapatıldı");
    $("#spnNetCafeData").text("Bağlantı Kapatıldı");
}
function onSocketDisconnected(socketName) {

}
function onSocketConnected(socketName) {

}
function onError(errorMessage) {
    console.log(errorMessage);
}
function onData(data) {
    

    var recivedData = JSON.parse(data);
    if (recivedData['dc_MessageTo'] == "NetCafe") {
        $("#spnNetCafeData").text("Gelen Veri: " + recivedData["dc_UserName"] + " > " + recivedData["dc_MessageTo"] + " : " + recivedData["dc_Message"] + "");
        var message = recivedData["dc_UserName"] + ": " + recivedData["dc_Message"];
        if (recivedData["dc_UserName"] == "avukat") {
            $("#txtSiparisList").html($("#txtSiparisList").html() + "<p class='alert siparisalani' style='background-color:#E4503B'>" + message + "</p>");
            $("#txtSiparisList").animate({ scrollTop: $('#txtSiparisList')[0].scrollHeight }, 1000);
            Hazirlaniyor("avukat", "#E4503B");
        }
        else if (recivedData["dc_UserName"] == "doktor") {
            $("#txtSiparisList").html($("#txtSiparisList").html() + "<p class='alert siparisalani' style='background-color:#4E5059'>" + message + "</p>");
            $("#txtSiparisList").animate({ scrollTop: $('#txtSiparisList')[0].scrollHeight }, 1000);
            Hazirlaniyor("doktor", "#4E5059");
        }
        else if (recivedData["dc_UserName"] == "ogrenci") {
            $("#txtSiparisList").html($("#txtSiparisList").html() + "<p class='alert siparisalani' style='background-color:#46AEDC'>" + message + "</p>");
            $("#txtSiparisList").animate({ scrollTop: $('#txtSiparisList')[0].scrollHeight }, 1000);
            Hazirlaniyor("ogrenci", "#46AEDC");
        }
    }
    else if(recivedData["dc_MessageTo"]=="avukat")
    {
        $("#spnAvukatData").text("Gelen Veri: " + recivedData["dc_UserName"] + " > " + recivedData["dc_MessageTo"] + " : " + recivedData["dc_Message"] + "");
        $("#spnAvukatDurum").show();
        $("#spnAvukatDurum").attr("style", "background-color:#E4503B;border:none;color:#fff");
        $("#spnAvukatDurum").text(recivedData["dc_Message"]);
    }
    else if(recivedData["dc_MessageTo"]=="doktor")
    {
        $("#spnDoktorData").text("Gelen Veri: " + recivedData["dc_UserName"] + " > " + recivedData["dc_MessageTo"] + " : " + recivedData["dc_Message"] + "");
        $("#spnDoktorDurum").show();
        $("#spnDoktorDurum").attr("style", "background-color:#4E5059;border:none;color:#fff");
        $("#spnDoktorDurum").text(recivedData["dc_Message"]);
    }
    else if(recivedData["dc_MessageTo"]=="ogrenci")
    {
        $("#spnOgrenciData").text("Gelen Veri: " + recivedData["dc_UserName"] + " > " + recivedData["dc_MessageTo"] + " : " + recivedData["dc_Message"] + "");
        $("#spnOgrenciDurum").show();
        $("#spnOgrenciDurum").attr("style", "background-color:#46AEDC;border:none;color:#fff");
        $("#spnOgrenciDurum").text(recivedData["dc_Message"]);
    }
    else if(recivedData["dc_MessageTo"]=="All")
    {
        $("#spnOgrenciData").text("Gelen Veri: " + recivedData["dc_UserName"] + " > " + recivedData["dc_MessageTo"] + " : " + recivedData["dc_Message"] + "");
        $("#spnOgrenciDurum").show();
        $("#spnOgrenciDurum").attr("style", "background-color:#46AEDC;border:none;color:#fff");
        $("#spnOgrenciDurum").text(recivedData["dc_Message"]);
        $("#spnDoktorData").text("Gelen Veri: " + recivedData["dc_UserName"] + " > " + recivedData["dc_MessageTo"] + " : " + recivedData["dc_Message"] + "");
        $("#spnDoktorDurum").show();
        $("#spnDoktorDurum").attr("style", "background-color:#4E5059;border:none;color:#fff");
        $("#spnDoktorDurum").text(recivedData["dc_Message"]);
        $("#spnAvukatData").text("Gelen Veri: " + recivedData["dc_UserName"] + " > " + recivedData["dc_MessageTo"] + " : " + recivedData["dc_Message"] + "");
        $("#spnAvukatDurum").show();
        $("#spnAvukatDurum").attr("style", "background-color:#E4503B;border:none;color:#fff");
        $("#spnAvukatDurum").text(recivedData["dc_Message"]);
    }
}
function Hazirlaniyor(messageto,color)
{
    setTimeout(function () {
        Gonder("NetCafe", "Siparişiniz Hazırlanıyor", messageto);
        $("#txtSiparisList").html($("#txtSiparisList").html() + "<p class='alert siparisalani' style='background-color:" + color + ";color:#fff;margin-bottom:0;padding:5px'>" + "Sipariş Hazırlanıyor" + "</p>");
        $("#txtSiparisList").animate({ scrollTop: $('#txtSiparisList')[0].scrollHeight }, 1000);
    }, 2000);
    Gonderildi(messageto, color);
}
function Gonderildi(messageto,color)
{
    setTimeout(function () {
        Gonder("NetCafe", "Siparişiniz Gönderiliyor", messageto);
        $("#txtSiparisList").html($("#txtSiparisList").html() + "<p class='alert siparisalani' style='background-color:" + color + ";color:#fff;margin-bottom:0;padding:5px'>" + "Sipariş Gönderiliyor" + "</p>");
        $("#txtSiparisList").animate({ scrollTop: $('#txtSiparisList')[0].scrollHeight }, 1000);
    }, 4000);
    TeslimEdildi(messageto, color)
}
function TeslimEdildi(messageto,color)
{
    setTimeout(function () {
        Gonder("NetCafe", "Siparişiniz Teslim Edildi Afiyet Olsun", messageto);
        $("#txtSiparisList").html($("#txtSiparisList").html() + "<p class='alert siparisalani' style='background-color:" + color + ";color:#fff;margin-bottom:0;padding:5px'>" + "Sipariş Teslim Edildi" + "</p>");
        $("#txtSiparisList").animate({ scrollTop: $('#txtSiparisList')[0].scrollHeight }, 1000);
    }, 9000);
}
function SiparisGonder(clientName, selectId) {
    Gonder(clientName, $("#" + selectId).val(), "NetCafe");
}
function MenuGonder()
{
    if ($("#txtMenu").val().trim() != "")
    {
        Gonder("NetCafe", $("#txtMenu").val(), "All");
    }
}
function Gonder(user, message, messageto) {
    if (user == "NetCafe")
    {
        $("#spnNetCafeData").text("Giden Veri: " + user + " > " + messageto + " : " + message + "");
        
    }
    else if (user == "avukat")
    {
        $("#spnAvukatData").text("Giden Veri: " + user + " > " + messageto + " : " + message + "");
       
    }
    else if (user == "doktor")
    {
        $("#spnDoktorData").text("Giden Veri: " + user + " > " + messageto + " : " + message + "");
        
    }
    else if (user == "ogrenci")
    {
        $("#spnOgrenciData").text("Giden Veri: " + user + " > " + messageto + " : " + message + "");
        
    }
    var columns = ["dc_UserName", "dc_Message", "dc_MessageTo"];
    var data = [user, message, messageto];
    createAndSendData(columns, data, name);
}
function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
}
