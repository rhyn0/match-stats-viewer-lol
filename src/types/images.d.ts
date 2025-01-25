declare module "*.png" {
    import type { StaticImport } from "next/dist/shared/lib/get-img-props";
    const value: StaticImport;
    export default value;
}
