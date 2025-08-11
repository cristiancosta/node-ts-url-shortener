// App.
import { createApp } from './app';

// Cache.
import { createCache } from './cache';

// Configuration.
import { configuration } from './configuration';

// DataSource.
import { createDataSource } from './data-source';

void (async () => {
  const { db, cache, server } = configuration;

  try {
    const dataSource = await createDataSource(db).initialize();
    console.log('Database connected');

    const cacheClient = await createCache(cache).connect();
    console.log('Cache connected');

    const app = createApp(dataSource, cacheClient);
    app.listen(server.port, () => {
      console.log(`Server running on port ${server.port}`);
    });
  } catch (err) {
    console.error('Error during bootstrap:', err);
    process.exit(1);
  }
})();
