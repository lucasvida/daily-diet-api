import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(

    // ─── Arquivos ignorados ──────────────────────────────────────────────────
    {
        ignores: [
            'node_modules/**',
            'dist/**',
            'build/**',
        ],
    },

    // ─── Base JS recomendada ─────────────────────────────────────────────────
    js.configs.recommended,

    // ─── TypeScript ──────────────────────────────────────────────────────────
    ...tseslint.configs.recommended,

    // ─── Regras customizadas ─────────────────────────────────────────────────
    {
        rules: {

            // ── Ponto e vírgula obrigatório ──────────────────────────────────
            'semi': ['error', 'always'],
            '@typescript-eslint/semi': 'off', // desativado para evitar conflito

            // ── Indentação: 4 espaços ────────────────────────────────────────
            'indent': ['error', 4, { SwitchCase: 1 }],
            '@typescript-eslint/indent': 'off', // desativado para evitar conflito

            // ── Aspas simples ────────────────────────────────────────────────
            'quotes': ['error', 'single'],

            // ── Vírgula em último elemento (objetos/arrays multiline) ────────
            'comma-dangle': ['error', 'always-multiline'],

            // ── Espaço antes de bloco ────────────────────────────────────────
            'space-before-blocks': ['error', 'always'],

            // ── Espaço ao redor de operadores ────────────────────────────────
            'space-infix-ops': 'error',

            // ── Sem espaços ao redor de chaves de objeto ─────────────────────
            'object-curly-spacing': ['error', 'always'],

            // ── Quebra de linha no final do arquivo ──────────────────────────
            'eol-last': ['error', 'always'],

            // ── Máximo de uma linha em branco consecutiva ────────────────────
            'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],

            // ── Arrow function com parênteses sempre ─────────────────────────
            'arrow-parens': ['error', 'always'],

            // ── Estilo de declaração de objeto (propriedades na mesma linha) ─
            'object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],

            // ── Sem variáveis não utilizadas ─────────────────────────────────
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

            // ── Sem `any` explícito ───────────────────────────────────────────
            '@typescript-eslint/no-explicit-any': 'warn',
        },
    },

);
