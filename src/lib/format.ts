import * as prettier from 'prettier/standalone';
import * as parserBabel from 'prettier/plugins/babel';
import * as estree from 'prettier/plugins/estree';

export async function formatCode(code: string) {
    try {
        return await prettier.format(code, {
            parser: 'babel',
            plugins: [parserBabel, estree],
            singleQuote: true,
            trailingComma: 'es5',
        });
    } catch (e) {
        console.error('Prettier formatting failed', e);
        return code;
    }
}
