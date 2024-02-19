import { defineConfig } from '@adonisjs/core/app'

export default defineConfig({
  /*
  |--------------------------------------------------------------------------
  | Commands
  |--------------------------------------------------------------------------
  |
  | List of ace commands to register from packages. The application commands
  | will be scanned automatically from the "./commands" directory.
  |
  */
  commands: [() => import('@adonisjs/core/commands')],
  /*
  |--------------------------------------------------------------------------
  | Preloads
  |--------------------------------------------------------------------------
  |
  | List of modules to import before starting the application.
  |
  */
  preloads: [
    {
      file: () => import('./start/routes.js'),
      environment: ['web', 'console', 'test', 'repl'],
    },
    {
      file: () => import('./start/kernel.js'),
      environment: ['web', 'console', 'test', 'repl'],
    },
  ],
  /*
  |--------------------------------------------------------------------------
  | Service providers
  |--------------------------------------------------------------------------
  |
  | List of service providers to import and register when booting the
  | application
  |
  */
  providers: [
    {
      file: () => import('./providers/AppProvider.js'),
      environment: ['web', 'console', 'test', 'repl'],
    },
    {
      file: () => import('@adonisjs/core/providers/app_provider'),
      environment: ['web', 'console', 'test', 'repl'],
    },
    {
      file: () => import('@adonisjs/core/providers/repl_provider'),
      environment: ['repl', 'test'],
    },
    {
      file: () => import('@adonisjs/transmit/transmit_provider'),
      environment: ['web', 'console', 'test', 'repl'],
    },
    () => import('@adonisjs/cors/cors_provider'),
  ],
  directories: {
    config: 'config',
    commands: 'commands',
    contracts: 'contracts',
    public: 'public',
    providers: 'providers',
    languageFiles: 'resources/lang',
    migrations: 'database/migrations',
    seeders: 'database/seeders',
    factories: 'database/factories',
    views: 'resources/views',
    start: 'start',
    tmp: 'tmp',
    tests: 'tests',
    httpControllers: 'app/controllers',
    models: 'app/models',
    services: 'app/services',
    exceptions: 'app/exceptions',
    mailers: 'app/mailers',
    mails: 'app/mails',
    middleware: 'app/middleware',
    policies: 'app/policies',
    validators: 'app/validators',
    listeners: 'app/listeners',
    stubs: 'stubs',
  },
  /*
  |--------------------------------------------------------------------------
  | Tests
  |--------------------------------------------------------------------------
  |
  | List of test suites to organize tests by their type. Feel free to remove
  | and add additional suites.
  |
  */
  tests: {
    suites: [
      {
        name: 'functional',
        files: ['tests/functional/**/*.spec(.ts|.js)'],
        timeout: 60000,
      },
    ],
    timeout: 2000,
    forceExit: true,
  },
})
