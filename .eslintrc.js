module.exports = {
    extends: ['react-app', 'airbnb', 'prettier'],
    plugins: ['prettier'],
    rules: {
        'react/prop-types': 'off', // Not using proptypes
        'no-param-reassign': 'off', // Lots of param reassigning in redux slice
        'no-use-before-define': 'warn',
        'react/jsx-props-no-spreading': 'off',
        'import/prefer-default-export': 'off',
        'react/jsx-filename-extension': 'off',
        'no-static-element-interactions': 'off',
        'click-events-have-key-events': 'off',
        'button-has-type': 'off',
        'interactive-supports-focus': 'off',
        // 'no-static-element-interactions': 0,
        // 'click-events-have-key-events': 0,
        // 'button-has-type': 0,
        // 'interactive-supports-focus': 0,
    },
}
