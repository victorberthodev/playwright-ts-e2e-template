/**
 * Commitlint — Conventional Commits enforcement.
 * Constitution C7: feat, fix, test, chore, docs, refactor, ci, perf, build, style, revert.
 */
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'test',
        'chore',
        'docs',
        'refactor',
        'ci',
        'perf',
        'build',
        'style',
        'revert',
      ],
    ],
    'subject-case': [2, 'never', ['pascal-case', 'upper-case']],
    'header-max-length': [2, 'always', 100],
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [2, 'always'],
  },
};
