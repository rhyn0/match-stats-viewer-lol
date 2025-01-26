/**
 *
 * @type {import('plop').PlopGenerator}
 */
const feautreGenerator = {
    description: "Feature Generator",
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
        const generatePath = "src/features";
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
                path: `${generatePath}/{{kebabCase folderName}}/api/get-{{kebabCase name}}.ts`,
                templateFile: "generators/feature/api.name.ts.hbs",
            },
            {
                type: "add",
                path: `${generatePath}/{{kebabCase folderName}}/components/.gitkeep`,
                templateFile: "generators/feature/.gitkeep",
            },
            {
                type: "add",
                path: `${generatePath}/{{kebabCase folderName}}/hooks/use-list-{{kebabCase name}}.tsx`,
                templateFile: "generators/feature/hooks.use-list.ts.hbs",
            },
        ];
    },
};
export default feautreGenerator;
