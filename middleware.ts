export {
  default,
} from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/add-person/:path*",
    "/add-memory/:path*",
    "/add-event/:path*",
    "/add-document/:path*",
    "/add-gallery-photo/:path*",
    "/add-voice/:path*",
  ],
};