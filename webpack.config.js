const path = require("path");

/*We are basically telling webpack to take index.js from entry. Then check for all file extensions in resolve. 
After that apply all the rules in module.rules and produce the output and place it in main.js in the public folder.*/

module.exports={
    mode: "production", //the environment - development, production, none. tells webpack to use its built-in optimizations accordingly.
    entry: "./index.js", //the entry point
    output: {
        path: path.resolve(__dirname, "public"), //the folder path of the output file
        filename: "main.js" //the name of the output file
    },
    target: "web", //setting "node" as target app (server side), and setting it as "web" is for browser (client side). Default is "web"
    devServer: {
        port: "9500", //port of dev server
        static: ["./public"], //This option allows configuring options for serving static files from the directory 
        open: true //opens the browser after server is successfully started
    },
    resolve: {
        /* If multiple files share the same name but have different extensions, webpack will resolve the one with the 
        extension listed first in the array and skip the rest. which is what enables users to leave off the extension when importing*/
        extensions: ['.js','.jsx','.json'] 
    },
    module:{
        /**
         * "Hey webpack compiler, when you come across a path that resolves to a '.js or .jsx' file inside of a require()/import statement, use the 
         * babel-loader to transform it before you add it to the bundle. And in this process, kindly make sure to exclude node_modules folder from 
         * being searched"
         */
        rules: [
            {
                test: /\.(js|jsx)$/,    //kind of file extension this rule should look for and apply in test
                exclude: /node_modules/, //folder to be excluded
                use:  'babel-loader' //loader which we are going to use
            }
        ]
    }
}