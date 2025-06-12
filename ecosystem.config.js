module.exports = {
    apps: [
        {
            name: "api-gateway",
            cwd: "./api-gateway",
            script: "cmd.exe",
            args: "/c npm start",
            watch: false,
            shell: true,
            windowsHide: true
        },
        {
            name: "auth-service",
            cwd: "./auth-service",
            script: "cmd.exe",
            args: "/c npm start",
            watch: false,
            shell: true,
            windowsHide: true
        },
        {
            name: "post-service",
            cwd: "./post-service",
            script: "cmd.exe",
            args: "/c npm start",
            watch: false,
            shell: true,
            windowsHide: true
        },
        {
            name: "registration-service",
            cwd: "./registration-service",
            script: "cmd.exe",
            args: "/c npm start",
            watch: false,
            shell: true,
            windowsHide: true
        },
        {
            name: "client",
            cwd: "./client",
            script: "cmd.exe",
            args: "/c npm run dev",
            watch: false,
            shell: true,
            windowsHide: true
        }
    ]
};
