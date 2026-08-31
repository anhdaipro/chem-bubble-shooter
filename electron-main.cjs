const { app, BrowserWindow, protocol, ipcMain, inAppPurchase } = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 520, // Exact W = 520 (9 columns)
    height: 780, // Exact H = 780
    useContentSize: true, // Ensure the web viewport matches exactly, removing borders
    resizable: false, // Prevent resizing to avoid layout break
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    autoHideMenuBar: true,
  });

  const isDev = !app.isPackaged;

  if (isDev) {
    // In dev mode, load the Vite dev server (default port is 5173)
    mainWindow.loadURL('http://localhost:5173');
    // mainWindow.webContents.openDevTools();
  } else {
    // In production, load the built static files
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'dist', 'index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// IPC Handlers for In-App Purchase
ipcMain.handle('iap-get-products', async (event, productIds) => {
  if (!inAppPurchase.canMakePayments()) {
    console.log("IAP is not available or payments are disabled.");
    return [];
  }
  try {
    const products = await inAppPurchase.getProducts(productIds);
    return products;
  } catch (error) {
    console.error('Error fetching IAP products:', error);
    return [];
  }
});

ipcMain.on('iap-purchase', (event, productId) => {
  if (inAppPurchase.canMakePayments()) {
    console.log(`Initiating purchase for ${productId}`);
    inAppPurchase.purchaseProduct(productId, 1);
  }
});

app.whenReady().then(() => {
  // Listen for IAP transaction updates
  inAppPurchase.on('transactions-updated', (event, transactions) => {
    if (!Array.isArray(transactions)) return;
    
    for (const transaction of transactions) {
      const state = transaction.transactionState;
      const productId = transaction.payment.productIdentifier;

      if (state === 'purchasing') {
        console.log(`Purchasing ${productId}...`);
      } else if (state === 'purchased') {
        console.log(`Purchased ${productId} successfully!`);
        inAppPurchase.finishTransactionByDate(transaction.transactionDate);
        if (mainWindow) {
          mainWindow.webContents.send('iap-success', productId);
        }
      } else if (state === 'failed') {
        console.log(`Purchase failed for ${productId}`);
        inAppPurchase.finishTransactionByDate(transaction.transactionDate);
        if (mainWindow) {
          mainWindow.webContents.send('iap-failed', productId);
        }
      } else if (state === 'restored') {
        console.log(`Restored ${productId}`);
        inAppPurchase.finishTransactionByDate(transaction.transactionDate);
      } else if (state === 'deferred') {
        console.log(`Purchase deferred for ${productId}`);
      }
    }
  });

  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
