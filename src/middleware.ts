import { withAuth } from "next-auth/middleware";

export default withAuth();

export const config = {
    matcher: [
        "/upload", // deny access to upload page
    ],
};
