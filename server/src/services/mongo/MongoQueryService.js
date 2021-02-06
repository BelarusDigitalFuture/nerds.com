const idGenerator = require('./idGenerator');

class MongoQueryService {
  constructor(collection, options = {}) {
    this._collection = collection;
    this._options = options;
    this._idGenerator = idGenerator;
  }

  get name() {
    return this._collection.collectionName;
  }

  async find(query = {}, opt = { perPage: 100, page: 0 }) {
    const options = opt;
    const hasPaging = options.page > 0;
    const { perPage } = options;
    if (hasPaging) {
      options.skip = (options.page - 1) * perPage;
      options.limit = perPage;
    }
    delete options.perPage;
    delete options.page;

    const results = await this._collection.find(query, options);
    if (!hasPaging) {
      return {
        results,
      };
    }

    const count = await this._collection.count(query);
    const pagesCount = Math.ceil(count / perPage) || 1;

    return {
      pagesCount,
      results,
      count,
    };
  }

  async findOne(query = {}, options = {}) {
    const data = await this.find(query, options);
    return data.results.length > 0 ? data.results[0] : null;
  }

  count(query) {
    return this._collection.count(query);
  }

  distinct(field, query, options) {
    return this._collection.distinct(field, query, options);
  }

  async exists(query) {
    const doc = await this.findOne(query);
    return !!doc;
  }

  aggregate(pipeline, options) {
    return this._collection.aggregate(pipeline, options);
  }

  generateId() {
    return this._idGenerator.generate();
  }
}

module.exports = MongoQueryService;
