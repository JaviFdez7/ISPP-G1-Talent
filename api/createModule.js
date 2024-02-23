const fs = require('fs');
const path = require('path');

function createModule(moduleName, apiVersion = "v1") {
  const modulePath = path.join(__dirname, apiVersion, "modules", moduleName);
  const camelModuleName = _snakeToCamel(moduleName, true);
  const CamelModuleName = _capitalizeFirstLetter(camelModuleName);
  // Create the module directory
  fs.mkdirSync(modulePath, { recursive: true });

  // Create subfolders
  const subfolders = ['controllers', 'services', 'models', 'validators'];
  subfolders.forEach(subfolder => {
    fs.mkdirSync(path.join(modulePath, subfolder));
  });

  // Create service file
  const serviceContent = `// Default service functions
export const getAll${CamelModuleName}: any = async () => {
  throw new Error('Not Implemented');
};

export const get${CamelModuleName}ById: any = async (id: any) => {
  throw new Error('Not Implemented, id: ' + id);
};

export const create${CamelModuleName}: any = async (data: any) => {
  throw new Error('Not Implemented, data: ' + data);
};

export const update${CamelModuleName}: any = async (id: any, data: any) => {
  throw new Error('Not Implemented: id: ' + id + ', data: ' + data);
};

export const delete${CamelModuleName}: any = async (id: any) => {
  throw new Error('Not Implemented: id: ' + id);
};
export default {
  getAll${CamelModuleName},
  get${CamelModuleName}ById,
  create${CamelModuleName},
  update${CamelModuleName},
  delete${CamelModuleName}
};
`;
  fs.writeFileSync(path.join(modulePath, 'services', `${CamelModuleName}Service.ts`), serviceContent);

  // Create controller file
  const controllerContent = `// eslint-disable-next-line @typescript-eslint/await-thenable
import { type Request, type Response } from 'express';
import ${CamelModuleName}Service from '../services/${CamelModuleName}Service';

// Default controller functions
export const getAll${CamelModuleName}: any = async (req: Request, res: Response) => {
  try {
    const data = await ${CamelModuleName}Service.getAll${CamelModuleName}();
    res.status(200).send(data);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

export const get${CamelModuleName}ById: any = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await ${CamelModuleName}Service.get${CamelModuleName}ById(id);
    res.status(200).send(data);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

export const create${CamelModuleName}: any = async (req: Request, res: Response) => {
  try {
    const data = await ${CamelModuleName}Service.create${CamelModuleName}(req.body);
    res.status(200).send(data);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

export const update${CamelModuleName}: any = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await ${CamelModuleName}Service.update${CamelModuleName}(id, req.body);
    res.status(200).send(data);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

export const delete${CamelModuleName}: any = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await ${CamelModuleName}Service.delete${CamelModuleName}(id);
    res.status(200).send(data);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
export default {
  getAll${CamelModuleName},
  get${CamelModuleName}ById,
  create${CamelModuleName},
  update${CamelModuleName},
  delete${CamelModuleName}
};
`;
  fs.writeFileSync(path.join(modulePath, 'controllers', `${CamelModuleName}Controller.ts`), controllerContent);

  // Create routes file
  const routesContent = `/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from 'express';
import {
  getAll${CamelModuleName},
  get${CamelModuleName}ById,
  create${CamelModuleName},
  update${CamelModuleName},
  delete${CamelModuleName}
} from './controllers/${CamelModuleName}Controller';

const router = express.Router();

// Define routes for the ${CamelModuleName} module
router.get('/', getAll${CamelModuleName});
router.get('/:id', get${CamelModuleName}ById);
router.post('/', create${CamelModuleName});
router.patch('/:id', update${CamelModuleName});
router.delete('/:id', delete${CamelModuleName});

export default router;
`;
  fs.writeFileSync(path.join(modulePath, 'routes.ts'), routesContent);

const indexContent = 
`import express from 'express';
import ${CamelModuleName} from './routes';

const router = express.Router();

router.use('/${apiVersion}/${moduleName}', ${CamelModuleName});

export default router;
`;
  fs.writeFileSync(path.join(modulePath, 'index.ts'), indexContent);
  console.log(`The ${moduleName} module has been created successfully.`);
  console.log("=".repeat(50));
  console.log(`Please add the following lines to the /api/${apiVersion}/app.ts file:\n`);
  console.log(`import ${CamelModuleName}Router from './modules/${moduleName}';`);
  console.log(`app.use(${CamelModuleName}Router);`);
  console.log("=".repeat(50));
}

// Script usage
const moduleName = process.argv[2];
if (!moduleName) {
  console.error('Please provide a name for the module.');
  process.exit(1);
}
const apiVersion = process.argv[3];
createModule(moduleName,apiVersion);

//private functions
function _snakeToCamel(str) {
  if (!(/[_-]/).test(str)) return str; // if no snake or dash case
  const result = str.toLowerCase().replace(/[-_][a-z0-9]/g, (group) => group.slice(-1).toUpperCase());
  return result;
};

function _capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}