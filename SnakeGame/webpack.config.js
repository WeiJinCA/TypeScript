const path = require('path');//Modules for splicing paths
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

//webpack All configuration information should be written in module.exports
module.exports = {

    //Specify the entry file
    entry: "./src/index.ts",

    //Specify the directory where the package file is located
    output: {
        //Specify the package file directory
        path: path.resolve(__dirname,"dist"),
        //Specify the packaged file name
        filename: "bundle.js"
    },

    mode:'development',

    //Tell webpack not to use arrow functions
    // environment:{
    //     arrowFunction:false,
    //     const:false,
    // },

    //Specify the module used when webpack packs
    module:{
        //Specifies the rules to load
        rules:[
            {
                //Specifies the file in which the rule takes effect, using regular expressions
                test: /\.ts$/,
                //load using ts
                use: [
                    //Config babel
                    {
                        //specified loader
                        loader:"babel-loader",
                        //Set babel
                        options:{
                            //Set up a predefined environment
                            "presets":[
                                //Plugins for specific environments
                                ["@babel/preset-env",
                                //configuration information
                                {
                                    //Target browsers to be compatible
                                    targets:{
                                        "chrome":"88",
                                        "ie":"11"
                                    },
                                    //Specify the version of corejs
                                    "corejs":"3",
                                    //The way to use corejs; usage means loading on demand
                                    "useBuiltIns":"usage"
                                }]
                            ],
                        }
                    } ,
                    'ts-loader'
                ],
                //Exclude dependent files
                exclude: /node-modules/
            },
            //Set the processing of less files
            {
                    test:/\.less$/,
                    use:[
                        "style-loader",
                        "css-loader",
                        //import postcss
                        {
                            loader:"postcss-loader",
                            options:{
                                postcssOptions:{
                                    plugins:[
                                        [
                                            "postcss-preset-env",
                                            {
                                                browsers:'last 2 versions'
                                            }
                                        ]
                                    ]
                                }
                            }
                        },
                        "less-loader"
                    ]
            }
        ]
    },

    //Configure the webpack plugin
    plugins:[
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            
            template:"./src/index.html"
        }),
    ],

    //Used to set the reference module
    resolve:{
        extensions:['.ts','.js']

    }

};