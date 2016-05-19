public class Hello{
    public Hello(){}
    public static String sayHelloStatic(){
        return "In sayHelloStatic()[Hello.java]";
    }
    public String sayHello(String str){
    	//System.out.println("In sayHello()[Hello.java]. From front-end, str:" + str);
        return "In sayHello()[Hello.java]. From front-end, str:" + str;
    }
}
