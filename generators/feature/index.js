/**
 *
 * @type {import('plop').PlopGenerator}
 */
const feautreGenerator = {
    description: "Story Generator",
    prompts: [
        {
            type: "input",
            name: "name",
            message: "feature name",
        },
        {
            type: "input",
            name: "folderName",
            message: "folder name",
        },
    ],
    actions: () => {
        const generatePath = "app/features";
        return [
            {
                type: "add",
                path: `${generatePath}/{{kebabCase folderName}}/types.ts`,
                templateFile: "generators/feature/types.ts.hbs",
            },
            {
                type: "add",
                path: `${generatePath}/{{kebabCase folderName}}/api/keys.ts`,
                templateFile: "generators/feature/api.keys.ts.hbs",
            },
            {
                type: "add",
                path: `${generatePath}/{{kebabCase folderName}}/components/.gitkeep`,
                templateFile: "generators/feature/.gitkeep",
            },
            {
                type: "add",
                path: `${generatePath}/{{kebabCase folderName}}/hooks/.gitkeep`,
                templateFile: "generators/feature/.gitkeep",
            },
        ];
    },
};
export default feautreGenerator;
