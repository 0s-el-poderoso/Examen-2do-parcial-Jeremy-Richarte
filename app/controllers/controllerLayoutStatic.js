//Import db model
const path = require('path')

// >>>>>>>>>>>>>>>>>>>>>> Charts <<<<<<<<<<<<<<<<<<<<<<
function root(req, res) {
    //Charts route
    return res.status(200).render(path.join(__dirname + '/../views/layout-static'))
}

module.exports = {
    root
}