/**
 * Created by albertoclarit on 11/7/15.
 */

global.rootPath = process.cwd();


function transformRelativeToRootPath(path) {
    if (hasTildeInString(path)) {
        const withoutTilde = path.substring(2, path.length);
        return global.rootPath + '/'+ withoutTilde;
    }
    if (typeof path === 'string') {
        return path;
    }
    throw new Error('ERROR: No path passed');
}

function  hasTildeInString (path)  {

    var containsTilde = false;

    if (typeof path === 'string') {
        const firstTwoCharactersOfString = path.substring(0, 2);
        if (firstTwoCharactersOfString === '~/') {
            containsTilde = true;
        }
    }

    return containsTilde;

}


export default function create() {

    return {
        visitor: {
            ImportDeclaration: (node)=> {
                const givenPath = node.node.source.value;

                if (hasTildeInString(givenPath)) {
                    node.node.source.value = transformRelativeToRootPath(node.node.source.value);
                }

                console.log(node.node.source.value);
            }
        }
    };
}