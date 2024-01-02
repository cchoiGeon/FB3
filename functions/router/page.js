const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const { isloggedIn } = require('../middlewares');
const db = admin.firestore();
const axios = require('axios');
const qs = require('qs')

router.get('/',isloggedIn,async (req,res)=>{
    return res.render('home')
})  
router.get('/intro',async (req,res)=>{
    return res.render('intro')
})  
router.get('/login',async (req,res)=>{
    return res.render('login')
})  
router.get('/signup',async (req,res)=>{
    return res.render('signup')
})  
router.get('/matching',isloggedIn,async (req,res)=>{
    return res.render('matching')
})  
router.get('/matchingInfo',isloggedIn,async (req,res)=>{
    return res.render('matchingInfo')
})  
router.get('/myprofile',isloggedIn,async (req,res)=>{
    return res.render('myprofile')
})  
router.get('/matchingresult-love',isloggedIn,async (req,res)=>{
    return res.render('matchingresultlove')
})
router.get('/verify',isloggedIn,async (req,res)=>{
    return res.render('verify')
})  
router.post('/login',async(req,res)=>{
    const idToken = req.body.idToken.toString();

    const expiresIn = 60 * 60 * 24 * 5 * 1000;

    admin
        .auth()
        .createSessionCookie(idToken, { expiresIn })
        .then(
            async (sessionCookie) => {
                const options = { maxAge: expiresIn, httpOnly: true };
                await res.cookie("session", sessionCookie, options);
                console.log(req.cookies.session)
                res.end(JSON.stringify({ status: "success" }));
            },
            (error) => {
                res.status(401).send("UNAUTHORIZED REQUEST!");
            }
        );
})
router.get("/logout", async (req, res) => {
    // const a = await axios.post('https://kapi.kakao.com/v1/user/logout', {}, {
    //     headers: {
    //         "Content-Type": "application/x-www-form-urlencoded",
    //         'Authorization': 'Bearer ' + req.cookies.kakao
    //     }
    // });
    res.clearCookie("session");
    // res.clearCookie("kakao");
    res.redirect("/api/login");
});
// router.get('/getToken', async (req, res) => {
//     const token = await axios({
//         method: "POST",
//         url: "https://kauth.kakao.com/oauth/token",
//         headers: {
//         "content-type": "application/x-www-form-urlencoded",
//         },
//         data: qs.stringify({
//         grant_type: "authorization_code",
//         client_id: 'd9e8d28a6282ee66ee55843d499ce946',
//         redirectUri: '/',
//         code: req.query.code,
//         }),
//     });
//     const authInfo = await axios.post('https://kapi.kakao.com/v2/user/me', {}, {
//         headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//             'Authorization': 'Bearer ' + token.data.access_token
//         }
//     });
//     const expiresIn = 60 * 60 * 24 * 5 * 1000;
//     const options = { maxAge: expiresIn, httpOnly: true };
//     res.cookie("kakao", token.data.access_token , options);
//     return res.redirect('/')
// });
module.exports = router;