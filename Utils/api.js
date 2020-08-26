import Convert from "./System/System.Convert";
import RSA from "./System/System.Security.Cryptography.RSA";
import Text from "./System/System.Text";
import store from '../store/store'
import {setMsg,setNrmlMsg} from '../store/Actions/ActionLogin'

// store.dispatch(setMsg("This is a Test Message"))
// const base_url_wealthyFox="https://wfanalytics.mwisr.com//api//"
// const base_url_Mwisr="https://wfanalytics.mwisr.com//api//"

const base_url_wealthyFox="http://202.38.173.113//api//"
const base_url_Mwisr="http://202.38.173.113//api//"

const endpoint_url={
    login: base_url_wealthyFox+"Authentication/Login/",
    quick_register:base_url_wealthyFox + "/AnalystRegistration/QuickRegister",
    send_otp: base_url_wealthyFox+"AnalystRegistration/SendOTP",
    verify_otp: base_url_wealthyFox+"AnalystRegistration/VerifyOTP",
    IdentifyYourself:base_url_Mwisr+"AnalystRegistration/IdentifyUser",
    UpdateUserIdentification:base_url_Mwisr+"/AnalystRegistration/UpdateUserIdentification",
    ContactDetails:base_url_Mwisr+"Broker/UpsertContactDetail",
    RegistrationDetails:base_url_Mwisr+"Broker/UpsertRegistrationDetail",
    UpsertCompanyDetail:base_url_Mwisr+"Broker/UpsertCompanyDetail",
    GetCreditPackages:base_url_wealthyFox + "/UserLicense/GetCreditPackages",
    ApplyCreditPackage:base_url_wealthyFox+"UserLicense/ApplyCreditPackage/",
    UpsertCustomerAnswers:base_url_Mwisr+"AnalystRegistration/UpsertCustomerAnswers",
    GetUserPhoto:base_url_Mwisr+"Analyst/GetUserPhoto",
    GetCalls: base_url_wealthyFox+"RTTracker/GetCalls/",
    GetPackages:base_url_wealthyFox + "/AnalystQuery/GetPackageList",
    GetSubList: base_url_wealthyFox+"MwisrQueries/GetSub/",
    GetUserOwners:base_url_wealthyFox+"Analyst/GetUserOwner",
    GetStrategy:base_url_wealthyFox+"RTTracker/GetStrategyDuration",
    GetExchanges:base_url_wealthyFox+"/RTTracker/GetExchanges/",
    UpsertPackage:base_url_wealthyFox+"Analyst/UpsertPackage",
    GetCallDetails:base_url_wealthyFox+"AnalystQuery/GetCallDetail",
    GetResearchReports:base_url_wealthyFox+"ResearchReport/GetResearchReport",
    AssignPackage:base_url_wealthyFox+"Analyst/AssignPackage",
    UpsertPackagePermission:base_url_wealthyFox + "/AnalystRegistration/UpsertPackagePermission",
    AddUser:base_url_wealthyFox+"/AnalystRegistration/AddUser",
    GetUserPermissionSet:base_url_wealthyFox+"/AnalystRegistration/GetUserPermissionSet",
    UpsertUserPermission:base_url_wealthyFox + "/AnalystRegistration/UpsertPermission",
    GetSubDetail:base_url_wealthyFox+"MwisrQueries/GetSubDetail",
    GetPackageDetails:base_url_wealthyFox +"AnalystQuery/GetPackageDetail",
    GetAssignedUsers:base_url_wealthyFox+"/Analyst/GetAssignedUsers",
    GetPackagePermission:base_url_wealthyFox + "/AnalystRegistration/GetPackagePermissionSet",
    GetPackageListAddCall:base_url_wealthyFox + "/AnalystQuery/GetPackageForAddCall",
    GetSimilarPackages:base_url_wealthyFox + "/RTTracker/GetSimilarPackages",
    GetStrategyDuration:base_url_wealthyFox + "/RTTracker/GetStrategyDuration",
    GetSymbol: base_url_wealthyFox+"AnalystQuery/GetSymbols",
    GetSymbolsDetails:base_url_wealthyFox + "/AnalystQuery/GetSymbolsDetails",
    UpsertCall: base_url_wealthyFox + "/Analyst/UpsertCall",
    GetStrategies: base_url_wealthyFox + "/RTTracker/GetStrategy",
    GetStrategyDetails:base_url_wealthyFox + "/RTTracker/GetStrategyDetail",
    ChangeUserStatus:base_url_wealthyFox + "/RTTracker/ChangeUserStatus",
    GetDashboard: base_url_wealthyFox + "/AnalystQuery/GetDashBoard"
}

/********* Normal Functions **********/
export function ArrangeCalls(Calls,PageSize)
{
  let ManagedCalls=[]
  let Buffer = 0
  let rowCount=0
  Calls.forEach((element,index) => {
    // console.log(parseInt(element.TotalLegs),Calls.length - index)
     if(Buffer === 0)
     {
      if(element.TotalLegs === "1")
      {
          let SingleLeggedCall={
              Index:index,
              Legs:[
                  element
              ]
          }
          ManagedCalls.push(SingleLeggedCall)
          rowCount=rowCount+1
      }
      else
      {        
          let TotalLegs=parseInt(element.TotalLegs)
          console.log(index,TotalLegs)
          console.log(Calls.length,index+TotalLegs)
          if(PageSize > index+TotalLegs)
          {
            Buffer=element.TotalLegs - 1
            let MultiLegs=[]
            for(let i = 0;i < TotalLegs;i++)
            {
                MultiLegs.push(Calls[index+i])
            }
            let MultiLeggedCall={
             Index:index,
             Legs:MultiLegs
            }
            ManagedCalls.push(MultiLeggedCall)
          }
      }
     }
     else
     {
         Buffer=Buffer-1
     }  
 });

 return ManagedCalls
}


export function formatDate(date){
  date=date.split(' ')
  let dateArray=date[0].split('/')
  let months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

  return `${dateArray[1]}-${months[dateArray[0]]}-${dateArray[2]}`

}

export function reportDate(date)
{
  let dateArray=date.split('-')
  let months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return `${dateArray[2]}-${months[parseInt(dateArray[1])]}-${dateArray[0]}`
}

export let getPackageBackColor=(segment)=>{
  if(segment === "Equity")
  {
    return "#D9F4F4"
  }
  else if(segment === "EquityOptions")
  {
    return "#cab7dd"
  }
  else if(segment === "EquityFutures")
  {
    return "#fff6da"
  }
  else if(segment === "CommodityFutures")
  {
    return "#E0F8FB"
  }
  else if(segment === "CommodityOptions")
  {
    return "#FFEAED"
  }
  else if(segment === "CurrencyFutures")
  {
    return "#e4e4e4"
  }
  else if(segment === "CurrencyOptions")
  {
    return "#cfd8dc"
  }
}
//Equity-90ee90
//EquityOptions-b48fd9-6c5682
//EquityFutures-#FEECB3-orange
//Commodity Futures-#BBDEFA-blue
//Commodity Options-#FA8072-red
//Currency Futures-90a4ae-#455a64
//Currency Options-cfd8dc-455a64
export let getPackageFontColor=(segment)=>{
  if(segment === "Equity")
  {
    return "#33C4C6"
  }
  else if(segment === "EquityOptions")
  {
    return "#6c5682"
  }
  else if(segment === "EquityFutures")
  {
    return "orange"
  }
  else if(segment === "CommodityFutures")
  {
    return "#35D0E4"
  }
  else if(segment === "CommodityOptions")
  {
    return "#FF7588"
  }
  else if(segment === "CurrencyFutures")
  {
    return "#455a64"
  }
  else if(segment === "CurrencyOptions")
  {
    return "#455a64"
  }
}

export function verbose(isSuccess,Heading,Description)
{
    let Msg={
      IsSuccess:isSuccess,
      Heading:Heading,
      Description:Description
    }

    store.dispatch(setNrmlMsg(JSON.stringify(Msg)))
    
}
/**********Normal Functions Ends Here ******/


const headers = {
    Accept: "*/*",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Authorization: "",
    "Allow-Encoding": "gzip",
    SendOutputAs: "CSV",
    "SessionCookie":"",
    "set-cookie":""
  };

  function setHeaders(requestObj, headers) {
    Object.keys(headers).forEach(function(header) {
      requestObj.setRequestHeader(header, headers[header]);
    });
  
    return requestObj;
  }

  function parseHttpHeaders(httpHeaders) {
    return httpHeaders.split("\n")
     .map(x=>x.split(/: */,2))
     .filter(x=>x[0])
     .reduce((ac, x)=>{ac[x[0]] = x[1];return ac;}, {});
  }
  

  function createGETParams(params) {
    if (Object.keys(params).length === 0) return "";
    let getP = "?";
    if (Object.keys(params).length !== 0)
      Object.keys(params).forEach((key, idx, array) => {
        if (idx === array.length - 1) {
          return (getP = `${getP}${key}=${params[key]}`);
        }
        getP = `${getP}${key}=${params[key]}&`;
      });
    else getP = "";
    console.log();
    return getP;
  }

  function encrypt(plainText) {
    console.log("PlainHeader",plainText)
    const publicKey =
      "<RSAKeyValue><Modulus>zlcerOOBqrOe7A+MfzejQWFey6isLo46KMMOzrVUgeIVhqL048SjZiXxBC2k7/KR21smJTrmOKqwTh2wYQdon1ilkeHU75OBu8uiAWtJ2FPkOvx8yyWKTjDiHe0p/Ghr09NUpFZMnBZz0V62ND4YOhIZRz54QMAFkKDiVcKysHVZQ8r2gS4GUSSOHFMdw/OqpHspHcRdIV8a/+kvbP89nScfvhy7Z+/KPLi1JRpNL9V1qsz8oByKmhovSW06liVMIW044q+cJlHyWJS4+UEmMAJ34AVhj0/VobRP6ZOkZk74YOlOgCxo1PFAMiMXoB6yFqnUtZT1iixPlf63jE4MCQ==</Modulus><Exponent>AQAB</Exponent></RSAKeyValue>";
  
    let rsa = new RSA.RSACryptoServiceProvider(2048);
    rsa.FromXmlString(publicKey);
    console.log("RSA KEY",rsa)
  
    let ByteConverter = new Text.UnicodeEncoder();
    let ptbyt = ByteConverter.GetBytes(plainText);
  
    let encrypt = rsa.Encrypt(ptbyt, false);
  
    let encryptedBase64 = Convert.ToBase64String(encrypt);
    return Convert.ToBase64String(
      Text.Encoding.Unicode.GetBytes(encryptedBase64)
    );
  }

  
function parseCSV(csvString) {
  csvString = csvString.replace(/"/g, "");

  var lines = csvString.split("\\r\\n");

  // console.log("lines", lines);

  lines.map((line, i) => {
    // console.log(i);
    // console.log(line);
    lines[i] = line.split(",");
  });

  var parsedCSV = [];
  for (var i = 1; i < lines.length; i++) {
    var obj = {};

    for (var j = 0; j < lines[0].length; j++) {
      obj[lines[0][j]] = lines[i][j];
    }

    parsedCSV.push(obj);
  }
  parsedCSV.pop();
  return parsedCSV;
}

 
  export function CheckWhereToGo(location){
    switch(location)
    {
        case "VO":
            return "OTP"

        case "DB":
            return "Home"

        case "IU":
            return "Onboarding"

        case "CD":
            return "Onboarding"

        case "RD":
            return "Onboarding"

        case "CO":
            return "Onboarding"
        
        case "CC": 
            return "Onboarding"

        case "Q1":
              return "Onboarding"

        case "Q2":
              return "Onboarding"

        case "Q3":
          return "Onboarding"
  
        default:
            return null;
    }
}

export function send_OTP(UserId,authHeader) {
  const data = {
    AnalystId: UserId
  };
  return apiCall(endpoint_url["send_otp"], "GET", data, authHeader).then(
    data => JSON.parse(data)
  );
}

export function verify_OTP(OTP,authHeader) {
  const data = {
    OTPNumber: OTP
  };

  return apiCall(endpoint_url["verify_otp"], "GET", data, authHeader).then(
    data => JSON.parse(data)
  );
}




  export function GetAuthHeader(
    emailId = "",
    password = "",
    mobileNo = "",
    accessToken="",
    headers = [],
    verbose = false
  ) {
    //Extract Header values -> {0}:web:{2}:{3}:{4}:{5}:{6}:{7}:{8}:{9}", EmailId,Role,PinNo,Password,TrackingNo,MobileNo,Version Code,Version Name,Audiance
  //   Header Format -> {0}:{1}:{2}:{3}:{4}:{5}:{6}:{7}:{8}"
  
  // 0 1 2 3 4 5 6 7 8
  // EmailId,Device,PinNo,Password,AccessToken,MobileNo,VersionCode,VersionName,Audiance
    
    let _auth =
      emailId +
      ":Web" +
      ':12345' +
      ':'+password +
      ":" + accessToken +
      ":" +mobileNo +
      ":0:Test Version:Mwisr";
    console.log("277 auth",_auth)
      // let _auth =
      // emailId 
      // + ":WEB" 
      // + ':"":' +  password
      // + ":123456789"
      // + ":" +  mobileNo 
      // + ":0:Test Version"
      // + ":" + sessionId
      // + ":Mwisr";
  
    if (verbose) console.log("plain Text ", _auth);
  
    const encrypted = encrypt(_auth);
  
    if (verbose) console.log(encrypted);
    let _cred = "Basic " + encrypted;
    return _cred;
  }

  export function apiCall(url, method, params, authHeader, isForm = false) {
    let SessionCookie;
    function work(resolve, reject) {
      // setTimeout(()=>{
      const isGet = method === "GET" || method === "get";
  
      url = isGet ? url + createGETParams(params) : url;
      var httpx = new XMLHttpRequest();
      httpx.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
          resolve(this.response);
          if(url.includes("/Login"))
          { 
            console.log("282","In Login")
            SessionCookie=parseHttpHeaders(httpx.getAllResponseHeaders())
          // SessionCookie=SessionCookie['sessioncookie']
            
            headers["set-cookie"]=`name=SessionCookie;value=${SessionCookie['set-cookie']}` 
            // headers["SessionCookie"]=`name=SessionCookie;value=0211f238-4ffc-4d19-9927-a255a39b6796`    
            // Key:SessionCookie,Value:0211f238-4ffc-4d19-9927-a255a39b6796
            // 0211f238-4ffc-4d19-9927-a255a39b6796 
            console.log("Api",SessionCookie)
          }
        }
        else if(this.readyState === 4 && this.status === 401)
        {
            store.dispatch(setMsg(401))
        }
        else if(this.readyState === 4 && this.status === 500)
        {
          store.dispatch(setMsg(500))
        }
      };
      httpx.onerror = reject;
      httpx.open(method, url, true);
      headers["Authorization"] = authHeader;
      
  
      if (isForm) headers["Content-type"] = "application/x-www-form-urlencoded";
      
      httpx = setHeaders(httpx, headers);
      httpx.timeout = 600000;
      httpx.send(JSON.stringify(params));
      
      httpx.timer = 0;
      httpx.limit = 5;
      httpx.onerror = function(e) {
        console.log("Network error", this.timer, this.limit);
        store.dispatch(setMsg(504))
        // while (this.timer <= this.limit) {
        //   setTimeout(() => {
        //     apiCall(url, method, params, authHeader);
        //     this.timer++;
        //   }, 1000);
        // }
        //apiCall(url, method, params, authHeader);
      };
  
      httpx.ontimeout = function(e) {
        console.log("Timeout");
        store.dispatch(setMsg(408))
        // while (this.timer <= this.limit) {
        //   setTimeout(() => {
        //     apiCall(url, method, params, authHeader);
        //     this.timer++;
        //   }, 3000);
        // }
      };
      // }, 5000);
    }
    return new Promise(work);
  }


  export function login_call(data) {
    let authHeader = GetAuthHeader(data["EMailId"], data["Password"],data["Phone"]);
    console.log(data)
    console.log(authHeader);
    return apiCall(endpoint_url["login"], "POST", data, authHeader)
      .then(response => JSON.parse(response))
      .catch(err => {
        console.log(err);
      });
  }

  export function signup_call(data) {
    let authHeader = GetAuthHeader(
      data["EMailId"],
      data["Password"],
      data["PhoneNumber"]
    );
  
    return apiCall(endpoint_url["quick_register"], "POST", data, authHeader).then(
      data => JSON.parse(data)
    );
  }

  export function identifyYourself(userTypeId,userType, authHeader) {
    const data = {
      IdentifyYourself: userType,
      isOwner: userTypeId === 0 ? true:false
    };
  
    return apiCall(endpoint_url["IdentifyYourself"], "POST", data, authHeader).then(data => JSON.parse(data));
  }

  
export function UpdateUserIdentification(authHeader,UserId,UserType)
{
  let payload={
    userId:UserId,
    userType:UserType
  }
  return apiCall(endpoint_url["UpdateUserIdentification"], "GET", payload, authHeader).then(
    data => JSON.parse(data)
  );
}


export function RegisterContactDetails(payload,authHeader){
  return apiCall(endpoint_url["ContactDetails"], "POST", payload, authHeader).then(data => JSON.parse(data));
}

export function RegisterRegitrationDetails(payload,authHeader){
  return apiCall(endpoint_url["RegistrationDetails"], "POST", payload, authHeader).then(data => JSON.parse(data));
}

export function RegisterCompanyDetails(payload,authHeader){
  return apiCall(endpoint_url["UpsertCompanyDetail"], "POST", payload, authHeader).then(data => JSON.parse(data));
}


export function get_credit_packages(authHeader) {
  return apiCall(endpoint_url["GetCreditPackages"], "GET", {}, authHeader)
    .then(response => {
      return JSON.parse(response);
    })
    .catch(err => {
      console.log(err, "err");
    });
}

export function apply_credit_package(authHeader, data) {
  return apiCall(endpoint_url["ApplyCreditPackage"], "GET", data, authHeader)
    .then(response => {
      return JSON.parse(response);
    })
    .catch(err => {
      console.log(err, "err");
    });
}

export function get_user_photo(authHeader) {
  return apiCall(endpoint_url["GetUserPhoto"], "GET", "", authHeader)
    .then(response => {
      return JSON.parse(response);
    })
    .catch(err => {
      console.log(err, "err");
    });
}

export function upsertCustomerAnswers(authHeader, params) {
  const { userId, questionId, optionId, optionSubId, optionValue } = params;
  return apiCall(
    endpoint_url["UpsertCustomerAnswers"],
    "GET",
    {
      userId,
      questionId,
      optionId,
      optionSubId,
      optionValue
    },
    authHeader
  ).then(response => {
    return JSON.parse(response);
  })
  .catch(err => {
    console.log(err, "err");
  });
}

export function get_calls(authHeader, payload) {
  console.log(authHeader,payload)
  return apiCall(endpoint_url["GetCalls"], "GET", payload, authHeader)
    .then(response => {
      return parseCSV(response);
    })
    .catch(err => {
      console.log(err, "err");
    });
}

export function get_packages(body) {
  const { forOwnerId,userTypeId, assignedToMe, forUserId, AuthHeader, createdByMe,currentPage,pageSize,forDebug} = body;
  return apiCall(
    endpoint_url["GetPackages"],
    "GET",
    {
      forOwnerId,
      userTypeId,
      assignedToMe,
      forUserId,
      createdByMe,
      currentPage,
      pageSize,
      forDebug
    },
    AuthHeader
  )
    .then(response => {
      return JSON.parse(response);
    })
    .catch(err => {
      console.log(err, "err");
    });
}

export function get_sub_list(userId,listType,IsBase,authHeader) {
  const payload = {
    ForUserId:null,
    ForUserTypeId: listType,
    ForOwnerId:null,
    PackageNameSize:10,
    IsBaseLevel:IsBase
  };
  console.log(payload,authHeader)

  return apiCall(endpoint_url["GetSubList"], "POST", payload, authHeader)
    .then(data => {
      return JSON.parse(data)
    })
    .catch(err => err);
}

export function get_user_owners(authHeader){
  
  return apiCall(endpoint_url["GetUserOwners"],"GET",{},authHeader).then(data => {
    return JSON.parse(data)
    })
    .catch(err => err);
}

export function get_strategy(authHeader){
  
  return apiCall(endpoint_url['GetStrategy'],"GET",{},authHeader).then(data => {
    return JSON.parse(data)
    })
    .catch(err => err);
}

export function get_exchanges(authHeader,payload)
{
  return apiCall(endpoint_url['GetExchanges'],"GET",payload,authHeader).then(data => {
    return JSON.parse(data)
    })
    .catch(err => err);
}

export function upsert_package(authHeader,payload)
{
  return apiCall(endpoint_url['UpsertPackage'],"POST",payload,authHeader).then(data => {
    return JSON.parse(data)
    })
    .catch(err => err);
}

export function get_call_details(authHeader,payload)
{
  return apiCall(endpoint_url['GetCallDetails'],"GET",payload,authHeader).then(data => {
    return JSON.parse(data)
    })
    .catch(err => err);
}

export function get_research_reports(authHeader,payload)
{
  return apiCall(endpoint_url['GetResearchReports'],"GET",payload,authHeader).then(data => {
    return JSON.parse(data)
    })
    .catch(err => err);
}

export function assign_Package(authHeader,payload)
{
  return apiCall(endpoint_url['AssignPackage'],"POST",payload,authHeader).then(data => {
    return JSON.parse(data)
    })
    .catch(err => err);
}

export function upsert_package_permisssion(authHeader,payload)
{
  return apiCall(endpoint_url['UpsertPackagePermission'],"POST",payload,authHeader).then(data => {
    return JSON.parse(data)
  }).catch(err => err)
}

export function add_user(authHeader,payload)
{
  return apiCall(endpoint_url['AddUser'],"POST",payload,authHeader).then(data => {
    return JSON.parse(data)
  }).catch(err => err)
}

export function get_user_permission_set(authHeader,payload)
{
  return apiCall(endpoint_url['GetUserPermissionSet'],"GET",payload,authHeader).then(data => {
    return JSON.parse(data)
  }).catch(err => err)
}

export function upsert_user_permission(authHeader,payload)
{
  return apiCall(endpoint_url['UpsertUserPermission'],"POST",payload,authHeader).then(data => {
    return JSON.parse(data)
  }).catch(err => err)
}

export function get_sub_detail(authHeader,payload)
{
  return apiCall(endpoint_url['GetSubDetail'],"POST",payload,authHeader).then(data => {
    return JSON.parse(data)
  }).catch(err => err)
}

export function get_pacakge_details(authHeader,payload)
{
  return apiCall(endpoint_url['GetPackageDetails'],"GET",payload,authHeader).then(data => {
    return JSON.parse(data)
  }).catch(err => err)
}

export function get_assigned_users(authHeader,payload)
{
  return apiCall(endpoint_url['GetAssignedUsers'],"GET",payload,authHeader).then(data => {
    return JSON.parse(data)
  }).catch(err => err)
}

export function get_package_permissions(authHeader,payload)
{
  return apiCall(endpoint_url['GetPackagePermission'],"POST",payload,authHeader).then(data => {
    return JSON.parse(data)
  }).catch(err => err)
}

export function get_package_addCall(authHeader)
{
  return apiCall(endpoint_url['GetPackageListAddCall'],"GET",{},authHeader).then(data => {
    return JSON.parse(data)
  }).catch(err => err)
}

export function get_similar_package(authHeader,payload)
{
  return apiCall(endpoint_url['GetSimilarPackages'],"GET",payload,authHeader).then(data => {
    return JSON.parse(data)
  }).catch(err => err)
}

export function get_strategy_duration(authHeader)
{
  return apiCall(endpoint_url['GetStrategyDuration'],"GET",{},authHeader).then(data => {
    return JSON.parse(data)
  }).catch(err => err)
}

export function get_symbol(authHeader,payload)
{
  return apiCall(endpoint_url['GetSymbol'],"GET",payload,authHeader).then(data => {
    return parseCSV(data)
  }).catch(err=>err)
}

export function get_symbol_details(authHeader,payload)
{
  return apiCall(endpoint_url['GetSymbolsDetails'],"GET",payload,authHeader).then(data => {
    return parseCSV(data)
  }).catch(err=>err)
}

export function add_call(authHeader,payload)
{
  return apiCall(endpoint_url['UpsertCall'],"POST",payload,authHeader).then(data => {
    return JSON.parse(data)
  }).catch(err => err)
}


export function get_strategies(authHeader,payload)
{
  return apiCall(endpoint_url['GetStrategies'],"GET",payload,authHeader).then(data => {
    return JSON.parse(data)
  }).catch(err => err)
}

export function get_strategy_details(authHeader,payload)
{
  return apiCall(endpoint_url['GetStrategyDetails'],"GET",payload,authHeader).then(data => {
    return JSON.parse(data)
  }).catch(err => err)
}

export function change_user_status(authHeader,payload)
{
  return apiCall(endpoint_url['ChangeUserStatus'],"GET",payload,authHeader).then(data => {
    return JSON.parse(data)
  }).catch(err => err)
}


export function get_Dashboard(authHeader)
{
  return apiCall(endpoint_url['GetDashboard'],"GET",{},authHeader).then(data =>{
    return JSON.parse(data)
  }).catch(err => err)
}