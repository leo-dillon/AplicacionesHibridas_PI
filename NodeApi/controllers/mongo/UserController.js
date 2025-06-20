// controllers/UserController.js
import { UserModel } from '../../models/mongo/UserModel.js'
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jsonWebToken from 'jsonwebtoken';
const salt = 10

dotenv.config()
const SECRET_KEY = process.env.SECRET_KEY


export class UserController {
    static randomID(){
        return crypto.randomUUID();
    }
	static async auth(req, res) {
		const { email, password } = req.body;

		const user = await UserModel.findOne({ email });
		if (!user) {
			return res.status(404).json({
			message: "El usuario no existe"
			});
		}
		const passOk = await bcrypt.compare(password, user.password);
		if (!passOk) {
			return res.status(401).json({
			message: "La contraseña es inválida"
			});
		}
		const data = {
			id: 	user._id,
			email: 	user.email,
			role: 	user.role,
			School:  user.school_id
		};
		const token = jsonWebToken.sign(data, SECRET_KEY, { expiresIn: '1h' });
		return res.json({
			message: "Credenciales correctas",
			jwt: token
		});
	}

	static async getLastsUsers(req, res){
		try{
			const users = await UserModel.find().sort({createdAt: -1}).limit(2)
			res.status(200).json(users)
		} catch ( error ) {
			res.status(500).json({ error: error.message })
		}
	}

	static async getUsers(req, res) {
		try {
		const users = await UserModel.find()
		res.status(200).json(users)
		} catch (error) {
		res.status(500).json({ error: error.message })
		}
	}

	static async getUserById(req, res) {
		try {
		const user = await UserModel.findById(req.params.id)
		if (!user) return res.status(404).json({ error: 'No encontrado' })
		res.status(200).json(user)
		} catch (error) {
		res.status(500).json({ error: error.message })
		}
	}

	static async getUserByEmail(req, res){
		try {
			const user = await UserModel.findOne({email: req.params.email})
			if(user){
				res.status(200).json(user)
			}else{
				res.status(404).json({error: "No encontrado"})
			}
		} catch (error) {
			res.status(500).json({error: error.message})
		}
	}

	static async getUserByGender(req, res){
		try {
			const regexGender = new RegExp(req.params.gender, 'i');
			// Este regex trae los valores que contengan { req.params.Genre }, con 'i' ( No case Sensitive )
			const user = await UserModel.find({gender: regexGender })
			if(user){
				res.status(200).json(user)
			}else{
				res.status(404).json({error: "No encontrado"})
			}
		} catch (error) {
			res.status(500).json({error: error.message})
		}
	}

	static async getUserByFirstName(req, res){
		try {	
			const regexFirstName = new RegExp(req.params.firstName, 'i');
			// Este regex trae los valores que contengan { req.params.firstName }, con 'i' ( No case Sensitive )
			const user = await UserModel.find({firstName: regexFirstName }).limit(2)
			if(user){
				res.status(200).json(user)
			}else{
				res.status(404).json({error: "No encontrado"})
			}
		} catch (error) {
			res.status(500).json({error: error.message})
		}
	}

	static async createUser(req, res) {
		try {
			const user = req.body
			if (!user.firstName || !user.password) {
               return res.status(403).json({ message: "Debe completar todos los parametros" });
}
			const passwordHash = await bcrypt.hash(user.password, salt)
			user.password = passwordHash 
			const newUser = new UserModel(user)
			await newUser.save()
			res.status(201).json({
				message: "El Usuario fue creado correctamente",
				data: newUser
			})
		} catch (error) {
			res.status(400).json({ error: error.message })
		}
	}

	static async editUserById(req, res) {
		try {
			const updates = { ...req.body };

			// Si se incluye una nueva contraseña, hashearla
			
			if (updates.password) {
				if (updates.password.trim() !== '') {
					updates.password = await bcrypt.hash(updates.password, salt);
				} else {
					delete updates.password; // No se actualiza si está vacío
				}
			}
			if( !(updates.school_id) ){
				updates.school_id = null
			} 
			const user = await UserModel.findByIdAndUpdate(req.params.id, updates, {
			new: true,
			});
			res.status(200).json({
				message: "Usuario actualizado correctamente",
				data: updates,
			});
		} catch (error) {
			res.status(400).json({ 
				error: error.message,
				data: updates
			});
		}
	}


	static async deleteUserById(req, res) {
		try {
		const user = await UserModel.findByIdAndDelete(req.params.id)
		if (!user) return res.status(404).json({ error: 'No encontrado' })
		res.status(200).json({ mensaje: 'Usuario eliminado' })
		} catch (error) {
		res.status(500).json({ error: error.message })
		}
	}
}
