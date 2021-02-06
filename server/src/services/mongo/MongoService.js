const _ = require('lodash');
const { EventEmitter } = require('events');
const MongoQueryService = require('./MongoQueryService');
const idGenerator = require('./idGenerator');
const MongoServiceError = require('./MongoServiceError');

const logger = require('../logger.service');

class MongoService extends MongoQueryService {
  constructor(collection, options = {}, eventBus = new EventEmitter()) {
    super(collection, options);

    this._bus = eventBus;
    this.logger = logger;
    this.atomic = {
      update: (query, updateObject, updateOptions = {}) => {
        const newProps = Object.assign({}, updateObject);
        if (newProps.$set) {
          newProps.$set.updatedAt = new Date();
        } else {
          newProps.$set = { updatedAt: new Date() };
        }
        return collection.update(query, newProps, updateOptions);
      },
      findOneAndUpdate: (query, update, updateOptions) => {
        return collection.findOneAndUpdate(query, update, updateOptions);
      },
      find: (query = {}, findOptions = {}) => {
        return this._collection.find(query, findOptions);
      },
    };
  }

  _validateSchema(entity) {
    if (this._options.validateSchema) {
      const validationResult = this._options.validateSchema(entity);
      if (validationResult.errors && validationResult.errors.length > 0) {
        logger.error('Schema invalid', JSON.stringify(validationResult.errors, 0, 4));
        throw new MongoServiceError(
          MongoServiceError.INVALID_SCHEMA,
          `Document schema is invalid: ${JSON.stringify(validationResult.errors)}`,
        );
      }
    }
  }

  once(eventName, handler) {
    return this._bus.once(eventName, handler);
  }

  on(eventName, handler) {
    return this._bus.on(eventName, handler);
  }

  async create(objs) {
    let entities = objs;
    if (!_.isArray(entities)) {
      entities = [entities];
    }

    entities.forEach((item) => {
      const entity = item;
      if (!entity._id) {
        entity._id = idGenerator.generate();
      }
      entity.createdAt = new Date();

      this._validateSchema(entity);
    });

    await this._collection.insert(entities);
    entities.forEach((doc) => {
      this._bus.emit('created', {
        doc,
      });
    });

    return entities.length > 1 ? entities : entities[0];
  }

  async update(query, updateFn, options) {
    if (!_.isFunction(updateFn)) {
      throw new Error('updateFn must be a function');
    }

    const doc = await this.findOne(query, options);
    if (!doc) {
      throw new MongoServiceError(
        MongoServiceError.NOT_FOUND,
        `Document not found while updating. Query: ${JSON.stringify(query)}`,
      );
    }
    const prevDoc = _.cloneDeep(doc);
    doc.updatedAt = new Date();
    updateFn(doc);

    try {
      this._validateSchema(doc);
    } catch (err) {
      logger.error('================');
      logger.error(JSON.stringify(doc));
      logger.error(err);
      logger.error('================');
      throw err;
    }

    await this._collection.update({ _id: doc._id }, doc);

    this._bus.emit('updated', {
      doc,
      prevDoc,
    });

    return doc;
  }

  async updateUpsert(query, update) {
    await this._collection.update(query, update, { upsert: true });
  }

  async updateAll(query, update) {
    await this._collection.update(query, update, { multi: true });
  }

  async remove(query) {
    const docsForRemove = await this.find(query);
    await this._collection.remove(query);

    docsForRemove.results.forEach((doc) => {
      this._bus.emit('removed', {
        doc,
      });
    });
  }

  createIndex(index, options = {}) {
    const defaultOptions = { background: true };
    const combinedOptions = Object.assign({}, defaultOptions, options);

    return this._collection.createIndex(index, combinedOptions)
      .catch((err) => {
        this.logger.warn(err);
      });
  }

  createOrUpdate(query, updateFn) {
    return this.exists(query)
      .then((exists) => {
        if (exists) {
          return this.update(query, updateFn);
        }
        const doc = query;
        updateFn(doc);
        return this.create(doc);
      });
  }

  findOneAndUpdate(query, update, options = { returnOriginal: false }) {
    let originalDoc;
    return this.findOne(query)
      .then((doc) => {
        originalDoc = doc;

        return this._collection.findOneAndUpdate(query, update, options);
      })
      .then((doc) => {
        if (originalDoc) {
          this.emit('updated', {
            doc,
            prevDoc: originalDoc,
          });
        } else {
          this.emit('created', {
            doc,
          });
        }

        return doc;
      });
  }
}

module.exports = MongoService;
