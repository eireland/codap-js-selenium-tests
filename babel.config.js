module.exports = {
    exclude: /node_modules/,
    presets: [
        ['@babel/preset-env', {
            targets: {
                node: "current"
            }
        }]
    ]
}