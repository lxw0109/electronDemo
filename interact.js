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
//     3. used in "1. Demo of customed Java class(src/Hello.java).", but must be here(in front of any "import()" and "newInstance()" statements).
java.classpath.push("src")

//---------------------------------------------------------------------------------
//0. Demo of java.newInstanceSync() & java.newInstance() & java.import().
var list1 = java.newInstanceSync("java.util.ArrayList");
console.log(list1.sizeSync()); // 0
list1.addSync('item1');
console.log(list1.sizeSync()); // 1
console.log("list1: " + list1.toStringSync());

//Demo of Async Callback.
java.newInstance("java.util.ArrayList", function(err, list2) {
  list2.addSync("item1");
  list2.addSync("item2");
  console.log("list2: " + list2.toStringSync()); // [item1, item2]
});

var ArrayList = java.import('java.util.ArrayList');
//lxw: "Sync" suffix is not for "constructor"(ArrayList() instead of ArrayListSync()).
var list3 = new ArrayList();
list3.addSync('item1');
console.log(list3.equalsSync(list1)); // true
//---------------------------------------------------------------------------------

var sys = java.import('java.lang.System');
sys.out.printlnSync('Hello from java :)');

//1. Demo of customed Java class(src/Hello.java).
var HelloClass = java.import('Hello');	//HelloClass is still a "class" not a "instance of the class".
//Call static method
console.log(HelloClass.sayHelloStaticSync());
var returnValStatic = java.callStaticMethodSync("Hello", "sayHelloStatic");
console.log(returnValStatic);

//lxw: NOT "var helloInstance = new HelloClassSync();", because this is totally JS code, not calling the Java code.
var helloInstance = new HelloClass();
var returnVal = helloInstance.sayHelloSync("liuxiaowei-frontend in Sync");
//var returnVal = java.callMethodSync(helloInstance, "sayHello");	//OK
console.log("Sync: return value of void sayHello(): " + returnVal);

helloInstance.sayHello("liuxiaowei-frontend in Async", function(err, returnVal1){
	console.log("Async: return value of void sayHello(): " + returnVal1);
});
//---------------------------------------------------------------------------------