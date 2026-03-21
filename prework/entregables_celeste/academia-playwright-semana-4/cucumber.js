export default {
    default: {
        paths: ["features/**/*.feature"],
        require: [
            "features/step_definitions/**/*.js",
        "features/support/**/*.js"],
        format: ["progress", "summary"],
        timeout: 30000
    }
};