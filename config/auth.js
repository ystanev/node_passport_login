module.exports = {
    ensureAuthenticated: function (req, res, next) {
        if (red.isAuthenticated) {
            return next();
        }
        req.flash('error_msg', 'Please login to view this resource');
        res.redirect('/users/login');
    }
}