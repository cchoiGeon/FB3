const admin = require('firebase-admin');
// const axios = require("axios");
exports.isloggedIn = async (req,res,next) => {
    const sessionCookie = req.cookies.session || "";
    admin
        .auth()
        .verifySessionCookie(sessionCookie, true /** checkRevoked */)
        .then((userData) => {
            next()
        })
        .catch((error) => {
            return res.redirect("/api/login");
        });
    // const kakaologin = req.cookies.kakao || undefined;
    // if(!kakaologin){
    //     return res.redirect("/login");
    // }
    // try{
    //     const authInfo = await axios.post('https://kapi.kakao.com/v2/user/me', {}, {
    //         headers: {
    //             "Content-Type": "application/x-www-form-urlencoded",
    //             'Authorization': 'Bearer ' + kakaologin
    //         }
    //     })
    
    //     if(authInfo?.data){
    //         next()
    //     }else{
    //         admin
    //             .auth()
    //             .verifySessionCookie(sessionCookie, true /** checkRevoked */)
    //             .then((userData) => {
    //                 next()
    //             })
    //             .catch((error) => {
    //                 return res.redirect("/login");
    //             });
    //     }
    // }catch(err){
    //     return res.redirect("/login");
    // }
}