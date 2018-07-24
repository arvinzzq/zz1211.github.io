import path from 'path';
import nunjucks from 'nunjucks';

const viewPath = path.resolve(process.cwd(), 'template');

/**
 * Create env of Nunjuck for template render
 * @param {Object} options options for Nunjuck env
 */
function createEnv(options) {
  const {
    autoescape = true,
    noCache = false,
    watch = false,
    throwOnUndefined = false,
    filters = {}
  } = options;

  const env = new nunjucks.Environment(
    new nunjucks.FileSystemLoader(viewPath, { noCache, watch }),
    { autoescape, throwOnUndefined },
  );

  // Add template filter to env.
  Object.keys(filters).forEach(name => {
    env.addFilter(name, filters[name]);
  });
  return env;
}

class ViewRender {
  constructor(options = {}) {
    const { global = {} } = options;
    this.options = options;
    this.env = createEnv(options);
    Object.keys(global).forEach(name => {
      this.env.addGlobal(name, global[name]);
    });
  }

  render(view, data, callback) {
    const { ext = '.njk' } = this.options;
    return this.env.render(`${view}${ext}`, {
      ...data
    }, callback);
  }
}

export default ViewRender;