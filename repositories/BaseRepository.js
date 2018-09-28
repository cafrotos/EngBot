let db = require('../models');

class BaseRepository {
	constructor(modelName) {
		if (!modelName) {
			throw new Error('model name is empty');
		}

		if (!db[modelName]) {
			throw new Error(`${modelName} is not defined`);
		}

		this._model = db[modelName];
		this._modelName = modelName;
	}

	static getInstance() {
		// let key = this._model;
		let key = (this).name;
		if (!BaseRepository._instances) {
			BaseRepository._instances = {};
		}
		if (!BaseRepository._instances[key]) {
			this._instances[key] = new this();
		}

		return this._instances[key];
	}

	getModel() {
		return this._model;
	}

	static getModelByName(name) {
		return new BaseRepository(name);
	}
	
	create(data, transaction = null) {
		return new Promise((resolve, reject) => {
			this._model.create(data, { transaction })
				.then((result) => {
					resolve(result);
				}).catch((err) => {
					reject(err);
				})
		})
	}

	find(filter) {
		return new Promise((resolve, reject) => {
			this._model.find(filter)
				.then((results) => {
					resolve(results);
				}).catch((err) => {
					reject(err);
				})
		})
	}

	findAll(filter) {
		return new Promise((resolve, reject) => {
			this._model.findAll(filter)
				.then((results) => {
					resolve(results);
				}).catch((err) => {
					reject(err);
				})
		})
	}

	findAndCountAll(filter) {
		return new Promise((resolve, reject) => {
			this._model.findAndCountAll(filter)
				.then((results) => {
					resolve(results);
				}).catch((err) => {
					reject(err);
				})
		})
	}

	findById(id) {
		return new Promise((resolve, reject) => {
			this._model.findById(id)
				.then((result) => {
					resolve(result);
				}).catch((err) => {
					reject(err);
				})
		})
	}

	async findOne(filter) {
		try {
      return await this._model.findOne(filter);
    } catch(err) {
		}
	}

	count(filter) {
		return new Promise((resolve, reject) => {
			this._model.count(filter)
				.then((count) => {
					resolve(count);
				}).catch((err) => {
					reject(err);
				})
		})
	}

	update(data, option) {
		return new Promise((resolve, reject) => {
			this._model.update(data, option)
				.then((res) => {
          resolve(res);
				}).catch((err) => {
					reject(err);
				})
		})
	}

	updateAttributes(object, data, option) {
		return new Promise((resolve, reject) => {
      object.updateAttributes(data, option)
				.then((res) => {
          resolve(res);
				}).catch((err) => {
        reject(err);
			})
		})
	}

	destroy(filter) {
		return new Promise((resolve, reject) => {
			this._model.destroy(filter)
				.then((result) => {
					resolve(result);
				}).catch((err) => {
					reject(err);
				})
		})
	}

	groupBy(field) {
		return new Promise((resolve, reject) => {
			this._model.findAll({
				attributes: [field],
				group: field,
				where: {
					id: {
						$gte: 1,
					}
				}
			})
				.then((result) => {
					resolve(result);
				}).catch((err) => {
					reject(err);
				})
		})
	}
}

module.exports = BaseRepository;