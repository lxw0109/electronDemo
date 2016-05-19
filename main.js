const electron = require('electron');
// Module to control application life.
const {app} = electron;
// Module to create native browser window.
const {BrowserWindow} = electron;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({width: 800, height: 600});

  // and load the index.html of the app.
  win.loadURL(`file://${__dirname}/index.html`);

  // Open the DevTools.
  //win.webContents.openDevTools();

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

var java = require('java');
/*
java.asyncOptions = {
  asyncSuffix: undefined,     // Don't generate node-style methods taking callbacks
  syncSuffix: "",              // Sync methods use the base name(!!)
  //promiseSuffix: "Promise",   // Generate methods returning promises, using the suffix Promise.
  //promisify: require("when/node").lift
};
*/

//lxw: 1. classpath.push is essential here, to find the specific/customized class(src.Hello).
//     2. class.push() statements MUST be put in front of all the "import()" and "newInstance()" statements.
//	   3. used in "1. Demo of customed Java class(src/Hello.java).", but must be here(in front of any "import()" and "newInstance()" statements).
java.classpath.push("src")

//0. Demo of java.newInstanceSync() & java.newInstance() & java.import().
var list1 = java.newInstanceSync("java.util.ArrayList");
console.log(list1.sizeSync()); // 0
list1.addSync('item1');
console.log(list1.sizeSync()); // 1
//list1.addSync('item2');
console.log("list1: " + list1.toStringSync());

//Demo of Async Callback.
java.newInstance("java.util.ArrayList", function(err, list2) {
  list2.addSync("item1");
  list2.addSync("item2");
  console.log("list2: " + list2.toStringSync()); // [item1, item2]
});

var ArrayList = java.import('java.util.ArrayList');
//"Sync" suffix is not for "constructor"(ArrayList() instead of ArrayListSync()).
var list3 = new ArrayList();
list3.addSync('item1');
console.log(list3.equalsSync(list1)); // true
//-------------------------------------------------------------------

//1. Demo of customed Java class(src/Hello.java).
var sys = java.import('java.lang.System');
sys.out.printlnSync('Hello from java :)');

var HelloClass = java.import('Hello');	//HelloClass is still a "class" not a "instance of the class".
//lxw: static method is NOT OK.
//HelloClass.sayHelloStaticSync();	//error
/*
var returnValStatic = java.callStaticMethodSync("Hello", "sayHelloStatic");
console.log(returnValStatic);
*/

//lxw: NOT "var helloInstance = new HelloClassSync();"
var helloInstance = new HelloClass();
//console.log(helloInstance.sayHelloSync());
var returnVal = helloInstance.sayHelloSync();
//var returnVal = java.callMethodSync(helloInstance, "sayHello");	//OK
console.log("Sync: return value of void sayHello(): " + returnVal);
helloInstance.sayHello(function(err, returnVal1){
	console.log("Async: return value of void sayHello(): " + returnVal1);
});

console.log("helloInstance.toStringSync(): " + helloInstance.toStringSync());
//-------------------------------------------------------------------
