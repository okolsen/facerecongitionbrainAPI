const handleSignin	= (req, res, db, bcrypt	) => {
	const { email, pasword} = req.body;
	if (!email || !password) {
		return res.status(400).json('incorrect form submission');
	}
	db.select('email', 'hash').from('login')
		.where('email', '=', email)
		.then(data => {
			const isvalid = bcrypt.compareSync(password, data[0].hash); 
			if(isvalid){
				return db.select('*').from('users')
					.where('email', '=', email)
					.then(user => {
						res.json(user[0])
					})
					.catch(err => res.status(400).json('unabøe to get user'))
			} else{
				res.staus(400).json('wrong credentials')	
			}
			
		})
		.catch(err => {
			res.status(400).json('wrong credentials')
		})
}

module.exports = {
	handleSignin: handleSignin	
};