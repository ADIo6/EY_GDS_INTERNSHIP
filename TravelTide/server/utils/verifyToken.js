import jwt from 'jsonwebtoken'

const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken || req.headers.authorization?.split(' ')[1]; // Handle both cookies and headers
    console.log("Token:", token);

    if (!token) {
        return res.status(401).json({ success: false, msg: "Access denied. You're not authorized." });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            console.error("JWT Error:", err);
            return res.status(401).json({ success: false, message: "Token is invalid" });
        }
        req.user = user;
        next();
    });
};

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        console.log("User in Token:", req.user);
        console.log("User in Request Body:", req.body.userID);
        console.log("Payload received by verifyUser:", req.body);
        if (req.user.id === req.body.userID || req.user.role === 'admin') {
            next();
        } else {
            res.status(401).json({ success: false, message: "You're not authorized to access!!" });
        }
    });
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role === 'admin') {
            next();
        } else {
            return res.status(401).json({ success: false, msg: "Admin only. You're not authorized" });
        }
    });
};