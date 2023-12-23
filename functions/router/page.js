const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const { isloggedIn } = require('../middlewares');
const db = admin.firestore();
const axios = require('axios');

router.get('/',async (req,res)=>{
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
router.get('/verify',async (req,res)=>{
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
router.get("/logout", (req, res) => {
    res.clearCookie("session");
    res.redirect("/gongting-bbe91/us-central1/api/login");
});
router.get('/getToken', async (req, res) => {
const code = req.query.code;
// Kakao OAuth Token 요청을 위한 데이터
const postData = new URLSearchParams();
postData.append('grant_type', 'authorization_code');
postData.append('client_id', '123'); // 여기에 실제 클라이언트 ID를 넣어야 합니다.
postData.append('redirect_uri', '123'); // 여기에 실제 리다이렉트 URI를 넣어야 합니다.
postData.append('code', code ); // 여기에 실제 인증 코드를 넣어야 합니다.

// Kakao OAuth Token 요청
axios.post('https://kauth.kakao.com/oauth/token', postData, {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
})
.then(function (response) {
    console.log('Response:', response.data);
})
.catch(function (error) {
    // 요청 실패 시 오류를 처리합니다.
    console.error('Error:', error);
});
});
module.exports = router;