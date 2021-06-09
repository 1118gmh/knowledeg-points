Db {
  _events: [Object: null prototype] {},
  _eventsCount: 0,
  _maxListeners: undefined,
  s: {
    dbCache: {},
    children: [],
    topology: NativeTopology {
      _events: [Object: null prototype],
      _eventsCount: 35,
      _maxListeners: Infinity,
      s: [Object],
      [Symbol(kCapture)]: false,
      [Symbol(waitQueue)]: [Denque]
    },
    options: {
      authSource: 'admin',
      retryWrites: true,
      w: undefined,
      writeConcern: [Object],
      readPreference: [ReadPreference],
      promiseLibrary: [Function: Promise]
    },
    logger: Logger { className: 'Db' },
    bson: BSON {},
    readPreference: ReadPreference {
      mode: 'primary',
      tags: undefined,
      hedge: undefined
    },
    bufferMaxEntries: -1,
    parentDb: null,
    pkFactory: undefined,
    nativeParser: undefined,
    promiseLibrary: [Function: Promise],
    noListener: false,
    readConcern: undefined,
    writeConcern: WriteConcern { w: 'majority' },
    namespace: MongoDBNamespace { db: 'sample_airbnb', collection: undefined }
  },
  serverConfig: [Getter],
  bufferMaxEntries: [Getter],
  databaseName: [Getter],
  [Symbol(kCapture)]: false
}

Collection {
  s: {
    pkFactory: <ref *1> [Function: ObjectID] {
      index: 1511249,
      createPk: [Function: createPk],
      createFromTime: [Function: createFromTime],
      createFromHexString: [Function: createFromHexString],
      isValid: [Function: isValid],
      ObjectID: [Circular *1],
      ObjectId: [Circular *1]
    },
    topology: NativeTopology {
      _events: [Object: null prototype],
      _eventsCount: 35,
      _maxListeners: Infinity,
      s: [Object],
      [Symbol(kCapture)]: false,
      [Symbol(waitQueue)]: [Denque]
    },
    options: {
      promiseLibrary: [Function: Promise],
      readConcern: undefined,
      readPreference: [ReadPreference],
      writeConcern: [Object]
    },
    namespace: MongoDBNamespace {
      db: 'sample_airbnb',
      collection: 'listingsAndReviews'
    },
    readPreference: ReadPreference {
      mode: 'primary',
      tags: undefined,
      hedge: undefined
    },
    slaveOk: true,
    serializeFunctions: undefined,
    raw: undefined,
    promoteLongs: undefined,
    promoteValues: undefined,
    promoteBuffers: undefined,
    internalHint: null,
    collectionHint: null,
    promiseLibrary: [Function: Promise],
    readConcern: undefined,
    writeConcern: undefined
  }
}