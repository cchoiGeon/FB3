const admin = require('firebase-admin');
exports.isloggedIn = (req,res,next) => {
    const sessionCookie = req.cookies.session || "";
    admin
        .auth()
        .verifySessionCookie(sessionCookie, true /** checkRevoked */)
        .then((userData) => {
            next()
        })
        .catch((error) => {
            return res.redirect("/gongting-bbe91/us-central1/api/login");
        });
}