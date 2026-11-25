const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// Reads KEY=value lines from .env (gitignored) so the API key stays out of the source code.
function loadEnv(file) {
  const env = {};
  if (!fs.existsSync(file)) return env;
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][\w]*)\s*=\s*(.*?)\s*$/);
    if (match) env[match[1]] = match[2].replace(/^(['"])(.*)\1$/, "$2");
  }
  return env;
}

// A real environment variable wins over .env (handy for CI).
const env = { ...loadEnv(path.resolve(__dirname, ".env")), ...process.env };

if (!env.WEATHER_API_KEY) {
  console.warn(
    "\n[weather-app] WEATHER_API_KEY is not set. Copy .env.example to .env and add your key.\n"
  );
}

module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.js",
  },
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Weather App",
    }),
    new webpack.DefinePlugin({
      "process.env.WEATHER_API_KEY": JSON.stringify(env.WEATHER_API_KEY || ""),
    }),
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  optimization: {
    runtimeChunk: "single",
  },
};
