/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint global-require: off, no-console: off */
/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 */
import 'mssql/msnodesqlv8';
import path from 'path';
import { app, BrowserWindow, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import getCustomerList from './api/getCustomerList';
import getPartNumberList from './api/getPartNumberList';
import getSingleCustomer from './api/getSingleCustomer';
import getSinglePartNumber from './api/getSinglePartNumber';
import postNewCustomer from './api/postNewCustomer';
import postCustomerNote from './api/postCustomerNote';
import postPartNumberNote from './api/postPartNumberNote';
import postNewPartNumber from './api/postNewPartNumber';
import updateCustomer from './api/updateCustomer';
import updatePartNumber from './api/updatePartNumber';
import updateCustomerNote from './api/updateCustomerNote';
import updatePartNumberNote from './api/updatePartNumberNote';
import deleteCustomerNote from './api/deleteCustomerNote';
import deletePartNumberNote from './api/deletePartNumberNote';
import deleteCustomer from './api/deleteCustomer';
import deletePartNumber from './api/deletePartNumber';

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

const createWindow = async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    webPreferences:
      process.env.NODE_ENV === 'development' || process.env.E2E_BUILD === 'true'
        ? {
            nodeIntegration: true
          }
        : {
            preload: path.join(__dirname, 'dist/renderer.prod.js')
          }
  });

  mainWindow.maximize();

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', createWindow);

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});

ipcMain.on('asynchronous-message', async (event, arg) => {
  let requestToSend: any = () => {};
  let switchFail = false;

  switch (arg.request) {
    // Get Requests Here.
    case 'getCustomerList':
      requestToSend = getCustomerList;
      break;
    case 'getPartNumberList':
      requestToSend = getPartNumberList;
      break;
    case 'getSearchCustomer':
      requestToSend = getSingleCustomer;
      break;
    case 'getSearchPartNumber':
      requestToSend = getSinglePartNumber;
      break;
    // Post Requests Here.
    case 'postAddCustomer':
      requestToSend = postNewCustomer;
      break;
    case 'postCustomerNote':
      requestToSend = postCustomerNote;
      break;
    case 'postNewPartNumber':
      requestToSend = postNewPartNumber;
      break;
    case 'postPartNumberNote':
      requestToSend = postPartNumberNote;
      break;
    // Update Requests Here.
    case 'updateCustomer':
      requestToSend = updateCustomer;
      break;
    case 'updatePartNumber':
      requestToSend = updatePartNumber;
      break;
    case 'updateCustomerNote':
      requestToSend = updateCustomerNote;
      break;
    case 'updatePartNumberNote':
      requestToSend = updatePartNumberNote;
      break;
    // Delete Requests Here
    case 'deleteCustomerNote':
      requestToSend = deleteCustomerNote;
      break;
    case 'deletePartNumberNote':
      requestToSend = deletePartNumberNote;
      break;
    case 'deleteCustomer':
      requestToSend = deleteCustomer;
      break;
    case 'deletePartNumber':
      requestToSend = deletePartNumber;
      break;
    default:
      switchFail = true;
      break;
  }
  if (switchFail) {
    event.sender.send('asynchronous-reply', {
      error: {
        switchFail: `No Request found for ${arg.request}`
      }
    });
    return;
  }
  try {
    const data = await requestToSend(arg);
    event.sender.send('asynchronous-reply', data);
  } catch (err) {
    event.sender.send('asynchronous-reply', err);
  }
});
