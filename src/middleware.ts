export { default } from "next-auth/middleware";

export const config = {
    matcher: [
        // "/upload", // deny access to upload page
    ],
};
