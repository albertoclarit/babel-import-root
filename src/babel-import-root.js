/**
 * Created by albertoclarit on 11/7/15.
 */
export default function create() {
    class BabelImportRoot {

        constructor(){
            this.cwd = process.cwd();

            return {
                visitor: {
                    ImportDeclaration: (node)=> {
                        const givenPath = node.node.source.value;

                        if (hasTildeInString(givenPath)) {
                            node.node.source.value = transformRelativeToRootPath(node.node.source.value);
                        }

                    }
                }
            }
        }


         transformRelativeToRootPath(path) {
            if (hasTildeInString(path)) {
                const withoutTilde = path.substring(2, path.length);
                return  this.cwd + '/'+ withoutTilde;
            }
            if (typeof path === 'string') {
                return path;
            }
            throw new Error('ERROR: No path passed');
        }

          hasTildeInString (path)  {

            var containsTilde = false;

            if (typeof path === 'string') {
                const firstTwoCharactersOfString = path.substring(0, 2);
                if (firstTwoCharactersOfString === '~/') {
                    containsTilde = true;
                }
            }

            return containsTilde;

        }


    }

    return new BabelImportRoot();
}