let ac = {}

ac.roleBaseAccess = (roles)=>{
    return (req, res, next)=>{
        for (let i = 0; i < roles.length; i++) {
            if (req.user.role === roles[i]) {
                return next();
            }
        }
        return res.status(403).send('invalid access');
    }
}

module.exports = ac;
