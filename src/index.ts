
/* IMPORT */

import * as fs from 'fs';
import * as path from 'path';
import countMatches from './count_matches';

/* REPLACE */

const defaultOptions = {
  paths: [] as string[],
  replacements: [] as string[][]
};

function factory ( customOptions?: Partial<typeof defaultOptions> ) {

  const options = Object.assign ( {}, defaultOptions, customOptions );

  return async function replace ( config, repoPath, ctx, task ) {

    if ( !options.paths.length ) return task.skip ( 'You need to provide some paths' );

    if ( !options.replacements.length ) return task.skip ( 'YOu need to provide some replacements' );

    const output: string[] = [];

    for ( let filePath of options.paths ) {

      task.ouput = `Replacing "${filePath}"...`;

      const absFilePath = path.resolve ( repoPath, filePath );

      if ( !fs.existsSync ( absFilePath ) ) continue;

      let originalContent, content, replacements = 0;

      originalContent = content = fs.readFileSync ( absFilePath, { encoding: 'utf8' } );

      for ( let args of options.replacements ) {

        replacements += countMatches ( content, args[0] );

        content = content.replace ( ...args );

      }

      if ( originalContent === content ) continue;

      const line = `${replacements} ${replacements === 1 ? 'replacement' : 'replacements'} in "${filePath}"`;

      task.output = line;

      output.push ( line );

      if ( !config.dry ) fs.writeFileSync ( absFilePath, content );

    }

    task.output = output.length ? output.join ( '\n' ) : 'Nothing replaced';

  };

}

/* EXPORT */

export = Object.assign ( factory, { default: factory } );
