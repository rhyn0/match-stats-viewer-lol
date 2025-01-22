import featureGenerator from "./generators/feature/index.js";

/**
 *
 * @param {import('plop').NodePlopAPI} plop
 */
export default function plopTemplate(plop) {
    plop.setGenerator("feature", featureGenerator);
}
