
/* IMPORT */

import * as _ from 'lodash';
import stringMatches from 'string-matches';

/* COUNT MATCHES */

function countMatches ( string, pattern ) {
  if ( _.isRegExp ( pattern ) ) {
    return stringMatches ( string, pattern ).length;
  } else {
    return string.includes ( pattern ) ? 1 : 0;
  }
}

/* EXPORT */

export default countMatches;
