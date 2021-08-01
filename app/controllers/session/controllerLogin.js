//Import db model
const path = require('path')
const modelUser = require('../../models/modelUser')
const crypto = require('crypto-js')
const LocalStorage = require('node-localstorage').LocalStorage
localStorage = new LocalStorage('./scratch')

// >>>>>>>>>>>>>>>>>>>>>> Charts <<<<<<<<<<<<<<<<<<<<<<
function root(req, res) {
	//Charts route
	return res.status(200).render(path.join(__dirname + '/../../views/session/login'))
}

async function logIn(req, res) {
	//LogIn validator
	await modelUser.find({ user: req.body.user })
		.then((data) => {
			if (data.length) { //if data 👍
				//Encryption
				var compare = crypto.AES.decrypt(data[0].pass, req.body.user)

				if (compare.toString(crypto.enc.Utf8) === req.body.pass) { //🟢
					modelUser.updateOne({ user: req.body.user }, { last_conn: Date.now() })
						.then(() => {
                            localStorage.setItem('user', req.body.user)

							return res.status(200).redirect('/evaluacion')
						})
						.catch((error) => {
							console.log('No se pudo:', error)
						})
				} else { //🔴
					console.log('No same pass')
				}
			} else { //if no data 🥶
				console.log('No user')
			}
		})
		.catch((error) => { //if error 🤬
			console.log('Error:', error)
		})
	return res.status(200).redirect('/evaluacion/login')
}

module.exports = {
	root,
	logIn,
}
