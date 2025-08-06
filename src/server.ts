// App.
import { createExpressApp } from './app';

// Configuration.
import { configuration } from './configuration';

// DataSource.
import { createDataSource } from './data-source';

const { db } = configuration;
createDataSource(db)
  .initialize()
  .then(() => {
    const { port } = configuration.server;
    createExpressApp().listen(port, () =>
      console.log(`Server running on port ${port}`)
    );
    console.log('Server connected to database');
  })
  .catch((error) =>
    console.log(
      `Server unable to connect to database: ${JSON.stringify(error)}`
    )
  );
